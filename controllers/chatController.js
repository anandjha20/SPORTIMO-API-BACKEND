const express = require( 'express');
let mongoose = require('mongoose');

const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty,user_logs_add,FulldateTime } = require('../myModel/common_modal');
const { autoincremental } = require('../myModel/helper_fun');  

  
  
  // all mongodb schema    
    const user_tbl = require('../models/user');    
    const chat_groups_tbl = require('../models/chat_groups');    
    const group_participant_tbl = require('../models/group_participant');    
    const user_chat_blocks_tbl = require("../models/user_chat_blocks");

  

class chatController {

static chat_group_add = async(req,res)=>{
    try {
            let group_name = req.body.group_name ;
            let type = req.body.group_type ;

        if(isEmpty(group_name) || isEmpty(type) ){
           return res.status(200).send({status:false,"msg":"All Field Required"});
        }

      let getRow =  await chat_groups_tbl.findOne({group_name});

     if(! isEmpty(getRow)){
        return res.status(200).send({status:true,"msg":"This group already exists","body":getRow});
     }else{     
    let add = new chat_groups_tbl({ group_name,type})
          add.save((err, data)=>{
            if(err){console.log(err);  return res.status(200).send({status:false,"msg":"something went wrong please try again"}); 
               }else{
                         return res.status(200).send({"status":true,"msg":"group add Successfully","body":data});
               }
          });   }
        } catch (error) { console.log(error); 
            return res.status(200).send({status:false,"msg":"Server error"});
        }
 
}



static group_participant_add = async(req,res)=>{
    try {
            let group_id = req.body.group_id ;
            let user_id = req.body.user_id ;
            let dateTime = FulldateTime();
        if(isEmpty(group_id) || isEmpty(user_id) ){
           return res.status(200).send({status:false,"msg":"All Field Required"});
        }
    let add = new group_participant_tbl({ group_id,user_id,dateTime});
          add.save((err, data)=>{
            if(err){console.log(err);  return res.status(200).send({status:false,"msg":"something went wrong please try again"}); 
               }else{  return res.status(200).send({"status":true,"msg":"group participant add Successfully","body":data});
                   }
          });
        } catch (error) { console.log(error); 
            return res.status(200).send({status:false,"msg":"Server error"});
        }
    
}

 
static chat_group_list = async (req,res)=>{
    try {
            let id = req.params.id;
            let whr = isEmpty(id)? {} : {_id:id} ;
            let sendData =  await chat_groups_tbl.find(whr);
              console.log("adminget content call == ",sendData ); 
            if(sendData.length >0){
                return res.status(200).send({status:true ,msg:"success",body:sendData});
            }else{
                return res.status(200).send({status:false ,msg:"No Data FOund!.. "});
            }
    } catch (error) {  console.log(error); 
        return res.status(200).send({status:false,msg: "No Data FOund!.. "});
    }
  }  
                       
static group_participant_list = async (req,res)=>{
    try {
            let id = req.params.id;
            let whr = isEmpty(id)? {} : {_id:id} ;
            ///let sendData =  await group_participant_tbl.find(whr);

    let sendData = await group_participant_tbl.find(whr).populate([{path: 'group_id' ,"select":'group_name'},{path: 'user_id' ,"select":'name'}]).select({'_id':1,'group_id':1,'user_id':1,'dateTime': 1}).exec();
                     
            
            console.log("adminget content call == ",sendData ); 
            if(sendData.length >0){
                return res.status(200).send({status:true ,msg:"success",body:sendData});
            }else{
                return res.status(200).send({status:false ,msg:"No Data FOund!.. "});
            }
    } catch (error) {  console.log(error); 
        return res.status(200).send({status:false,msg: "No Data FOund!.. "});
    }
  
  
  }  
  static adminUserChatBlock = async (req,res)=>{
    try {
           let user_id = req.body.user_id;
           let block_status = req.body.block_status;
           if(isEmpty(user_id)){
               return res.status(200).send({"status":false,"msg":"User ID Required" ,"body":''});
           }
           block_status = (block_status == 1)? 1:0;
           let msg_msg = (block_status == 1)? "User chat blocked successfully" : "User chat unblock successfully" ; 
           if(block_status){
           let addData = new user_chat_blocks_tbl({ user_id,block_status,block_type: "admin"});
           let response = await addData.save();
           if(response){ 
               
             let dds =   user_tbl.findByIdAndUpdate({ _id:user_id} ,{$set: {chatBlockStatus:block_status }},{new: true},
                                    (err,updatedUser)=>{ if(err) {  console.log(err); } });
               }

           return res.status(200).send({"status":true,"msg": msg_msg ,"body":response});
         }else{
           let response = await user_chat_blocks_tbl.findOneAndDelete({user_id});
           if(response){ 
               
             let dds =   user_tbl.findByIdAndUpdate({ _id:user_id} ,{$set: {chatBlockStatus:block_status }},{new: true},
                                    (err,updatedUser)=>{ if(err) {  console.log(err); } });
               }
               return res.status(200).send({"status":true,"msg": msg_msg ,"body":response});
         }
         } catch (error) { console.log(error); 
               return res.status(200).send({"status":false,"msg":"server error" ,"body":''});
           }
   }

 static user_chatBlock_chacked = async(req,res)=>{
    try {
             let user_id = req.params.id ; 
            if(isEmpty(user_id)){
                return res.status(200).send({"status":false,"msg":"User ID Required"});   
              }

            let userData = await user_tbl.find({"_id":user_id}); 
                  
               if(userData){ 
                    
                  if(userData[0].chatBlockStatus){
                       let adminBlockData = await user_chat_blocks_tbl.find({"user_id":user_id, block_status :true}).sort({_id:-1}).limit(1);      
                    
                       if(adminBlockData.length >0 ){
                               //   "block_type":"admin",
                            if(adminBlockData[0].block_type == "admin"){
                                return res.status(200).send({"status":true,"msg":"This User blocked by admin"}); 
                             }else{
                                   let blockTime    = new Date(adminBlockData[0].date); 
                                   let blockSeconds = blockTime.getTime() / 1000; 
                                           blockSeconds = blockSeconds + 86400; 
                                    var curSeconds = new Date().getTime() / 1000; 
                                
                                 console.log("block Seconds",blockSeconds);console.log("cur Seconds",curSeconds);
                                 if(blockSeconds>curSeconds) {
                                          return res.status(200).send({"status":true,"msg":"This User blocked by User"}); 
                                    }else{ return res.status(200).send({"status":false,"msg":"This User Not blocked"});   }
                                    
                             }  

            
                            
                       }else{
                             return res.status(200).send({"status":false,"msg":"This User Not blocked"});   }
                        }else{ 
                             return res.status(200).send({"status":false,"msg":"This user is not Blocked"}); }
                       }
                    } catch (error) { console.log(error); 
                          return res.status(200).send({"status":false,"msg":"server error" });
                    }     



    }


}

module.exports =  chatController;