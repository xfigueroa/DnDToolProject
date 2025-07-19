import mongoose from "mongoose";

const npcSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  race: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: String,
    required: false,
    trim: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
    default: 1,
  },
  background: {
    type: String,
    required: false,
    trim: true,
  },
  alignment: {
    type: String,
    required: true,
    enum: [
      'Lawful Good', 'Neutral Good', 'Chaotic Good',
      'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
      'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
    ],
  },

  // Ability Scores (3-20 range for standard D&D)
  abilityScores: {
    strength: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
    dexterity: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
    constitution: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
    intelligence: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
    wisdom: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
    charisma: {
      type: Number,
      required: true,
      min: 1,
      max: 30,
      default: 10,
    },
  },

  // Combat Stats
  hitPoints: {
    current: {
      type: Number,
      required: true,
      min: 0,
    },
    maximum: {
      type: Number,
      required: true,
      min: 1,
    },
    temporary: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  armorClass: {
    type: Number,
    required: true,
    min: 1,
    default: 10,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
    default: 30,
  },
  initiativeBonus: {
    type: Number,
    default: 0,
  },

  // Proficiencies
  proficiencyBonus: {
    type: Number,
    required: true,
    min: 2,
    max: 6,
    default: 2,
  },
  savingThrows: {
    strength: { type: Boolean, default: false },
    dexterity: { type: Boolean, default: false },
    constitution: { type: Boolean, default: false },
    intelligence: { type: Boolean, default: false },
    wisdom: { type: Boolean, default: false },
    charisma: { type: Boolean, default: false },
  },
  skills: {
    acrobatics: { type: Boolean, default: false },
    animalHandling: { type: Boolean, default: false },
    arcana: { type: Boolean, default: false },
    athletics: { type: Boolean, default: false },
    deception: { type: Boolean, default: false },
    history: { type: Boolean, default: false },
    insight: { type: Boolean, default: false },
    intimidation: { type: Boolean, default: false },
    investigation: { type: Boolean, default: false },
    medicine: { type: Boolean, default: false },
    nature: { type: Boolean, default: false },
    perception: { type: Boolean, default: false },
    performance: { type: Boolean, default: false },
    persuasion: { type: Boolean, default: false },
    religion: { type: Boolean, default: false },
    sleightOfHand: { type: Boolean, default: false },
    stealth: { type: Boolean, default: false },
    survival: { type: Boolean, default: false },
  },

  // Resistances and Immunities
  damageResistances: [{
    type: String,
    trim: true,
  }],
  damageImmunities: [{
    type: String,
    trim: true,
  }],
  conditionImmunities: [{
    type: String,
    trim: true,
  }],

  // Senses
  senses: {
    darkvision: {
      type: Number,
      default: 0,
      min: 0,
    },
    blindsight: {
      type: Number,
      default: 0,
      min: 0,
    },
    tremorsense: {
      type: Number,
      default: 0,
      min: 0,
    },
    truesight: {
      type: Number,
      default: 0,
      min: 0,
    },
    passivePerception: {
      type: Number,
      required: true,
      min: 1,
      default: 10,
    },
  },

  // Languages
  languages: [{
    type: String,
    trim: true,
  }],

  // Challenge Rating (for combat encounters)
  challengeRating: {
    type: String,
    required: false,
    default: "1/4",
  },
  experiencePoints: {
    type: Number,
    required: false,
    min: 0,
    default: 50,
  },

  // Traits and Features
  traits: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  }],
  actions: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    damage: {
      type: String,
      required: false,
      trim: true,
    },
    attackBonus: {
      type: Number,
      required: false,
    },
  }],
  reactions: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  }],
  legendaryActions: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      default: 1,
      min: 1,
    },
  }],

  // Equipment
  equipment: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
    },
  }],
  
  // Spellcasting (if applicable)
  spellcasting: {
    isSpellcaster: {
      type: Boolean,
      default: false,
    },
    spellcastingAbility: {
      type: String,
      enum: ['intelligence', 'wisdom', 'charisma'],
      required: false,
    },
    spellSaveDC: {
      type: Number,
      required: false,
      min: 1,
    },
    spellAttackBonus: {
      type: Number,
      required: false,
    },
    spellSlots: {
      level1: { type: Number, default: 0, min: 0 },
      level2: { type: Number, default: 0, min: 0 },
      level3: { type: Number, default: 0, min: 0 },
      level4: { type: Number, default: 0, min: 0 },
      level5: { type: Number, default: 0, min: 0 },
      level6: { type: Number, default: 0, min: 0 },
      level7: { type: Number, default: 0, min: 0 },
      level8: { type: Number, default: 0, min: 0 },
      level9: { type: Number, default: 0, min: 0 },
    },
    knownSpells: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      level: {
        type: Number,
        required: true,
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
    }],
  },

  // Roleplay Information
  personality: {
    traits: [{
      type: String,
      trim: true,
    }],
    ideals: [{
      type: String,
      trim: true,
    }],
    bonds: [{
      type: String,
      trim: true,
    }],
    flaws: [{
      type: String,
      trim: true,
    }],
  },

  // Campaign Association
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: false,
  },

  // Meta Information
  notes: {
    type: String,
    trim: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    trim: true,
  },

  // AI Generation metadata
  aiGenerated: {
    type: Boolean,
    default: false,
  },
  generationPrompt: {
    type: String,
    trim: true,
  },
  generationDate: {
    type: Date,
  },

  // For quick NPC generation
  npcType: {
    type: String,
    enum: ['merchant', 'guard', 'noble', 'commoner', 'villain', 'ally', 'neutral'],
    default: 'neutral',
  },
  importance: {
    type: String,
    enum: ['minor', 'major', 'critical'],
    default: 'minor',
  },

  // Story hooks and connections
  storyHooks: [{
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
  }],
  relationships: [{
    characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC' },
    relationshipType: String, // 'ally', 'enemy', 'family', 'employer', etc.
    description: String,
  }],

  // Session history
  sessionHistory: [{
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    interactions: String,
    storyDevelopments: String,
    statusChanges: String,
  }],
  lastSeen: {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    date: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the NPC model
const NPC = mongoose.model('NPC', npcSchema);

export default NPC;
