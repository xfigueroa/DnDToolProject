import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  // Basic Campaign Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },
  setting: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  theme: {
    type: String,
    enum: [
      'High Fantasy', 'Dark Fantasy', 'Urban Fantasy', 'Political Intrigue',
      'Mystery', 'Horror', 'Comedy', 'Romance', 'Adventure', 'Exploration',
      'War', 'Post-Apocalyptic', 'Steampunk', 'Maritime', 'Other'
    ],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expectedEndDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'paused', 'completed', 'cancelled'],
    default: 'planning',
  },

  // DM and Player Management
  dungeonMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  players: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['player', 'co-dm', 'observer'],
      default: 'player',
    },
    notes: {
      type: String,
      trim: true,
    },
  }],
  maxPlayers: {
    type: Number,
    min: 1,
    max: 10,
    default: 6,
  },
  isRecruiting: {
    type: Boolean,
    default: false,
  },

  // Campaign Configuration
  gameSystem: {
    type: String,
    default: 'D&D 5e',
    trim: true,
  },
  startingLevel: {
    type: Number,
    min: 1,
    max: 20,
    default: 1,
  },
  currentLevel: {
    type: Number,
    min: 1,
    max: 20,
    default: 1,
  },
  levelingMethod: {
    type: String,
    enum: ['experience', 'milestone', 'session-based'],
    default: 'milestone',
  },
  sessionFrequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'irregular'],
    default: 'weekly',
  },
  sessionLength: {
    type: Number, // in hours
    min: 1,
    max: 12,
    default: 4,
  },

  // Story Management & Plot Hooks
  mainStoryline: {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['not started', 'in progress', 'completed', 'paused'],
      default: 'not started',
    },
    expectedSessions: {
      type: Number,
      min: 1,
    },
    completedSessions: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  plotHooks: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['unused', 'introduced', 'active', 'resolved', 'abandoned'],
      default: 'unused',
    },
    relatedCharacters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
    }],
    relatedNPCs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NPC',
    }],
    estimatedSessions: {
      type: Number,
      min: 1,
      default: 1,
    },
    rewards: {
      experience: {
        type: Number,
        default: 0,
        min: 0,
      },
      treasure: {
        type: String,
        trim: true,
      },
      storyRewards: {
        type: String,
        trim: true,
      },
    },
    tags: [{
      type: String,
      trim: true,
    }],
  }],
  sideQuests: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    questGiver: {
      npcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      npcName: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ['available', 'accepted', 'in progress', 'completed', 'failed', 'expired'],
      default: 'available',
    },
    difficulty: {
      type: String,
      enum: ['trivial', 'easy', 'medium', 'hard', 'deadly'],
      default: 'medium',
    },
    timeLimit: {
      type: Date,
    },
    rewards: {
      experience: {
        type: Number,
        default: 0,
        min: 0,
      },
      gold: {
        type: Number,
        default: 0,
        min: 0,
      },
      items: [{
        type: String,
        trim: true,
      }],
      reputation: {
        type: String,
        trim: true,
      },
    },
    acceptedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
    }],
  }],

  // World Building & Locations
  locations: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        'city', 'town', 'village', 'dungeon', 'wilderness', 'plane',
        'building', 'landmark', 'region', 'kingdom', 'other'
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    population: {
      type: Number,
      min: 0,
    },
    government: {
      type: String,
      trim: true,
    },
    notableFeatures: [{
      type: String,
      trim: true,
    }],
    keyNPCs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NPC',
    }],
    connectedLocations: [{
      locationId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      locationName: {
        type: String,
        trim: true,
      },
      travelTime: {
        type: String,
        trim: true,
      },
      travelMethod: {
        type: String,
        trim: true,
      },
      dangers: [{
        type: String,
        trim: true,
      }],
    }],
    isDiscovered: {
      type: Boolean,
      default: false,
    },
    currentlyAt: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
    }],
    secretInformation: {
      type: String,
      trim: true,
    },
    mapImageUrl: {
      type: String,
      trim: true,
    },
  }],

  // Factions & Organizations
  factions: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        'guild', 'government', 'religious', 'criminal', 'military',
        'academic', 'merchant', 'cult', 'rebel', 'other'
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    goals: [{
      type: String,
      trim: true,
    }],
    methods: [{
      type: String,
      trim: true,
    }],
    influence: {
      type: String,
      enum: ['local', 'regional', 'national', 'international', 'planar'],
      default: 'local',
    },
    power: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    alignment: {
      type: String,
      enum: [
        'Lawful Good', 'Neutral Good', 'Chaotic Good',
        'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
      ],
      default: 'True Neutral',
    },
    keyMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NPC',
    }],
    playerRelations: [{
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
        required: true,
      },
      relationship: {
        type: String,
        enum: ['ally', 'member', 'neutral', 'suspicious', 'enemy'],
        default: 'neutral',
      },
      reputation: {
        type: Number,
        min: -100,
        max: 100,
        default: 0,
      },
      rank: {
        type: String,
        trim: true,
      },
    }],
    resources: [{
      type: String,
      trim: true,
    }],
    territories: [{
      type: String,
      trim: true,
    }],
    allies: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
    enemies: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
  }],

  // Session Management
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  }],
  nextSession: {
    scheduledDate: {
      type: Date,
    },
    plannedContent: {
      type: String,
      trim: true,
    },
    expectedAttendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    preparationNotes: {
      type: String,
      trim: true,
    },
  },

  // AI and Story Generation Support
  aiGeneration: {
    storyStyle: {
      type: String,
      enum: [
        'classic heroic', 'dark and gritty', 'comedic', 'political intrigue',
        'mystery focused', 'exploration heavy', 'combat heavy', 'roleplay heavy'
      ],
      default: 'classic heroic',
    },
    complexityLevel: {
      type: String,
      enum: ['simple', 'moderate', 'complex', 'very complex'],
      default: 'moderate',
    },
    npcGenerationPreferences: {
      defaultAlignment: {
        type: String,
        enum: [
          'Lawful Good', 'Neutral Good', 'Chaotic Good',
          'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
          'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
        ],
        default: 'True Neutral',
      },
      detailLevel: {
        type: String,
        enum: ['basic', 'detailed', 'comprehensive'],
        default: 'detailed',
      },
      includeBackstory: {
        type: Boolean,
        default: true,
      },
      includeSecrets: {
        type: Boolean,
        default: true,
      },
    },
    lastGenerationDate: {
      type: Date,
    },
    generationHistory: [{
      type: {
        type: String,
        enum: ['npc', 'plot hook', 'location', 'encounter', 'twist'],
        required: true,
      },
      prompt: {
        type: String,
        trim: true,
      },
      result: {
        type: String,
        trim: true,
      },
      usedInGame: {
        type: Boolean,
        default: false,
      },
      sessionUsed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  },

  // Unexpected Twists & Random Events
  twistPool: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    triggerConditions: [{
      type: String,
      trim: true,
    }],
    impact: {
      type: String,
      enum: ['minor', 'moderate', 'major', 'campaign-changing'],
      default: 'moderate',
    },
    used: {
      type: Boolean,
      default: false,
    },
    usedInSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
    playerReactions: [{
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reaction: {
        type: String,
        enum: ['loved', 'liked', 'neutral', 'disliked', 'hated'],
      },
      notes: {
        type: String,
        trim: true,
      },
    }],
    consequences: [{
      type: String,
      trim: true,
    }],
    aiGenerated: {
      type: Boolean,
      default: false,
    },
  }],
  randomEventSettings: {
    frequency: {
      type: String,
      enum: ['never', 'rare', 'occasional', 'frequent', 'constant'],
      default: 'occasional',
    },
    types: [{
      type: String,
      enum: [
        'weather', 'encounters', 'social', 'political', 'economic',
        'magical', 'natural disasters', 'festivals', 'rumors'
      ],
    }],
    severity: {
      type: String,
      enum: ['light', 'moderate', 'serious'],
      default: 'moderate',
    },
  },

  // Campaign Statistics & Analytics
  statistics: {
    totalSessions: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPlaytime: {
      type: Number, // in hours
      default: 0,
      min: 0,
    },
    charactersCreated: {
      type: Number,
      default: 0,
      min: 0,
    },
    charactersRetired: {
      type: Number,
      default: 0,
      min: 0,
    },
    characterDeaths: {
      type: Number,
      default: 0,
      min: 0,
    },
    npcsIntroduced: {
      type: Number,
      default: 0,
      min: 0,
    },
    questsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    locationsVisited: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalExperienceAwarded: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageSessionRating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },

  // House Rules & Custom Content
  houseRules: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'combat', 'spellcasting', 'skills', 'social', 'exploration',
        'equipment', 'character creation', 'death and dying', 'other'
      ],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  }],
  customContent: {
    races: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    }],
    classes: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    }],
    spells: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      level: {
        type: Number,
        min: 0,
        max: 9,
      },
      school: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    }],
    items: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        trim: true,
      },
      rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'],
        default: 'common',
      },
      description: {
        type: String,
        trim: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
    }],
  },

  // Campaign Resources & Media
  resources: {
    handouts: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      fileUrl: {
        type: String,
        trim: true,
      },
      visibleToPlayers: {
        type: Boolean,
        default: true,
      },
      tags: [{
        type: String,
        trim: true,
      }],
    }],
    images: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      imageUrl: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        enum: ['map', 'npc portrait', 'location', 'item', 'monster', 'other'],
        default: 'other',
      },
      visibleToPlayers: {
        type: Boolean,
        default: true,
      },
    }],
    music: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      audioUrl: {
        type: String,
        required: true,
        trim: true,
      },
      mood: {
        type: String,
        enum: ['combat', 'exploration', 'social', 'suspense', 'peaceful', 'dramatic'],
      },
      loop: {
        type: Boolean,
        default: true,
      },
    }],
  },

  // Privacy and Access Control
  visibility: {
    type: String,
    enum: ['private', 'invite-only', 'public'],
    default: 'invite-only',
  },
  inviteCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  joinRequests: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    responseDate: {
      type: Date,
    },
    responseMessage: {
      type: String,
      trim: true,
    },
  }],

  // Meta Information
  tags: [{
    type: String,
    trim: true,
  }],
  notes: {
    public: {
      type: String,
      trim: true,
    },
    private: {
      type: String,
      trim: true,
    },
  },
  
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Indexes for better performance
campaignSchema.index({ dungeonMaster: 1 });
campaignSchema.index({ 'players.userId': 1 });
campaignSchema.index({ status: 1 });
campaignSchema.index({ theme: 1 });
campaignSchema.index({ visibility: 1 });
campaignSchema.index({ inviteCode: 1 });
campaignSchema.index({ startDate: 1 });
campaignSchema.index({ tags: 1 });

