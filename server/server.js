import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import npcGeneratorRoutes from './routes/npcgenerator.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import { performAutomaticCleanup } from './controllers/npcgenerator.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/npc-generator', npcGeneratorRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(process.env.PORT || 3000, () => {
    connectDB();
    console.log(`Server started at http://localhost:${process.env.PORT || 3000}`);
    
    // Schedule automatic cleanup every 24 hours
    setInterval(async () => {
        console.log('Running automatic NPC cleanup...');
        await performAutomaticCleanup();
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    
    console.log('Automatic NPC cleanup scheduled to run every 24 hours');
});