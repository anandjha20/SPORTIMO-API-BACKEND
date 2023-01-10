
let express_2 = require('express');
let mongoose = require('mongoose');
const { rows_count, isEmpty, sentEmail, gen_str, getcurntDate, getTime, send_mobile_otp, user_logs_add, FulldateTime, before_after_Date } = require('../myModel/common_modal');
const { autoincremental, sendNotificationAdd, myBlockUserIds, matchWinUsersRank, matchWinUsersRank_one,
  AllMatchWinUsersRank, AllMatchWinUsersRank_one, leagueWinUsersRank, leagueWinUsersRank_one } = require('../myModel/helper_fun');
const { MyBasePath } = require("../myModel/image_helper");


// all mongodb schema    
const reward_game_point_tbl=require('../models/reward_game_point')
const reward_badge_tbl=require('../models/reward_badge')


class rewardsController {

  static reward_gamePoint_add = async (req,res) => {
    try{
      let from_rank=req.body.from_rank;
      let to_rank=req.body.to_rank;
      let points=req.body.points;
      if(isEmpty(from_rank) || isEmpty(to_rank) || isEmpty(points)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let details={from_rank,to_rank,points};
        let add=new reward_game_point_tbl(details);
        let save=await add.save();
        if(!isEmpty(save)){
          return res.status(200).send({status:true,msg:"success",body:save});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_gamePoint_update = async (req,res) => {
    try{
      let id=req.params.id;
      let from_rank=req.body.from_rank;
      let to_rank=req.body.to_rank;
      let points=req.body.points;
      if(isEmpty(id)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let details={};
        if(!isEmpty(from_rank)){details={...details,from_rank}}
        if(!isEmpty(to_rank)){details={...details,to_rank}}
        if(!isEmpty(points)){details={...details,points}}
        let update=await reward_game_point_tbl.findByIdAndUpdate(id,details,{new:true});
        if(!isEmpty(update)){
          return res.status(200).send({status:true,msg:"success",body:update});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_gamePoint_delete = async (req,res) => {
    try{
      let id=req.params.id;
      if(isEmpty(id)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let response=await reward_game_point_tbl.findByIdAndDelete(id);
        if(!isEmpty(response)){
          return res.status(200).send({status:true,msg:"success",body:response});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_gamePoint_list = async (req,res) => {
    try{
        let response=await reward_game_point_tbl.find();
        if(!isEmpty(response)){
          return res.status(200).send({status:true,msg:"success",body:response});
        }else{
          return res.status(200).send({status:false,msg:"no data found"});
        }

    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_badges_add = async (req,res) => {
    try{
      let from_rank=req.body.from_rank;
      let to_rank=req.body.to_rank;
      let name=req.body.name;
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      
      if(isEmpty(from_rank) || isEmpty(to_rank) || isEmpty(name) || isEmpty(image)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let details={from_rank,to_rank,name,image};
        let add=new reward_badge_tbl(details);
        let save=await add.save();
        if(!isEmpty(save)){
          return res.status(200).send({status:true,msg:"success",body:save});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_badges_update = async (req,res) => {
    try{
      let id=req.params.id;
      let from_rank=req.body.from_rank;
      let to_rank=req.body.to_rank;
      let name=req.body.name;
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      
      if(isEmpty(id)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let details={};
        if(!isEmpty(from_rank)){details={...details,from_rank}}
        if(!isEmpty(to_rank)){details={...details,to_rank}}
        if(!isEmpty(name)){details={...details,name}}
        if(!isEmpty(image)){details={...details,image}}
        let update=await reward_badge_tbl.findByIdAndUpdate(id,details,{new:true});
        if(!isEmpty(update)){
          return res.status(200).send({status:true,msg:"success",body:update});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_badges_delete = async (req,res) => {
    try{
      let id=req.params.id;
      if(isEmpty(id)){
        return res.status(200).send({status:false,msg:"all field required"});
      }else{
        let response=await reward_badge_tbl.findByIdAndDelete(id);
        if(!isEmpty(response)){
          return res.status(200).send({status:true,msg:"success",body:response});
        }else{
          return res.status(200).send({status:false,msg:"something went wrong"});
        }

      }
    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

  static reward_badges_list = async (req,res) => {
    try{
        let response=await reward_badge_tbl.find();
        let path=await MyBasePath(req);
        response.map((item)=>{
          item.image=`${path}/image/assets/badges/${item.image}`
        })
        if(!isEmpty(response)){
          return res.status(200).send({status:true,msg:"success",body:response});
        }else{
          return res.status(200).send({status:false,msg:"no data found"});
        }

    }catch(error){
    console.log(error);
    return res.status(200).send({status:false,msg:"server error"});
   }
  }

}

module.exports = rewardsController;      