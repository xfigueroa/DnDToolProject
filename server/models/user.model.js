import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // Basic User Information
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_-]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  displayName: {
    type: String,
    trim: true,
    maxlength: 100,
  },

  // Account Status & Verification
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    select: false,
  },
  emailVerificationExpires: {
    type: Date,
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  accountType: {
    type: String,
    enum: ['free', 'premium', 'dm-plus', 'lifetime'],
    default: 'free',
  },
  subscriptionExpires: {
    type: Date,
  },

  // Profile Information
  profile: {
    avatar: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    timezone: {
      type: String,
      default: 'UTC',
      trim: true,
    },
    preferredLanguage: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
    },
    location: {
      country: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
    },
    socialLinks: {
      discord: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      reddit: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
    },
    dateOfBirth: {
      type: Date,
    },
    pronouns: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },

  // D&D Experience & Preferences
  dndExperience: {
    yearsPlaying: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    yearsDMing: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    preferredRole: {
      type: String,
      enum: ['player', 'dm', 'both', 'new to d&d'],
      default: 'new to d&d',
    },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner',
    },
    favoriteClasses: [{
      type: String,
      trim: true,
    }],
    favoriteRaces: [{
      type: String,
      trim: true,
    }],
    preferredGameStyle: [{
      type: String,
      enum: [
        'roleplay heavy', 'combat heavy', 'exploration focused', 'puzzle solving',
        'political intrigue', 'mystery', 'horror', 'comedy', 'serious drama'
      ],
    }],
    preferredCampaignLength: {
      type: String,
      enum: ['oneshot', 'short (2-5 sessions)', 'medium (6-15 sessions)', 'long (16+ sessions)'],
      default: 'medium (6-15 sessions)',
    },
    availableDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
    preferredSessionLength: {
      type: Number, // in hours
      min: 1,
      max: 12,
      default: 4,
    },
    preferredPlayTime: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'late night', 'flexible'],
      default: 'evening',
    },
  },

  // AI & Tool Preferences
  aiPreferences: {
    useAIForNPCs: {
      type: Boolean,
      default: true,
    },
    useAIForStoryGeneration: {
      type: Boolean,
      default: true,
    },
    useAIForCharacterDevelopment: {
      type: Boolean,
      default: true,
    },
    aiComplexityPreference: {
      type: String,
      enum: ['simple', 'moderate', 'complex', 'very complex'],
      default: 'moderate',
    },
    aiStoryStyle: {
      type: String,
      enum: [
        'classic heroic', 'dark and gritty', 'comedic', 'political intrigue',
        'mystery focused', 'exploration heavy', 'combat heavy', 'roleplay heavy'
      ],
      default: 'classic heroic',
    },
    autoGenerateContent: {
      npcs: { type: Boolean, default: false },
      plotHooks: { type: Boolean, default: false },
      locations: { type: Boolean, default: false },
      encounters: { type: Boolean, default: false },
    },
    contentFilters: {
      violence: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'graphic'],
        default: 'moderate',
      },
      language: {
        type: String,
        enum: ['none', 'mild', 'moderate', 'strong'],
        default: 'mild',
      },
      mature: {
        type: String,
        enum: ['none', 'suggestive', 'mature', 'explicit'],
        default: 'none',
      },
    },
  },

  // Platform & Interface Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto',
    },
    colorScheme: {
      type: String,
      enum: ['blue', 'green', 'purple', 'red', 'orange', 'custom'],
      default: 'blue',
    },
    fontSize: {
      type: String,
      enum: ['small', 'medium', 'large', 'extra-large'],
      default: 'medium',
    },
    compactMode: {
      type: Boolean,
      default: false,
    },
    showTutorials: {
      type: Boolean,
      default: true,
    },
    notifications: {
      email: {
        sessionReminders: { type: Boolean, default: true },
        campaignUpdates: { type: Boolean, default: true },
        friendRequests: { type: Boolean, default: true },
        systemUpdates: { type: Boolean, default: false },
        newsletter: { type: Boolean, default: false },
      },
      inApp: {
        sessionReminders: { type: Boolean, default: true },
        campaignUpdates: { type: Boolean, default: true },
        friendRequests: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
      },
      push: {
        enabled: { type: Boolean, default: false },
        sessionReminders: { type: Boolean, default: false },
        urgentUpdates: { type: Boolean, default: false },
      },
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'friends',
      },
      showRealName: {
        type: Boolean,
        default: false,
      },
      showLocation: {
        type: Boolean,
        default: false,
      },
      allowFriendRequests: {
        type: Boolean,
        default: true,
      },
      allowCampaignInvites: {
        type: Boolean,
        default: true,
      },
      showOnlineStatus: {
        type: Boolean,
        default: true,
      },
    },
  },

  // Campaign & Character Management
  campaigns: {
    asDM: [{
      campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
      },
      joinDate: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    }],
    asPlayer: [{
      campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
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
    }],
  },
  characters: [{
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerCharacter',
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  }],

  // Social Features
  friends: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'blocked'],
      default: 'pending',
    },
    friendSince: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  }],
  friendRequests: {
    sent: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sentDate: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
        trim: true,
        maxlength: 200,
      },
    }],
    received: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receivedDate: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
        trim: true,
        maxlength: 200,
      },
    }],
  },

  // Achievement & Statistics System
  achievements: [{
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['dm', 'player', 'social', 'character', 'campaign', 'milestone'],
      required: true,
    },
    earnedDate: {
      type: Date,
      default: Date.now,
    },
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
      default: 'common',
    },
  }],
  statistics: {
    // DM Statistics
    dm: {
      campaignsCreated: { type: Number, default: 0 },
      campaignsCompleted: { type: Number, default: 0 },
      totalSessionsRun: { type: Number, default: 0 },
      totalPlayersManaged: { type: Number, default: 0 },
      npcsCreated: { type: Number, default: 0 },
      averageSessionRating: { type: Number, min: 1, max: 5 },
      favoriteAIGenerations: { type: Number, default: 0 },
    },
    // Player Statistics
    player: {
      campaignsJoined: { type: Number, default: 0 },
      campaignsCompleted: { type: Number, default: 0 },
      charactersCreated: { type: Number, default: 0 },
      charactersRetired: { type: Number, default: 0 },
      totalSessionsPlayed: { type: Number, default: 0 },
      totalExperienceEarned: { type: Number, default: 0 },
      averageCharacterLevel: { type: Number, default: 1 },
      favoriteClass: { type: String, trim: true },
      favoriteRace: { type: String, trim: true },
    },
    // Social Statistics
    social: {
      friendsCount: { type: Number, default: 0 },
      campaignInvitesSent: { type: Number, default: 0 },
      campaignInvitesReceived: { type: Number, default: 0 },
      helpfulReviews: { type: Number, default: 0 },
    },
    // Platform Usage
    usage: {
      accountCreatedDate: {
        type: Date,
        default: Date.now,
      },
      lastLoginDate: {
        type: Date,
        default: Date.now,
      },
      totalLoginDays: { type: Number, default: 1 },
      totalTimeSpent: { type: Number, default: 0 }, // in minutes
      featuresUsed: [{
        feature: { type: String, required: true },
        firstUsed: { type: Date, default: Date.now },
        timesUsed: { type: Number, default: 1 },
      }],
    },
  },

  // Content Creation & Sharing
  createdContent: {
    npcs: [{
      npcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPC',
      },
      isPublic: { type: Boolean, default: false },
      rating: { type: Number, min: 1, max: 5 },
      downloads: { type: Number, default: 0 },
    }],
    campaigns: [{
      campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
      },
      isTemplate: { type: Boolean, default: false },
      isPublic: { type: Boolean, default: false },
      rating: { type: Number, min: 1, max: 5 },
      downloads: { type: Number, default: 0 },
    }],
    homebrew: [{
      type: {
        type: String,
        enum: ['race', 'class', 'spell', 'item', 'monster'],
        required: true,
      },
      name: { type: String, required: true },
      description: { type: String, required: true },
      isPublic: { type: Boolean, default: false },
      rating: { type: Number, min: 1, max: 5 },
      downloads: { type: Number, default: 0 },
      createdDate: { type: Date, default: Date.now },
    }],
  },

  // Security & Password Reset
  security: {
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lockUntil: {
      type: Date,
      select: false,
    },
    twoFactorAuth: {
      enabled: { type: Boolean, default: false },
      secret: { type: String, select: false },
      backupCodes: [{ type: String, select: false }],
    },
    activeSessions: [{
      token: { type: String, required: true, select: false },
      device: { type: String, trim: true },
      ip: { type: String, trim: true },
      userAgent: { type: String, trim: true },
      lastActive: { type: Date, default: Date.now },
      location: {
        country: { type: String, trim: true },
        city: { type: String, trim: true },
      },
    }],
  },

  // Beta Features & Testing
  betaFeatures: {
    enabledFeatures: [{
      type: String,
      trim: true,
    }],
    feedbackProvided: [{
      feature: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5 },
      feedback: { type: String, trim: true },
      date: { type: Date, default: Date.now },
    }],
  },

  // Terms & Legal
  legal: {
    termsAcceptedVersion: {
      type: String,
      required: true,
      default: '1.0',
    },
    termsAcceptedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    privacyPolicyAcceptedVersion: {
      type: String,
      required: true,
      default: '1.0',
    },
    privacyPolicyAcceptedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    marketingOptIn: {
      type: Boolean,
      default: false,
    },
    dataProcessingConsent: {
      type: Boolean,
      default: true,
    },
  },

}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Indexes for better performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'profile.displayName': 1 });
userSchema.index({ 'campaigns.asDM.campaignId': 1 });
userSchema.index({ 'campaigns.asPlayer.campaignId': 1 });
userSchema.index({ 'characters.campaignId': 1 });
userSchema.index({ 'friends.userId': 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ accountType: 1 });
userSchema.index({ 'statistics.usage.lastLoginDate': 1 });

