    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const poll_result_tbl = require('../models/poll_result'); 
    const sport_tbl = require('../models/sport'); 
    const League_tbl = require('../models/League'); 
    const Team_tbl = require('../models/Team'); 
    const Player_tbl = require('../models/Player'); 
    const country_tbl = require('../models/country'); 
    
    
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




module.exports = { poll_percent,all_list_come}