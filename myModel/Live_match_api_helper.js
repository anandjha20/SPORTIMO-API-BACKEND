const axios     = require("axios");
const mongoose = require('mongoose');

const { ArrChunks,isEmpty } = require('../myModel/common_modal'); 

const playMatchCards_tbl = require('../models/playMatchCards');   
const match_cards_tbl = require('../models/match_cards');   
const team_matches_tbl = require('../models/team_matches');   




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


  const get_card_004_demo  =  async(req,res)=>{
    try {
              ///  Which team will receive most Red Cards?
             // READ CARD NO == 8      
             // let  match_id = 2701168 ; // 2701168;
               
           ///  console.log( 'match_id  helper == ', req.match_id); 
             
            /// console.log( 'get_card_004  helper == ', req.data); 
              let data = req.data.team_stats.stat[8] ;
           
        //let data = await match_card_number(match_id,8);
           
            if(!isEmpty(data)){
              let  live_match_id = req.data.match_id;
              let card_id = mongoose.ObjectId("632daebeb066c6fd7e1c4769");
              let match_id = "63329e3ebba4aa21cd488679";
              console.log("live_match_id == ", live_match_id); 
            let pipeline  = [] ;
             if(! isEmpty(req.data.match_id)){
                   //pipeline.push({$match: {match_id: req.data.match_id}});
                   pipeline.push({$match: {match_id: live_match_id}});
                }

             pipeline.push({ $lookup: {from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user'} });
           
           
             pipeline.push({ $unwind: "$play_match_user" });
             
             // pipeline.push({$match: {"play_match_user.card_id":card_id }});
             pipeline.push({ $project: {"_id":1,"user_option":"$play_match_user.user_option","ans":"$play_match_user.ans",
             "user_play_card_id":"$play_match_user._id","user_id":"$play_match_user.user_id","card_id":"$play_match_user.card_id" } });
            
             let dxx = await team_matches_tbl.aggregate(pipeline).exec();
           
             console.log("match_id data 1 == ", dxx); 
             if (! isEmpty(dxx) ){
               console.log("match_id data 2  == ", dxx); 
              return dxx;
             }
                

               let dxxX = await match_cards_tbl.findOne({match_id: live_match_id},"_id");
             
               let allUsers = await playMatchCards_tbl.find({match_id,card_id});
                console.log("allUsers == ", allUsers);

               
                          // if( data.team_a >  data.team_b ){
                          //   return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                          // }else   if( data.team_b >  data.team_a  ){
                          //   return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                          // }else  if( data.team_b == data.team_a  ){
                          //   return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
                          // }else{
                          //   return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
                          // }
                     
           }else{
            return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
           }



          

        } catch (error) { console.log(error);
            return  res.status(200).send({'status':false,'msg':'servr error'});
        }
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




module.exports = {match_card_number,match_card_0011,match_card_0013,matchCardAllData,get_card_004_demo}