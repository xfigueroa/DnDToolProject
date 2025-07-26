import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dndtool');
    console.log('Connected to MongoDB');

    // Check if any admin users exist
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log('No new admin user created.');
      await mongoose.disconnect();
      return;
    }

    // Prompt for admin details (you can modify these or make them interactive)
    const adminData = {
      username: 'admin',
      email: 'admin@dndtool.com',
      password: 'AdminPassword123!', // Change this to a secure password
      profile: {
        firstName: 'System',
        lastName: 'Administrator'
      }
    };

    console.log('\nCreating initial admin user...');
    console.log(`Username: ${adminData.username}`);
    console.log(`Email: ${adminData.email}`);
    console.log('⚠️  Please change the default password after first login!');

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Create the admin user
    const adminUser = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: 'admin',
      profile: adminData.profile,
      isActive: true,
      isEmailVerified: true
    });

    await adminUser.save();

    console.log('\n✅ Initial admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log(`Username: ${adminData.username}`);
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('\n🔐 IMPORTANT: Change this password immediately after first login!');
    console.log('\nAdmin panel routes will be available at:');
    console.log('- GET  /api/admin/stats          - System statistics');
    console.log('- GET  /api/admin/users          - List all users');
    console.log('- POST /api/admin/users/admin    - Create new admin');
    console.log('- PUT  /api/admin/users/:id/role - Update user role');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    
    if (error.code === 11000) {
      console.log('\n❌ Username or email already exists. Please modify the adminData in createAdmin.js');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

// Interactive version (uncomment if you want to make it interactive)
/*
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const createInteractiveAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dndtool');
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Exiting...');
      await mongoose.disconnect();
      rl.close();
      return;
    }

    console.log('\n=== Create Initial Admin User ===');
    
    const username = await askQuestion('Enter admin username: ');
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password: ');
    const firstName = await askQuestion('Enter first name (optional): ');
    const lastName = await askQuestion('Enter last name (optional): ');

    // Rest of the creation logic...
    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
};
*/

// Run the script
createInitialAdmin();
