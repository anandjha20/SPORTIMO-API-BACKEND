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

const sendNotificationAdd = (title,msg,type)=>{
                try {
                        let add = new notification_tbl({ title:title,message:msg,type_status:type });
                            add.save((err,data)=>{
                                if(err){  console.log('try error====   ',error); return false; }else{
                                    console.log('sendNotification success data ===   ',data); return true;
                                    }
                            });   
                    } catch (error){ console.log('some error====',error); return false; }

        }


module.exports = { poll_percent,all_list_come,autoincremental,sendNotificationAdd }