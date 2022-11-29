const axios     = require("axios");
const mongoose = require('mongoose');

const { ArrChunks,isEmpty,getcurntDate,isArray,isObject } = require('../myModel/common_modal'); 

const playMatchCards_tbl = require('../models/playMatchCards');   
const match_cards_tbl = require('../models/match_cards');   
const team_matches_tbl = require('../models/team_matches');   
const user_tbl = require('../models/user');    
const transactions_tbl = require('../models/transactions'); 
const match_event_shot_tbl = require('../models/match_event_shots');   


  const match_card_number  = async(match_id,no) =>{
    try {   
              no  = (no >= 0)? no : 0 ;     /// this is a read card qus 
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      // const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
         const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
            //  console.log("session_url == ",session_url);
               var config = { method: 'get',url: session_url,headers: { 'Authorization': 'Basic '+ encodedToken } };
   
               let response = await axios(config);
         if(response){
           let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.team_stats.stat[no] ;
             
           return datas;
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }


  const match_card_0011  = async(match_id,no) =>{
    try {   
              no  = (no >= 0)? no : 0 ;     /// this is a read card qus 
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
         //  console.log("session_url == ",session_url);
               var config = {  
                 method: 'get',
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
         if(response){
            let team_a = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.score_a;
            let team_b = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.score_b;
             let datas = {team_a,team_b};
           return datas;
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }

  
  const match_card_0013  = async(match_id,no) =>{
    try {   
              no  = (no >= 0)? no : 0 ;     /// this is a read card qus 
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
         //  console.log("session_url == ",session_url);
               var config = {  
                 method: 'get',
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
         if(response){
            let winner = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.winner;
             let datas = {winner};
           return datas;
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }


  const matchCardAllData = async(match_id) =>{
    try {   
            
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       //const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
             
       //  console.log("session_url == ",session_url);
               var config = {  
                 method: 'get',           
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
               if(response){
                 //console.log(response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].round[0].list[0].match)
                 //let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;
                 let datas = response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].round[0].list[0].match;
              return datas;
          }else{   return false; }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }

  const match_data_ara = async(match_id) =>{
    try {   
            
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       //const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json&lang=ar`;
             
       //  console.log("session_url == ",session_url);
               var config = {  
                 method: 'get',           
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
               if(response){
                 //console.log(response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].round[0].list[0].match)
                 //let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;
                 let data = response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].round[0].list[0].match[0];
                 let league_data = response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0];
                 return {data,league_data};
          }else{   return false; }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }
  

  const matchCardEventAllData = async(match_id) =>{
    try {   
            
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       //const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url =  `https://dsg-api.com/custom/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
    
       var config = {  
                 method: 'get',           
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
         if(response){
            let datas = response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].round[0].list[0].match;
          
           return {"events":datas[0].events,"team_a_original_name": datas[0].team_a_original_name,"team_b_original_name": datas[0].team_b_original_name}
         
         }else{ return false; }    
    } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }
/// win point add in user

const add_win_point = async(req,res)=>{
  try {    
                let user_id  = req.user_id.toString();
                let winPoints   = req.point;
                let powerUpPoints = req.powerUpPoints;
                let match_id = req.match_id.toString();
                let card_id  = req.card_id.toString();
              
                let user_play_card_id   = req.user_play_card_id;
              
                if( isEmpty(user_id) || isEmpty(winPoints) || isEmpty(match_id) || isEmpty(card_id)){
                  //console.log("add_win_point fun call ==  1");      
                   return false ; 
                  } 
                   // power ups x times add on to points
                   if(powerUpPoints!=undefined){
                     winPoints  =  winPoints * powerUpPoints ;
                    }    
                   //console.log(winPoints)
               let add = new transactions_tbl({user_id,"points":winPoints,match_id,card_id,type:"credit",points_by:"match",description :"game win"}); 
                 let datas = await add.save();
               let updata  =  user_tbl.findOneAndUpdate({_id: user_id},{$inc : {points :  winPoints } },{new: true}, (err, updatedUser) => {
                               if(err) { console.log(err);}  });
            let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : {active : 0,result: "win"  } },{new: true}, (err, updatedUser) => {
            if(err) { console.log(err);} });   
                          //console.log({datas,updata,playcardUpdate});    
                      return true ;
                         
      } catch (error) { console.log(error); console.log("add_win_point fun call ==  4" );    
             return false ;  }

    }

    /// user card 
  const  playMatchCard_remove = async(req,res)=>{
            try {
               let user_play_card_id   = req.user_play_card_id;
              let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : { active : 0, result: "lose" } },{new: true}, (err, updatedUser) => {
                if(err) { console.log(err); return false}else{ //console.log("remove fun call == ",updatedUser );
                     return true }  }); 
              } catch (error) { console.log(err); return false }
  }

////////////////////////////   this function add on card category number  /////////////////////////
  ///////////////// this function  match result add on user point ////////////////////////////////
  const get_card_result_add_4  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[12] ;
            //console.log(data)

            if(!isEmpty(data)){
              let  live_match_id = req.data[0].match_id ;
                    live_match_id.toString();
              let readcard_point = parseInt(data.team_a) + parseInt(data.team_b);
               let right_ans = ''; 
   
               if( readcard_point > 0 ){ right_ans = "opt_1";}else { right_ans = "opt_2"; }

                let card_id =  mongoose.Types.ObjectId("63453ab5bbdbacfeab46c4fd");
                
             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                    "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                    "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                    "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                    "powerUpPoints": "$play_match_user.powerUpPoints" } });
            

         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                
                if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{    return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }  
   const get_card_result_add_5  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[12] ;
          

            if(!isEmpty(data)){
                let  live_match_id = req.data[0].match_id ;
                                        live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("635f970cee2a7c8e37c04ecc");
                let right_ans = '';  
                if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                 if( data.team_b == data.team_a  ){ right_ans = "opt_3";}
                 
             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                    "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                    "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                    "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                    "powerUpPoints": "$play_match_user.powerUpPoints" } });
            

         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =  await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }  
   
   
  const get_card_result_add_7  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[1] ;
         

            if(!isEmpty(data)){
               
                let  live_match_id = req.data[0].match_id ;
                                live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63453b97bbdbacfeab46c519");
                
             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                    "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                    "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                    "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                    "powerUpPoints": "$play_match_user.powerUpPoints" } });
            

         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                 if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                 if( data.team_b == '0' &&  data.team_a == '0'  ){ right_ans = "opt_4";}else 
                 if( data.team_b ==  data.team_a ){ right_ans = "opt_3";}
            
            
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 

   const get_card_result_add_10  =  async(req,res)=>{
    try {  
           const  goals = req.data[0].events[0].goals//[0].event ;
           
            if(!isEmpty(goals)){
              const  data = req.data[0].events[0].goals[0].event ;
              let  live_match_id = req.data[0].match_id ;
                          live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("634d37d58f16160a62ea52fc");
          
            let pipeline  = [] ;
            
                  pipeline.push({$match: {"match_id": live_match_id}});
                   pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                               "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                 "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                               "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });

                     // console.log("pipeline", pipeline);
                             let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                              // let allUsersData = await team_matches_tbl.find({"match_id":live_match_id} ) ;//.exec();
                              //return allUsersData
                  let first = 0;  let second = 0;
                 if( isArray(data)){
                  data.map((item)=>{ 
                    if(item.game_minute<=45){first=1}else   
                    if(item.game_minute>45){second=1}  
                  })
                }else if(! isObject(data)){
                  if(data.game_minute<=45){first=1}else
                  if(data.game_minute>45){second=1}

                }
                  let result_pass = 0;  let result_fail = 0; 
             if ( !isEmpty(allUsersData) ){
              let right_ans = '';  
                 if( first==1 && second==0 ){ right_ans = "opt_1";}else 
                 if( first==0 && second==1 ){ right_ans = "opt_2";}else 
                 if( first==1 && second==1 ){ right_ans = "opt_3";}else 
                 if( first==0 && second==0 ){ right_ans ="opt_4";} 
              let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                } ));

                let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{    
                let  live_match_id = req.data[0].match_id ;
            live_match_id.toString();
let card_id =  mongoose.Types.ObjectId("634d37d58f16160a62ea52fc");

let pipeline  = [] ;

    pipeline.push({$match: {"match_id": live_match_id}});
     pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
      pipeline.push({ $unwind: "$play_match_user" });
    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
      pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                 "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                   "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                 "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });

       // console.log("pipeline", pipeline);
               let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                // let allUsersData = await team_matches_tbl.find({"match_id":live_match_id} ) ;//.exec();
                //return allUsersData
    let first = 0;  let second = 0;
    let result_pass = 0;  let result_fail = 0; 
if ( !isEmpty(allUsersData) ){
let right_ans = '';  
   if( first==1 && second==0 ){ right_ans = "opt_1";}else 
   if( first==0 && second==1 ){ right_ans = "opt_2";}else 
   if( first==1 && second==1 ){ right_ans = "opt_3";}else 
   if( first==0 && second==0 ){ right_ans ="opt_4";} 
let allData = await Promise.all( allUsersData.map( async (item)=>{ 
  if( right_ans == item.user_option ){  result_pass += 1 ;
    //console.log(item)
            let demo_1  =  await add_win_point(item); 
        }else{      result_fail += 1 ;
          let demo_2  =   await playMatchCard_remove(item);
        }
  } ));

  let obj = {result_pass,result_fail }; 
  return  obj ;
}else{    return false ;   }


           }
       } catch (error) { console.log(error); return false ;  }
   } 


 //////////////////////////
 
 const get_card_result_add_11  =  async(req,res)=>{
  try {  
          let team_a = req.data[0].score_a;
          let team_b = req.data[0].score_b;
           let data = {team_a,team_b};
          if(!isEmpty(data)){
            let  live_match_id = req.data[0].match_id ;
                               live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("63453ccebbdbacfeab46c520");
              
    
           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                 pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                  "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                  "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                  "powerUpPoints": "$play_match_user.powerUpPoints" } });
          

       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
         
                let result_pass = 0;  let result_fail = 0; 
           if (! isEmpty(allUsersData) ){
            let allData = await Promise.allSettled( allUsersData.map( async (item)=>{ let right_ans = '';  
            if( data.team_a >0 &&  data.team_b == 0 ){ right_ans = "opt_1";}else 
            if( data.team_b >0 && data.team_a == 0){ right_ans = "opt_2";}else 
            if( data.team_b >0 && data.team_a >0  ){ right_ans = "opt_3";}
            if( data.team_b == '0' &&  data.team_a == '0' ){ right_ans = "opt_4";}
              
              if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }  
 

 const get_card_result_add_13  =  async(req,res)=>{
  try { 
          let winner = req.data[0].winner;
         
          if(!isEmpty(winner)){
            let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("63453eaabbdbacfeab46c530");
              
    
           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                 pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                  "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                  "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                  "powerUpPoints": "$play_match_user.powerUpPoints" } });
          

       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
         
                let result_pass = 0;  let result_fail = 0; 
           if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
            if( winner == 'team_A'){ right_ans = "opt_1";}else 
            if( winner == 'team_B'){ right_ans = "opt_2";
                }else { right_ans = "opt_3";    }
              
              if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }  
 
 const get_card_result_add_15  =  async(req,res)=>{
  try {  
            /// this function used by red card 
         // const  data = req.data.team_stats.stat[6] ;
         
          let team_a = req.data[0].score_a;
          let team_b = req.data[0].score_b;
           let data = {team_a,team_b};
          if(!isEmpty(data)){
                  let x = data.team_a - data.team_b  ;
                   let resultx =  Math.abs(x); 


                   let  live_match_id = req.data[0].match_id ;
                             live_match_id.toString(); 
            let card_id =  mongoose.Types.ObjectId("6345406abbdbacfeab46c53b");
            
             
   
           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                   pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                 pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                  "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                  "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                  "powerUpPoints": "$play_match_user.powerUpPoints" } });
          

       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
      
                let result_pass = 0;  let result_fail = 0; 
           if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
            if( resultx == 1 || resultx == 2 ){  right_ans = "opt_1";}else 
            if( resultx == 3 || resultx == 4 ){ right_ans = "opt_2";}else 
            if( resultx > 4 ){ right_ans = "opt_3";}else{ right_ans = "opt_4";}
           
            if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }         

   const get_card_result_add_1  =  async(req,res)=>{
    try {  
              /// this function used by Yellow card 
           const  data = req.data[0].team_stats[0].stat[10] ;
        
            if(!isEmpty(data)){
              let  live_match_id = req.data[0].match_id ;
                             live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63651a9a5760f2ffacce3750");
                
             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                   pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                    "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                    "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                    "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                    "powerUpPoints": "$play_match_user.powerUpPoints" } });
            

         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                 if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                  if( data.team_b == data.team_a  ){ right_ans = "opt_3";}
                
                if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }    
  const get_card_result_add_17  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[6] ;
            
          if(!isEmpty(data)){
            let  live_match_id = req.data[0].match_id ;
                       live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("634542edbbdbacfeab46c55e");
                
                
             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                               "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                             "powerUpPoints": "$play_match_user.powerUpPoints" } });


         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( parseInt(data.team_a) >  parseInt(data.team_b) ){ right_ans = "opt_1";}else 
                 if( parseInt(data.team_b) >  parseInt(data.team_a)  ){ right_ans = "opt_2";}else 
                 if( data.team_b == '0' &&  data.team_a == '0'  ){ right_ans = "opt_4";}else 
                 if( parseInt(data.team_a) ==  parseInt(data.team_b) ){ right_ans = "opt_3";}
            
            
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 
   const get_card_result_add_18  =  async(req,res)=>{
    try {  
            //console.log("get_card_result_add_18 == ",req );
                 let  match_id = req.match_id;
                let  right_ans = req.right_ans;
                //console.log("match_id == ",match_id );
                //console.log("right_ans == ",right_ans );
                let card_id =  mongoose.Types.ObjectId("634e5c528f16160a62ea586a");
                
             
           
            
            let pipeline  = [] ;
                 
            pipeline.push({$match: {match_id: match_id}});
             pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
               pipeline.push({ $unwind: "$play_match_user" });
                pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
               pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                               "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                               "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });
       

                            
         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
       
           //console.log('pipeline  == ',pipeline);
           //console.log('allUsersData == ',allUsersData);
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           
       } catch (error) { console.log(error); return false ;  }
   } 
  
   const getCardResult_18_END  =  async(req,res)=>{
    try {  
             
                let  live_match_id = req.data[0].match_id ;
                                live_match_id.toString();
                  let card_id =  mongoose.Types.ObjectId("634e5c528f16160a62ea586a");
                  
  
              //console.log("live_match_id",live_match_id)
              let pipeline  = [] ;
              if(! isEmpty(req.data[0].match_id)){
                  pipeline.push({$match: {match_id: live_match_id}});
                  }
  
                      pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                      pipeline.push({ $unwind: "$play_match_user" });
                      pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                      pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                "powerUpPoints": "$play_match_user.powerUpPoints" } });
  
  
          let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
          //console.log("allUsersData",allUsersData)
          if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                   let demo_1 = ( item.user_option == "opt_3")? await add_win_point(item) : await playMatchCard_remove(item);
                 } ));
    
        
              return  true ;
          }else{    return false ;   }
          
             
  
          //console.log(allUsersData)
        } catch (error) { console.log(error); return false ;  }
      } 
      

   const get_card_result_add_20  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[0] ;
            
          if(!isEmpty(data)){
            let  live_match_id = req.data[0].match_id ;
                         live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63454475bbdbacfeab46c563");
          let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                         "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                             "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                           "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                           "powerUpPoints": "$play_match_user.powerUpPoints" } });


                let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                 if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                  if( data.team_b == data.team_a  ){ right_ans = "opt_3";}
                
                if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }    
   const get_card_result_add_23  =  async(req,res)=>{
        try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[2] ;

            if(!isEmpty(data)){
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63454628bbdbacfeab46c567");
                

             
            let pipeline  = [] ;
             if(! isEmpty(req.data[0].match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                               "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                 "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                               "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                               "powerUpPoints": "$play_match_user.powerUpPoints" } });


         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                 if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                 if( data.team_b == '0' &&  data.team_a == '0'  ){ right_ans = "opt_3";}else 
                 if( data.team_b ==  data.team_a ){ right_ans = "opt_4";}
            
            
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 
  

   const get_card_result_add_36  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data[0].team_stats[0].stat[5] ;
            


            if(!isEmpty(data)){
              let  live_match_id = req.data[0].match_id ;
                          live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("634546cebbdbacfeab46c58c");
                
             
            let pipeline  = [] ;
             if(! isEmpty(req.data.match_id)){
                 pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                               "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                 "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                               "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                               "powerUpPoints": "$play_match_user.powerUpPoints" } });


         let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
           
                  let result_pass = 0;  let result_fail = 0; 
             if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
                 if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
                 if( data.team_b == data.team_a   ){ right_ans = "opt_3";} 
                 
            
            
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

           let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{    return false ;   }


           }else{     return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 



  //////////////////////////// extrat function /////////////////////////////////


  const day_match_getID = async(match_id) =>{
    try {   
         let date = getcurntDate();
          //  let date = "2022-11-21";   

       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      // const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches_day?day=${date}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
      
      
            // console.log("session_url == ",session_url);
               var config = { method: 'get',url: session_url,
                                headers: { 'Authorization': 'Basic '+ encodedToken }
                             };
                   
               let response = await axios(config);
               
               
               if(response){
                 
                 let datas =  isArray(response.data.datasportsgroup.competition)? response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match :response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match ;
           //      console.log(datas)
            let match_id_arr = [];  
            let time_u = Math.floor( new Date(new Date().toUTCString()).getTime() / 1000); 
         //   console.log("curent time == ", new Date().toUTCString());
             
             if(datas.length >0 ) {
                    datas.map((item)=>{
                   let date =  new Date(new Date(item.date_utc+' : '+ item.time_utc).toUTCString());
                   let seconds = Math.floor(date.getTime() /1000)  ;           
                   // GMT 5.30 hours  to utc time    
                       seconds  = seconds + 19800 ;
                  
                       let  startSeconds = seconds-60  ;  
                  
                  //  150 mint ( match end time  ) lat on  9000 seconds
                   let  endSeconds =  seconds + 9000;
                    
                   //  if(time_u >= endSeconds ){
                     if( item.status!="Fixture" ){   
                       match_id_arr.push(item.match_id);    
                //    if(startSeconds <= time_u  && endSeconds >= time_u  ){   
                  //    console.log("day_match_getID  == ",{startSeconds,endSeconds,time_u,match_id:item.match_id});
                  
                  }      
                                             
                  }); 
                  
                 return match_id_arr;  
            }else if(typeof datas === 'object'){
           
        let ms = new Date(datas.date_utc + ' : ' + datas.time_utc ) ;
              
        let seconds = Math.floor(ms.getTime() /1000)  ;           
          // GMT 5.30 hours  to utc time    
          seconds  = seconds + 19800 ;
          //  120 mint ( match end time  ) lat on  7200 seconds
          seconds  = seconds + 7200 ;
         /// console.log("fun call-2 == ",{time_u,seconds});
        
          
        if(time_u >= seconds ){
              match_id_arr.push(datas.match_id);    
            }      
              return match_id_arr;         

            }else{  return false; }    
        }
         } catch (error) { console.log( " modal funtion day_match_getID call == ", error);
                               return false ;  }
  }

  const day_match_getID_test = async(match_id) =>{
    try {   
         let date = getcurntDate();
          //  let date = "2022-11-21";   

       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      // const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches_day?day=${date}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
      
      
            // console.log("session_url == ",session_url);
               var config = { method: 'get',url: session_url,
                                headers: { 'Authorization': 'Basic '+ encodedToken }
                             };
                   
               let response = await axios(config);
               
               
               if(response){
                 
                 let datas =  isArray(response.data.datasportsgroup.competition)? response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match :response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match ;
                 //console.log(datas)
            let match_id_arr = [];  
            let time_u = Math.floor( (new Date().getTime()) / 1000); 
         //   console.log("curent time == ", new Date().toUTCString());
             
             if(datas.length >0 ) {
                    datas.map((item)=>{
                   let date =  new Date(new Date(item.date_utc+' : '+ item.time_utc).toUTCString());
                   let seconds = Math.floor(date.getTime() /1000)  ;           
                   // GMT 5.30 hours  to utc time    
                       seconds  = seconds + 19800 ;
                  
                       let  startSeconds = seconds-60  ;  
                  
                  //  150 mint ( match end time  ) lat on  9000 seconds
                   let  endSeconds =  seconds + 9000;
                  
                   //  if(time_u >= endSeconds ){
                     //  if( item.status!="Fixture" ){   
                       console.log("day_match_getID_test  == ",{startSeconds,endSeconds,time_u,match_id:item.match_id});
                       if(startSeconds <= time_u  && endSeconds >= time_u  ){   
                       match_id_arr.push(item.match_id);    
                  
                  }      
                                             
                  }); 
                  
                 return match_id_arr;  
            }else if(typeof datas === 'object'){
           
        let ms = new Date(datas.date_utc + ' : ' + datas.time_utc ) ;
              
        let seconds = Math.floor(ms.getTime() /1000)  ;           
          // GMT 5.30 hours  to utc time    
          seconds  = seconds + 19800 ;
          //  120 mint ( match end time  ) lat on  7200 seconds
          seconds  = seconds + 7200 ;
         /// console.log("fun call-2 == ",{time_u,seconds});
        
          
        if(time_u >= seconds ){
              match_id_arr.push(datas.match_id);    
            }      
              return match_id_arr;         

            }else{  return false; }    
        }
         } catch (error) { console.log( " modal funtion day_match_getID call == ", error);
                               return false ;  }
  }


  const day_match_add = async(date) =>{
    try {   
         // let date = getcurntDate();
         //   let date = "2022-10-28";   

       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      // const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches_day?day=${date}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
      
      
            // console.log("session_url == ",session_url);
               var config = { method: 'get',url: session_url,
                                headers: { 'Authorization': 'Basic '+ encodedToken }
                             };
                   
               let response = await axios(config);
               
               
               if(response){
                 
                 let data =  isArray(response.data.datasportsgroup.competition)? response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match :response.data.datasportsgroup.competition[0].season[0].discipline[0].gender[0].round[0].match ;
                 
             
             if(data.length >0 ) {
     
              return data;  
     
            }else{  return false; }    
        }
         } catch (error) { console.log( " modal funtion day_match_add call == ", error);
                               return false ;  }
  }


 const card_08_befor_call = async(match_id)=>{
    try {
          //let id = match_id;           
          let data = await matchCardAllData(match_id); 
if(data){
        
           let live_team_a = data.team_stats.stat[1].team_a ;
           let live_team_b = data.team_stats.stat[1].team_b ;
          let shots_count  = await match_event_shot_tbl.find({"match_id":match_id,"event_type":"fouls"},"team_a team_b" );
          //console.log("shots_count data == ",shots_count);
        if( isEmpty(shots_count)) {
      // add event count row   for  match_event_shot table   
      let add = new match_event_shot_tbl({
                 match_id,"event_type":"fouls" , "team_a" : live_team_a, "team_b" : live_team_b });
            let add_rows = await add.save(); 
      }else{

        let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"fouls"},{$set : {"team_a" : live_team_a, "team_b" : live_team_b  } },{new: true}, (err, updatedUser) => {
          if(err) { console.log(err); return false}else{   return true }  }); 

      } 
    
      return true ;
      
   }else{
     return false ;  
        }  
      } catch (error) {console.log(error); return false ; } 
    } 


    const card_34_befor_call = async(match_id)=>{
      try {
            //let id = match_id;           
            let data = await matchCardAllData(match_id); 
       if(data){
          
             let substitutions_count  = data[0].events[0].substitutions[0].event.length ;
            
            let shots_count  = await match_event_shot_tbl.find({"match_id":match_id,"event_type":"card_34"},"shots_count" );
             //console.log("shots_count data == ",shots_count);
          if( isEmpty(shots_count)) {
        // add event count row   for  match_event_shot table   
        let add = new match_event_shot_tbl({
                   match_id,"event_type":"card_34" , "shots_count" : substitutions_count });
              let add_rows = await add.save(); 
        }else{
                  let dx34  = await get_card_result_add_34({data});  
          let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_34"},{$set : {"shots_count" : substitutions_count} },{new: true}, (err, updatedUser) => {
            if(err) { console.log(err); return false}else{   return true }  }); 
  
        } 
      
        return true ;
        
     }else{
       return false ;  
          }  
        } catch (error) {console.log(error); return false ; } 
      } 
  


 const card_39_befor_call = async(match_id) => {
      try {
            let data = await matchCardAllData(match_id); 
              if(data){
                
                  let Red = data[0].team_stats[0].stat[8];
                  let Yellow = data[0].team_stats[0].stat[6];
               
                  let RedTotalPoint    = parseInt(Red.team_a)+parseInt(Red.team_b); 
                  let YellowTotalPoint = parseInt(Yellow.team_a)+parseInt(Yellow.team_b); 
                
                  let totoal_point = RedTotalPoint + YellowTotalPoint;
                  if(totoal_point == "NaN")
                    {
                        console.log ("card_39_befor_call totoal_point == ", totoal_point) ;
                        return false;   
                    }                 

                  let shots_count  = await match_event_shot_tbl.find({"match_id":match_id,"event_type":"card_39"},"shots_count" );
                  //console.log("shots_count data == ",shots_count);
                if( isEmpty(shots_count)) {
              // add event count row   for  match_event_shot table   
              let add = new match_event_shot_tbl({
                        match_id,"event_type":"card_39" , "shots_count" : totoal_point });
                    let add_rows = await add.save(); 
              }else{

                let match_eventUpdate =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"fouls"},{$set : { "shots_count" : totoal_point} },{new: true}, (err, updatedUser) => {
                  if(err) { console.log(err); return false}else{ return true }  }); 

              } 

              return true ;

              }else{ return false ;   }  
        } catch (error) {console.log(error); return false ; } 


 }


const get_card_result_add_08  =  async(req,res)=>{
  try {  
          const  data = req.data[0].team_stats[0].stat[1] ;
          if(!isEmpty(data)){
            let  live_match_id = req.data[0].match_id ;
                            live_match_id.toString();
              let live_team_a = parseInt(data.team_a) ;
              let live_team_b = parseInt(data.team_b) ;
            
              let card_id =  mongoose.Types.ObjectId("634fd1c88ff22506cf6c0b37");
          
        let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"fouls"},"team_a team_b" );
         let right_ans = '';      
        if(!isEmpty(shots_count)){
           
            live_team_a = live_team_a - shots_count[0].team_a;
            live_team_b = live_team_b - shots_count[0].team_b;
            
            if( live_team_a > 0 && live_team_b == 0 ){ right_ans = "opt_1";}else 
            if( live_team_b > 0 && live_team_a == 0 ){ right_ans = "opt_2";}else 
            if( live_team_b > 0 && live_team_a > 0 ){ right_ans = "opt_4";}else 
                { right_ans = "opt_3";} 
             }      

           
          let pipeline  = [] ;
           if(! isEmpty(req.data.match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                             "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });


       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
         
                let result_pass = 0;  let result_fail = 0; 
           if (!isEmpty(allUsersData) ){


            let allData = await Promise.all( allUsersData.map( async (item)=>{
               if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
    } 
 
 const get_card_result_add_37  =  async(req,res)=>{
  try {  
            /// this function used by red card 
          const  red = req.data[0].team_stats[0].stat[12] ;
          const  yellow = req.data[0].team_stats[0].stat[10] ;
          let team_a_total_card = parseInt(red.team_a)+parseInt(yellow.team_a); 
          let team_b_total_card = parseInt(red.team_b)+parseInt(yellow.team_b); 
       
          
          if(!isEmpty(red) && !isEmpty(yellow)){
            let  live_match_id = req.data[0].match_id ;
                         live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("634fcfb28ff22506cf6c0a6a");
       
              /// check right condition option       
              let right_ans = '';  
              if( team_a_total_card >  team_b_total_card ){ right_ans = "opt_1";}else 
              if( team_a_total_card <  team_b_total_card  ){ right_ans = "opt_2";}else 
              if( team_a_total_card == 0 &&  team_b_total_card == 0 ){ right_ans = "opt_3";}else 
              if( team_a_total_card ==  team_b_total_card   ){ right_ans = "opt_4";} 
   
           
          let pipeline  = [] ;
        
               pipeline.push({$match: {match_id: live_match_id}});
              

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                             "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                             "powerUpPoints": "$play_match_user.powerUpPoints" } });


       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
      
       let result_pass = 0;  let result_fail = 0;              
           if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{
            
          
               if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
         //console.log(obj)
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 } 

 const get_card_result_add_39  =  async(req,res)=>{
  try {  
            /// this function used by red card 
   const  data = req.data[0].team_stats[0].stat ;
  
   let Red    = req.data[0].team_stats[0].stat[10];
   let Yellow = req.data[0].team_stats[0].stat[12];
    //console.log(Red,Yellow)
   let RedTotalPoint    = parseInt(Red.team_a)+parseInt(Red.team_b); 
   let YellowTotalPoint = parseInt(Yellow.team_a)+parseInt(Yellow.team_b); 
 
   let totoal_point = RedTotalPoint + YellowTotalPoint;

          if(totoal_point >0 ){
            let  live_match_id = req.data[0].match_id ;
                  live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("634feaf08ff22506cf6c0c46");
          
        let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_39"},"shots_count" );
         let right_ans = '';      
        if(!isEmpty(shots_count)){
           
           let old_point = shots_count[0].shots_count;
               totoal_point = totoal_point - parseInt(old_point);
            if( totoal_point > 0 ){ right_ans = "opt_1";}else { right_ans = "opt_2";} 
             }      

           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                             "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                             "powerUpPoints": "$play_match_user.powerUpPoints" } });


       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
         
                let result_pass = 0;  let result_fail = 0; 
           if (!isEmpty(allUsersData) ){


            let allData = await Promise.all( allUsersData.map( async (item)=>{
               if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 } 


 const get_card_result_add_34  =  async(req,res)=>{
  try {  
        
          const data  = req.data[0].events[0].substitutions[0].event ;
          if(isArray(data)){
            let  live_match_id = req.data[0].match_id ;
                            live_match_id.toString();
              let live_team_a_id = parseInt(req.data[0].team_a_id) ;
              let live_team_b_id = parseInt(req.data[0].team_b_id) ;    
             
            let card_id =  mongoose.Types.ObjectId("6352762a0148247cf84bc758");
          
        let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_34"},"shots_count" );
      
        let right_ans = '';                
        if(!isEmpty(shots_count)){
                let nums = shots_count[0].shots_count;

                //console.log("nums === ",nums);
            let win_team_id  =  data[nums].team_id;
           
            // console.log( "win_team_id == ",win_team_id);
            // console.log( "live_team_a_id == ",live_team_a_id);
            // console.log( "live_team_b_id == ",live_team_b_id);

            if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
            if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}else 
                { right_ans = "opt_3";} 
             }      
   
           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }

                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                             "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                             "powerUpPoints": "$play_match_user.powerUpPoints" } });


       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
         
                let result_pass = 0;  let result_fail = 0; 
           if (!isEmpty(allUsersData) ){
                let allData = await Promise.all( allUsersData.map( async (item)=>{
                        if( right_ans == item.user_option ){  result_pass += 1 ;
                                   let demo_1  =  await add_win_point(item); 
                             }else{ result_fail += 1 ;}
                        } ));

         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
    } 
   
    const get_card_result_add_34_endTimesCall  =  async(req,res)=>{
      try {  
            
              const data  = req.data[0].events[0].substitutions[0].event ;
              if(isArray(data)){
                let  live_match_id = req.data[0].match_id ;
                                live_match_id.toString();
                  let live_team_a_id = parseInt(req.data[0].team_a_id) ;
                  let live_team_b_id = parseInt(req.data[0].team_b_id) ;    
                 
                let card_id =  mongoose.Types.ObjectId("6352762a0148247cf84bc758");
              
            let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_34"},"shots_count" );
          
            let right_ans = 'opt_3';                
            // if(!isEmpty(shots_count)){
            //         let nums = shots_count[0].shots_count;
                    
            //     let win_team_id  =  data[nums].team_id;
               
               
    
            //     if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
            //     if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}else 
            //         { right_ans = "opt_3";} 
            //      }      
    
               
              let pipeline  = [] ;
               if(! isEmpty(req.data[0].match_id)){
                   pipeline.push({$match: {match_id: live_match_id}});
                  }
    
                      pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                      pipeline.push({ $unwind: "$play_match_user" });
                      pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                      pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                 "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                   "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                 "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                 "powerUpPoints": "$play_match_user.powerUpPoints" } });
    
    
           let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
             
                    let result_pass = 0;  let result_fail = 0; 
               if (!isEmpty(allUsersData) ){
    
    
                let allData = await Promise.all( allUsersData.map( async (item)=>{
                   if( right_ans == item.user_option ){  result_pass += 1 ;
                            let demo_1  =  await add_win_point(item); 
                        }else{      result_fail += 1 ;
                          let demo_2  =   await playMatchCard_remove(item);
                        }
                  
               
                  } ));
    
             let obj = {result_pass,result_fail }; 
                  return  obj ;
              }else{    return false ;   }
    
    
             }else{     return false ; 
              
             }
         } catch (error) { console.log(error); return false ;  }
        }  

/// this function make by mohan
 const get_card_result_add_26  =  async(req,res)=>{
      try {  
            /// this function used by red card 
          const  penalty_goals = req.data[0].team_stats[0].stat[8] ;
          const  penalty_missed = req.data[0].team_stats[0].stat[9] ;
          
          let team_a_total_penalty=parseInt(penalty_goals.team_a)+parseInt(penalty_missed.team_a);
          let team_b_total_penalty=parseInt(penalty_goals.team_b)+parseInt(penalty_missed.team_b);
          if(!isEmpty(penalty_goals) && !isEmpty(penalty_goals)){
            let  live_match_id = req.data[0].match_id ;
                            live_match_id.toString();
              let card_id =  mongoose.Types.ObjectId("635f6c2aa4e76d45363a6c5d");
              
  
           
          let pipeline  = [] ;
           if(! isEmpty(req.data[0].match_id)){
               pipeline.push({$match: {match_id: live_match_id}});
              }
  
                  pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                  pipeline.push({ $unwind: "$play_match_user" });
                  pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                             "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                               "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                             "powerUpPoints": "$play_match_user.powerUpPoints" } });
  
  
       let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                let result_pass = 0;  let result_fail = 0; 
           if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
               if( team_a_total_penalty >  team_b_total_penalty ){ right_ans = "opt_1";}else 
               if( team_a_total_penalty <  team_b_total_penalty  ){ right_ans = "opt_2";}else 
               if( team_a_total_penalty ==  team_b_total_penalty  ){ right_ans = "opt_3";}
          
              //console.log(right_ans)
               if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
           
              } ));
  
         let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }
  
  
         }else{     return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
  } 

  /// this function make by mohan
   const get_card_result_add_31  =  async(req,res)=>{
    try {  
          /// this function used by red card 
        const  data = req.data[0].team_stats[0].stat[3] ;
       //console.log(data)
        if(!isEmpty(data)){
          let  live_match_id = req.data[0].match_id ;
                          live_match_id.toString();
            let card_id =  mongoose.Types.ObjectId("635f77df80281e5ba3c05c0a");
            
  
         
        let pipeline  = [] ;
         if(! isEmpty(req.data[0].match_id)){
             pipeline.push({$match: {match_id: live_match_id}});
            }
  
                pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                pipeline.push({ $unwind: "$play_match_user" });
                pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                           "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                             "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                           "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                           "powerUpPoints": "$play_match_user.powerUpPoints" } });
  
  
     let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
       //console.log(allUsersData)
              let result_pass = 0;  let result_fail = 0; 
         if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
             if( data.team_a >  data.team_b ){ right_ans = "opt_1";}else 
             if( data.team_b >  data.team_a  ){ right_ans = "opt_2";}else 
             if( data.team_b ==  data.team_a ){ right_ans = "opt_3";}
        
             //console.log(right_ans)
             if( right_ans == item.user_option ){  result_pass += 1 ;
                      let demo_1  =  await add_win_point(item); 
                  }else{      result_fail += 1 ;
                    let demo_2  =   await playMatchCard_remove(item);
                  }
            
         
            } ));
  
       let obj = {result_pass,result_fail }; 
            return  obj ;
        }else{    return false ;   }
        
  
       }else{     return false ; 
        
       }
   } catch (error) { console.log(error); return false ;  }
  } 

const getCardGreaterThan_16 = async(match_id)=>{
  try {   
      // this match id get data
    let liveData = await matchCardAllData(match_id); 
     // check match id get data
    if(liveData){

    ///  get short on target event array
      const data  = liveData[0].events[0].shots_on_target[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData[0].team_a_id) ;
        let live_team_b_id = parseInt(liveData[0].team_b_id) ;    
   
   ///  get card-16 priveas array index number
  let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_16"},"shots_count" );
     
    if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  



 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_16"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("635fbe7ac52f44e554d78390");
                
             
    let pipeline  = [] ;
     
          pipeline.push({$match: {match_id : match_id}});
          pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
          pipeline.push({ $unwind: "$play_match_user" });
          pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
                                 "play_match_user.time_range_start":{ $lte : game_minute } ,
                                  "play_match_user.time_range_end":{ $gte : game_minute } 
                                }});

            pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                            "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                            "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
                            "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                            "powerUpPoints": "$play_match_user.powerUpPoints" } });

    let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                                   
                            
       
        //console.log( "live game mint nums  ==========", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
         if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  }else 
         if( item.user_option == "opt_3" ){    let demo_1  =  await add_win_point(item);  }
          } ));
          
       
        return true ;
    }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      console.log( "match_event_shot_tbl CARD ADD ON  card_16 == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_16" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 

    }else{ 
     return false ; 
          }

  } catch (error) { console.log( error); return false ;  }
}


const getCardResult_16_END  =  async(req,res)=>{
  try {  
           
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("635fbe7ac52f44e554d78390");
                

            //console.log("live_match_id",live_match_id)
            let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        //console.log("allUsersData",allUsersData)
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                 let demo_1 = ( item.user_option == "opt_4")? await add_win_point(item) : await playMatchCard_remove(item);
               } ));
  
      
            return  true ;
        }else{    return false ;   }
        
           

        //console.log(allUsersData)
      } catch (error) { console.log(error); return false ;  }
    } 
    
    const getCardGreaterThan_03 = async(match_id)=>{
      try {   
        // this match id get data
    let liveData = await matchCardAllData(match_id); 
     // check match id get data
     if(liveData){

    ///  get short on target event array
      const data  = liveData[0].events[0].bookings[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData.team_a_id) ;
        let live_team_b_id = parseInt(liveData.team_b_id) ;    
   
   ///  get card-16 priveas array index number
   let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_03_06"},"shots_count" );
   
   if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums && data[nums].type=="yellow_card"){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  

                  
                  
 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_03_06"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("635fc08f56ae547beb457bee");
    
    
    let pipeline  = [] ;
    
    pipeline.push({$match: {match_id : match_id}});
    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
    pipeline.push({ $unwind: "$play_match_user" });
    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
    "play_match_user.time_range_start":{ $lte : game_minute } ,
    "play_match_user.time_range_end":{ $gte : game_minute } 
  }});
  
  pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
  "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
  "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
  "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
  "powerUpPoints": "$play_match_user.powerUpPoints" } });
  
  let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
  
  
  
        //console.log( "live game mint nums  ==========", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
        if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  }else 
         if( item.user_option == "opt_3" ){    let demo_1  =  await add_win_point(item);  }
          } ));
          
          
          return true ;
        }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      //console.log( "match_event_shot_tbl CARD ADD ON   == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_03_06" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 

            }else{ ; return false ; 
          }
          
        } catch (error) { console.log( error); return false ;  }
      }
      
  const getCardResult_03_END  =  async(req,res)=>{
    try {  
              
                let  live_match_id = req.data[0].match_id ;
                                live_match_id.toString();
                  let card_id =  mongoose.Types.ObjectId("635fc08f56ae547beb457bee");
                  
  
              
              let pipeline  = [] ;
              if(! isEmpty(req.data[0].match_id)){
                  pipeline.push({$match: {match_id: live_match_id}});
                  }
  
                      pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                      pipeline.push({ $unwind: "$play_match_user" });
                      pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                      pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                                "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                  "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                                "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                                "powerUpPoints": "$play_match_user.powerUpPoints" } });
  
  
          let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
          if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                    let demo_1 = ( item.user_option == "opt_4")? await add_win_point(item) : await playMatchCard_remove(item);
                  } ));
    
        
              return  true ;
          }else{    return false ;   }
          
              
  
            //console.log(allUsersData)
    } catch (error) { console.log(error); return false ;  }
  } 
     
  const getCardGreaterThan_06 = async(match_id)=>{
        try {   
          // this match id get data
          let liveData = await matchCardAllData(match_id); 
     // check match id get data
    if(liveData){

    ///  get short on target event array
      const data  = liveData[0].events[0].bookings[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData.team_a_id) ;
        let live_team_b_id = parseInt(liveData.team_b_id) ;    
   
   ///  get card-16 priveas array index number
  let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_03_06"},"shots_count" );
     
    if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums && data[nums].type=="red_card"){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  



 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_03_06"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("6364c313fde4ad7574244a18");
                
             
    let pipeline  = [] ;
     
          pipeline.push({$match: {match_id : match_id}});
          pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
          pipeline.push({ $unwind: "$play_match_user" });
          pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
                                 "play_match_user.time_range_start":{ $lte : game_minute } ,
                                  "play_match_user.time_range_end":{ $gte : game_minute } 
                                }});

            pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                            "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                            "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
                            "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                            "powerUpPoints": "$play_match_user.powerUpPoints" } });

    let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                                   
                            
       
        //console.log( "live game mint nums  ==========", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
         if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  } 
         
          } ));
          
       
        return true ;
    }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      //console.log( "match_event_shot_tbl CARD ADD ON  card_06 == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_06" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 

    }else{ ; return false ; 
          }

  } catch (error) { console.log( error); return false ;  }
}



