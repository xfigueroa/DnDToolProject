import NPCGenerator from '../models/npcgenerator.model.js';
import OpenAI from 'openai'; // You'll need to install: npm install openai

// Function to get OpenAI client (initialized when needed)
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
};

// Generate NPC using ChatGPT
const generateNPC = async (req, res) => {
  try {
    const { role, storyFit, desiredTraits, includeStats, campaignContext, campaignId, generationSettings } = req.body;
    const userId = req.user.id; // Assuming you have authentication middleware

    // Validate required fields
    if (!role || !storyFit) {
      return res.status(400).json({
        success: false,
        message: 'Role and story fit are required fields'
      });
    }

    // Create new NPC generation request
    const npcRequest = new NPCGenerator({
      generationRequest: {
        role: role.trim(),
        storyFit: storyFit.trim(),
        desiredTraits: desiredTraits || {},
        includeStats: includeStats || false,
        campaignContext: campaignContext?.trim()
      },
      createdBy: userId,
      campaignId: campaignId || null,
      generationSettings: {
        creativityLevel: generationSettings?.creativityLevel || 'balanced',
        settingStyle: generationSettings?.settingStyle || 'high-fantasy',
        tone: generationSettings?.tone || 'neutral'
      }
    });

    // Generate the ChatGPT prompt
    const prompt = npcRequest.generatePrompt();
    npcRequest.generatedNPC.aiPromptUsed = prompt;

    // Call ChatGPT API
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert D&D Dungeon Master and character creator. Generate detailed, creative NPCs that fit seamlessly into D&D campaigns. Always provide structured responses that can be easily parsed."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: includeStats ? 2000 : 1200,
      temperature: generationSettings?.creativityLevel === 'creative' ? 0.9 : 
                  generationSettings?.creativityLevel === 'conservative' ? 0.3 : 0.6
    });

    const aiResponse = completion.choices[0].message.content;
    npcRequest.generatedNPC.aiResponse = aiResponse;

    // Parse the AI response and populate the NPC data
    const parsedNPC = parseAIResponse(aiResponse, includeStats);
    Object.assign(npcRequest.generatedNPC, parsedNPC);

    // Save the generated NPC
    await npcRequest.save();

    res.status(201).json({
      success: true,
      message: 'NPC generated successfully',
      data: {
        id: npcRequest._id,
        npc: npcRequest.generatedNPC,
        request: npcRequest.generationRequest,
        settings: npcRequest.generationSettings
      }
    });

  } catch (error) {
    console.error('Error generating NPC:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate NPC',
      error: error.message
    });
  }
};

