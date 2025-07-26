import express from 'express';
import {
  getAllUsers,
  getUserById,
  createAdminUser,
  updateUserRole,
  toggleUserStatus,
  getSystemStats,
  deleteUser
} from '../controllers/admin.controller.js';
import {
  cleanupExpiredNPCs,
  performAutomaticCleanup
} from '../controllers/npcgenerator.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Apply admin authentication to all routes
router.use(adminAuth);

// System statistics
router.get('/stats', getSystemStats);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/admin', createAdminUser);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.delete('/users/:id', deleteUser);

// NPC management routes (admin cleanup)
router.post('/npcs/cleanup', cleanupExpiredNPCs);
router.post('/npcs/auto-cleanup', performAutomaticCleanup);

export default router;
