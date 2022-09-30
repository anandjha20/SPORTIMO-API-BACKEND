
const { rows_count,getcurntDate,getTime,isEmpty} = require("../myModel/common_modal");
  const {team_match_addOne } = require('../myModel/helper_fun');  
  const poll_tbl  = require("../models/poll");
  const poll_tblD = require("../models/poll_result");
   const axios = require("axios");
  const team_matches = require('../models/team_matches');
  const {match_card_number,match_card_0011,match_card_0013 } = require("../myModel/Live_match_api_helper"); 

class ConjobController{
      static get_card_001 =  async(req,res)=>{
          try {
                let  match_id = 2701168 ; // 2701168;
                // yellow card no == 6    
            
               let data = await match_card_number(match_id,6);          
                
                 if(!isEmpty(data)){
                          if( data.team_a >  data.team_b ){
                            return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                          }else   if( data.team_b >  data.team_a  ){
                            return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                          }else  if( data.team_b == data.team_a  ){
                            return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
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
  
      static get_card_004 =  async(req,res)=>{
        try {
                  ///  Which team will receive most Red Cards?
                 // READ CARD NO == 8      
                  let  match_id = 2701168 ; // 2701168;

            let data = await match_card_number(match_id,8);
                console.log( 'get_card_004 == ', data); 
               if(!isEmpty(data)){
                              if( data.team_a >  data.team_b ){
                                return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                              }else   if( data.team_b >  data.team_a  ){
                                return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                              }else  if( data.team_b == data.team_a  ){
                                return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
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
   
  
    static get_card_007 =  async(req,res)=>{
        try {
                  ///  Which team will receive most Red Cards?
             
                  let  match_id = 2701168 ; // 2701168;

            let data = await match_card_number(match_id,1);
                console.log( 'get_card_004 == ', data); 
               if(!isEmpty(data)){
                              if( data.team_a >  data.team_b ){
                                return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                              }else   if( data.team_b >  data.team_a  ){
                                return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                              }else  if( data.team_b == '0' &&  data.team_a == '0' ){
                                return  res.status(200).send({'status':true,'msg':"equal to equal ( no Fouls)  success",'body': "opt_3", 'data':data });
                              }else if( data.team_b == data.team_a  ){
                                return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
                          
                              }else{
                                return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
                            
                              }
                  return  res.status(200).send({'status':true,'msg':" success",'data':data });      
               }else{
                return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
               }



              

            } catch (error) { console.log(error);
                return  res.status(200).send({'status':false,'msg':'servr error'});
            }
       }
   static get_card_0011 =  async(req,res)=>{
        try {
                let  match_id = 2701168 ; // 2701168;

            let data = await match_card_0011(match_id,1);
             
               if(!isEmpty(data)){
                              if( data.team_a >0 &&  data.team_b == 0 ){
                                return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                              }else   if( data.team_b >0 && data.team_a == 0){
                                return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                              }else if( data.team_b >0 && data.team_a >0  ){
                                return  res.status(200).send({'status':true,'msg':"Both Team A & Team B  success",'body': "opt_3", 'data':data });
                              }else  if( data.team_b == '0' &&  data.team_a == '0' ){
                                return  res.status(200).send({'status':true,'msg':"Neither Team A Nor Team B success",'body': "opt_4", 'data':data });
                              }else {
                                 return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':data });
                                  }
                  return  res.status(200).send({'status':true,'msg':" success",'data':data });      
               }else{
                return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
               }



              

            } catch (error) { console.log(error);
                return  res.status(200).send({'status':false,'msg':'servr error'});
            }
       }
      
       static get_card_0013 =  async(req,res)=>{
        try {
                let  match_id = 2701168 ; // 2701168;

           let data = await match_card_0013(match_id,1);
             
               if(!isEmpty(data)){
                              if( data.winner == 'team_A'){
                                return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                              }else if( data.winner == 'team_B'){
                                return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                              }else{
                                 return  res.status(200).send({'status':false,'msg':" option_3 success", 'body':data });
                                  }
                    return  res.status(200).send({'status':true,'msg':" success",'data':data });      
               }else{
                return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
               }



              

            } catch (error) { console.log(error);
                return  res.status(200).send({'status':false,'msg':'servr error'});
            }
       }
      

    static get_card_0015 =  async(req,res)=>{
        try {
                  ///  Which team will receive most Red Cards?
                 
             
                 
                
                let  match_id = 2701168 ; // 2701168;

            let data = await match_card_0011(match_id);
                console.log( 'get_card_004 == ', data); 
               if(!isEmpty(data)){
                                let x = data.team_a - data.team_b  ;
                             let resultx =  Math.abs(x); 
              
                 if( resultx == 1 || resultx == 2 ){
                                return  res.status(200).send({'status':true,'msg':"opt_1 win success",'body': "opt_1", 'data':data });
                              }else if( resultx == 3 || resultx == 4 ){
                                return  res.status(200).send({'status':true,'msg':"opt_2 win success",'body': "opt_2",  'data':data });
                              }else  if( resultx > 4 ){
                                return  res.status(200).send({'status':true,'msg':"opt_3 success",'body': "opt_3", 'data':data });
                              }else{
                                return  res.status(200).send({'status':true,'msg':"opt_4 success",'body': "opt_4", 'data':data });
                              }
                     
               }else{
                return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
               }



              

            } catch (error) { console.log(error);
                return  res.status(200).send({'status':false,'msg':'servr error'});
            }
       }
       static get_card_0017 =  async(req,res)=>{
        try {
              let  match_id = 2701168 ; // 2701168;
              let data = await match_card_number(match_id,4);          
              
               if(!isEmpty(data)){
                        if( data.team_a >  data.team_b ){
                          return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                        }else   if( data.team_b >  data.team_a  ){
                          return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                        }else  if( data.team_b == '0' &&  data.team_a == '0'  ){
                          return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
                        }else if( data.team_b ==  data.team_a ){
                          return  res.status(200).send({'status':true,'msg':" No shots by either team success",'body': "opt_4", 'data':data });
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
        static get_card_0020 =  async(req,res)=>{
          try {
                let  match_id = 2701168 ; // 2701168;
                let data = await match_card_number(match_id,0);          
                
                 if(!isEmpty(data)){
                          if( data.team_a >  data.team_b ){
                            return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                          }else   if( data.team_b >  data.team_a  ){
                            return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                          }else  if( data.team_b == '0' &&  data.team_a == '0'  ){
                            return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
                          }else {
                            return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
                           }
                 }else{
                  return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
                 }
  
  
  
                
  
              } catch (error) { console.log(error);
                  return  res.status(200).send({'status':false,'msg':'servr error'});
              }
          } 
         
        static get_card_0023 =  async(req,res)=>{
              try {
                    let  match_id = 2701168 ; // 2701168;
                    let data = await match_card_number(match_id,2);          
                    
                     if(!isEmpty(data)){
                              if( data.team_a >  data.team_b ){
                                return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                              }else   if( data.team_b >  data.team_a  ){
                                return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                              }else  if( data.team_b == '0' &&  data.team_a == '0'  ){
                                return  res.status(200).send({'status':true,'msg':" 4. No offsite    success",'body': "opt_3", 'data':data });
                              }else if( data.team_b ==  data.team_a ){
                                return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_4", 'data':data });
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
       static get_card_0036 =  async(req,res)=>{
        try {
          let  match_id = 2701168 ; // 2701168;
          let data = await match_card_number(match_id,2);          
            
            if(!isEmpty(data)){
                    if( data.team_a >  data.team_b ){
                      return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
                    }else   if( data.team_b >  data.team_a  ){
                      return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
                    }else  if( data.team_b == data.team_a   ){
                      return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
                    }else {
                      return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
                      }
            }else{
            return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
            }



          

        } catch (error) { console.log(error);
            return  res.status(200).send({'status':false,'msg':'servr error'});
        }
             } 
                             



   ///////////////////////////////////////////    
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
                  datas.map( (item,index)=>{  team_match_addOne(item);  sum.push(index);  return item; }) ;
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