const axios     = require("axios");
const mongoose = require('mongoose');

const { ArrChunks,isEmpty } = require('../myModel/common_modal'); 

const playMatchCards_tbl = require('../models/playMatchCards');   
const match_cards_tbl = require('../models/match_cards');   
const team_matches_tbl = require('../models/team_matches');   
const user_tbl = require('../models/user');    
const transactions_tbl = require('../models/transactions'); 



  const match_card_number  = async(match_id,no) =>{
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
       const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=match&id=${match_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
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
               
               let add = new transactions_tbl({user_id,points,match_id,card_id,type:"credit",description :"game win"}); 
                 let datas = await add.save();
              let new_point = userinfo.points + points;
               let updata  =  user_tbl.findOneAndUpdate({_id: user_id},{$set : {points :  new_point } },{new: true}, (err, updatedUser) => {
                               if(err) { console.log(err);}  });
            let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : {active : 0 } },{new: true}, (err, updatedUser) => {
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
              let playcardUpdate  =  playMatchCards_tbl.findOneAndUpdate({_id: user_play_card_id},{$set : { active : 0 } },{new: true}, (err, updatedUser) => {
                if(err) { console.log(err); return false}else{ console.log("remove fun call == ",updatedUser );   return true }  }); 
              } catch (error) { console.log(err); return false }
  }

////////////////////////////   this function add on card category number  /////////////////////////
  ///////////////// this function  match result add on user point ////////////////////////////////
  const get_card_result_add_4  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[8] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("633e9151968c30669dedbe21");
                
             
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

                let card_id =  mongoose.Types.ObjectId("633ea16866b303f06a409912");
                
             
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




 //////////////////////////
 
 const get_card_result_add_11  =  async(req,res)=>{
  try {  
            /// this function used by red card 
         // const  data = req.data.team_stats.stat[6] ;
         
          let team_a = req.data.match.score_a;
          let team_b = req.data.match.score_b;
           let data = {team_a,team_b};

          if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;

              let card_id =  mongoose.Types.ObjectId("633ea20266b303f06a409917");
              
           
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
          let winner = req.data.match.winner;
         
          if(!isEmpty(winner)){
              let  live_match_id = req.data.match_id;

              let card_id =  mongoose.Types.ObjectId("633ea41866b303f06a409927");
              
           
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
            if( data.winner == 'team_A'){ right_ans = "opt_1";}else 
            if( data.winner == 'team_B'){ right_ans = "opt_2";
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
         
          let team_a = req.data.match.score_a;
          let team_b = req.data.match.score_b;
           let data = {team_a,team_b};

          if(!isEmpty(data)){
                  let x = data.team_a - data.team_b  ;
                   let resultx =  Math.abs(x); 


              let  live_match_id = req.data.match_id;

              let card_id =  mongoose.Types.ObjectId("633ea20266b303f06a409917");
              
           
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
              /// this function used by red card 
            const  data = req.data.team_stats.stat[6] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("633e9e5666b303f06a40990e");
                
             
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
            const  data = req.data.team_stats.stat[4] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("633ea16866b303f06a409912");
                
             
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
   
   const get_card_result_add_20  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[0] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("633ea461a33a84c65ab7e27b");
                
             
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

                let card_id =  mongoose.Types.ObjectId("633ea1bb66b303f06a409915");
                
             
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
  
   const get_card_result_add_36  =  async(req,res)=>{
    try {  
              /// this function used by red card 
            const  data = req.data.team_stats.stat[3] ;
         

            if(!isEmpty(data)){
                let  live_match_id = req.data.match_id;

                let card_id =  mongoose.Types.ObjectId("633ea39766b303f06a409924");
                
             
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







  
  const match_card_00_working  = async(match_id,my_path) =>{
    try {
      // let my_sports = my_path.split(".");
      // let part_obj =  ArrChunks(my_sports);
      //    return  part_obj;  
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
           let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.team_stats.stat[1] ;
             
           return datas;
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }




module.exports = {match_card_number,match_card_0011,match_card_0013,matchCardAllData,get_card_result_add_4,
                    get_card_result_add_7,get_card_result_add_1, get_card_result_add_11,get_card_result_add_13,
                    get_card_result_add_15,get_card_result_add_17, get_card_result_add_20,get_card_result_add_23,
                    get_card_result_add_36}