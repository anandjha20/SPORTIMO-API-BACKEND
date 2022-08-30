const express = require( 'express');
let mongoose = require('mongoose');

const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty,user_logs_add,FulldateTime } = require('../myModel/common_modal');
const { autoincremental } = require('../myModel/helper_fun');  

  
  
  // all mongodb schema    
    const user_tbl = require('../models/user');    
    const chat_groups_tbl = require('../models/chat_groups');    
    const group_participant_tbl = require('../models/group_participant');    
    



class chatController {

static chat_group_add = async(req,res)=>{
    try {
            let group_name = req.body.group_name ;
            let type = req.body.group_type ;

        if(isEmpty(group_name) || isEmpty(type) ){
           return res.status(200).send({status:false,"msg":"All Field Required"});
        }
    let add = new chat_groups_tbl({ group_name,type})
          add.save((err, data)=>{
            if(err){console.log(err);  return res.status(200).send({status:false,"msg":"something went wrong please try again"}); 
               }else{
                         return res.status(200).send({"status":true,"msg":"group add Successfully","body":data});
               }
          });
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


}

module.exports =  chatController;