const getCardResult_06_END  =  async(req,res)=>{
  try {  
           
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("6364c313fde4ad7574244a18");
                

            
            let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                 let demo_1 = ( item.user_option == "opt_3")? await add_win_point(item) : await playMatchCard_remove(item);
               } ));
  
      
            return  true ;
        }else{    return false ;   }
        
           

          //console.log(allUsersData)
  } catch (error) { console.log(error); return false ;  }
}

// pridiction card 
const getCardGreaterThan_09 = async(match_id)=>{
  try {   
      // this match id get data
    let liveData = await matchCardAllData(match_id); 
     // check match id get data
    if(liveData){

    ///  get short on target event array
      const data  = liveData[0].events[0].fouls[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData[0].team_a_id) ;
        let live_team_b_id = parseInt(liveData[0].team_b_id) ;    
   
   ///  get card-16 priveas array index number
  let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_09"},"shots_count" );
     
    if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  



 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_09"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("636211cb5037249041b1486c");
                
             
    let pipeline  = [] ;
     
          pipeline.push({$match: {match_id : match_id}});
          pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
          pipeline.push({ $unwind: "$play_match_user" });
          pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
                                 "play_match_user.time_range_start":{ $lte : game_minute } ,
                                  "play_match_user.time_range_end":{ $gte : game_minute } 
                                }});

            pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                            "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                            "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
                            "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                            "powerUpPoints": "$play_match_user.powerUpPoints" } });

    let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                                   
     //  return allUsersData ;                  
       
        //console.log( "live game mint nums  ==========", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
         if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  }else 
         if( item.user_option == "opt_3" ){    let demo_1  =  await add_win_point(item);  }
          } ));
          
       
        return  true ;
    }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      console.log( "match_event_shot_tbl CARD ADD ON   == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_09" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 
       
    }else{ ; return false ; 
          }

  } catch (error) { console.log( error); return false ;  }
}


