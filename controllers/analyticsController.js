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
const user_reportings_tbl = require('../models/user_reportings');    
const user_chat_blocks_tbl = require("../models/user_chat_blocks");
const block_user_tbl = require("../models/block_user");
const user_complaint_tbl = require('../models/user_complaint');    
const geq_answers= require('../models/geq_answers');
const transactions_tbl = require('../models/transactions');

class analyticsController { 
 
  static all_user_analytics = async (req,res)=>{
    try {
        let country=req.body.country;
        let s_date=req.body.s_date;
        let e_date=req.body.e_date;
        let whr={};
        let log_date={};
        if(!isEmpty(s_date)&&!isEmpty(e_date)){whr={...whr,date:{$gte:s_date,$lte:e_date}};log_date={...log_date,date:{$gte:s_date,$lte:e_date}};}else
        if(!isEmpty(s_date)){whr={...whr,date:{$gte:s_date}};log_date={...log_date,date:{$gte:s_date}};}else
        if(!isEmpty(e_date)){whr={...whr,date:{$lte:e_date}};log_date={...log_date,date:{$lte:e_date}};}
        
        let pipeline=[{$match:log_date},
          {$lookup:{foreignField:"_id",localField:"user_id",from:"user_tbls",as:"user"}},
          {$unwind:"$user"},
          ]
        if(!isEmpty(country)){whr={...whr,country};pipeline.push({$match:{"user.country":country}})};
        
        
        let total_user = await user_tbl.find(whr).countDocuments();
        let total_registered_user = await user_tbl.find({user_type:[1,2,3,4],...whr}).countDocuments();
        let total_unregistered_user = await user_tbl.find({user_type:5,...whr}).countDocuments();
        let mobile_user = await user_tbl.find({user_type:1,...whr}).countDocuments();
        let email_user = await user_tbl.find({user_type:2,...whr}).countDocuments();
        let google_user = await user_tbl.find({user_type:3,...whr}).countDocuments();
        let apple_user = await user_tbl.find({user_type:4,...whr}).countDocuments();
        let guest_user = await user_tbl.find({user_type:5,...whr}).countDocuments();
        let english_language_user = await user_tbl.find({user_language:'English',...whr}).countDocuments();
        let arabic_language_user = await user_tbl.find({user_language:'Arabic',...whr}).countDocuments();
        let total_login = await logins.aggregate(pipeline);
            
        
        let analytics={
          total_user:total_user,
          total_registered_user:total_registered_user,
          total_unregistered_user:total_unregistered_user,
          mobile_user:mobile_user,
          email_user:email_user,
          google_user:google_user,
          apple_user:apple_user,
          guest_user:guest_user,
          english_language_user:english_language_user,
          arabic_language_user:arabic_language_user,
          total_login:total_login.length
        };
        return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
      } catch (error) {console.log(error)
        return  res.status(200).send({'status':false,'msg':"server error",'body':''});
      }


      }

   static user_profile_analytics = async (req,res)=>{
        try {
            let total_reporting_user = await user_reportings_tbl.distinct("reporting_user_id");
            let total_chat_block = await user_chat_blocks_tbl.distinct("user_id");
            let total_block_user = await block_user_tbl.find().countDocuments();
                
            
            let analytics={
              total_reporting_user:total_reporting_user.length,
              total_chat_block:total_chat_block.length,
              total_block_user:total_block_user
            };
            return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
          } catch (error) {
            console.log(error)
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

  static support_analytics = async (req,res)=>{
    try {
          
          let total_tickets = await user_complaint_tbl.find().countDocuments();
          let total_active_tickets = await user_complaint_tbl.find({admin_status:0}).countDocuments();
          let total_resolved_tickets = await user_complaint_tbl.find({admin_status:1}).countDocuments();
          
          let analytics={
            total_tickets,
            total_active_tickets,
            total_resolved_tickets
          };
        return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
      } catch (error) {
        console.log(error)
        return  res.status(200).send({'status':false,'msg':"server error",'body':''});
      }


    }
    static geq_analytics = async (req,res)=>{
      try {
            let geq_id=req.body.geq_id;
  
            let whr={};
            if(!isEmpty(geq_id)){whr={...whr,geq_id}}
  
            let total_player_answered_qeq = await geq_answers.find(whr).countDocuments();
            let total_player_gain_qeq_points = await transactions_tbl.find({points_by:"geq",...whr}).countDocuments();
            
            let analytics={
              total_player_answered_qeq,
              total_player_gain_qeq_points
            };
          return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
        } catch (error) {
          console.log(error)
          return  res.status(200).send({'status':false,'msg':"server error",'body':''});
        }
  
  
    }


}

module.exports = analyticsController ;      