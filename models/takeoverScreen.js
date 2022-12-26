const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const takeoverScreen = new Schema({
        status:{ type: Boolean, default:1 },//1 for active
        image:{ type: String, required: true },
        view_type:{ type: String,  enum: ['banner', 'video',], default :'banner' },
        skip:{ type: Boolean, default:1 },
        skip_time:{ type: Number, default:5 },
        date:{ type: Date, default:Date().now }
    });        


module.exports = mongoose.model('takeoverScreen', takeoverScreen);