const getCardResult_09_END  =  async(req,res)=>{
  try {  
           
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("636211cb5037249041b1486c");
                

            
            let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                 let demo_1 = ( item.user_option == "opt_4")? await add_win_point(item) : await playMatchCard_remove(item);
               } ));
  
      
            return  true ;
        }else{    return false ;   }
        
           

          //console.log(allUsersData)
  } catch (error) { console.log(error); return false ;  }
} 


// pridiction card -19 functions 
const getCardGreaterThan_19 = async(match_id)=>{
  try {   
      // this match id get data
    let liveData = await matchCardAllData(match_id); 
     // check match id get data
    if(liveData){
        ///  get short on target event array
      const data  = liveData[0].events[0].corners[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData[0].team_a_id) ;
        let live_team_b_id = parseInt(liveData[0].team_b_id) ;    
   
   ///  get card-16 priveas array index number
  let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_19"},"shots_count" );
     
    if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  



 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_09"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("63627be29f1c3eb8594fa7c4");
                
             
    let pipeline  = [] ;
     
          pipeline.push({$match: {match_id : match_id}});
          pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
          pipeline.push({ $unwind: "$play_match_user" });
          pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
                                 "play_match_user.time_range_start":{ $lte : game_minute } ,
                                  "play_match_user.time_range_end":{ $gte : game_minute } 
                                }});

            pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                            "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                            "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
                            "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                            "powerUpPoints": "$play_match_user.powerUpPoints" } });

    let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                                   
     //  return allUsersData ;                  
       
        //console.log( "live game mint nums  ==========", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
         if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  }else 
         if( item.user_option == "opt_3" ){    let demo_1  =  await add_win_point(item);  }
          } ));
          
       
        return  true ;
    }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      //console.log( "match_event_shot_tbl CARD ADD ON  card_19 == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_19" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 
       
    }else{ ; return false ; 
          }

  } catch (error) { console.log( error); return false ;  }
}


