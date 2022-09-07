const  mongoose = require("mongoose");

const Schema = mongoose.Schema;

let IntroSliderSchema = new Schema({
        title : {type:String,trim:true,default:''},
        image : {type:String,trim:true,default:''},
        description : {type:String,trim:true,default:''},
        from_date: { type: Date, required: true },
        to_date: { type: Date, required: true }
});

module.exports = mongoose.model("introSliders",IntroSliderSchema);