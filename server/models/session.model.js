import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // Basic Session Information
  sessionNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  dungeonMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Session Scheduling & Status
  scheduledDate: {
    type: Date,
    required: true,
  },
  actualStartTime: {
    type: Date,
  },
  actualEndTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled', 'postponed'],
    default: 'scheduled',
  },
  sessionType: {
    type: String,
    enum: ['main story', 'side quest', 'character development', 'exploration', 'combat', 'social', 'oneshot'],
    default: 'main story',
  },

  // Player Attendance
  attendees: [{
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
      required: true,
    },
    attendanceStatus: {
      type: String,
      enum: ['present', 'absent', 'late', 'left early'],
      default: 'present',
    },
    arrivalTime: {
      type: Date,
    },
    departureTime: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  }],
  absentPlayers: [{
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
      required: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    characterHandling: {
      type: String,
      enum: ['dm controlled', 'party controlled', 'absent from story', 'autopilot'],
      default: 'absent from story',
    },
  }],

  // Session Planning & Preparation
  plannedContent: {
    mainObjectives: [{
      type: String,
      trim: true,
    }],
    plotHooksToIntroduce: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    }],
    npcsToIntroduce: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NPC',
    }],
    locationsToVisit: [{
      type: String,
      trim: true,
    }],
    estimatedCombatEncounters: {
      type: Number,
      default: 0,
      min: 0,
    },
    estimatedSocialEncounters: {
      type: Number,
      default: 0,
      min: 0,
    },
    preparationNotes: {
      type: String,
      trim: true,
    },
  },

  // Session Execution & Story Events
  actualContent: {
    storyBeats: [{
      timestamp: {
        type: Date,
        default: Date.now,
      },
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
      type: {
        type: String,
        enum: [
          'story progression', 'character moment', 'combat', 'social encounter',
          'exploration', 'puzzle', 'revelation', 'plot twist', 'cliffhanger'
        ],
        required: true,
      },
      involvedCharacters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
      }],
      involvedNPCs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      }],
      location: {
        type: String,
        trim: true,
      },
      importance: {
        type: String,
        enum: ['minor', 'moderate', 'major', 'critical'],
        default: 'moderate',
      },
      playerReactions: [{
        playerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        reaction: {
          type: String,
          enum: ['excited', 'surprised', 'confused', 'engaged', 'bored', 'frustrated'],
        },
        notes: {
          type: String,
          trim: true,
        },
      }],
    }],
    questsProgressed: [{
      questId: {
        type: String, // Reference to plot hook or side quest
        trim: true,
      },
      questTitle: {
        type: String,
        trim: true,
      },
      progressDescription: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['started', 'progressed', 'completed', 'failed', 'abandoned'],
      },
    }],
    decisionsAndConsequences: [{
      decision: {
        type: String,
        required: true,
        trim: true,
      },
      decidingCharacters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
      }],
      immediateConsequences: {
        type: String,
        trim: true,
      },
      potentialFutureConsequences: {
        type: String,
        trim: true,
      },
      impactLevel: {
        type: String,
        enum: ['local', 'regional', 'campaign-wide', 'character-specific'],
        default: 'local',
      },
    }],
  },

  // Character Development & Moments
  characterDevelopment: [{
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
      required: true,
    },
    developmentType: {
      type: String,
      enum: [
        'level up', 'personal growth', 'relationship change', 'goal progress',
        'backstory revelation', 'flaw addressed', 'bond strengthened', 'ideal challenged'
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mechanicalChanges: {
      levelGained: {
        type: Boolean,
        default: false,
      },
      newLevel: {
        type: Number,
        min: 1,
        max: 20,
      },
      featuresGained: [{
        type: String,
        trim: true,
      }],
      abilitiesImproved: [{
        ability: {
          type: String,
          enum: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
        },
        improvement: {
          type: Number,
        },
      }],
    },
    roleplaySignificance: {
      type: String,
      trim: true,
    },
    futureImplications: {
      type: String,
      trim: true,
    },
  }],

  // NPC Interactions & Relationship Changes
  npcInteractions: [{
    npcId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NPC',
      required: true,
    },
    interactingCharacters: [{
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
        required: true,
      },
      relationshipChangeBefore: {
        type: String,
        enum: ['ally', 'enemy', 'neutral', 'romantic', 'family', 'mentor', 'student', 'rival'],
      },
      relationshipChangeAfter: {
        type: String,
        enum: ['ally', 'enemy', 'neutral', 'romantic', 'family', 'mentor', 'student', 'rival'],
      },
      relationshipStrengthChange: {
        type: Number,
        min: -10,
        max: 10,
        default: 0,
      },
    }],
    interactionType: {
      type: String,
      enum: ['conversation', 'combat', 'negotiation', 'romance', 'conflict', 'cooperation', 'revelation'],
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    outcome: {
      type: String,
      trim: true,
    },
    futureImplications: {
      type: String,
      trim: true,
    },
  }],

  // Combat Encounters
  combatEncounters: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    initiativeOrder: [{
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
      },
      npcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      name: {
        type: String,
        trim: true,
      },
      initiative: {
        type: Number,
        required: true,
      },
    }],
    enemies: [{
      npcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      name: {
        type: String,
        trim: true,
      },
      challengeRating: {
        type: String,
        trim: true,
      },
      defeated: {
        type: Boolean,
        default: false,
      },
      howDefeated: {
        type: String,
        enum: ['killed', 'knocked unconscious', 'captured', 'fled', 'negotiated', 'other'],
      },
    }],
    duration: {
      rounds: {
        type: Number,
        min: 0,
      },
      realTimeMinutes: {
        type: Number,
        min: 0,
      },
    },
    outcome: {
      type: String,
      enum: ['victory', 'defeat', 'retreat', 'negotiated end', 'interrupted'],
      required: true,
    },
    experienceAwarded: {
      type: Number,
      default: 0,
      min: 0,
    },
    treasureFound: [{
      item: {
        type: String,
        trim: true,
      },
      value: {
        type: String,
        trim: true,
      },
      claimant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
      },
    }],
    notableMoments: [{
      type: String,
      trim: true,
    }],
  }],

  // Unexpected Twists & AI-Generated Content
  unexpectedEvents: [{
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
    triggerMoment: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['plot twist', 'random event', 'character revelation', 'world event', 'divine intervention'],
      required: true,
    },
    source: {
      type: String,
      enum: ['planned', 'ai generated', 'player action', 'random table', 'improvised'],
      required: true,
    },
    playerReactions: [{
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reaction: {
        type: String,
        enum: ['loved', 'liked', 'neutral', 'disliked', 'confused'],
      },
      comment: {
        type: String,
        trim: true,
      },
    }],
    impact: {
      type: String,
      enum: ['minor', 'moderate', 'major', 'campaign-changing'],
      default: 'moderate',
    },
    consequences: [{
      type: String,
      trim: true,
    }],
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    generationPrompt: {
      type: String,
      trim: true,
    },
  }],

  // Memorable Quotes & Moments
  memorableQuotes: [{
    speaker: {
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerCharacter',
      },
      npcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      speakerName: {
        type: String,
        trim: true,
      },
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    context: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    playerReactions: [{
      type: String,
      enum: ['hilarious', 'epic', 'touching', 'clever', 'memorable'],
    }],
  }],
  mvpMoments: [{
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['heroic act', 'clever solution', 'great roleplay', 'clutch moment', 'team leadership'],
      required: true,
    },
  }],

  // Session Rewards & Progression
  rewards: {
    experiencePoints: {
      total: {
        type: Number,
        default: 0,
        min: 0,
      },
      breakdown: [{
        source: {
          type: String,
          enum: ['combat', 'roleplay', 'problem solving', 'story milestone', 'bonus'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        description: {
          type: String,
          trim: true,
        },
      }],
    },
    treasure: {
      gold: {
        type: Number,
        default: 0,
        min: 0,
      },
      items: [{
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        value: {
          type: String,
          trim: true,
        },
        magicalProperties: {
          type: String,
          trim: true,
        },
        recipient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PlayerCharacter',
        },
      }],
    },
    storyRewards: [{
      type: String,
      trim: true,
    }],
    relationshipGains: [{
      faction: {
        type: String,
        trim: true,
      },
      reputationChange: {
        type: Number,
        min: -100,
        max: 100,
      },
      description: {
        type: String,
        trim: true,
      },
    }],
  },

  // Session Feedback & Evaluation
  feedback: {
    dmRating: {
      preparation: {
        type: Number,
        min: 1,
        max: 5,
      },
      improvisation: {
        type: Number,
        min: 1,
        max: 5,
      },
      playerEngagement: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    playerFeedback: [{
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      overallRating: {
        type: Number,
        min: 1,
        max: 5,
      },
      enjoyed: [{
        type: String,
        trim: true,
      }],
      wouldImprove: [{
        type: String,
        trim: true,
      }],
      favoritemoment: {
        type: String,
        trim: true,
      },
      characterSatisfaction: {
        type: Number,
        min: 1,
        max: 5,
      },
    }],
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },

  // AI Analytics & Insights
  aiAnalytics: {
    sessionTone: {
      type: String,
      enum: ['comedic', 'dramatic', 'tense', 'relaxed', 'action-packed', 'emotional', 'mysterious'],
    },
    dominantThemes: [{
      type: String,
      trim: true,
    }],
    playerEngagementLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'exceptional'],
    },
    storyProgressionRate: {
      type: String,
      enum: ['slow', 'steady', 'fast', 'rushed'],
    },
    suggestedImprovements: [{
      category: {
        type: String,
        enum: ['pacing', 'player engagement', 'story clarity', 'character development', 'combat balance'],
      },
      suggestion: {
        type: String,
        trim: true,
      },
    }],
    contentGenerated: [{
      type: {
        type: String,
        enum: ['npc', 'location', 'plot twist', 'encounter', 'dialogue'],
      },
      prompt: {
        type: String,
        trim: true,
      },
      result: {
        type: String,
        trim: true,
      },
      used: {
        type: Boolean,
        default: true,
      },
      effectiveness: {
        type: Number,
        min: 1,
        max: 5,
      },
    }],
  },

  // Next Session Preparation
  nextSessionPrep: {
    cliffhangers: [{
      type: String,
      trim: true,
    }],
    unresolved: [{
      type: String,
      trim: true,
    }],
    followUpRequired: [{
      type: String,
      trim: true,
    }],
    dmNotes: {
      type: String,
      trim: true,
    },
    playerExpectations: [{
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      expectation: {
        type: String,
        trim: true,
      },
    }],
  },

  // Technical Session Info
  sessionMedium: {
    type: String,
    enum: ['in-person', 'virtual', 'hybrid'],
    default: 'in-person',
  },
  platform: {
    type: String,
    trim: true, // e.g., "Roll20", "Discord", "Foundry VTT"
  },
  recordings: {
    hasAudioRecording: {
      type: Boolean,
      default: false,
    },
    hasVideoRecording: {
      type: Boolean,
      default: false,
    },
    recordingUrls: [{
      type: String,
      trim: true,
    }],
    permission: {
      type: String,
      enum: ['all players agreed', 'dm only', 'no recording'],
      default: 'no recording',
    },
  },

  // Meta Information
  tags: [{
    type: String,
    trim: true,
  }],
  visibility: {
    type: String,
    enum: ['public', 'players only', 'dm only'],
    default: 'players only',
  },
  
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Indexes for better performance
sessionSchema.index({ campaignId: 1, sessionNumber: 1 });
sessionSchema.index({ dungeonMaster: 1 });
sessionSchema.index({ scheduledDate: 1 });
sessionSchema.index({ status: 1 });
sessionSchema.index({ 'attendees.playerId': 1 });
sessionSchema.index({ sessionType: 1 });

