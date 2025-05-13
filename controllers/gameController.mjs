import Game from '../models/gameSchema.mjs';

async function createGame (req,res) {
    const newGame = await Game.insertOne(req.body);
    res.status(201).json(newGame);
};

async function getAllGames (req,res){
    const allGames = await Game.find({});
    res.json(allGames);
}

async function putGame(req,res) {
    let updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedGame);
}

async function deleteGame(req,res) {
    let deletedGame = await Game.findByIdAndDelete(req.params.id, req.body, {new: true});
    res.json(deletedGame);
}


export default {createGame,getAllGames,putGame,deleteGame};