const getCardResult_19_END  =  async(req,res)=>{
  try {  
           
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63627be29f1c3eb8594fa7c4");
          let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                 let demo_1 = ( item.user_option == "opt_4")? await add_win_point(item) : await playMatchCard_remove(item);
               } ));
  
      
            return  true ;
        }else{    return false ;   }
        
           

          //console.log(allUsersData)
  } catch (error) { console.log(error); return false ;  }
  } 

// pridiction card -19 functions 
const getCardGreaterThan_22 = async(match_id)=>{
  try {   
      // this match id get data
    let liveData = await matchCardAllData(match_id); 
     // check match id get data
    if(liveData){
        ///  get short on target event array
      const data  = liveData[0].events[0].offside[0].event ;
   
      let  live_match_id = liveData[0].match_id ;
                      live_match_id.toString();
        let live_team_a_id = parseInt(liveData[0].team_a_id) ;
        let live_team_b_id = parseInt(liveData[0].team_b_id) ;    
   
   ///  get card-16 priveas array index number
  let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_22"},"shots_count" );
     
    if(!isEmpty(shots_count)){
          let nums         = parseInt(shots_count[0].shots_count);
        if(data.length > nums){
              let win_team_id  =  data[nums].team_id;
              let game_minute  =  parseInt(data[nums].game_minute) ;
              let right_ans = '';    
                  

                  if( live_team_a_id  == win_team_id ){ right_ans = "opt_1";}else 
                  if( live_team_b_id  == win_team_id ){ right_ans = "opt_2";}
                  



 let match_eventUpdate  =  match_event_shot_tbl.findOneAndUpdate({"match_id":match_id,"event_type":"card_09"},{$set : {"shots_count" : nums+1} },{new: true}, (err, updatedUser) => {
                                     if(err) { console.log(err); return false}else{   return true }  }); 


                                  
//////////////////////////////////////////
    let card_id =  mongoose.Types.ObjectId("63628a07df37c3687a28fe68");
                
             
    let pipeline  = [] ;
     
          pipeline.push({$match: {match_id : match_id}});
          pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
          pipeline.push({ $unwind: "$play_match_user" });
          pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true,
                                 "play_match_user.time_range_start":{ $lte : game_minute } ,
                                  "play_match_user.time_range_end":{ $gte : game_minute } 
                                }});

            pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                            "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                            "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                            "time_range_start":"$play_match_user.time_range_start","time_range_end":"$play_match_user.time_range_end",
                            "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                            "powerUpPoints": "$play_match_user.powerUpPoints" } });

    let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
                                   
     //  return allUsersData ;                  
       
        //console.log( "live game mint nums ======", game_minute);                             
                             
    if (! isEmpty(allUsersData) ){
      let allData = await Promise.all( allUsersData.map( async (item)=>{ 
         if( right_ans ==  item.user_option ){    let demo_1  =  await add_win_point(item);  }else 
         if( item.user_option == "opt_3" ){    let demo_1  =  await add_win_point(item);  }
          } ));
          
       
        return  true ;
    }else{ //  
     return false ;   }
    
          }else{// console.log( "table array length == ", nums ); console.log( "live array length == ", data.length );   
                  return false; }

        }else{      //console.log( "match_event_shot_tbl CARD ADD ON  card_19 == " );
                ///  add card-16 array index number in match_event_shot_tbl           
                let add = new match_event_shot_tbl({
                            match_id,"event_type":"card_22" , "shots_count" : 0 });
                        let add_rows = await add.save(); 
              } 
       
    }else{ ; return false ; 
          }

  } catch (error) { console.log( error); return false ;  }
}