// Parse AI response into structured NPC data
const parseAIResponse = (aiResponse, includeStats) => {
  const npcData = {
    alternativeNames: []
  };

  try {
    // Extract basic information using regex patterns
    const nameMatch = aiResponse.match(/(?:Name|Primary Name):\s*([^\n]+)/i);
    if (nameMatch) npcData.name = nameMatch[1].trim();

    const alternativeNamesMatch = aiResponse.match(/(?:Alternative Names?|Other Names?):\s*([^\n]+)/i);
    if (alternativeNamesMatch) {
      npcData.alternativeNames = alternativeNamesMatch[1]
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
    }

    const raceMatch = aiResponse.match(/Race:\s*([^\n]+)/i);
    if (raceMatch) npcData.race = raceMatch[1].trim();

    const classMatch = aiResponse.match(/Class:\s*([^\n]+)/i);
    if (classMatch) npcData.class = classMatch[1].trim();

    const backgroundMatch = aiResponse.match(/Background:\s*([^\n]+)/i);
    if (backgroundMatch) npcData.background = backgroundMatch[1].trim();

    const occupationMatch = aiResponse.match(/Occupation:\s*([^\n]+)/i);
    if (occupationMatch) npcData.occupation = occupationMatch[1].trim();

    const locationMatch = aiResponse.match(/(?:Location|Where to find):\s*([^\n]+)/i);
    if (locationMatch) npcData.location = locationMatch[1].trim();

    const roleInStoryMatch = aiResponse.match(/(?:Role in Story|Story Integration):\s*([^\n]+)/i);
    if (roleInStoryMatch) npcData.roleInStory = roleInStoryMatch[1].trim();

    // Extract personality traits
    const personalityMatch = aiResponse.match(/Personality Traits?:\s*([^\n]+)/i);
    if (personalityMatch) {
      npcData.personalityTraits = personalityMatch[1]
        .split(',')
        .map(trait => trait.trim())
        .filter(trait => trait.length > 0);
    }

    const idealsMatch = aiResponse.match(/Ideals?:\s*([^\n]+)/i);
    if (idealsMatch) npcData.ideals = idealsMatch[1].trim();

    const bondsMatch = aiResponse.match(/Bonds?:\s*([^\n]+)/i);
    if (bondsMatch) npcData.bonds = bondsMatch[1].trim();

    const flawsMatch = aiResponse.match(/Flaws?:\s*([^\n]+)/i);
    if (flawsMatch) npcData.flaws = flawsMatch[1].trim();

    const appearanceMatch = aiResponse.match(/(?:Appearance|Physical Description):\s*([^\n]+)/i);
    if (appearanceMatch) npcData.appearance = appearanceMatch[1].trim();

    const mannerismsMatch = aiResponse.match(/Mannerisms?:\s*([^\n]+)/i);
    if (mannerismsMatch) npcData.mannerisms = mannerismsMatch[1].trim();

    // Parse stats if requested
    if (includeStats) {
      npcData.stats = parseStatsFromResponse(aiResponse);
    }

  } catch (error) {
    console.error('Error parsing AI response:', error);
  }

  return npcData;
};

// Parse D&D stats from AI response
const parseStatsFromResponse = (aiResponse) => {
  const stats = {
    abilityScores: {},
    savingThrows: [],
    skills: [],
    languages: [],
    equipment: []
  };

  try {
    // Parse ability scores
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    abilities.forEach(ability => {
      const regex = new RegExp(`${ability}:\\s*(\\d+)`, 'i');
      const match = aiResponse.match(regex);
      if (match) {
        stats.abilityScores[ability] = parseInt(match[1]);
      }
    });

    // Parse other stats
    const acMatch = aiResponse.match(/(?:Armor Class|AC):\s*(\d+)/i);
    if (acMatch) stats.armorClass = parseInt(acMatch[1]);

    const hpMatch = aiResponse.match(/(?:Hit Points|HP):\s*(\d+)/i);
    if (hpMatch) stats.hitPoints = parseInt(hpMatch[1]);

    const speedMatch = aiResponse.match(/Speed:\s*([^\n]+)/i);
    if (speedMatch) stats.speed = speedMatch[1].trim();

    const crMatch = aiResponse.match(/(?:Challenge Rating|CR):\s*([^\n]+)/i);
    if (crMatch) stats.challengeRating = crMatch[1].trim();

    // Parse languages
    const languagesMatch = aiResponse.match(/Languages?:\s*([^\n]+)/i);
    if (languagesMatch) {
      stats.languages = languagesMatch[1]
        .split(',')
        .map(lang => lang.trim())
        .filter(lang => lang.length > 0);
    }

    // Parse equipment
    const equipmentMatch = aiResponse.match(/Equipment:\s*([^\n]+)/i);
    if (equipmentMatch) {
      stats.equipment = equipmentMatch[1]
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

  } catch (error) {
    console.error('Error parsing stats:', error);
  }

  return stats;
};

// Get all NPCs for a user
const getUserNPCs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { campaignId, role, page = 1, limit = 10 } = req.query;

    // Build query
    let query = { createdBy: userId, isActive: true };
    if (campaignId) query.campaignId = campaignId;
    if (role) query['generationRequest.role'] = new RegExp(role, 'i');

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const npcs = await NPCGenerator.find(query)
      .select('-generatedNPC.aiResponse -generatedNPC.aiPromptUsed') // Exclude large fields
      .populate('campaignId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await NPCGenerator.countDocuments(query);

    res.json({
      success: true,
      data: {
        npcs,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          hasNext: skip + npcs.length < total,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching NPCs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NPCs',
      error: error.message
    });
  }
};

// Get a specific NPC
const getNPC = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const npc = await NPCGenerator.findOne({ 
      _id: id, 
      createdBy: userId, 
      isActive: true 
    }).populate('campaignId', 'name');

    if (!npc) {
      return res.status(404).json({
        success: false,
        message: 'NPC not found'
      });
    }

    res.json({
      success: true,
      data: npc
    });

  } catch (error) {
    console.error('Error fetching NPC:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NPC',
      error: error.message
    });
  }
};

