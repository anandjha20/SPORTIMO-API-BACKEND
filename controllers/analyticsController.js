let  express_2 = require('express');
let mongoose = require('mongoose');


  

const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds,matchWinUsersRank,matchWinUsersRank_one,
			AllMatchWinUsersRank,AllMatchWinUsersRank_one } = require('../myModel/helper_fun');

const  {MyBasePath} = require("../myModel/image_helper");
 

// all mongodb schema    
const user_tbl = require('../models/user');    
const logins= require('../models/logins');
const poll_result = require('../models/poll_result');    
const poll_skips = require('../models/poll_skips');    
    

class analyticsController { 
    
    static all_user_analytics = async (req,res)=>{
        try {
            let country=req.body.country;
            let s_date=req.body.s_date;
            let e_date=req.body.e_date;
            let log_s_date=req.body.log_s_date;
            let log_e_date=req.body.log_e_date;
            let regitser_user_condition={};
            if(!isEmpty(country)){regitser_user_condition={...regitser_user_condition,country}};
            if(!isEmpty(s_date)&&!isEmpty(e_date)){regitser_user_condition={...regitser_user_condition,date:{$gte:s_date,$lte:e_date}}}else
            if(!isEmpty(s_date)){regitser_user_condition={...regitser_user_condition,date:{$gte:s_date}}}else
            if(!isEmpty(e_date)){regitser_user_condition={...regitser_user_condition,date:{$lte:e_date}}}
            
            let log_condition={};
            if(!isEmpty(log_s_date)&&!isEmpty(log_e_date)){log_condition={...log_condition,date:{$gte:log_s_date,$lte:log_e_date}}}else
            if(!isEmpty(log_s_date)){log_condition={...log_condition,date:{$gte:log_s_date}}}else
            if(!isEmpty(log_e_date)){log_condition={...log_condition,date:{$lte:log_e_date}}}
        
            let total_user = await user_tbl.find(regitser_user_condition).countDocuments();
            let total_registered_user = await user_tbl.find({user_type:[1,2,3,4]}).countDocuments();
            let total_unregistered_user = await user_tbl.find({user_type:5}).countDocuments();
            let mobile_user = await user_tbl.find({user_type:1}).countDocuments();
            let email_user = await user_tbl.find({user_type:2}).countDocuments();
            let google_user = await user_tbl.find({user_type:3}).countDocuments();
            let apple_user = await user_tbl.find({user_type:4}).countDocuments();
            let guest_user = await user_tbl.find({user_type:5}).countDocuments();
            let english_language_user = await user_tbl.find({user_language:'English'}).countDocuments();
            let arabic_language_user = await user_tbl.find({user_language:'Arabic'}).countDocuments();
            let total_login = await logins.find(log_condition).countDocuments();
                
            
            let analytics={
              total_user,
              total_registered_user,
              total_unregistered_user,
              mobile_user,
              email_user,
              google_user,
              apple_user,
              guest_user,
              english_language_user,
              arabic_language_user,
              total_login
            };
            return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
          } catch (error) {
            return  res.status(200).send({'status':false,'msg':"server error",'body':''});
          }
  
  
      }

  static polls_analytics = async (req,res)=>{
    try {
            let total_user_participated_in_polls = await (await poll_result.distinct("user_id")).length;
            let total_user_skipped_in_polls = await (await poll_skips.distinct("user_id")).length;
            let total_user_participated_in_public_polls = await poll_result.find({poll_type:'Public Poll'}).countDocuments();
            let total_user_participated_in_private_polls = await poll_result.find({poll_type:'Private Poll'}).countDocuments();
            let total_user_participated_in_paid_polls = await poll_result.find({fee_type:'Paid'}).countDocuments();
            
        console.log(total_user_skipped_in_polls)
        let analytics={
          total_user_participated_in_polls,
          total_user_skipped_in_polls,
          total_user_participated_in_public_polls,
          total_user_participated_in_private_polls,
          total_user_participated_in_paid_polls
        };
        return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
      } catch (error) {
        console.log(error)
        return  res.status(200).send({'status':false,'msg':"server error",'body':''});
      }


  }


}

module.exports = analyticsController ;      