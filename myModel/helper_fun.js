  const {isEmpty,getcurntDate,rows_count }  = require("./common_modal");   
  const { userSentNotification }  = require("./Notification_helper");   

    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const poll_result_tbl = require('../models/poll_result'); 
    const sport_tbl = require('../models/sport');  
    const League_tbl = require('../models/League'); 
    const Team_tbl = require('../models/Team'); 
    const Player_tbl = require('../models/Player'); 
    const country_tbl = require('../models/country'); 
    const default_massages_tbl = require('../models/default_massages'); 
    const notification_tbl = require('../models/notification_tbl'); 
     const user_reportings_tbl = require('../models/user_reportings');
     const user_chat_blocks_tbl = require('../models/user_chat_blocks');
     const user_tokens_tbl = require('../models/user_tokens');
     const team_matches = require('../models/team_matches');
    const block_user_tbl = require("../models/block_user");
   const transaction_tbls = require("../models/transactions")    
    const mongoose = require('mongoose');

    const  poll_percent = async(poll_id) =>{
                    console.log("helper_fun call ==",poll_id)

                         try { let callData = await poll_result_tbl.aggregate()
                                      .match({ poll_id : poll_id })
                                      .append({ "$group" : {_id:"$user_ans",   count: { $sum: 1 }} })
                                      .allowDiskUse(true)
                                      .exec();
                              console.log("callData ==",callData);   return callData;     
                          } catch (error) {  console.log('try error',error); return false; }
      
             } 

const all_list_come = async(ids,num) =>{
    try { 
             
                let data = [];  let myName = '';
     if(num == 1){ myName = 'name'; data = await sport_tbl.find({ "_id" : {$in:ids} }).select( { 'name':1 ,'_id':0}).exec();} 
     if(num == 2){ myName = 'league_name'; data = await League_tbl.find({ "_id" : {$in:ids} }).select( { 'league_name':1 ,'_id':0}).exec();} 
     if(num == 3){myName = 'team_name';  data = await Team_tbl.find({ "_id" : {$in:ids} }).select( {'team_name':1 ,'_id':0}).exec();} 
     if(num == 4){myName = 'team_name';  data = await Player_tbl.find({ "_id" : {$in:ids} }).select( {'team_name':1 ,'_id':0 }).exec();} 
     if(num == 5){myName = 'name';  data = await country_tbl.find({ "_id" : {$in:ids} }).select( {'name':1 ,'_id':0 }).exec();} 
             
                if(data.length >0){  
                    let allData =  data.map((item)=> item[myName]); 
                        console.log( 'helper fun call ',allData );
                      return  allData.toString();
                }
                
               
        } catch (error) {  console.log('try error',error); return false; }
}



const autoincremental  = async(seq_id,mymodals) =>{
    try { 
                        
                let total = [] ; 

                total =  await mymodals.find().sort({seq_id: -1}).limit(1); 
            if(total.length )  { console.log("total == ",total )};  
     
            let newSeq = (total.length == 0)? 1 :   Number(total[0][seq_id]) + 1;
                console.log("fgfgg === ",total[0][seq_id]);
                console.log("seq  === ",seq_id );        
         return   newSeq ;    
               
        } catch (error) {   console.log('try error====   ',error); return false; }
} 

