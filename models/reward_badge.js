const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reward_badge = new Schema({

  from_rank: { type: String, required: true },
  to_rank: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});


module.exports = mongoose.model('reward_badge', reward_badge);

