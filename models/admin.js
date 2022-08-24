const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminschema = new Schema({
                             
         name: { type: String, required: true },
         doc_type: { type: String },
         email: { type: String },
         pass: { type: String, required: true },
         token: { type: String, required: true },
         image: { type: String },
         address: { type: String, required: true },
         mobile: { type: Number, required: true },
         gender: { type: String ,enum: ['Male', 'Female','Other'], default: 'Male' },
         user_type: { type: String,  enum: ['Admin'], default: 'Admin' },
         image: { type: String },
     
         date: { type: String },
         active_status: { type: Boolean , default : 0 },

});


module.exports = mongoose.model('admin_tbl', adminschema);



//`admin_tbl`(`admin_id`, `name`, `email`, `pass`, `token`, `image`, `address`, `mobile`, `dob`, `gender`, `user_type`, `modules`, `date`, `active_status`






