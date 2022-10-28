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
            let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;
              return datas;
          }else{   return false; }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }
  const matchCardEventAllData = async(match_id) =>{
    try {   
            
       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
       //const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
    
       var config = {  
                 method: 'get',           
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
   
               let response = await axios(config);
         if(response){
            let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;
         
           return {"events":datas.events,"team_a_original_name": datas.team_a_original_name,"team_b_original_name": datas.team_b_original_name}
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }
/// win point add in user

const add_win_point = async(req,res)=>{
  try {    
                let user_id  = req.user_id.toString();
                let points   = req.point;
                let match_id = req.match_id.toString();
                let card_id  = req.card_id.toString();
              
                let user_play_card_id   = req.user_play_card_id;
              
                if( isEmpty(user_id) || isEmpty(points) || isEmpty(match_id) || isEmpty(card_id)){
                  console.log("add_win_point fun call ==  1");       return false ; 
                  } 


          let userinfo =  await  user_tbl.findOne({_id: user_id},'points');
          if(! isEmpty(userinfo)){
               
               let add = new transactions_tbl({user_id,points,match_id,card_id,type:"credit",points_by:"match",description :"game win"}); 
                 let datas = await add.save();
              let new_point = userinfo.points + points;
               let updata  =  user_tbl.findOneAndUpdate({_id: user_id},{$set : {points :  new_point } },{new: true}, (err, updatedUser) => {
                               if(err) { console.log(err);}  });
            let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : {active : 0,result: "win"  } },{new: true}, (err, updatedUser) => {
            if(err) { console.log(err);} });   
                          console.log("add_win_point fun call ==  2" );    
                      return true ;
           }else{  console.log("add_win_point fun call ==  3" );      return false ; }              
      } catch (error) { console.log(error);   console.log("add_win_point fun call ==  4" );    
             return false ; //    return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          

          }

    }

    /// user card 
  const  playMatchCard_remove = async(req,res)=>{
            try {
               let user_play_card_id   = req.user_play_card_id;
              let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : { active : 0, result: "lose" } },{new: true}, (err, updatedUser) => {
                if(err) { console.log(err); return false}else{ console.log("remove fun call == ",updatedUser );   return true }  }); 
              } catch (error) { console.log(err); return false }
  }

