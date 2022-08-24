const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const tips_tricks = new Schema({
         tips_trick: { type: String, required: true },
         active_status: { type: Boolean , default : 1 },
});


module.exports = mongoose.model('tips_trick', tips_tricks);



//`admin_tbl`(`admin_id`, `name`, `email`, `pass`, `token`, `image`, `address`, `mobile`, `dob`, `gender`, `user_type`, `modules`, `date`, `active_status`






