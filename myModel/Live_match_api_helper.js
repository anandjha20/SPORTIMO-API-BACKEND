const axios = require("axios");



const match_card_001  = async(match_id) =>{
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
            let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.team_stats.stat[6] ;
              
            return datas;
          
          }else{   return false;
           
          }    


      
          } catch (error) { console.log( "modal match_card_001 call == ", error);
              return false ; 
          }
   }

   const match_card_007  = async(match_id) =>{
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
           let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match.team_stats.stat[1] ;
             
           return datas;
         
         }else{   return false;
          
         }    


     
         } catch (error) { console.log( "modal match_card_001 call == ", error);
             return false ; 
         }
  }

module.exports = {match_card_001}