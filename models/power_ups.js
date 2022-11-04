const mongoose = require("mongoose");

const schema = mongoose.Schema;

const powerUpSchema = new schema({
        power_up_name : {type :String, trim: true},
        power_up_type : {type:String, required: true, trim: true},
        powerup_value : {type:Number, default :0},
        power_up_dis : {type :String, default :''},
});


module.exports = mongoose.model('power_ups', powerUpSchema);