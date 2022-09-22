let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp, isEmpty,rows_count,ArrChunks } = require('../myModel/common_modal');
const { sendNotificationAdd } = require('../myModel/helper_fun');
  const {send_noti,get_preferenceUserToken,send_poll_notification,userSentNotification,pollDisclosed_noti_fun} = require('../myModel/Notification_helper');

const { poll_percent} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');
    const user_tbl = require('../models/user');    
    const prediction_cards_tbl = require('../models/prediction_cards');    
   
    const prediction_card_categories = require("../models/prediction_card_categories")     
class predictionController {   
     
   

    static getprediction_card_Cat_list = async (req,res)=>{
        try {
            let language = req.body.language;

            let records = await prediction_card_categories.find().sort({_id:-1});
               
                if(records){ records.map((item)=> { 
                            if(language != '' && language == 'ar'){  item.name = item.name_ara;  
                            }else if(language != '' && language == 'fr'){  item.name = item.name_fr;  
                                   }
                           return item; })}
        
        
                res.status(200).send({'status':true,'msg':"success",  'body':records });
    
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':"Server error",'body':''});
        }
                
            }    
    
    static prediction_card_add = async(req,res)=>{
            try {   
              let user_data = req.body;
           if(isEmpty(user_data.name)){
                 return res.status(200).send({"status":false,"msg":'name filed Required' , "body":''}) ; 
                    }   
          
            
         let mydate = getcurntDate();

                   let add = new prediction_cards_tbl({
                              "name":user_data.name,
                       "name_ara": user_data.name_ara,
                       "card_type": user_data.card_type,
                      
                       "card_cat_id":user_data.card_cat_id,
                       
                       "apperance_time": user_data.apperance_time,
                       "time_duration": user_data.time_duration,             

                       "qus": user_data.qus,        "qus_ara": user_data.qus_ara,
                       "ops_1":user_data.ops_1,     "ops_1_ara":user_data.ops_1_ara,
                       "ops_2": user_data.ops_2,    "ops_2_ara":user_data.ops_2_ara,
                       "ops_3":user_data.ops_3,     "ops_3_ara":user_data.ops_3_ara,
                       "ops_4":user_data.ops_4,     "ops_4_ara":user_data.ops_4_ara,
                       "date": mydate
            });
                 
                         add.save((err, data) => {
                               if (err) {     console.log(err);
                                 return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                             }else{ return res.status(200).send({"status":true,"msg":'prediction Card Created Successfully' , "body":data  }) ;            
                            } } ) ;
               
        }catch (error) {  console.log(error); 
                   return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
       
               }
             
       
           }


    static prediction_card_list = async (req,res)=>{
            try {
                let language = req.body.language;
    
                let records = await prediction_cards_tbl.find().sort({_id:-1});
              
                   
                    if(records){ records.map((item)=> { 
                                if(language != '' && language == 'ar'){ 
                                     item.name = item.name_ara;  
                                     item.qus = item.qus_ara;  
                                       item.ops_1 = item.ops_1_ara;  
                                       item.ops_2 = item.ops_2_ara;  
                                       item.ops_3 = item.ops_3_ara;  
                                       item.ops_4 = item.ops_4_ara;  

                                }
                               return item; })}
            
            
                    res.status(200).send({'status':true,'msg':"success",  'body':records });
        
            } catch (error) { console.log(error);
                res.status(200).send({'status':false,'msg':"Server error",'body':''});
            }
                    
                }    








    }




    module.exports = predictionController ;   