let  express_2 = require('express');
const mongoose = require('mongoose');
const {my_utc_time, userPowerUpsData,getcurntDate,getTime,saveData, isEmpty,rows_count,ArrChunks, } = require('../myModel/common_modal');
const {matchWinUsersRank_one, sendNotificationAdd,leagueWinUsersRank } = require('../myModel/helper_fun');
const {send_noti,get_preferenceUserToken,send_poll_notification,userSentNotification,pollDisclosed_noti_fun} = require('../myModel/Notification_helper');
const  {MyBasePath} = require("../myModel/image_helper");
const { poll_percent} = require('../myModel/helper_fun');
  
  // const state_tbl = require('../models/state_tbl');
    const user_tbl                    = require('../models/user');    
    const prediction_cards_tbl        = require('../models/prediction_cards');    
    const match_cards_tbl             = require('../models/match_cards');   
    const playMatchCards_tbl          = require('../models/playMatchCards');   
    const play_match_cards            = require ("../models/playMatchCards");
    const used_power_ups_tbl          = require ("../models/used_power_ups");
    const power_ups_tbl               = require ("../models/power_ups");
    const transactions                = require ("../models/transactions");
    const user_achievements           = require('../models/user_achievements');
    const user_allotted_powerups_tbl  = require ("../models/user_allotted_powerUps");
    const team_matches_tbl            = require("../models/team_matches");
    const prediction_card_categories  = require("../models/prediction_card_categories");     