const getCardResult_22_END  =  async(req,res)=>{
  try {  
           
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("63628a07df37c3687a28fe68");
          let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                 let demo_1 = ( item.user_option == "opt_4")? await add_win_point(item) : await playMatchCard_remove(item);
               } ));
  
      
            return  true ;
        }else{    return false ;   }
        
           

          //console.log(allUsersData)
  } catch (error) { console.log(error); return false ;  }
  } 

//////////////=====================================//////////////////////////////
const get_card_result_add_21  =  async(req,res)=>{
  try {  
                let  match_id = req.match_id;
              let  right_ans = req.right_ans;
              let card_id =  mongoose.Types.ObjectId("6368bb53cda1dd828be194a2");
              
            
          
          
          let pipeline  = [] ;
                
          pipeline.push({$match: {match_id: match_id}});
            pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
              pipeline.push({ $unwind: "$play_match_user" });
              pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
              pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                              "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints"  } });
      

                          
        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
      
          //console.log('allUsersData == ',allUsersData);
                let result_pass = 0;  let result_fail = 0; 
            if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ 
              
                if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
            
              } ));

          let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


          
      } catch (error) { console.log(error); return false ;  }
  } 

  const getCardResult_21_END  =  async(req,res)=>{
  try {  
            
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("6368bb53cda1dd828be194a2");
                

            //console.log("live_match_id",live_match_id)
            let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints"  } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        //console.log("allUsersData",allUsersData)
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                  let demo_1 = ( item.user_option == "opt_3")? await add_win_point(item) : await playMatchCard_remove(item);
                } ));
  
      
            return  true ;
        }else{    return false ;   }
        
            

        //console.log(allUsersData)
      } catch (error) { console.log(error); return false ;  }
    } 
  