////////////////////////////   this function add on card category number  /////////////////////////
  ///////////////// this function  match result add on user point ////////////////////////////////
  const get_card_result_add_4  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[12] ;


            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;
               let readcard_point = parseInt(data.team_a) + parseInt(data.team_b);
               let right_ans = ''; 
   
               if( readcard_point > 0 ){ right_ans = "opt_1";}else { right_ans = "opt_2"; }

                let card_id =  mongoose.Types.ObjectId("63453ab5bbdbacfeab46c4fd");
                
             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }  
   const get_card_result_add_5  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[12] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("63453ab5bbdbacfeab46c4fd");
                
             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }  
   
   
  const get_card_result_add_7  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[1] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("63453b97bbdbacfeab46c519");
                
             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 

   const get_card_result_add_10  =  async(req,res)=>{
    try {  
           const  data = req.data.events.goals.event ;
                //  console.log( "get_card_result_add_10" , data)
            if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;
              
              let card_id =  mongoose.Types.ObjectId("634d37d58f16160a62ea52fc");
          
            let pipeline  = [] ;
            if(! isEmpty(live_match_id)){
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
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( first==1 && second==0 ){ right_ans = "opt_1";}else 
                 if( first==0 && second==1 ){ right_ans = "opt_2";}else 
                 if( first==1 && second==1 ){ right_ans = "opt_3";}else 
                 if( first==0 && second==0 ){ right_ans ="opt_4";} 
                 
                 
            
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

                let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 


 //////////////////////////
 
 const get_card_result_add_11  =  async(req,res)=>{
  try {  
          let team_a = req.data.score_a;
          let team_b = req.data.score_b;
           let data = {team_a,team_b};

          if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;

              let card_id =  mongoose.Types.ObjectId("63453ccebbdbacfeab46c520");
              
    
           
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
          }else{  console.log( "no data found!.. ");  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }  
 

 const get_card_result_add_13  =  async(req,res)=>{
  try { 
          let winner = req.data.winner;
         
          if(!isEmpty(winner)){
              let  live_match_id = req.data.match_id;

              let card_id =  mongoose.Types.ObjectId("63453eaabbdbacfeab46c530");
              
    
           
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
          }else{  console.log( "no data found!.. ");  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }  
 
 const get_card_result_add_15  =  async(req,res)=>{
  try {  
            /// this function used by red card 
         // const  data = req.data.team_stats.stat[6] ;
         
          let team_a = req.data.score_a;
          let team_b = req.data.score_b;
           let data = {team_a,team_b};
        console.log("data == ",data); 
          if(!isEmpty(data)){
                  let x = data.team_a - data.team_b  ;
                   let resultx =  Math.abs(x); 


              let  live_match_id = req.data.match_id;
             // console.log("live_match_id == ",live_match_id);       
            let card_id =  mongoose.Types.ObjectId("6345406abbdbacfeab46c53b");
            
             
   
           
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
          }else{  console.log( "no data found!.. ");  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 }         

   const get_card_result_add_1  =  async(req,res)=>{
    try {  
              /// this function used by Yellow card 
           const  data = req.data.team_stats.stat[10] ;
        
            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("634542edbbdbacfeab46c55e");
                
             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }    
  const get_card_result_add_17  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[6] ;
          if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;
                let card_id =  mongoose.Types.ObjectId("634542edbbdbacfeab46c55e");
                
                
             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 
   const get_card_result_add_18  =  async(req,res)=>{
    try {  
            console.log("get_card_result_add_18 == ",req );
                 let  match_id = req.match_id;
                let  right_ans = req.right_ans;
                console.log("match_id == ",match_id );
                console.log("right_ans == ",right_ans );
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
       
           console.log('pipeline  == ',pipeline);
           console.log('allUsersData == ',allUsersData);
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           
       } catch (error) { console.log(error); return false ;  }
   } 
   
   const get_card_result_add_20  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[0] ;
          if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("63454475bbdbacfeab46c563");
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   }    
      const get_card_result_add_23  =  async(req,res)=>{
        try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[2] ;
           
            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("63454628bbdbacfeab46c567");
                

             
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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 
  
const get_card_result_add_34  =  async(req,res)=>{
    try {  
          let team_a_name=req.data.team_a_name;
          let team_b_name=req.data.team_b_name;

          const  data = req.data.events.saves.event ;
              console.log("===jk===  ", data); 
            if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;
              
 
              let card_id =  mongoose.Types.ObjectId("6352762a0148247cf84bc758");
          
            let pipeline  = [] ;
            if(! isEmpty(live_match_id)){
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
                             
                  let team_a = 0;  let team_b = 0;
                  if(!isEmpty(data)){
                  data.map((item)=>{
                    if(item.team==team_a_name){team_a=1}else
                    if(item.team==team_b_name){team_b=1} 
                  })
                }
               
                let result_pass = 0;  let result_fail = 0;
              if (! isEmpty(allUsersData) ){
              let allData = await Promise.all( allUsersData.map( async (item)=>{ let right_ans = '';  
                 if( team_a==0 && team_b==0 ){ right_ans = "opt_1";}else 
                 if( team_a==1 && team_b==0 ){ right_ans = "opt_3";}else 
                 if( team_a==0 && team_b==1 ){ right_ans ="opt_4";}else{right_ans ="opt_2";} 
                 
            console.log(right_ans)
                 if( right_ans == item.user_option ){  result_pass += 1 ;
                          let demo_1  =  await add_win_point(item); 
                      }else{      result_fail += 1 ;
                        let demo_2  =   await playMatchCard_remove(item);
                      }
                
             
                } ));

                let obj = {result_pass,result_fail }; 
                return  obj ;
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 

   const get_card_result_add_36  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[5] ;
            


            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

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
                               "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });


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
            }else{  console.log( "no data found!.. ");  return false ;   }


           }else{  console.log( "Result not show ");   return false ; 
            
           }
       } catch (error) { console.log(error); return false ;  }
   } 



  //////////////////////////// extrat function /////////////////////////////////

    
  const day_match_getID = async(match_id) =>{
    try {   
           let date = getcurntDate();
          //  let date = "2022-10-1";   

       const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      // const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
       const session_url = `https://dsg-api.com/custom/zimbori/soccer/get_matches_day?day=${date}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
      
      
            // console.log("session_url == ",session_url);
               var config = {  
                 method: 'get',
                 url: session_url,
                 headers: { 'Authorization': 'Basic '+ encodedToken }
               };
                   
               let response = await axios(config);
                

         if(response){
            let datas = response.data.datasportsgroup.competition[0].season.discipline.gender.round.match;
            let match_id_arr = [];  
            let time_u = Math.floor( new Date(new Date().toUTCString()).getTime() / 1000); 
         //   console.log("curent time == ", new Date().toUTCString());
              console.log("res data type == ", typeof datas );
              console.log("datas values  == ", datas.length );
             if(datas.length >0 ) {
                    datas.map((item)=>{
                   let date =  new Date(new Date(item.date_utc+' : '+ item.time_utc).toUTCString());
                   let seconds = date.getTime() / 1000 ; 
                      /// 92 min = 5,520 sec add on 
                       seconds = seconds + 5520;
                     console.log("fun call-1 == ",{time_u,seconds});

                   if(time_u >= seconds ){
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
          console.log("fun call-2 == ",{time_u,seconds});
        
          
        if(time_u >= seconds ){
              match_id_arr.push(datas.match_id);    
            }      
              return match_id_arr;         

            }else{  return false; }    
        }
         } catch (error) { console.log( " modal funtion day_match_getID call == ", error);
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
          console.log("shots_count data == ",shots_count);
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

 const card_39_befor_call = async(match_id) => {
      try {
            let data = await matchCardAllData(match_id); 
              if(data){
                
                  let Red = data.team_stats.stat[8];
                  let Yellow = data.team_stats.stat[6];
               
                  let RedTotalPoint    = parseInt(Red.team_a)+parseInt(Red.team_b); 
                  let YellowTotalPoint = parseInt(Yellow.team_a)+parseInt(Yellow.team_b); 
                
                  let totoal_point = RedTotalPoint + YellowTotalPoint;

                 

                  let shots_count  = await match_event_shot_tbl.find({"match_id":match_id,"event_type":"card_39"},"shots_count" );
                  console.log("shots_count data == ",shots_count);
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
          const  data = req.data.team_stats.stat[1] ;
          if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;
              let live_team_a = parseInt(data.team_a) ;
              let live_team_b = parseInt(data.team_b) ;
              console.log("live_team_a ",live_team_a);
              console.log("live_team_b ",live_team_b);

              let card_id =  mongoose.Types.ObjectId("634fd1c88ff22506cf6c0b37");
          
        let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"fouls"},"team_a team_b" );
         let right_ans = '';      
        if(!isEmpty(shots_count)){
           
            live_team_a = live_team_a - shots_count[0].team_a;
            live_team_b = live_team_b - shots_count[0].team_b;
            console.log("live_team_a end ",live_team_a);         
            console.log("live_team_b end ",live_team_b);

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
          }else{  console.log( "no data found!.. ");  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
    } 
 
 const get_card_result_add_37  =  async(req,res)=>{
  try {  
            /// this function used by red card 
          const  red = req.data.team_stats.stat[12] ;
          const  yellow = req.data.team_stats.stat[10] ;
          let team_a_total_card = parseInt(red.team_a)+parseInt(yellow.team_a); 
          let team_b_total_card = parseInt(red.team_b)+parseInt(yellow.team_b); 
       
          

          if(!isEmpty(red) && !isEmpty(yellow)){
              let  live_match_id = req.data.match_id;

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
                             "match_id": "$play_match_user.match_id","active": "$play_match_user.active" } });


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
         console.log(obj)
              return  obj ;
          }else{  console.log( "no data found!.. ",{live_match_id});  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 } 

 const get_card_result_add_39  =  async(req,res)=>{
  try {  
            /// this function used by red card 
   const  data = req.data.team_stats.stat[1] ;
  
   let Red    = req.data.team_stats.stat[8];
   let Yellow = req.data.team_stats.stat[6];

   let RedTotalPoint    = parseInt(Red.team_a)+parseInt(Red.team_b); 
   let YellowTotalPoint = parseInt(Yellow.team_a)+parseInt(Yellow.team_b); 
 
   let totoal_point = RedTotalPoint + YellowTotalPoint;

          if(totoal_point >0 ){
              let  live_match_id = req.data.match_id;
             
              let card_id =  mongoose.Types.ObjectId("634feaf08ff22506cf6c0c46");
          
        let shots_count  = await match_event_shot_tbl.find({"match_id":live_match_id,"event_type":"card_39"},"shots_count" );
         let right_ans = '';      
        if(!isEmpty(shots_count)){
           
           let old_point = shots_count[0].shots_count;
               totoal_point = totoal_point - parseInt(old_point);
            if( totoal_point > 0 ){ right_ans = "opt_1";}else { right_ans = "opt_2";} 
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
          }else{  console.log( "no data found!.. ");  return false ;   }


         }else{  console.log( "Result not show ");   return false ; 
          
         }
     } catch (error) { console.log(error); return false ;  }
 } 
module.exports = {day_match_getID,match_card_number,match_card_0011,match_card_0013,matchCardAllData,matchCardEventAllData,get_card_result_add_4,
                    get_card_result_add_7,get_card_result_add_1, get_card_result_add_11,get_card_result_add_13,
                    get_card_result_add_15,get_card_result_add_17, get_card_result_add_20,get_card_result_add_23,
                    get_card_result_add_36,get_card_result_add_10,get_card_result_add_18,card_08_befor_call,get_card_result_add_08,
                    get_card_result_add_37,card_39_befor_call,get_card_result_add_39,get_card_result_add_34}