// Update NPC
const updateNPC = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    // Find and update the NPC
    const npc = await NPCGenerator.findOneAndUpdate(
      { _id: id, createdBy: userId, isActive: true },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    ).populate('campaignId', 'name');

    if (!npc) {
      return res.status(404).json({
        success: false,
        message: 'NPC not found'
      });
    }

    res.json({
      success: true,
      message: 'NPC updated successfully',
      data: npc
    });

  } catch (error) {
    console.error('Error updating NPC:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update NPC',
      error: error.message
    });
  }
};

// Delete NPC (soft delete)
const deleteNPC = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const npc = await NPCGenerator.findOneAndUpdate(
      { _id: id, createdBy: userId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!npc) {
      return res.status(404).json({
        success: false,
        message: 'NPC not found'
      });
    }

    res.json({
      success: true,
      message: 'NPC deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting NPC:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete NPC',
      error: error.message
    });
  }
};

// Get NPCs by campaign
const getCampaignNPCs = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const userId = req.user.id;

    const npcs = await NPCGenerator.find({
      campaignId,
      createdBy: userId,
      isActive: true
    })
    .select('generatedNPC.name generatedNPC.race generatedNPC.occupation generationRequest.role createdAt')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: npcs
    });

  } catch (error) {
    console.error('Error fetching campaign NPCs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaign NPCs',
      error: error.message
    });
  }
};

// Regenerate NPC with same parameters
const regenerateNPC = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the existing NPC
    const existingNPC = await NPCGenerator.findOne({
      _id: id,
      createdBy: userId,
      isActive: true
    });

    if (!existingNPC) {
      return res.status(404).json({
        success: false,
        message: 'NPC not found'
      });
    }

    // Use the same generation request but call ChatGPT again
    const prompt = existingNPC.generatePrompt();
    
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert D&D Dungeon Master and character creator. Generate detailed, creative NPCs that fit seamlessly into D&D campaigns. Always provide structured responses that can be easily parsed."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: existingNPC.generationRequest.includeStats ? 2000 : 1200,
      temperature: existingNPC.generationSettings.creativityLevel === 'creative' ? 0.9 : 
                  existingNPC.generationSettings.creativityLevel === 'conservative' ? 0.3 : 0.6
    });

    const aiResponse = completion.choices[0].message.content;
    const parsedNPC = parseAIResponse(aiResponse, existingNPC.generationRequest.includeStats);

    // Update the existing NPC with new generated data
    existingNPC.generatedNPC = {
      ...parsedNPC,
      aiPromptUsed: prompt,
      aiResponse: aiResponse,
      generationTimestamp: new Date()
    };

    await existingNPC.save();

    res.json({
      success: true,
      message: 'NPC regenerated successfully',
      data: {
        id: existingNPC._id,
        npc: existingNPC.generatedNPC,
        request: existingNPC.generationRequest,
        settings: existingNPC.generationSettings
      }
    });

  } catch (error) {
    console.error('Error regenerating NPC:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate NPC',
      error: error.message
    });
  }
};

export {
  generateNPC,
  getUserNPCs,
  getNPC,
  updateNPC,
  deleteNPC,
  getCampaignNPCs,
  regenerateNPC
};
