import express from 'express';
import authMiddleware from '../middleware/auth.mjs';
import Game from '../models/gameSchema.mjs';

const router = express.Router();

router.post ('/',authMiddleware.auth,authMiddleware.adminAuth, async (req,res) => {
    const newGame = await Game.insertOne(req.body);
    res.json(newGame);
});



export default router;