const team_matches = require('../models/team_matches');

  class predictionController {   
  
    static getprediction_card_Cat_list = async (req,res)=>{
        try {
            let language = req.body.language;

            let records = await prediction_card_categories.find().sort({_id:-1});
               
                if(records){ records.map((item)=> { 
                            if(language != '' && language == 'ar'){  item.name = item.name_ara;  
                            }else if(language != '' && language == 'fr'){  item.name = item.name_fr;  
                                   }
                           return item; })}
        
        
                res.status(200).send({'status':true,'msg':"success",  'body':records });
    
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':"Server error",'body':''});
        }
                
    }    
    
    static prediction_card_add = async(req,res)=>{
            try {   
              let user_data = req.body;

              //console.log(user_data); 
               if(isEmpty(user_data.name)){
                          return res.status(200).send({"status":false,"msg":'name filed Required' , "body":''}) ; 
                    }   
          
       let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
   
         let mydate = getcurntDate();

                   let add = new prediction_cards_tbl({
                        "name":user_data.name,
                        "name_ara": user_data.name_ara,
                        "name_fr": user_data.name_fr,
                        "card_type": user_data.card_type,
                      
                       "card_cat_id":user_data.card_cat_id,
                       "time_range":user_data.time_range,
                       
                           "image": image,
                         "card_color": user_data.card_color,             
                         "font_color": user_data.font_color,             

                       "qus": user_data.qus,        "qus_ara": user_data.qus_ara,     "qus_fr": user_data.qus_fr,
                       "ops_1":user_data.ops_1,     "ops_1_ara":user_data.ops_1_ara,  "ops_1_fr":user_data.ops_1_fr,
                       "ops_2": user_data.ops_2,    "ops_2_ara":user_data.ops_2_ara,  "ops_2_fr":user_data.ops_2_fr,
                       "ops_3":user_data.ops_3,     "ops_3_ara":user_data.ops_3_ara,  "ops_3_fr":user_data.ops_3_fr,
                       "ops_4":user_data.ops_4,     "ops_4_ara":user_data.ops_4_ara,  "ops_4_fr":user_data.ops_4_fr,
                       "point_1": user_data.point_1, "point_2": user_data.point_2,
                       "point_3": user_data.point_3, "point_4": user_data.point_4,
                       "date": mydate
            });
                 
                         add.save((err, data) => {
                               if (err) {     console.log(err);
                                 return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                             }else{ return res.status(200).send({"status":true,"msg":'prediction Card Created Successfully' , "body":data  }) ;            
                            } } ) ;
               
        }catch (error) {  console.log(error); 
                   return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
       
               }
             
       
    }

    static prediction_card_update = async(req,res)=>{
      try {
              let id = req.params.id;
              //console.log(req.body)
            let user_data = req.body;
              if(isEmpty(id)){
                updateData.image = image 
                return res.status(200).send({"status":false,"msg":'prediction card id required' , "body":''}) ; 
              }   
            
            
              let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
            
                        
              
          if(!isEmpty(image)){updateData.image = image }            


            prediction_cards_tbl.findOneAndUpdate({_id: id},{$set : user_data },{new: true}, (err, updatedUser) => {
      if(err) {  console.log(err);
          return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
      }else if(!isEmpty(updatedUser)){
                  return res.status(200).send({"status":true,"msg":'prediction card Updated Successfully' , "body":updatedUser  }) ;   
          }else{  return res.status(200).send({"status":false,"msg":'Invalid prediction card Id ' , "body": ''}) ;   
                  }

          
      });

      } catch (error) { console.log(error); 
              return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
  
          }
      
  
      }     

    static prediction_card_list = async (req,res)=>{
          try {
                let language = req.body.language;
              // console.log('prediction_card_list is call ==',  language );
              let records = await prediction_cards_tbl.find().sort({_id:-1});
              let paths =MyBasePath(req,res);    
                  
                  if(records){ records.map((item)=> {  item.image = (! isEmpty(item.image))?  `${paths}/image/assets/predictionCard_img/${item.image}` : '' ;
                              if(language != '' && language == 'ar'){ 
                                    item.name = item.name_ara;  
                                    item.qus = item.qus_ara;  
                                      item.ops_1 = item.ops_1_ara;  
                                      item.ops_2 = item.ops_2_ara;  
                                      item.ops_3 = item.ops_3_ara;  
                                      item.ops_4 = item.ops_4_ara;  
                              }else   if(language != '' && language == 'fr'){ 
                                item.name = item.name_fr;  
                                item.qus = item.qus_fr;  
                                  item.ops_1 = item.ops_1_fr;  
                                  item.ops_2 = item.ops_2_fr;  
                                  item.ops_3 = item.ops_3_fr;  
                                  item.ops_4 = item.ops_4_fr;  
                          }
                              return item; })}
          
          
                  res.status(200).send({'status':true,'msg':"success",  'body':records });
      
          } catch (error) { console.log(error);
              res.status(200).send({'status':false,'msg':"Server error",'body':''});
          }
                  
    }    

    static card_list_by_match = async (req,res)=>{
      try {
          let match_id = req.params.id;
          let team_data=await team_matches_tbl.findOne({_id:match_id}).select('team_a_name team_b_name');
          console.log(team_data)
          let records = await prediction_cards_tbl.find().populate('card_cat_id').sort({"name":-1});
          let data=[]    
          let d1=await Promise.all(records.map(async (item)=>{
            let match_card_data=await match_cards_tbl.findOne({card_id:item._id,match_id})
            data.push({...item._doc,match_card_data})
          }))
          data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
              res.status(200).send({'status':true,'msg':"success", team_data ,'body':data });
  
      } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':"Server error",'body':''});
      }
              
}    


    static match_card_add = async(req,res)=>{
              try {   
               
                let match_name    = req.body.match_name;
                let match_id      = req.body.match_id;
                let card_id        = req.body.card_id;
                let apperance_times = req.body.apperance_times;    
                let time_duration  = req.body.time_duration;
                let point_1  = req.body.point_1;
                let point_2  = req.body.point_2;
                let point_3  = req.body.point_3;
                let point_4  = req.body.point_4;

              if( isEmpty(match_name) || isEmpty(match_id)  || 
                  isEmpty(card_id)  || isEmpty(apperance_times)  ||
                    isEmpty(time_duration) ){
                    return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                      }   
            let details={ match_name,match_id,card_id,apperance_times,point_1,point_2,point_3,point_4,
              time_duration }
                      let add = new match_cards_tbl(details);
                      
                            add.save((err, data) => {
                                  if (err) {     console.log(err);
                                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                                }else{ return res.status(200).send({"status":true,"msg":'Match Card Created Successfully' , "body":data  }) ;            
                              } } ) ;
                  
          }catch (error) {  console.log(error); 
                      return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
          
                  }
                
          
    }

    static match_card_update = async(req,res)=>{
            try {   let id = req.params.id;
              let apperance_times = req.body.apperance_times;    
              let time_duration   = req.body.time_duration;
              let point_1  = req.body.point_1;
              let point_2  = req.body.point_2;
              let point_3  = req.body.point_3;
              let point_4  = req.body.point_4;
             let updateData = { };
             if(!isEmpty(apperance_times)){updateData={...updateData,apperance_times}}                
             if(!isEmpty(time_duration)){updateData={...updateData,time_duration}}                
             if(!isEmpty(point_1)){updateData={...updateData,point_1}}                
             if(!isEmpty(point_2)){updateData={...updateData,point_2}}                
             if(!isEmpty(point_3)){updateData={...updateData,point_3}}                
             if(!isEmpty(point_4)){updateData={...updateData,point_4}}                
                      
        match_cards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
          if(err) {  console.log(err);
              return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
          }else if(!isEmpty(updatedUser)){
                      return res.status(200).send({"status":true,"msg":'Match Card Updated Successfully' , "body":updatedUser  }) ;   
              }else{  return res.status(200).send({"status":false,"msg":'Invalid Match Card Id ' , "body": ''}) ;   
                      } 
            });



                
        }catch (error) {  console.log(error); 
                    return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
        
                }
              
        
      }

    static match_card_delete = async(req,res)=>{
              try {
                      let id = req.params.id;
                      match_cards_tbl.findByIdAndDelete(id, function (err, docs) {
                    if (err){  console.log("jjj === ",err);           //json(err)
    
                 let getError =  JSON.parse(JSON.stringify(err));
                      return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                        }else if(!isEmpty(docs)){
                          return res.status(200).send({"status":true,"msg":'match card Deleted Successfully' , "body":''}) ;   
                    }else{
                      return res.status(200).send({"status":false,"msg":'Invalid match card Id ' , "body":''}) ;  
                    }
                });
    
              } catch (error) { return res.status(200).send({"status":true,"msg":'server error' , "body":''}) ; }
    
    }   
    
    static playMatchCard_add  = async(req,res)=>{
        try {   
              let match_card_id    = req.body.match_card_id;
              let user_id          = req.body.user_id;
              let user_option      = req.body.user_option;
              let time_range_start = req.body.time_range_start;    
              let time_range_end   = req.body.time_range_end;
              let league_id=(req.body.league_id==undefined||req.body.league_id=='')?"61217":req.body.league_id;
              let match_id         = req.body.match_id;
              let card_id          = req.body.card_id;
              let card_cat_id      = req.body.card_cat_id;  
              let point            = req.body.point;  
              let powerUpPoints    = req.body.powerUpPoints;
              
              powerUpPoints = (powerUpPoints>1)? powerUpPoints : 1;

              // || isEmpty(time_range_start)  ||  isEmpty(time_range_end)
         
              if( isEmpty(match_card_id) || isEmpty(user_id) || isEmpty(user_option) ||
                       isEmpty(match_id) || isEmpty(card_id)  ){
             return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                }   
            
          let matchData=await team_matches_tbl.findOne({_id:match_id});
          if(matchData.status=="Played"){
            return res.status(200).send({"status":false,"msg":"Cards cannot be played because match is ended!!"})
          }else if(matchData.status!="Fixture" && card_cat_id=="632b13b83fdfc0f533c51dea"){
              return res.status(200).send({"status":false,"msg":"Cards cannot be played from this section because match is started!!"})
          }else{

            
            let checkuserData = await playMatchCards_tbl.findOne({user_id,match_card_id});
            if(checkuserData){
              return res.status(200).send({"status":true,"msg":'user already play this card' , "body":checkuserData  }) ;  
            }   
            /////////////////////////////////////////////////////////////
            
            let {userpowers,usedPoweUps_count} = await userPowerUpsData(user_id); 
            
            //console.log({userpowers,usedPoweUps_count});                   
            
            if(userpowers == 0 && usedPoweUps_count == 0 && (powerUpPoints > 1) ){
              return res.status(200).send({"status":false,"msg":'You are not permission denied for powerUpPoints uses' }) ;   
            }else if(usedPoweUps_count >= userpowers && (powerUpPoints > 1) ){
              return res.status(200).send({"status":false,"msg": 'You are not permission denied for powerUpPoints uses'}) ;   
            }else if(userpowers == 0 && (powerUpPoints > 1) ){ 
              return res.status(200).send({"status":false,"msg":'You are not permission denied for powerUpPoints uses '}) ;   
            }else{
              /////////////////////////////////////////////////////////////
              let add = new playMatchCards_tbl({ match_card_id,user_id,user_option,time_range_start,
                time_range_end,match_id,league_id,card_id,card_cat_id,point,powerUpPoints });
                
                add.save((err, data) => {
                  if (err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                  }else{
                    
                    let savedd = (powerUpPoints > 1)? saveData({user_id,match_id,card_id,"power_up_type":"score_multiplier"},used_power_ups_tbl) : '' ; 
                    
                    
                    return res.status(200).send({"status":true,"msg":'Match Card Created Successfully' , "body":data  }) ;            
                  } });
                  
                }
              }
                
              }catch (error) {  console.log(error); 
                return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
                
              }
              
              
    }   
  
    static my_playMatchCard_list = async (req,res)=>{
      try {
      let language = req.body.language;    
      let user_id = req.body.user_id;    
      let match_id = req.body.match_id;    
      let result=req.body.status;
      let matchData=await team_matches.findById(match_id);
      // let team_a_name=matchData.team_a_name;
      // let team_a_name_ara=matchData.team_a_name_ara;
      // let team_b_name=matchData.team_b_name;
      // let team_b_name_ara=matchData.team_b_name_ara;
      // console.log(matchData)         

      /// let records = await match_cards_tbl.find().populate('card_id','name name_ara card_type').sort({_id:-1});
      
      if(isEmpty(user_id)){
        return res.status(200).send({'status':false,'msg':  (language == 'ar')? "?????????? ?????? ???????? ????????????????" :  "User Id Field Required"});
            }
        let whr = (isEmpty(match_id))?   {user_id} : {user_id,match_id}   ;
            if(!isEmpty(result)){whr={...whr,result}};
    let records = await playMatchCards_tbl.find(whr).populate({ path: 'match_card_id', populate: { path: 'card_id'}}).sort({_id:-1});
    let data=[] 
    let path=await MyBasePath(req,res);   
      if(! isEmpty(records)){Promise.all( records.map((item)=> { 
        if(item.match_card_id!=null){
                        console.log(item.match_card_id.card_id)
                      item.match_card_id.card_id.image = `${path}/image/assets/predictionCard_img/${item.match_card_id.card_id.image}`;
                      if(language != '' && language == 'ar'){ 
                            
                        if(typeof item.match_card_id.card_id === 'object' && item.match_card_id.card_id !== null){
                          item.match_card_id.card_id.name = item.match_card_id.card_id.name_ara;
                          item.match_card_id.card_id.qus = item.match_card_id.card_id.qus_ara;
                        // option 1 tame name 
                        //console.log("=============")
                        if((item.match_card_id.card_id.ops_1 == 'Team A')){
                          item.match_card_id.card_id.ops_1 =  matchData.team_a_name_ara ;
                         }else  if((item.match_card_id.card_id.ops_1 == 'Team B')){
                            item.match_card_id.card_id.ops_1 =  matchData.team_b_name_ara ;
                          }else{
                            item.match_card_id.card_id.ops_1 = item.match_card_id.card_id.ops_1_ara;
                          }

                        // option 2 tame name    
                              if((item.match_card_id.card_id.ops_2 == 'Team A')){
                                item.match_card_id.card_id.ops_2 =  matchData.team_a_name_ara ;
                              }else  if((item.match_card_id.card_id.ops_2 == 'Team B')){
                                item.match_card_id.card_id.ops_2 = matchData.team_b_name_ara ;
                              }else{
                                item.match_card_id.card_id.ops_2 = item.match_card_id.card_id.ops_2_ara;
                              }
                          // option 3 tame name 
                          if((item.match_card_id.card_id.ops_3 == 'Team A')){
                            item.match_card_id.card_id.ops_3 =  matchData.team_a_name_ara ;
                          }else  if((item.match_card_id.card_id.ops_3 == 'Team B')){
                            item.match_card_id.card_id.ops_3 =  matchData.team_b_name_ara ; 
                          }else{
                            item.match_card_id.card_id.ops_3 = item.match_card_id.card_id.ops_3_ara;
                          }
                        // option 4 tame name    
                          if((item.match_card_id.card_id.ops_4 == 'Team A')){
                            item.match_card_id.card_id.ops_4 =  matchData.team_a_name_ara ;
                          }else  if((item.match_card_id.card_id.ops_4 == 'Team B')){
                            item.match_card_id.card_id.ops_4 =  matchData.team_b_name_ara ;
                          }else{
                            item.match_card_id.card_id.ops_4 = item.match_card_id.card_id.ops_4_ara;
                          }
                          
                  }
                        
                        // item.match_card_id.card_id.name = item.match_card_id.card_id.name_ara;  
                    
                      }else{ 
                        if(typeof item.match_card_id.card_id === 'object' && item.match_card_id.card_id !== null){
                        // option 1 tame name 
                console.log("============")
                  if((item.match_card_id.card_id.ops_1 == 'Team A')){
                    item.match_card_id.card_id.ops_1 = matchData.team_a_name;
                  }else  if((item.match_card_id.card_id.ops_1 == 'Team B')){
                    item.match_card_id.card_id.ops_1 = matchData.team_b_name;  
                  }
               // option 2 tame name    
                  if((item.match_card_id.card_id.ops_2 == 'Team A')){
                    item.match_card_id.card_id.ops_2 = matchData.team_a_name;
                  }else  if((item.match_card_id.card_id.ops_2 == 'Team B')){
                    item.match_card_id.card_id.ops_2 = matchData.team_b_name;  
                  }
              // option 3 tame name 
              if((item.match_card_id.card_id.ops_3 == 'Team A')){
                item.match_card_id.card_id.ops_3 = matchData.team_a_name;
              }else  if((item.match_card_id.card_id.ops_3 == 'Team B')){
                item.match_card_id.card_id.ops_3 = matchData.team_b_name;  
              }
            // option 4 tame name    
              if((item.match_card_id.card_id.ops_4 == 'Team A')){
                item.match_card_id.card_id.ops_4 = matchData.team_a_name;
              }else  if((item.match_card_id.card_id.ops_4 == 'Team B')){
                item.match_card_id.card_id.ops_4 = matchData.team_b_name;  
              }
          }
        } 
                      let point=[item.match_card_id.card_id.point_1,item.match_card_id.card_id.point_2,item.match_card_id.card_id.point_3,item.match_card_id.card_id.point_4]
                      let max_point=point.sort(function(a, b){return b-a})[0];
                      let min_point=point.sort(function(a, b){return a-b})[0];
                      console.log(item._doc)
                      data.push({...item._doc,max_point,min_point})
                        }
                      }))
                    //  console.log(data)
    ////////////////////////////////////                
    let all_card_count     = await match_cards_tbl.find({match_id}).countDocuments();
    let played_cards_count = await playMatchCards_tbl.find({match_id,user_id}).countDocuments();
    
    let p_counts = await userPowerUpsData(user_id);
    
          return  res.status(200).send({'status':true,'msg': (language == 'ar')? "????????????"  : "success" ,
          all_card_count,played_cards_count, "userpowers":p_counts.userpowers ,"usedPoweUps_count":p_counts.usedPoweUps_count, 'body':data });
              }else{
                    return res.status(200).send({'status':false,'msg':  (language == 'ar')? "???????????? ????????????!.." :  "No Data Found!.."});
                    }
  
  

        } catch (error) { console.log(error);
              return res.status(200).send({'status':false,'msg': "server error"});
          }
                    
    }       
  
    static playMatchCard_list = async (req,res)=>{
      try {
          let language = req.body.language;    
          let match_card_id = req.body.match_card_id;    
          
          /// let records = await match_cards_tbl.find().populate('card_id','name name_ara card_type').sort({_id:-1});
          
          playMatchCards_tbl.aggregate([ {
          $lookup: {
              from: "match_cards_tbl", // collection to join
              localField: "_id",//field from the input documents
              foreignField: "match_card_id",//field from the documents of the "from" collection
              as: "comments" // output array field
          }
      }, {
          $lookup: {
              from: "Post", // from collection name
              localField: "_id",
              foreignField: "user_id",
              as: "posts"
          }
      }],function (error, data) {
        return res.json(data);
    //handle error case also
});
      
  
            } catch (error) { console.log(error);
                  return res.status(200).send({'status':false,'msg': (language == 'ar')? "?????? ???? ????????????" : "server error"});
              }
              
    }  