// Compound index for efficient campaign session queries
sessionSchema.index({ campaignId: 1, sessionNumber: -1 });
sessionSchema.index({ campaignId: 1, scheduledDate: -1 });

// Virtual for session duration
sessionSchema.virtual('sessionDuration').get(function() {
  if (this.actualStartTime && this.actualEndTime) {
    return (this.actualEndTime - this.actualStartTime) / (1000 * 60 * 60); // hours
  }
  return null;
});

// Virtual for player count
sessionSchema.virtual('playerCount').get(function() {
  return this.attendees.filter(attendee => attendee.attendanceStatus === 'present').length;
});

// Virtual for total experience awarded
sessionSchema.virtual('totalExperienceAwarded').get(function() {
  return this.rewards.experiencePoints.total;
});

// Pre-save middleware to calculate average rating
sessionSchema.pre('save', function(next) {
  if (this.feedback.playerFeedback && this.feedback.playerFeedback.length > 0) {
    const ratings = this.feedback.playerFeedback
      .filter(feedback => feedback.overallRating)
      .map(feedback => feedback.overallRating);
    
    if (ratings.length > 0) {
      this.feedback.averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }
  }
  next();
});

// Methods for session management
sessionSchema.methods.startSession = function() {
  this.actualStartTime = new Date();
  this.status = 'in-progress';
  return this.save();
};

