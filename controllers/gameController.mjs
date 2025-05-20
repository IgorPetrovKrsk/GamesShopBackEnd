import Game from '../models/gameSchema.mjs';
import gamesSeedData from '../utilities/gamesSeedData.mjs'

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

async function seedGame (req, res) {
  await Game.deleteMany({}); //Delete all data
  await Game.create(gamesSeedData); //reseed all data
  res.send('seeded data');
};


export default {createGame,getAllGames,putGame,deleteGame,seedGame};