// Compound indexes
userSchema.index({ username: 1, isActive: 1 });
userSchema.index({ email: 1, isEmailVerified: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for display name or username
userSchema.virtual('displayNameOrUsername').get(function() {
  return this.profile.displayName || this.username;
});

// Virtual for account age in days
userSchema.virtual('accountAge').get(function() {
  const now = new Date();
  const created = this.statistics.usage.accountCreatedDate;
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
});

// Virtual for total campaigns (as DM + as Player)
userSchema.virtual('totalCampaigns').get(function() {
  const dmCampaigns = this.campaigns.asDM.filter(c => c.isActive).length;
  const playerCampaigns = this.campaigns.asPlayer.filter(c => c.isActive).length;
  return dmCampaigns + playerCampaigns;
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.filter(f => f.status === 'accepted').length;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();
  
  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre-save middleware to update password changed timestamp
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  
  this.security.passwordChangedAt = Date.now() - 1000;
  next();
});

// Pre-save middleware to update statistics
userSchema.pre('save', function(next) {
  // Update friend count
  this.statistics.social.friendsCount = this.friendCount;
  
  // Update display name if not set
  if (!this.profile.displayName) {
    this.profile.displayName = this.username;
  }
  
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password changed after JWT was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.security.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.security.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  
  return false;
};

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  const payload = {
    id: this._id,
    username: this.username,
    accountType: this.accountType,
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Instance method to check account lock
userSchema.methods.isLocked = function() {
  return !!(this.security.lockUntil && this.security.lockUntil > Date.now());
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.security.lockUntil && this.security.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { 'security.lockUntil': 1 },
      $set: { 'security.loginAttempts': 1 }
    });
  }
  
  const updates = { $inc: { 'security.loginAttempts': 1 } };
  
  // If we have max attempts and no lock, lock account
  if (this.security.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { 'security.lockUntil': Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      'security.loginAttempts': 1,
      'security.lockUntil': 1
    }
  });
};