sessionSchema.methods.endSession = function() {
  this.actualEndTime = new Date();
  this.status = 'completed';
  return this.save();
};

sessionSchema.methods.addStoryBeat = function(storyBeat) {
  this.actualContent.storyBeats.push({
    ...storyBeat,
    timestamp: new Date()
  });
  return this.save();
};

sessionSchema.methods.awardExperience = function(source, amount, description) {
  this.rewards.experiencePoints.breakdown.push({
    source,
    amount,
    description
  });
  this.rewards.experiencePoints.total += amount;
  return this.save();
};

sessionSchema.methods.getHighlights = function() {
  return {
    mvpMoments: this.mvpMoments,
    memorableQuotes: this.memorableQuotes.slice(0, 3), // Top 3 quotes
    majorStoryBeats: this.actualContent.storyBeats.filter(beat => 
      beat.importance === 'major' || beat.importance === 'critical'
    ),
    unexpectedEvents: this.unexpectedEvents.filter(event => 
      event.impact === 'major' || event.impact === 'campaign-changing'
    )
  };
};

sessionSchema.methods.getSessionSummary = function() {
  return {
    basicInfo: {
      sessionNumber: this.sessionNumber,
      title: this.title,
      date: this.scheduledDate,
      duration: this.sessionDuration,
      playerCount: this.playerCount
    },
    progression: {
      experienceAwarded: this.totalExperienceAwarded,
      questsProgressed: this.actualContent.questsProgressed.length,
      characterDevelopments: this.characterDevelopment.length,
      combatEncounters: this.combatEncounters.length
    },
    feedback: {
      averageRating: this.feedback.averageRating,
      highlights: this.getHighlights()
    }
  };
};

// Create the Session model
const Session = mongoose.model('Session', sessionSchema);

export default Session;