const get_card_result_add_02  =  async(req,res)=>{
  try {  
              //console.log(req)
              let  match_id = req.match_id;
              let  right_ans = req.right_ans;
              let card_id =  mongoose.Types.ObjectId("6368f5fcfa650acac36b0384");
              
            
          
          
          let pipeline  = [] ;
                
          pipeline.push({$match: {match_id: match_id}});
            pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
              pipeline.push({ $unwind: "$play_match_user" });
              pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
              pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                              "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active" ,
                              "powerUpPoints": "$play_match_user.powerUpPoints" } });
      

                          
        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
      
          //console.log('allUsersData == ',allUsersData);
                let result_pass = 0;  let result_fail = 0; 
            if (! isEmpty(allUsersData) ){
            let allData = await Promise.all( allUsersData.map( async (item)=>{ 
              
                if( right_ans == item.user_option ){  result_pass += 1 ;
                        let demo_1  =  await add_win_point(item); 
                    }else{      result_fail += 1 ;
                      let demo_2  =   await playMatchCard_remove(item);
                    }
              
            
              } ));

          let obj = {result_pass,result_fail }; 
              return  obj ;
          }else{    return false ;   }


          
      } catch (error) { console.log(error); return false ;  }
  } 

  const getCardResult_02_END  =  async(req,res)=>{
    try {  
            
              let  live_match_id = req.data[0].match_id ;
                              live_match_id.toString();
                let card_id =  mongoose.Types.ObjectId("6368f5fcfa650acac36b0384");
                

            //console.log("live_match_id",live_match_id)
            let pipeline  = [] ;
            if(! isEmpty(req.data[0].match_id)){
                pipeline.push({$match: {match_id: live_match_id}});
                }

                    pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
                    pipeline.push({ $unwind: "$play_match_user" });
                    pipeline.push({$match: {"play_match_user.card_id": card_id,"play_match_user.active":true }});
                    pipeline.push({ $project: {"_id":0,"user_option":"$play_match_user.user_option","point": "$play_match_user.point",
                              "ans":"$play_match_user.ans", "user_play_card_id":"$play_match_user._id",
                                "user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id",
                              "match_id": "$play_match_user.match_id","active": "$play_match_user.active",
                              "powerUpPoints": "$play_match_user.powerUpPoints"  } });


        let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();
        //console.log("allUsersData",allUsersData)
        if (! isEmpty(allUsersData) ){
          let allData = await Promise.all( allUsersData.map( async (item)=>{ 
                  let demo_1 = ( item.user_option == "opt_2")? await add_win_point(item) : await playMatchCard_remove(item);
                } ));
  
      
            return  true ;
        }else{    return false ;   }
        
            

        //console.log(allUsersData)
      } catch (error) { console.log(error); return false ;  }
    } 
 