// Instance method to add friend
userSchema.methods.addFriend = function(userId, message) {
  // Check if already friends or request exists
  const existingFriend = this.friends.find(f => f.userId.toString() === userId.toString());
  const existingRequest = this.friendRequests.sent.find(r => r.userId.toString() === userId.toString());
  
  if (existingFriend || existingRequest) {
    return false; // Already friends or request sent
  }
  
  this.friendRequests.sent.push({
    userId: userId,
    message: message,
  });
  
  return this.save();
};

// Instance method to accept friend request
userSchema.methods.acceptFriendRequest = function(userId) {
  // Remove from received requests
  this.friendRequests.received = this.friendRequests.received.filter(
    r => r.userId.toString() !== userId.toString()
  );
  
  // Add to friends
  this.friends.push({
    userId: userId,
    status: 'accepted',
  });
  
  return this.save();
};

// Instance method to join campaign
userSchema.methods.joinCampaign = function(campaignId, role = 'player') {
  if (role === 'dm') {
    this.campaigns.asDM.push({
      campaignId: campaignId,
    });
  } else {
    this.campaigns.asPlayer.push({
      campaignId: campaignId,
      role: role,
    });
  }
  
  this.statistics.player.campaignsJoined += 1;
  return this.save();
};

// Instance method to add character
userSchema.methods.addCharacter = function(characterId, campaignId) {
  this.characters.push({
    characterId: characterId,
    campaignId: campaignId,
  });
  
  this.statistics.player.charactersCreated += 1;
  return this.save();
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  const lastLogin = this.statistics.usage.lastLoginDate;
  const now = new Date();
  
  // If last login was on a different day, increment total login days
  if (!lastLogin || lastLogin.toDateString() !== now.toDateString()) {
    this.statistics.usage.totalLoginDays += 1;
  }
  
  this.statistics.usage.lastLoginDate = now;
  return this.save();
};

