const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reward_game_point = new Schema({

  from_rank: { type: String, required: true },
  to_rank: { type: String, required: true },
  points: { type: String, required: true },
});


module.exports = mongoose.model('reward_game_point', reward_game_point);

