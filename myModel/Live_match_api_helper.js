const axios = require("axios");
const { ArrChunks } = require('../myModel/common_modal'); 

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

module.exports = {match_card_number,match_card_0011,match_card_0013}