const sendNotificationAdd = (my_obj )=>{
                try {
                       // console.log("fun call ==  ",my_obj);  
                       // return false;        
                    let user_id=my_obj.toUser;
                     let title = my_obj.title ;  
                     let msg = my_obj.msg ;  
                     let type_status = my_obj.type_status ;  
                     let category_type = my_obj.category_type ;  
                     let module_id = my_obj.module_id ;  
                     let module_type = my_obj.module_type ;
                     
                     

                       let m_id =  String(module_id);
                      // console.log("sendNotificationAdd == ", module_id);
                    let date = getcurntDate(); 
                       let addData = {title:title,message:msg,type_status:type_status,user_id:user_id };
                       
                       if(! isEmpty(category_type)){addData.category_type = category_type ; }
                       if(! isEmpty(m_id)){addData.module_id = m_id  }
                       if(! isEmpty(module_type)){addData.module_type = module_type ; }
                     
                       if(addData.module_id == 'undefined' ){ addData.module_id = '' }
                       if(addData.user_id == 'undefined' ){ addData.user_id = '' }
                       //console.log("sendData == ", addData);
                          
                        let add = new notification_tbl(addData);
                            add.save((err,data)=>{
                                if(err){  console.log('try error====   ',err); return false; }else{
                                    console.log('sendNotification success data ===   ',data); return true;
                                    }
                            });   
                    } catch (error){ console.log('some error ====',error); return false; }

        }      

     const userBlocked_fun = async( user_id)=>{
          try {
                 let user_rows = await rows_count(user_reportings_tbl,{reported_user_id:user_id,autoBlockStatus:false});
                      console.log("userBlocked_fun row count == ",user_rows );
                      if(user_rows >= 5){
                          /// send notification this user 
                          let title = `your chat has been blocked`;  let details = `your chat has been blocked `;           
                          let sentNoti =  userSentNotification({user_id,title,details});
     
                            let block_status = 1;
                            let addData = new user_chat_blocks_tbl({ user_id,block_status,block_type: "auto"});
                           let response = await addData.save();
                            if(response){ 
                                let dds = user_tbl.findByIdAndUpdate({ _id:user_id},{$set: {chatBlockStatus:block_status }},{new: true},
                                                    (err,updatedUser)=>{ if(err) {  console.log(err); } });
                                                    
                            let dxsd = user_reportings_tbl.updateMany({reported_user_id:user_id,autoBlockStatus:false}, {"$set":{"autoBlockStatus": 1}}, {"multi": true}, (err, writeResult) => {if(err) { console.log(err); } })  ;     
                          }
               
                 }
                } catch (error) {
                        console.log(error); 
                }



        }       
     
      const team_match_addOne = async(Item)=>{
        try { 
             let  match_id = Item.match_id;      
             let  match_name = Item.team_a_short_name+' vs '+Item.team_b_short_name ; 
             let  team_a_short_name = Item.team_a_short_name;  
             let  team_b_short_name = Item.team_b_short_name; 

            let  team_a_id = Item.team_a_id;    let  team_b_id = Item.team_b_id; 
            let  team_a_name = Item.team_a_name;    let  team_b_name = Item.team_b_name; 
            let  date_utc = `${Item.date_utc}  ${Item.time_utc}` ;    let  time_utc = Item.time_utc; 
            let  last_updated = Item.last_updated;    let  status = Item.status; 
          
            let  score_a = Item.score_a;    let  score_b = Item.score_b; 
            let  venue = Item.venue;    let  live = Item.live; 


              //  if(isEmpty(name) || isEmpty(name_ara)  ){
              //      return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
              //       }  
              //       }  
                let add = new team_matches({match_id,match_name,team_a_short_name,team_b_short_name,
                                  team_a_id,team_b_id,team_a_name,team_b_name,date_utc,time_utc,last_updated,
                                  status, score_a,score_b,venue, live }); 
                        add.save((err,data)=>{
                            if(err){ console.log("sport err ==  ", err);  
                            return  false; 
                               }else{  return  data._id; }
                  });  
            } catch (error) { console.log(error);
                     return false; 
            }     
      }

  const myBlockUserIds = async (user_id) => {
    try{
        let id_arr = []; 
      let data = await block_user_tbl.find({from_user:user_id},'to_user ');
        if(! isEmpty(data)) {
          data.map((item)=>{ id_arr.push(item.to_user.toString()) } );
         return  id_arr;   

        }else{
          return id_arr;   
        }
      } catch (error) { console.log(error);
        return [] ; 
         }    

  } 
   // top Most game based Winners list make functions 
  const matchWinUsersRank = async (match_id) => {
    try{
          let obj_match_id =  mongoose.Types.ObjectId(match_id);
           let pipeline  = [] ;
              pipeline.push({$match: {"points_by": "match" }});
               pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_info'} });
               pipeline.push({ $unwind: "$user_info" });
              pipeline.push({ $lookup: {from: 'team_matches', localField: 'match_id', foreignField: '_id', as: 'match_info'} });
              pipeline.push({ $unwind: "$match_info" });
              pipeline.push({$match: {"match_id": obj_match_id }});
               
            // pipeline.push({ $project: {"_id":false,"user_name":"$user_info.name","points":true,
                //       "match_name":"$match_info.match_name",match_id: true,user_id:true } }); 
             
            pipeline.push({ $group: {"_id": { user_id : "$user_id",image : "$user_info.image", user_name : "$user_info.name",match_name : "$match_info.match_name",match_id : "$match_id", date : "$match_info.date_utc" } , "points": { $sum: { "$toInt": "$points"} }, } });
            
            // pipeline.push({ $project: {"_id":false ,"user_name":"$_id.user_name","points": true,
           //    "match_name":"$_id.match_name",match_id: "$_id.match_id" ,user_id:"$_id.user_id" } });

               pipeline.push({ $sort : { "points": -1}});  
                pipeline.push({ $limit :10});  
 
    let allUsersData = await transaction_tbls.aggregate(pipeline).exec();
   
    if(allUsersData){ allUsersData.map((item)=>{ return  (item._id.image == '') ? item._id.image =  '': item._id.image =  "http://34.204.253.168:3000/image/assets/user_img/"+item._id.image ;}); }
    
       
            return  (allUsersData)? allUsersData : false ; 

      } catch (error) { console.log(error);
        return false ; 
         }    

  } 
 
  const matchWinUsersRank_one = async (match_id,user_id) => {
    try{
          let obj_match_id =  mongoose.Types.ObjectId(match_id);
          let obj_user_id =  mongoose.Types.ObjectId(user_id); 
           let pipeline  = [] ;
               pipeline.push({$match: {"points_by": "match"}});
             
               pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_info'} });
               pipeline.push({ $unwind: "$user_info" });
              pipeline.push({ $lookup: {from: 'team_matches', localField: 'match_id', foreignField: '_id', as: 'match_info'} });
              pipeline.push({ $unwind: "$match_info" });
              pipeline.push({$match: {"match_id": obj_match_id }});
              // pipeline.push({ $project: {"_id":false,"user_name":"$user_info.name","points":true,
              //          "match_name":"$match_info.match_name",match_id: true,user_id:true,date:true } });  
          
                       pipeline.push({ $group: {"_id": { user_id : "$user_id",image : "$user_info.image", user_name : "$user_info.name",
                              match_name : "$match_info.match_name",match_id : "$match_id",
                              date : "$match_info.date_utc" } , "points": { $sum: { "$toInt": "$points"} }, } });
           /// date : "$date" 
                        
                               pipeline.push({ $sort : { "points": -1}});  
               // pipeline.push({ $limit :3});  
 
    let allUsersData = await transaction_tbls.aggregate(pipeline).exec();
      let newobj = {}; 
    if(allUsersData){ allUsersData.map((item,index )=>{ 
          (item._id.image == '') ? item._id.image =  '': item._id.image =  "http://34.204.253.168:3000/image/assets/user_img/"+item._id.image ;
        
          item.rank = index + 1 ;
          if(item._id.user_id == user_id ){  newobj =  item; }
         
        
        
        }); }
    
            return  (newobj)? newobj : false ; 

      } catch (error) { console.log(error);
        return false ; 
         }    

  } 

  // top Most overAll  Winners list make functions 
  const AllMatchWinUsersRank = async () => {
    try{
          
           let pipeline  = [] ;
              pipeline.push({$match: {"points_by": "match" }});
               pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_info'} });
               pipeline.push({ $unwind: "$user_info" });
            //   pipeline.push({ $lookup: {from: 'team_matches', localField: 'match_id', foreignField: '_id', as: 'match_info'} });
            //   pipeline.push({ $unwind: "$match_info" });
            //  // pipeline.push({$match: {"match_id": obj_match_id }});
             
            pipeline.push({ $group: {"_id": { user_id : "$user_id",image : "$user_info.image", user_name : "$user_info.name" } , "points": { $sum: { "$toInt": "$points"} }, } });
            
               pipeline.push({ $sort : { "points": -1}});  
                pipeline.push({ $limit :10 });  
 
    let allUsersData = await transaction_tbls.aggregate(pipeline).exec();
   
    if(allUsersData){ allUsersData.map((item)=>{ return  (item._id.image == '') ? item._id.image =  '': item._id.image =  "http://34.204.253.168:3000/image/assets/user_img/"+item._id.image ;}); }
    
       
            return  (allUsersData)? allUsersData : false ; 

      } catch (error) { console.log(error);
        return false ; 
         }    

  } 
  const AllMatchWinUsersRank_one = async (user_id) => {
    try{
          
          let obj_user_id =  mongoose.Types.ObjectId(user_id); 
           let pipeline  = [] ;
               pipeline.push({$match: {"points_by": "match"}});
             
               pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_info'} });
               pipeline.push({ $unwind: "$user_info" });
              pipeline.push({ $lookup: {from: 'team_matches', localField: 'match_id', foreignField: '_id', as: 'match_info'} });
              pipeline.push({ $unwind: "$match_info" });
             
             
                       pipeline.push({ $group: {"_id": { user_id : "$user_id",image : "$user_info.image", user_name : "$user_info.name",
                              match_name : "$match_info.match_name",match_id : "$match_id",
                              date : "$match_info.date_utc" } , "points": { $sum: { "$toInt": "$points"} }, } });
           /// date : "$date" 
                        
                               pipeline.push({ $sort : { "points": -1}});  
               // pipeline.push({ $limit :3});  
 
    let allUsersData = await transaction_tbls.aggregate(pipeline).exec();
      let newobj = {}; 
    if(allUsersData){ allUsersData.map((item,index )=>{ 
          (item._id.image == '') ? item._id.image =  '': item._id.image =  "http://34.204.253.168:3000/image/assets/user_img/"+item._id.image ;
        
          item.rank = index + 1 ;
          if(item._id.user_id == user_id ){  newobj =  item; }
         
        
        
        }); }
    
            return  (newobj)? newobj : false ; 

      } catch (error) { console.log(error);
        return false ; 
         }    

  } 

module.exports = { poll_percent,all_list_come,autoincremental,sendNotificationAdd,userBlocked_fun,team_match_addOne,
            myBlockUserIds,matchWinUsersRank,matchWinUsersRank_one,AllMatchWinUsersRank,AllMatchWinUsersRank_one }