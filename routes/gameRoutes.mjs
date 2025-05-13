import express from 'express';
import authMiddleware from '../middleware/auth.mjs';
import Game from '../models/gameSchema.mjs';

const router = express.Router();

router.post ('/',authMiddleware.auth,authMiddleware.adminAuth, async (req,res) => {
    const newGame = await Game.insertOne(req.body);
    res.status(201).json(newGame);
});

router.get ('/', async (req,res)=>{
    const allGames = await Game.find({});
    res.json(allGames);
});

router.put ('/:id', authMiddleware.auth,authMiddleware.adminAuth, async (req,res) => {
    let updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedGame);
});

router.delete ('/:id', authMiddleware.auth,authMiddleware.adminAuth, async (req,res) => {
    let deletedGame = await Game.findByIdAndDelete(req.params.id, req.body, {new: true});
    res.json(deletedGame);
});


export default router;