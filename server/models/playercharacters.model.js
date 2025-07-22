import mongoose from "mongoose";

const playerCharacterSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
  },
  playerName: {
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
    required: true,
    trim: true,
  },
  subclass: {
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
    required: true,
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
  experiencePoints: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  // Ability Scores
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
  hitDice: {
    total: {
      type: Number,
      required: true,
      min: 1,
    },
    remaining: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ['d4', 'd6', 'd8', 'd10', 'd12'],
      default: 'd8',
    },
  },
  armorClass: {
    type: Number,
    required: true,
    min: 1,
    default: 10,
  },
  speed: {
    walking: {
      type: Number,
      required: true,
      min: 0,
      default: 30,
    },
    flying: {
      type: Number,
      default: 0,
      min: 0,
    },
    swimming: {
      type: Number,
      default: 0,
      min: 0,
    },
    climbing: {
      type: Number,
      default: 0,
      min: 0,
    },
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
    strength: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    dexterity: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    constitution: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    intelligence: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    wisdom: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    charisma: { 
      proficient: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
  },
  skills: {
    acrobatics: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    animalHandling: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    arcana: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    athletics: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    deception: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    history: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    insight: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    intimidation: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    investigation: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    medicine: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    nature: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    perception: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    performance: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    persuasion: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    religion: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    sleightOfHand: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    stealth: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
    survival: { 
      proficient: { type: Boolean, default: false },
      expertise: { type: Boolean, default: false },
      bonus: { type: Number, default: 0 }
    },
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
    passiveInvestigation: {
      type: Number,
      required: true,
      min: 1,
      default: 10,
    },
    passiveInsight: {
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

  // Proficiencies (weapons, armor, tools)
  weaponProficiencies: [{
    type: String,
    trim: true,
  }],
  armorProficiencies: [{
    type: String,
    trim: true,
  }],
  toolProficiencies: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    proficient: {
      type: Boolean,
      default: true,
    },
    expertise: {
      type: Boolean,
      default: false,
    },
  }],

  // Class Features and Racial Traits
  classFeatures: [{
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
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    uses: {
      current: {
        type: Number,
        default: 0,
        min: 0,
      },
      maximum: {
        type: Number,
        default: 0,
        min: 0,
      },
      resetType: {
        type: String,
        enum: ['none', 'short rest', 'long rest', 'day'],
        default: 'none',
      },
    },
  }],
  racialTraits: [{
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
    uses: {
      current: {
        type: Number,
        default: 0,
        min: 0,
      },
      maximum: {
        type: Number,
        default: 0,
        min: 0,
      },
      resetType: {
        type: String,
        enum: ['none', 'short rest', 'long rest', 'day'],
        default: 'none',
      },
    },
  }],
  feats: [{
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
    source: {
      type: String,
      trim: true,
    },
  }],

  // Combat Actions
  attacks: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    attackBonus: {
      type: Number,
      required: true,
    },
    damage: {
      dice: {
        type: String,
        required: true,
        trim: true,
      },
      bonus: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        required: true,
        trim: true,
      },
    },
    range: {
      type: String,
      trim: true,
    },
    properties: [{
      type: String,
      trim: true,
    }],
  }],

  // Equipment and Inventory
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
    weight: {
      type: Number,
      default: 0,
      min: 0,
    },
    value: {
      copper: { type: Number, default: 0, min: 0 },
      silver: { type: Number, default: 0, min: 0 },
      electrum: { type: Number, default: 0, min: 0 },
      gold: { type: Number, default: 0, min: 0 },
      platinum: { type: Number, default: 0, min: 0 },
    },
    equipped: {
      type: Boolean,
      default: false,
    },
    attuned: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['weapon', 'armor', 'shield', 'tool', 'gear', 'treasure', 'consumable', 'magic item'],
      default: 'gear',
    },
  }],
  currency: {
    copper: { type: Number, default: 0, min: 0 },
    silver: { type: Number, default: 0, min: 0 },
    electrum: { type: Number, default: 0, min: 0 },
    gold: { type: Number, default: 0, min: 0 },
    platinum: { type: Number, default: 0, min: 0 },
  },
  
  // Spellcasting
  spellcasting: {
    isSpellcaster: {
      type: Boolean,
      default: false,
    },
    spellcastingClass: {
      type: String,
      trim: true,
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
      level1: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level2: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level3: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level4: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level5: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level6: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level7: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level8: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
      level9: { 
        total: { type: Number, default: 0, min: 0 },
        used: { type: Number, default: 0, min: 0 }
      },
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
      castingTime: {
        type: String,
        trim: true,
      },
      range: {
        type: String,
        trim: true,
      },
      components: {
        verbal: { type: Boolean, default: false },
        somatic: { type: Boolean, default: false },
        material: { type: Boolean, default: false },
        materialComponent: { type: String, trim: true },
      },
      duration: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      prepared: {
        type: Boolean,
        default: false,
      },
      ritual: {
        type: Boolean,
        default: false,
      },
    }],
    cantripsKnown: {
      type: Number,
      default: 0,
      min: 0,
    },
    spellsKnown: {
      type: Number,
      default: 0,
      min: 0,
    },
    spellsPrepared: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  // Character Development & Roleplay
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
  backstory: {
    type: String,
    trim: true,
  },
  goals: [{
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: String,
      trim: true,
    },
  }],

  // Story Integration & Character Development
  characterDevelopment: {
    milestones: [{
      level: {
        type: Number,
        required: true,
        min: 1,
        max: 20,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
      },
    }],
    characterArcs: [{
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
      status: {
        type: String,
        enum: ['active', 'completed', 'paused', 'abandoned'],
        default: 'active',
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
      },
      relatedNPCs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      }],
    }],
    relationships: [{
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      characterName: {
        type: String,
        required: true,
        trim: true,
      },
      relationshipType: {
        type: String,
        enum: ['ally', 'enemy', 'neutral', 'romantic', 'family', 'mentor', 'student', 'rival'],
        default: 'neutral',
      },
      strength: {
        type: Number,
        min: -10,
        max: 10,
        default: 0,
      },
      description: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        trim: true,
      },
    }],
  },

  // Session Tracking
  sessionHistory: [{
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    characterActions: [{
      type: String,
      trim: true,
    }],
    storyMoments: [{
      type: String,
      trim: true,
    }],
    experienceGained: {
      type: Number,
      default: 0,
      min: 0,
    },
    treasureFound: [{
      name: {
        type: String,
        trim: true,
      },
      value: {
        type: String,
        trim: true,
      },
    }],
    notableQuotes: [{
      type: String,
      trim: true,
    }],
    dmNotes: {
      type: String,
      trim: true,
    },
  }],

  // AI Generation Support
  aiGenerated: {
    backstory: {
      type: Boolean,
      default: false,
    },
    personality: {
      type: Boolean,
      default: false,
    },
    goals: {
      type: Boolean,
      default: false,
    },
    generationPrompts: [{
      type: {
        type: String,
        enum: ['backstory', 'personality', 'goals', 'development'],
      },
      prompt: {
        type: String,
        trim: true,
      },
      result: {
        type: String,
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  },

  // Campaign Association
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Character Status
  isActive: {
    type: Boolean,
    default: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  retirementReason: {
    type: String,
    trim: true,
  },
  deathDetails: {
    cause: {
      type: String,
      trim: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
    canBeRevived: {
      type: Boolean,
      default: true,
    },
  },

  // Privacy and Sharing
  visibility: {
    type: String,
    enum: ['private', 'party', 'campaign', 'public'],
    default: 'party',
  },
  dmOnlyNotes: {
    type: String,
    trim: true,
  },

  // Meta Information
  notes: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Indexes for better performance
playerCharacterSchema.index({ campaignId: 1 });
playerCharacterSchema.index({ userId: 1 });
playerCharacterSchema.index({ name: 1, campaignId: 1 });
playerCharacterSchema.index({ level: 1 });
playerCharacterSchema.index({ isActive: 1, isAlive: 1 });

// Virtual for calculating modifier from ability score
playerCharacterSchema.virtual('abilityModifiers').get(function() {
  const calculateModifier = (score) => Math.floor((score - 10) / 2);
  
  return {
    strength: calculateModifier(this.abilityScores.strength),
    dexterity: calculateModifier(this.abilityScores.dexterity),
    constitution: calculateModifier(this.abilityScores.constitution),
    intelligence: calculateModifier(this.abilityScores.intelligence),
    wisdom: calculateModifier(this.abilityScores.wisdom),
    charisma: calculateModifier(this.abilityScores.charisma),
  };
});

// Virtual for total currency value in gold
playerCharacterSchema.virtual('totalGoldValue').get(function() {
  return (
    this.currency.copper * 0.01 +
    this.currency.silver * 0.1 +
    this.currency.electrum * 0.5 +
    this.currency.gold * 1 +
    this.currency.platinum * 10
  );
});

// Pre-save middleware to calculate passive scores
playerCharacterSchema.pre('save', function(next) {
  const modifiers = this.abilityModifiers;
  
  // Calculate passive perception
  let perceptionBonus = modifiers.wisdom;
  if (this.skills.perception.proficient) {
    perceptionBonus += this.proficiencyBonus;
  }
  if (this.skills.perception.expertise) {
    perceptionBonus += this.proficiencyBonus;
  }
  perceptionBonus += this.skills.perception.bonus;
  this.senses.passivePerception = 10 + perceptionBonus;
  
  // Calculate passive investigation
  let investigationBonus = modifiers.intelligence;
  if (this.skills.investigation.proficient) {
    investigationBonus += this.proficiencyBonus;
  }
  if (this.skills.investigation.expertise) {
    investigationBonus += this.proficiencyBonus;
  }
  investigationBonus += this.skills.investigation.bonus;
  this.senses.passiveInvestigation = 10 + investigationBonus;
  
  // Calculate passive insight
  let insightBonus = modifiers.wisdom;
  if (this.skills.insight.proficient) {
    insightBonus += this.proficiencyBonus;
  }
  if (this.skills.insight.expertise) {
    insightBonus += this.proficiencyBonus;
  }
  insightBonus += this.skills.insight.bonus;
  this.senses.passiveInsight = 10 + insightBonus;
  
  next();
});

// Create the PlayerCharacter model
const PlayerCharacter = mongoose.model('PlayerCharacter', playerCharacterSchema);

export default PlayerCharacter;
