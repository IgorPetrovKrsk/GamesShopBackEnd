import express from 'express';
import authMiddleware from '../middleware/auth.mjs';
import Game from '../models/gameSchema.mjs';
import gameController from '../controllers/gameController.mjs';

const router = express.Router();

router.post ('/',authMiddleware.auth,authMiddleware.adminAuth, gameController.createGame);

router.get ('/', gameController.getAllGames);

router.put ('/:id', authMiddleware.auth,authMiddleware.adminAuth, gameController.putGame);

router.delete ('/:id', authMiddleware.auth,authMiddleware.adminAuth, gameController.deleteGame);

router.post('/seed', authMiddleware.auth,authMiddleware.adminAuth, gameController.seedGame);

export default router;