//power up 
    static playMatchCard_update_old = async(req,res)=>{
        try {   let id = req.params.id;
                let match_card_id        = req.body.match_card_id;
                    let user_id          = req.body.user_id;
                    let user_option      = req.body.user_option;
                    let time_range_start = req.body.time_range_start;    
                    let time_range_end   = req.body.time_range_end;
                    let match_id         = req.body.match_id;
                    let card_id          = req.body.card_id;
                    let card_cat_id      = req.body.card_cat_id;
                    let point            = req.body.point;
                    let utc_time         = req.body.utc_time;

            if( isEmpty(match_card_id) || isEmpty(user_id)  || 
                  isEmpty(user_option) || isEmpty(match_id) || isEmpty(card_id) || 
                  isEmpty(card_cat_id)  ){
                  return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                      }  
            let played_card_details=await playMatchCards_tbl.findById(id);
            let matchDetails=await team_matches_tbl.findOne({_id:match_id});
            //console.log({played_card_details,matchDetails})
            if(matchDetails.status!="Fixture" && played_card_details.user_option!=user_option){
              return res.status(200).send({"status":false,"msg":'Cannot change answer because match is started!!' }) ; 
            }

          // get match date time            
          let matchData   = await team_matches_tbl.findOne({"_id":match_id},'date_utc');            
            // get power Ups time (in minits ); 
          let powerUpData = await power_ups_tbl.findOne({"power_up_type" : "change_prediction_card_answer"},'powerup_value');            
          let result  = false; 
          
          
    if(matchData && powerUpData){
            let match_second = my_utc_time(matchData.date_utc);
          //  let cur_second =  utc_time ; //my_utc_time();
            let cur_second = my_utc_time();

            // match second add on powerpus seconds
            match_second  =  match_second + (60* powerUpData.powerup_value);
          
            result = (cur_second <= match_second)? true : false ; 

      // return res.status(200).send({"status":true,"msg":'Success',"body":{powerUpData,result,match_second,cur_second,"date":matchData.date_utc} }) ;   

      }else{
        return res.status(200).send({"status":false,"msg":'Invalid match id' }) ;   
       
      }                      

 let {userpowers,usedPoweUps_count} = await userPowerUpsData(user_id); 

       //console.log({userpowers,usedPoweUps_count});                   
 
  if(userpowers == 0 && usedPoweUps_count == 0 ){
        return res.status(200).send({"status":false,"msg": "You have no any powerup" }) ;   
      }else if(usedPoweUps_count >= userpowers){
        return res.status(200).send({"status":false,"msg":"You have already used all powerup's" }) ;   
        }else{
                if(result == true){
                  return res.status(200).send({"status":false,"msg":'Time out '}) ;   
                }
        }
  
    
       let updateData = { match_card_id,user_id,user_option,time_range_start,time_range_end ,match_id,
                               card_id, card_cat_id,point };                
      
         playMatchCards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
     
        if(err){ console.log(err);
          return res.status(200).send({"status":false,"msg":'An error occurred' }) ;   
      }else if(!isEmpty(updatedUser)){
            let savedd = (result)? saveData({user_id,match_id,card_id,"power_up_type":"change_prediction_card_answer"},used_power_ups_tbl) : '' ; 
                return res.status(200).send({"status":true,"msg":'Play Match Card Updated Successfully' , "body":updatedUser  }) ;   
          }else{ return res.status(200).send({"status":false,"msg":'Invalid Play Match Card Id '}) ;   
                  } 
        });
     
    }catch (error) {  console.log(error); 
               return res.status(200).send({"status":false,"msg":'No data add' }) ;          
   
           }
         
   
       }

    static playMatchCard_update = async(req,res)=>{
  try {   let id = req.params.id;
          let match_card_id        = req.body.match_card_id;
              let user_id          = req.body.user_id;
              let user_option      = req.body.user_option;
              let time_range_start = req.body.time_range_start;    
              let time_range_end   = req.body.time_range_end;
              let match_id         = req.body.match_id;
              let card_id          = req.body.card_id;
              let card_cat_id      = req.body.card_cat_id;
              let point            = req.body.point;

      if( isEmpty(match_card_id) || isEmpty(user_id)  || 
            isEmpty(user_option) || isEmpty(match_id) || isEmpty(card_id) || 
            isEmpty(card_cat_id)  ){
            return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                }   

      let matchDetails=await team_matches_tbl.findOne({_id:match_id});
      //console.log({played_card_details,matchDetails})
      if(matchDetails.status=="Played"){
        return res.status(200).send({"status":false,"msg":'Cannot change answer because match is ended!!' }) ; 
      }else if(matchDetails.status!="Fixture"){
        return res.status(200).send({"status":false,"msg":'Cannot change answer because match is started!!' }) ; 
      }else{

  // let checkName = await rows_count({"name":""})             
    let updateData = { match_card_id,user_id,user_option,time_range_start,time_range_end ,match_id,
                          card_id, card_cat_id,point };                
            
  playMatchCards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
if(err) {  console.log(err);
    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
}else if(!isEmpty(updatedUser)){
            return res.status(200).send({"status":true,"msg":'Play Match Card Updated Successfully' , "body":updatedUser  }) ;   
    }else{  return res.status(200).send({"status":false,"msg":'Invalid Play Match Card Id ' , "body": ''}) ;   
            } 
  });


}
      
}catch (error) {  console.log(error); 
          return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          

      }
    

    }

    static playMatchCard_delete = async(req,res)=>{
        try {
                let id = req.params.id;
                let cardData=await playMatchCards_tbl.findById(id);
                let matchData=await team_matches_tbl.findById(cardData.match_id);
                if(matchData.status!="Fixture"){
                  return res.status(200).send({"status":false,"msg":"Cards cannot be deleted because match is started!!" }) ;  
                }else{ 
                
                playMatchCards_tbl.findByIdAndDelete(id, function (err, docs) {
              if (err){  console.log("playMatchCard_delete === ",err);        

                      let getError =  JSON.parse(JSON.stringify(err));
                return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                 }else if(!isEmpty(docs)){
                    return res.status(200).send({"status":true,"msg":'play Match Card Deleted Successfully' , "body":''}) ;   
              }else{
                return res.status(200).send({"status":false,"msg":'Invalid play Match Card Id ' , "body":''}) ;  
              }
          });
        }
        } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

    }
   
    static match_card_list_old = async (req,res)=>{
      try {
           let language = req.body.language;    // 'name card_type'
           let card_cat_id = req.body.category_id;    // 'name card_type'
           let cardCat={};
           if(!isEmpty(card_cat_id)){cardCat={...cardCat,card_cat_id}}
           let condition_obj={};
          if(!isEmpty(req.body.match_id)){
            condition_obj={...condition_obj,match_id:req.body.match_id}
          }
            //console.log("condition_obj == ", condition_obj);
          let records = await match_cards_tbl.find(condition_obj).populate('card_id',null,cardCat).sort({_id:-1});
        
             let data=[]
              if(records){ records.map((item)=> { 
                if(typeof item.card_id === 'object' && item.card_id !== null){
                    
                  if(language != '' && language == 'ar'){ 
                                
                              item.card_id.name = item.card_id.name_ara;
                              item.card_id.qus = item.card_id.qus_ara;
                              item.card_id.ops_1 = item.card_id.ops_1_ara;
                              item.card_id.ops_2 = item.card_id.ops_2_ara;
                              item.card_id.ops_3 = item.card_id.ops_3_ara;
                              item.card_id.ops_4 = item.card_id.ops__ara;
                            }

                            data.push(item)
                            
                           // item.card_id.name = item.card_id.name_ara;  
                              
                          }
                         // console.log(item)
               })
                        
                         return  res.status(200).send({'status':true,'msg': (language == 'ar')? "????????????"  : "success" ,  'body':data });
                  }else{
                       return res.status(200).send({'status':false,'msg':  (language == 'ar')? "???????????? ????????????!.." :  "No Data Found!.."});
                        }
      
      
  
           } catch (error) { console.log(error);
                  return res.status(200).send({'status':false,'msg': (language == 'ar')? "?????? ???? ????????????" : "server error"});
              }
              
    }      

    static match_card_list = async (req,res)=>{
        try {
             let language = req.body.language;    // 'name card_type'
             let card_cat_id = req.body.category_id;    // 'name card_type'
             let match_id = req.body.match_id;  
             let user_id = req.body.user_id;  
             let cardCat={};
             let my_obj={match_id,user_id};
             if(!isEmpty(card_cat_id)){cardCat={...cardCat,card_cat_id}}
             let condition_obj={};
            if(!isEmpty(req.body.match_id)){
              condition_obj = {...condition_obj,match_id:req.body.match_id}
            }
            
            //let all_card_count     = await match_cards_tbl.find({match_id}).countDocuments();
            let transaction= await transactions.find({"match_id":match_id,"user_id":user_id,points_by:"match"});
            let score=0;
            transaction.map((item)=>{
                score+=item.points;
            })
            
            let played_cards = await playMatchCards_tbl.distinct('card_id',my_obj)
            let played_cards_count = played_cards.length;
            let all_card_count = await match_cards_tbl.find(condition_obj).countDocuments();                 
            if(!isEmpty(played_cards)){condition_obj = {...condition_obj,card_id:{$nin:played_cards}}};
            let usedPoweUps_count = await used_power_ups_tbl.find({user_id}).countDocuments();
            let userUsedpowerpus  = await user_allotted_powerups_tbl.find({match_id,user_id});
            let userpowers = isEmpty(userUsedpowerpus)? 0 : userUsedpowerpus[0].power_up_count;
          
         //     console.log("condition_obj == ", condition_obj);
        // let records = await match_cards_tbl.find(condition_obj).populate('card_id',null,cardCat).sort({_id:-1});
                                                    // { path: 'match_card_id', populate: { path: 'card_id'}}
        
       let records = await match_cards_tbl.find(condition_obj).populate('card_id',null,cardCat)
                        .populate('match_id',' match_name team_a_name team_a_name_ara team_b_name team_b_name_ara league_id').sort({_id:-1});
          let data=[];
          let path=await MyBasePath(req,res);
                if(records){  Promise.all(records.map(async(item,index)=> { 
                  if(typeof item.card_id === 'object' && item.card_id !== null){

                      if(language != '' && language == 'ar'){ 

                                item.card_id.name = item.card_id.name_ara;
                                item.card_id.qus  = item.card_id.qus_ara;

                             let matchData =JSON.parse(JSON.stringify(item.match_id)) ;
                         
                            
                              //  item.card_id.ops_1 = item.card_id.ops_1_ara;
                              ///  item.card_id.ops_2 = item.card_id.ops_2_ara;
                              //  item.card_id.ops_3 = item.card_id.ops_3_ara;
                              //  item.card_id.ops_4 = item.card_id.ops_4_ara;
                            
                              // option 1 tame name 
                              if((item.card_id.ops_1 == 'Team A')){
                                  item.card_id.ops_1 =  matchData.team_a_name_ara ;
                                 }else  if((item.card_id.ops_1 == 'Team B')){
                                    item.card_id.ops_1 =  matchData.team_b_name_ara ;
                                  }else{
                                    item.card_id.ops_1 = item.card_id.ops_1_ara;
                                  }

                                // option 2 tame name    
                                      if((item.card_id.ops_2 == 'Team A')){
                                        item.card_id.ops_2 =  matchData.team_a_name_ara ;
                                      }else  if((item.card_id.ops_2 == 'Team B')){
                                        item.card_id.ops_2 = matchData.team_b_name_ara ;
                                      }else{
                                        item.card_id.ops_2 = item.card_id.ops_2_ara;
                                      }
                                  // option 3 tame name 
                                  if((item.card_id.ops_3 == 'Team A')){
                                    item.card_id.ops_3 =  matchData.team_a_name_ara ;
                                  }else  if((item.card_id.ops_3 == 'Team B')){
                                    item.card_id.ops_3 =  matchData.team_b_name_ara ; 
                                  }else{
                                    item.card_id.ops_3 = item.card_id.ops_3_ara;
                                  }
                                // option 4 tame name    
                                  if((item.card_id.ops_4 == 'Team A')){
                                    item.card_id.ops_4 =  matchData.team_a_name_ara ;
                                  }else  if((item.card_id.ops_4 == 'Team B')){
                                    item.card_id.ops_4 =  matchData.team_b_name_ara ;
                                  }else{
                                    item.card_id.ops_4 = item.card_id.ops_4_ara;
                                  }
                          
                      }else if(language != '' && language == 'fr'){ 

                        item.card_id.name = item.card_id.name_fr;
                        item.card_id.qus  = item.card_id.qus_fr;

                     let matchData =JSON.parse(JSON.stringify(item.match_id)) ;
                 
                    
                      //  item.card_id.ops_1 = item.card_id.ops_1_fr;
                      ///  item.card_id.ops_2 = item.card_id.ops_2_fr;
                      //  item.card_id.ops_3 = item.card_id.ops_3_fr;
                      //  item.card_id.ops_4 = item.card_id.ops_4_fr;
                    
                      // option 1 tame name 
                      if((item.card_id.ops_1 == 'Team A')){
                          item.card_id.ops_1 =  matchData.team_a_name_fr ;
                         }else  if((item.card_id.ops_1 == 'Team B')){
                            item.card_id.ops_1 =  matchData.team_b_name_fr ;
                          }else{
                            item.card_id.ops_1 = item.card_id.ops_1_fr;
                          }

                        // option 2 tame name    
                              if((item.card_id.ops_2 == 'Team A')){
                                item.card_id.ops_2 =  matchData.team_a_name_fr ;
                              }else  if((item.card_id.ops_2 == 'Team B')){
                                item.card_id.ops_2 = matchData.team_b_name_fr ;
                              }else{
                                item.card_id.ops_2 = item.card_id.ops_2_fr;
                              }
                          // option 3 tame name 
                          if((item.card_id.ops_3 == 'Team A')){
                            item.card_id.ops_3 =  matchData.team_a_name_fr ;
                          }else  if((item.card_id.ops_3 == 'Team B')){
                            item.card_id.ops_3 =  matchData.team_b_name_fr ; 
                          }else{
                            item.card_id.ops_3 = item.card_id.ops_3_fr;
                          }
                        // option 4 tame name    
                          if((item.card_id.ops_4 == 'Team A')){
                            item.card_id.ops_4 =  matchData.team_a_name_fr ;
                          }else  if((item.card_id.ops_4 == 'Team B')){
                            item.card_id.ops_4 =  matchData.team_b_name_fr ;
                          }else{
                            item.card_id.ops_4 = item.card_id.ops_4_fr;
                          }
                  
                      }else{
                                 // option 1 tame name 
                                    if((item.card_id.ops_1 == 'Team A')){
                                      item.card_id.ops_1 = item.match_id.team_a_name;
                                    }else  if((item.card_id.ops_1 == 'Team B')){
                                      item.card_id.ops_1 = item.match_id.team_b_name;  
                                    }
                                 // option 2 tame name    
                                    if((item.card_id.ops_2 == 'Team A')){
                                      item.card_id.ops_2 = item.match_id.team_a_name;
                                    }else  if((item.card_id.ops_2 == 'Team B')){
                                      item.card_id.ops_2 = item.match_id.team_b_name;  
                                    }
                                // option 3 tame name 
                                if((item.card_id.ops_3 == 'Team A')){
                                  item.card_id.ops_3 = item.match_id.team_a_name;
                                }else  if((item.card_id.ops_3 == 'Team B')){
                                  item.card_id.ops_3 = item.match_id.team_b_name;  
                                }
                              // option 4 tame name    
                                if((item.card_id.ops_4 == 'Team A')){
                                  item.card_id.ops_4 = item.match_id.team_a_name;
                                }else  if((item.card_id.ops_4 == 'Team B')){
                                  item.card_id.ops_4 = item.match_id.team_b_name;  
                                }

                         }
                        item.card_id.image=`${path}/image/assets/predictionCard_img/${item.card_id.image}`;
                        item.card_id.point_1=item.point_1;
                        item.card_id.point_2=item.point_2;
                        item.card_id.point_3=item.point_3;
                        item.card_id.point_4=item.point_4;
                        let point=[];
                        if(item.card_id.ops_1!=""){point.push(item.point_1)}
                        if(item.card_id.ops_2!=""){point.push(item.point_2)}
                        if(item.card_id.ops_3!=""){point.push(item.point_3)}
                        if(item.card_id.ops_4!=""){point.push(item.point_4)}
                        let max_point=point.sort(function(a, b){return b-a})[0]
                        let min_point=point.sort(function(a, b){return a-b})[0]
                        data.push({...item._doc,max_point,min_point})
                                
                            }
                         
                 }));
                

                  //  let sendData = { all_card_count,played_cards_count,"list":data };
                    
                    let sendData = { all_card_count,played_cards_count, userpowers,usedPoweUps_count, "list":data };

                           return  res.status(200).send({'status':true,'msg': (language == 'ar')? "????????????"  : "success" ,
                           score,all_card_count,played_cards_count,userpowers,usedPoweUps_count , 'body':data });
                    }else{
                         return res.status(200).send({'status':false,'msg':  (language == 'ar')? "???????????? ????????????!.." :  "No Data Found!.."});
                          }
        
        
    
             } catch (error) { console.log(error);
                    return res.status(200).send({'status':false,'msg': (language == 'ar')? "?????? ???? ????????????" : "server error"});
                }
                
        }      

    static user_prediction_old = async (req,res)=>{
    try {
        let match_id = req.body.match_id;
        if(!isEmpty(match_id)){
        let records = await play_match_cards.find({match_id}).populate('card_id user_id','name card_type qus ops_1 ops_2 ops_3 ops_4').sort({_id:-1});
        records.map( (item)=>{
          //console.log(item)
          if(item.user_option=="ops_1"){item.user_option=item.card_id.ops_1};
          if(item.user_option=="ops_2"){item.user_option=item.card_id.ops_2};
          if(item.user_option=="ops_3"){item.user_option=item.card_id.ops_3};
          if(item.user_option=="ops_4"){item.user_option=item.card_id.ops_4};
        
        })
            res.status(200).send({'status':true,'msg':"success",  'body':records });
      }else{
        res.status(200).send({'status':true,'msg':"all field required" });
      }
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':"Server error",'body':''});
    }
            
    }    

    static all_user_prediction = async (req,res)=>{
          try {
              let match_id = req.body.match_id;
              if(!isEmpty(match_id)){
              let records = await play_match_cards.find({match_id}).populate('card_id user_id','name card_type qus ops_1 ops_2 ops_3 ops_4').sort({_id:-1});
              records.map( (item)=>{
                //console.log(item)
                if(item.user_option=="ops_1"){item.user_option=item.card_id.ops_1};
                if(item.user_option=="ops_2"){item.user_option=item.card_id.ops_2};
                if(item.user_option=="ops_3"){item.user_option=item.card_id.ops_3};
                if(item.user_option=="ops_4"){item.user_option=item.card_id.ops_4};
              
              })
                  res.status(200).send({'status':true,'msg':"success",  'body':records });
            }else{
              res.status(200).send({'status':true,'msg':"all field required" });
            }
          } catch (error) { console.log(error);
              res.status(200).send({'status':false,'msg':"Server error",'body':''});
          }
                  
    }    
      
    static user_prediction = async (req,res)=>{
      try {
          let user_id = req.params.id;
          let match_id = req.body.match_id;
          let s_date  = req.body.s_date;
          let e_date  = req.body.e_date;
          let whr={user_id};
          if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.dateTime = { $gte: s_date, $lte: e_date } ;} 
          if(!isEmpty(s_date)){ whr.dateTime = { $gte: s_date } ;} 
          if(!isEmpty(e_date)){ whr.dateTime = { $lte: e_date } ;} 
          if(!isEmpty(match_id)){ whr.match_id = match_id ;} 
            
          if(!isEmpty(user_id)){
          let records = await play_match_cards.find(whr).populate('card_id user_id','name card_type qus ops_1 ops_2 ops_3 ops_4').sort({_id:-1});
          res.status(200).send({'status':true,'msg':"success",  'body':records });
        }else{
          res.status(200).send({'status':true,'msg':"all field required" });
        }
      } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':"Server error"});
      }
              
    }   

    static my_played_matches = async(req,res)=>{
    try{        
          let  user_id = req.params.id;
          let  match_id = req.body.match_id;
          let page  = req.body.page;
          page = (isEmpty(page) || page == 0 )? 1 :page ; 
          let offest = (page -1 ) * 7 ; 

            let pipeLine = [];
  
          // let newId = mongoose.ObjectId(user_id);  matchDatatbl
          let newId =  mongoose.Types.ObjectId(user_id);
          if(!isEmpty(match_id)){
            let matchId =  mongoose.Types.ObjectId(match_id);
            pipeLine.push({$match:{"user_id":newId,"match_id":matchId,"active":false}});
          }else{
            pipeLine.push({$match:{"user_id":newId,"active":false}});
          }
          
          pipeLine.push({ $lookup: {from: 'team_matches', localField: 'match_id', foreignField: '_id', as: 'team_matches_tbl'} });
          pipeLine.push({$unwind : "$team_matches_tbl"});
  
          pipeLine.push({ $lookup: {from: 'prediction_cards', localField: 'card_id', foreignField: '_id', as: 'card_tbl'} });
          pipeLine.push({$unwind : "$card_tbl"});
  
  
          pipeLine.push({ $project: {"_id":0,"match_name":"$team_matches_tbl.match_name", "card_name":"$card_tbl.name","card_icon":"$card_tbl.image","card_color":"$card_tbl.card_color","font_color":"$card_tbl.font_color","qus":"$card_tbl.qus", "match_card_id":1,"card_id":1,"match_id":1,"result":1,"point":1 }});
      
      
        pipeLine.push( {$group: { _id: "$match_id",  total_cards : { $sum: 1 }  ,records: { $push: "$$ROOT" }  } });
      
        pipeLine.push({ $lookup: {from: 'team_matches', localField: '_id', foreignField: '_id', as: 'matchData'} });
        pipeLine.push({'$sort' :{
          'matchData.date_utc':-1,"matchData.time_utc":-1
        }})
        let datas =  await playMatchCards_tbl.aggregate(pipeLine).skip(offest).limit(7);
        //console.log(datas)
          let path=await MyBasePath(req,res);    
        let gameData=[];  
        let abc=await Promise.all( datas.map(async (item)=>{
          item.records.map((i)=>{
            //console.log(i)
            i.card_icon=`${path}/image/assets/predictionCard_img/${i.card_icon}`
          })
            let total_win=await playMatchCards_tbl.find({"user_id":user_id,"match_id":item._id,result:'win'}).countDocuments()
            let userReankData = await matchWinUsersRank_one( item._id.toString(),user_id);
            gameData.push({...item,total_win,rank:userReankData.rank,points:userReankData.points})
          }));
                      
              if(!isEmpty(gameData)){
                    res.status(200).send({'status':true,'msg':"success",  'body':gameData });
                  }else{
                    res.status(200).send({'status':true,'msg':"No data found!..",'body':gameData  });
                  }  
  
          } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':"Server error"});
        }       
    
      }
  
    static my_played_leagues = async(req,res)=>{
    try{        
          let  user_id = req.params.id;
          let  league_id = req.body.league_id;
          let page  = req.body.page;
          page = (isEmpty(page) || page == 0 )? 1 :page ; 
          let offest = (page -1 ) * 7 ; 
          let newId =  mongoose.Types.ObjectId(user_id);

            let pipeLine = [];
  
          // let newId = mongoose.ObjectId(user_id);  matchDatatbl
          if(!isEmpty(league_id)){
            
            pipeLine.push({$match:{"user_id":newId,"league_id":league_id,"active":false}});
          }else{
            pipeLine.push({$match:{"user_id":newId,"active":false}});
          }
        pipeLine.push( {
          '$group': {
            '_id': '$card_id', 
            'total': {
              '$sum': 1
            }, 
            'win': {
              '$sum': {
                '$cond': {
                  'if': {
                    '$eq': [
                      '$result', 'win'
                    ]
                  }, 
                  'then': 1, 
                  'else': 0
                }
              }
            }, 
            'points': {
              '$sum': {
                '$cond': {
                  'if': {
                    '$eq': [
                      '$result', 'win'
                    ]
                  }, 
                  'then': '$point', 
                  'else': 0
                }
              }
            }, 
            'league_id': {
              '$first': '$league_id'
            }
          }
        }, {
          '$set': {
            'win': {
              '$round': {
                '$divide': [
                  {
                    '$multiply': [
                      '$win', 100
                    ]
                  }, '$total'
                ]
              }
            }
          }
        }, {
          '$lookup': {
            'from': 'prediction_cards', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'cardData'
          }
        }, {
          '$unwind': {
            'path': '$cardData'
          }
        }, {
          '$project': {
            'card_id': '$cardData._id', 
            'card_name': '$cardData.name', 
            'card_type': '$cardData.card_type', 
            'card_icon': '$cardData.image', 
            'card_color': '$cardData.card_color', 
            'fond_color': '$cardData.font_color', 
            'fond_color': '$cardData.font_color', 
            'played_total': '$total', 
            'total_win': '$win', 
            'total_points': '$points', 
            'league_id': '$league_id'
          }
        }, {
          '$sort': {
            'total_points': -1
          }
        }, {
          '$group': {
            '_id': '$league_id', 
            'records': {
              '$addToSet': '$$ROOT'
            }
          }
        }, {
          '$project': {
            '_id': 1, 
            'records': {
              '$sortArray': {
                'input': '$records', 
                'sortBy': {
                  'total_points': -1
                }
              }
            }
          }
        })  
          
        let datas =  await playMatchCards_tbl.aggregate(pipeLine).skip(offest).limit(7);
        //console.log(datas)
          let path=await MyBasePath(req,res);    
        let leagueData=[];  
        let abc=await Promise.all( datas.map(async (item)=>{
            item.records.map((i)=>{
            //console.log(i)
            i.card_icon=`${path}/image/assets/predictionCard_img/${i.card_icon}`;
            i.total_win=i.total_win+"%";
          })
            let league_data=await transactions.aggregate([
                                                        {
                                                          '$match': {
                                                            'points_by': 'match', 
                                                            'league_id': item._id, 
                                                            'user_id': newId
                                                          }
                                                        }, {
                                                          '$group': {
                                                            '_id': '$user_id', 
                                                            'points': {
                                                              '$sum': {
                                                                '$toInt': '$points'
                                                              }
                                                            }
                                                          }
                                                        }
                                                      ]);

            let league_points = league_data[0].points;                                          
            let matches = await playMatchCards_tbl.distinct('match_id',{user_id:user_id,league_id:item._id} );
            let played_matches = matches.length;
            let total_matches = await team_matches_tbl.find({league_id:item._id,status:"Played"}).countDocuments()
            let total_played_card = await playMatchCards_tbl.find({league_id:item._id,user_id:user_id}).countDocuments()
            let total_card_win = await playMatchCards_tbl.find({league_id:item._id,user_id:user_id,result:"win"}).countDocuments()
            let rank = await leagueWinUsersRank(item._id,user_id)
            let user_rank=rank.newobj.rank;
            let achievements=await user_achievements.findOne({user_id,league_id:item._id});
            let user_top_rank=Object.keys( achievements).length==0?"0":achievements.rank;
            let league_Data = await team_matches_tbl.find({league_id:item._id,status:"Played"},'league_name league_logo league_id date_utc').sort({_id:-1}).limit(1);
		
            leagueData.push({...item,league_points,played_matches,total_matches,total_played_card,total_card_win,user_rank,user_top_rank,league_Data:league_Data[0]})
          }));

              if(!isEmpty(leagueData)){
                    res.status(200).send({'status':true,'msg':"success",  'body':leagueData });
                  }else{
                    res.status(200).send({'status':true,'msg':"No data found!..",'body':leagueData  });
                  }  
  
          } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':"Server error"});
        }       
    
      }
      
  }

module.exports = predictionController ;   