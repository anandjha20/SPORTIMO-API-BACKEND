let  express_2 = require('express');
let mongoose = require('mongoose');


  

const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds,matchWinUsersRank,matchWinUsersRank_one,
			AllMatchWinUsersRank,AllMatchWinUsersRank_one } = require('../myModel/helper_fun');

const  {MyBasePath} = require("../myModel/image_helper");
 

// all mongodb schema    
const user_tbl = require('../models/user');    
const geq_tbl= require('../models/geq_tbl');
const poll_tbl = require('../models/poll');    
const user_complaint_tbl = require('../models/user_complaint');    
    

class dashboardController { 
    
    static dashboard_count = async (req,res)=>{
        try {
            let total_user = await user_tbl.find().countDocuments();
            let total_geq = await geq_tbl.find().countDocuments();
            let total_polls = await poll_tbl.find().countDocuments();
            let total_complaints = await user_complaint_tbl.find().countDocuments();
             return  res.status(200).send({'status':true,'msg':"success",'body':{total_user,total_geq,total_polls,total_complaints}});
          } catch (error) {
            return  res.status(200).send({'status':false,'msg':"server error",'body':''});
          }
  
  
      }


}

module.exports = dashboardController ;      