//////////////=====================================//////////////////////////////

module.exports = {day_match_getID_test,match_data_ara,day_match_getID,day_match_add,match_card_number,match_card_0011,match_card_0013,matchCardAllData,matchCardEventAllData,get_card_result_add_4,
                    get_card_result_add_7,get_card_result_add_1, get_card_result_add_11,get_card_result_add_13,
                    get_card_result_add_15,get_card_result_add_17, get_card_result_add_20,get_card_result_add_23,
                    get_card_result_add_36,get_card_result_add_10,get_card_result_add_18,getCardResult_18_END,card_08_befor_call,get_card_result_add_08,
                    get_card_result_add_37,card_39_befor_call,get_card_result_add_39,card_34_befor_call,get_card_result_add_34,
                    get_card_result_add_34_endTimesCall,get_card_result_add_26,get_card_result_add_31,get_card_result_add_5,
                    getCardGreaterThan_16,getCardResult_16_END,getCardGreaterThan_03, getCardResult_03_END,getCardGreaterThan_06,getCardResult_06_END,getCardGreaterThan_09,
                    getCardResult_09_END,getCardGreaterThan_19,getCardResult_19_END,getCardGreaterThan_22,getCardResult_22_END,
                    get_card_result_add_21,getCardResult_21_END,get_card_result_add_02,getCardResult_02_END}