// Virtual for active players count
campaignSchema.virtual('activePlayersCount').get(function() {
  return this.players.filter(player => player.isActive).length;
});

// Virtual for campaign duration
campaignSchema.virtual('campaignDuration').get(function() {
  const now = new Date();
  const duration = now - this.startDate;
  return Math.floor(duration / (1000 * 60 * 60 * 24)); // days
});

// Virtual for average session length
campaignSchema.virtual('averageSessionLength').get(function() {
  if (this.statistics.totalSessions === 0) return 0;
  return this.statistics.totalPlaytime / this.statistics.totalSessions;
});

// Pre-save middleware to generate invite code if needed
campaignSchema.pre('save', function(next) {
  if (this.visibility === 'invite-only' && !this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

// Methods for campaign management
campaignSchema.methods.addPlayer = function(userId, role = 'player') {
  const existingPlayer = this.players.find(p => p.userId.toString() === userId.toString());
  if (!existingPlayer) {
    this.players.push({
      userId: userId,
      role: role,
      joinDate: new Date(),
      isActive: true
    });
  }
  return this.save();
};

campaignSchema.methods.removePlayer = function(userId) {
  this.players = this.players.filter(p => p.userId.toString() !== userId.toString());
  return this.save();
};

campaignSchema.methods.getActivePlotHooks = function() {
  return this.plotHooks.filter(hook => hook.status === 'active' || hook.status === 'introduced');
};

campaignSchema.methods.getUnusedTwists = function() {
  return this.twistPool.filter(twist => !twist.used);
};

campaignSchema.methods.addSession = function(sessionId) {
  this.sessions.push(sessionId);
  this.statistics.totalSessions += 1;
  return this.save();
};

// Create the Campaign model
const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
