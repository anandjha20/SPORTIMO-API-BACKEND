const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const loginSponsorship = new Schema({
        status:{ type: Boolean, default:1 },//1 for active
        image:{ type: String, required: true },
        date:{ type: Date, default:Date().now }
    });        


module.exports = mongoose.model('loginSponsorship', loginSponsorship);