// Instance method to track feature usage
userSchema.methods.trackFeatureUsage = function(featureName) {
  const existingFeature = this.statistics.usage.featuresUsed.find(
    f => f.feature === featureName
  );
  
  if (existingFeature) {
    existingFeature.timesUsed += 1;
  } else {
    this.statistics.usage.featuresUsed.push({
      feature: featureName,
      timesUsed: 1,
    });
  }
  
  return this.save();
};

// Instance method to add achievement
userSchema.methods.addAchievement = function(achievementData) {
  // Check if achievement already exists
  const existing = this.achievements.find(a => a.id === achievementData.id);
  if (existing) return false;
  
  this.achievements.push(achievementData);
  return this.save();
};

// Instance method to get user summary
userSchema.methods.getUserSummary = function() {
  return {
    basicInfo: {
      id: this._id,
      username: this.username,
      displayName: this.displayNameOrUsername,
      accountType: this.accountType,
      accountAge: this.accountAge,
    },
    dndInfo: {
      preferredRole: this.dndExperience.preferredRole,
      experienceLevel: this.dndExperience.experienceLevel,
      yearsPlaying: this.dndExperience.yearsPlaying,
      yearsDMing: this.dndExperience.yearsDMing,
    },
    activity: {
      totalCampaigns: this.totalCampaigns,
      friendCount: this.friendCount,
      lastLogin: this.statistics.usage.lastLoginDate,
      achievementCount: this.achievements.length,
    },
    preferences: {
      theme: this.preferences.theme,
      aiEnabled: this.aiPreferences.useAIForStoryGeneration,
      profileVisibility: this.preferences.privacy.profileVisibility,
    },
  };
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
