const mongoose = require('mongoose');

// Schema for NPC Generation Requests and Results
const npcGeneratorSchema = new mongoose.Schema({
  // Generation Request Information
  generationRequest: {
    role: {
      type: String,
      required: true,
      trim: true,
      description: "What is the role of the NPC? (e.g., merchant, guard, innkeeper, quest giver)"
    },
    storyFit: {
      type: String,
      required: true,
      trim: true,
      description: "How does the NPC fit into the story? (vendor, guard, adventurer, etc.)"
    },
    desiredTraits: {
      race: {
        type: String,
        trim: true,
        description: "Desired race for the NPC"
      },
      name: {
        type: String,
        trim: true,
        description: "Specific name preference (optional)"
      },
      class: {
        type: String,
        trim: true,
        description: "Desired class if applicable"
      },
      personalityTraits: {
        type: String,
        trim: true,
        description: "Any specific personality traits desired"
      },
      appearance: {
        type: String,
        trim: true,
        description: "Any specific appearance notes"
      },
      other: {
        type: String,
        trim: true,
        description: "Any other specific traits or requirements"
      }
    },
    includeStats: {
      type: Boolean,
      default: false,
      description: "Whether to generate full D&D stats for this NPC"
    },
    campaignContext: {
      type: String,
      trim: true,
      description: "Additional context about the campaign/world this NPC will exist in"
    }
  },

  // Generated NPC Information
  generatedNPC: {
    // Basic Information
    name: {
      type: String,
      trim: true
    },
    alternativeNames: [{
      type: String,
      trim: true
    }],
    race: {
      type: String,
      trim: true
    },
    class: {
      type: String,
      trim: true
    },
    background: {
      type: String,
      trim: true
    },
    
    // Personality & Description
    personalityTraits: [{
      type: String,
      trim: true
    }],
    ideals: {
      type: String,
      trim: true
    },
    bonds: {
      type: String,
      trim: true
    },
    flaws: {
      type: String,
      trim: true
    },
    appearance: {
      type: String,
      trim: true
    },
    mannerisms: {
      type: String,
      trim: true
    },
    
    // Role & Story Integration
    occupation: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      description: "Where this NPC can typically be found"
    },
    roleInStory: {
      type: String,
      trim: true,
      description: "How this NPC serves the story/campaign"
    },
    
    // Optional Stats (only generated if requested)
    stats: {
      abilityScores: {
        strength: { type: Number, min: 1, max: 30 },
        dexterity: { type: Number, min: 1, max: 30 },
        constitution: { type: Number, min: 1, max: 30 },
        intelligence: { type: Number, min: 1, max: 30 },
        wisdom: { type: Number, min: 1, max: 30 },
        charisma: { type: Number, min: 1, max: 30 }
      },
      armorClass: { type: Number },
      hitPoints: { type: Number },
      speed: { type: String },
      proficiencyBonus: { type: Number },
      savingThrows: [{
        ability: String,
        modifier: Number
      }],
      skills: [{
        name: String,
        modifier: Number
      }],
      languages: [String],
      challengeRating: { type: String },
      equipment: [String]
    },
    
    // AI Generation Metadata
    aiPromptUsed: {
      type: String,
      description: "The prompt sent to ChatGPT for this generation"
    },
    aiResponse: {
      type: String,
      description: "Raw response from ChatGPT"
    },
    generationTimestamp: {
      type: Date,
      default: Date.now
    }
  },

  // User & Campaign Association
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  
  // Usage & Management
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true,
    description: "DM notes about this NPC"
  },
  
  // Generation Settings
  generationSettings: {
    creativityLevel: {
      type: String,
      enum: ['conservative', 'balanced', 'creative'],
      default: 'balanced',
      description: "How creative the AI should be when generating this NPC"
    },
    settingStyle: {
      type: String,
      enum: ['high-fantasy', 'low-fantasy', 'modern', 'sci-fi', 'custom'],
      default: 'high-fantasy'
    },
    tone: {
      type: String,
      enum: ['serious', 'lighthearted', 'dark', 'comedic', 'neutral'],
      default: 'neutral'
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
npcGeneratorSchema.index({ createdBy: 1 });
npcGeneratorSchema.index({ campaignId: 1 });
npcGeneratorSchema.index({ 'generatedNPC.name': 1 });
npcGeneratorSchema.index({ 'generationRequest.role': 1 });
npcGeneratorSchema.index({ isActive: 1 });
npcGeneratorSchema.index({ tags: 1 });

// Virtual for getting alternative names as a formatted string
npcGeneratorSchema.virtual('alternativeNamesString').get(function() {
  if (this.generatedNPC.alternativeNames && this.generatedNPC.alternativeNames.length > 0) {
    return this.generatedNPC.alternativeNames.join(', ');
  }
  return 'No alternative names provided';
});

// Method to generate ChatGPT prompt
npcGeneratorSchema.methods.generatePrompt = function() {
  const { role, storyFit, desiredTraits, includeStats, campaignContext } = this.generationRequest;
  const { creativityLevel, settingStyle, tone } = this.generationSettings;
  
  let prompt = `Generate a D&D NPC with the following requirements:\n\n`;
  prompt += `Role: ${role}\n`;
  prompt += `Story Integration: ${storyFit}\n`;
  
  if (campaignContext) {
    prompt += `Campaign Context: ${campaignContext}\n`;
  }
  
  if (desiredTraits.race || desiredTraits.name || desiredTraits.class || desiredTraits.personalityTraits || desiredTraits.appearance || desiredTraits.other) {
    prompt += `\nDesired Traits:\n`;
    if (desiredTraits.race) prompt += `- Race: ${desiredTraits.race}\n`;
    if (desiredTraits.name) prompt += `- Name: ${desiredTraits.name}\n`;
    if (desiredTraits.class) prompt += `- Class: ${desiredTraits.class}\n`;
    if (desiredTraits.personalityTraits) prompt += `- Personality: ${desiredTraits.personalityTraits}\n`;
    if (desiredTraits.appearance) prompt += `- Appearance: ${desiredTraits.appearance}\n`;
    if (desiredTraits.other) prompt += `- Other: ${desiredTraits.other}\n`;
  }
  
  prompt += `\nGeneration Style: ${creativityLevel} creativity, ${settingStyle} setting, ${tone} tone\n`;
  
  prompt += `\nPlease provide:\n`;
  prompt += `1. Primary name and 3-5 alternative name options\n`;
  prompt += `2. Race, class, and background\n`;
  prompt += `3. Personality traits, ideals, bonds, and flaws\n`;
  prompt += `4. Physical appearance and mannerisms\n`;
  prompt += `5. Occupation and typical location\n`;
  prompt += `6. How they integrate into the story/campaign\n`;
  
  if (includeStats) {
    prompt += `7. Full D&D 5e stats including ability scores, AC, HP, skills, and equipment\n`;
  }
  
  prompt += `\nFormat the response as a structured character sheet that can be easily parsed.`;
  
  return prompt;
};

// Method to check if NPC has stats
npcGeneratorSchema.methods.hasStats = function() {
  return this.generatedNPC.stats && 
         this.generatedNPC.stats.abilityScores && 
         Object.keys(this.generatedNPC.stats.abilityScores).length > 0;
};

// Static method to find NPCs by role
npcGeneratorSchema.statics.findByRole = function(role) {
  return this.find({ 'generationRequest.role': new RegExp(role, 'i'), isActive: true });
};

// Static method to find NPCs by campaign
npcGeneratorSchema.statics.findByCampaign = function(campaignId) {
  return this.find({ campaignId: campaignId, isActive: true });
};

module.exports = mongoose.model('NPCGenerator', npcGeneratorSchema);
