
const { rows_count,getcurntDate,getTime,isEmpty} = require("../myModel/common_modal");
  const {team_match_addOne } = require('../myModel/helper_fun');  
  const poll_tbl  = require("../models/poll");
  const poll_tblD = require("../models/poll_result");
   const axios = require("axios");
  const team_matches = require('../models/team_matches');
  const {match_card_001 } = require("../myModel/Live_match_api_helper"); 

class ConjobController{
      static get_card_001 =  async(req,res)=>{
          try {
                let  match_id = 2701168 ; // 2701168;
                ///  let  match_id = 2168;
            
                let data = await match_card_001(match_id);
                  
                 if(!isEmpty(data)){
                          if( data.team_a > 0 ||  data.team_b > 0 ){
                            return  res.status(200).send({'status':true,'msg':"success", 'body':data });
                          }else{
                            return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
                           }
                 }else{
                  return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
                 }



                

              } catch (error) { console.log(error);
                  return  res.status(200).send({'status':false,'msg':'servr error'});
              }
      }

        static get_live_match_list =  async(req,res)=>{
          try {
          
            const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
            const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=round&id=70596&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
        
                    var config = {  
                      method: 'get',
                      url: session_url,
                      headers: { 'Authorization': 'Basic '+ encodedToken }
                    };
        
                    let response = await axios(config);
              if(response){
                let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;


                 //  ['datasportsgroup', 'tour ', 'tour_season','competition','season','discipline','gender','round','list','match']); // true
                return  res.status(200).send({'status':true,'msg':'success','body':datas});
              }else{
                return  res.status(200).send({'status':false,'msg':'No Data Found!..'});
              }    


          
              } catch (error) { console.log(error);
                  return  res.status(200).send({'status':false,'msg':error,'body':''});
              }
      }


      static team_match_add = async(req,res)=>{
        try {
          
          const encodedToken =  `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
          const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=round&id=70596&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
      
                  var config = {  
                    method: 'get',
                    url: session_url,
                    headers: { 'Authorization': 'Basic '+ encodedToken }
                  };
      
                  let response = await axios(config);
            if(response){
              let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;
              
                if(! isEmpty(datas)){
                  let sum = [] ; 
                  datas.map( (item)=>{  team_match_addOne(item);  sum.push(m_id);  return item; }) ;
                      return  res.status(200).send({'status':true,'msg':'success','body':sum});
                  
                }else{
                  return  res.status(200).send({'status':false,'msg':'No Data Found!..'});
                }

             }else{
              return  res.status(200).send({'status':false,'msg':'No Data Found!..'});
            }    


        
            } catch (error) { console.log(error);
                return  res.status(200).send({'status':false,'msg':error,'body':''});
            }
      }
 
     static pollResultNotification =  async(req,res)=>{
               try {
                         

                    return  res.status(200).send({'status':true,'msg':"success", 'body':'' });
               
                   } catch (error) { console.log(error);
                       return  res.status(200).send({'status':false,'msg':error,'body':''});
                   }
           }
   
           
}



module.exports = ConjobController;