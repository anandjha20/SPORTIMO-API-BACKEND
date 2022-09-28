let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp, isEmpty,rows_count,ArrChunks } = require('../myModel/common_modal');
const { sendNotificationAdd } = require('../myModel/helper_fun');
const {send_noti,get_preferenceUserToken,send_poll_notification,userSentNotification,pollDisclosed_noti_fun} = require('../myModel/Notification_helper');
const  {MyBasePath} = require("../myModel/image_helper");
const { poll_percent} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');
    const user_tbl = require('../models/user');    
    const prediction_cards_tbl = require('../models/prediction_cards');    
    const match_cards_tbl = require('../models/match_cards');   
   const playMatchCards_tbl = require('../models/playMatchCards');   

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

              console.log(user_data); 
               if(isEmpty(user_data.name)){
                          return res.status(200).send({"status":false,"msg":'name filed Required' , "body":''}) ; 
                    }   
          
       let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
   
         let mydate = getcurntDate();

                   let add = new prediction_cards_tbl({
                                "name":user_data.name,
                        "name_ara": user_data.name_ara,
                       "card_type": user_data.card_type,
                      
                       "card_cat_id":user_data.card_cat_id,
                       "time_range":user_data.time_range,
                       
                           "image": image,
                         "card_color": user_data.card_color,             

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


       static prediction_card_update = async(req,res)=>{
            try {
                    let id = req.params.id;
                  let user_data = req.body;
                    if(isEmpty(id)){
                      updateData.image = image 
                      return res.status(200).send({"status":false,"msg":'prediction card id required' , "body":''}) ; 
                    }   
                  
                 
                    let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
                  
                    let updateData = {
                                    "name":user_data.name,
                                    "name_ara": user_data.name_ara,
                                  "card_type": user_data.card_type,
                                  
                                  "card_cat_id":user_data.card_cat_id,
                                  "time_range":user_data.time_range,
                                  "card_color": user_data.card_color,             

                                  "qus": user_data.qus,        "qus_ara": user_data.qus_ara,
                                  "ops_1":user_data.ops_1,     "ops_1_ara":user_data.ops_1_ara,
                                  "ops_2": user_data.ops_2,    "ops_2_ara":user_data.ops_2_ara,
                                  "ops_3":user_data.ops_3,     "ops_3_ara":user_data.ops_3_ara,
                                  "ops_4":user_data.ops_4,     "ops_4_ara":user_data.ops_4_ara,
                                
                        };
           
                    
                if(!isEmpty(image)){updateData.image = image }            


                 prediction_cards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new: true}, (err, updatedUser) => {
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
            }else if(!isEmpty(updatedUser)){
                        return res.status(200).send({"status":true,"msg":'prediction card Updated Successfully' , "body":updatedUser  }) ;   
                }else{  return res.status(200).send({"status":false,"msg":'Invalid prediction card Id ' , "body": ''}) ;   
                        }

                
            });

            } catch (error) { console.log(error); 
                    return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
        
                }
            
        
            }     



    static prediction_card_list = async (req,res)=>{
            try {
                let language = req.body.language;
    
                let records = await prediction_cards_tbl.find().sort({_id:-1});
                let paths =MyBasePath(req,res);    
                   
                    if(records){ records.map((item)=> {  item.image = (! isEmpty(item.image))?  `${paths}/image/assets/predictionCard_img/${item.image}` : '' ;
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

      static match_card_add = async(req,res)=>{
                  try {   
                    let match_name    = req.body.match_name;
                    let match_id      = req.body.match_id;
                    let card_id        = req.body.card_id;
                    let apperance_times = req.body.apperance_times;    
                    let time_duration  = req.body.time_duration;

                 if( isEmpty(match_name) || isEmpty(match_id)  || 
                      isEmpty(card_id)  || isEmpty(apperance_times)  ||
                       isEmpty(time_duration) ){
                       return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                          }   
                
                         let add = new match_cards_tbl({ match_name,match_id,card_id,apperance_times,
                                                      time_duration });
                       
                               add.save((err, data) => {
                                     if (err) {     console.log(err);
                                       return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                                   }else{ return res.status(200).send({"status":true,"msg":'Match Card Created Successfully' , "body":data  }) ;            
                                  } } ) ;
                     
              }catch (error) {  console.log(error); 
                         return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
             
                     }
                   
             
                 }

    
       static match_card_list = async (req,res)=>{
                  try {
                      let language = req.body.language;    // 'name card_type'
                      let condition_obj={};
                      if(!isEmpty(req.body.match_name)){
                        condition_obj={...condition_obj,match_name:req.body.match_name}
                      }
          let records = await match_cards_tbl.find(condition_obj).populate('card_id').sort({_id:-1});
                    
                         
                          if(records){ records.map((item)=> { 
                                      if(language != '' && language == 'ar'){ 
                                            
                                        if(typeof item.card_id === 'object' && item.card_id !== null){
                                          item.card_id.name = item.card_id.name_ara;
                                        }else{  item.card_id = {};}
                                        
                                       // item.card_id.name = item.card_id.name_ara;  
                                          
                                      }
                                     return item; })
                                    
                                     return  res.status(200).send({'status':true,'msg': (language == 'ar')? "النجاح"  : "success" ,  'body':records });
                              }else{
                                   return res.status(200).send({'status':false,'msg':  (language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.."});
                                    }
                  
                  
              
                       } catch (error) { console.log(error);
                              return res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error"});
                          }
                          
                  }                 

        static match_card_update = async(req,res)=>{
                  try {   let id = req.params.id;
                    let match_name      = req.body.match_name;
                    let match_id        = req.body.match_id;
                    let card_id         = req.body.card_id;
                    let apperance_times = req.body.apperance_times;    
                    let time_duration   = req.body.time_duration;

                 if( isEmpty(match_name) || isEmpty(match_id)  || 
                      isEmpty(card_id)  || isEmpty(apperance_times)  ||
                       isEmpty(time_duration) ){
                       return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                          }   
                
            // let checkName = await rows_count({"name":""})             
            let updateData = { match_name,match_id,card_id,apperance_times,time_duration };                
                            
              match_cards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                }else if(!isEmpty(updatedUser)){
                            return res.status(200).send({"status":true,"msg":'Match Card Updated Successfully' , "body":updatedUser  }) ;   
                    }else{  return res.status(200).send({"status":false,"msg":'Invalid Match Card Id ' , "body": ''}) ;   
                            } 
                  });



                     
              }catch (error) {  console.log(error); 
                         return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
             
                     }
                   
             
                 }

    static match_card_delete = async(req,res)=>{
              try {
                      let id = req.params.id;
                      match_cards_tbl.findByIdAndDelete(id, function (err, docs) {
                    if (err){  console.log("jjj === ",err);           //json(err)
    
                 let getError =  JSON.parse(JSON.stringify(err));
                      return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                        }else if(!isEmpty(docs)){
                          return res.status(200).send({"status":true,"msg":'match card Deleted Successfully' , "body":''}) ;   
                    }else{
                      return res.status(200).send({"status":false,"msg":'Invalid match card Id ' , "body":''}) ;  
                    }
                });
    
              } catch (error) { return res.status(200).send({"status":true,"msg":'server error' , "body":''}) ; }
    
          }   
    
    static playMatchCard_add = async(req,res)=>{
        try {   
              let match_card_id    = req.body.match_card_id;
              let user_id          = req.body.user_id;
              let user_option      = req.body.user_option;
              let time_range_start = req.body.time_range_start;    
              let time_range_end   = req.body.time_range_end;

              // || isEmpty(time_range_start)  ||  isEmpty(time_range_end)
      
              if( isEmpty(match_card_id) || isEmpty(user_id)  || 
            isEmpty(user_option)   ){
             return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                }   
              
           let checkuserData = await playMatchCards_tbl.findOne({user_id});
           if(checkuserData){
               return res.status(200).send({"status":true,"msg":'user already play this card' , "body":checkuserData  }) ;  
           }   

        let add = new playMatchCards_tbl({ match_card_id,user_id,user_option,time_range_start,
                                          time_range_end });
             
                     add.save((err, data) => {
                           if (err) {  console.log(err);
                             return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                         }else{ return res.status(200).send({"status":true,"msg":'Match Card Created Successfully' , "body":data  }) ;            
                        } });
           
        }catch (error) {  console.log(error); 
               return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
   
           }
         
   
        }   
    static my_playMatchCard_list = async (req,res)=>{
      try {
          let language = req.body.language;    
          let user_id = req.body.user_id;    
         
         /// let records = await match_cards_tbl.find().populate('card_id','name name_ara card_type').sort({_id:-1});
         
          if(isEmpty(user_id)){
            return res.status(200).send({'status':false,'msg':  (language == 'ar')? "مطلوب حقل معرف المستخدم" :  "User Id Field Required"});
                }

         let records = await playMatchCards_tbl.find({user_id}) ;
              
              if(! isEmpty(records)){ records.map((item)=> { 
                          if(language != '' && language == 'ar'){ 
                                
                            if(typeof item.card_id === 'object' && item.card_id !== null){
                              item.card_id.name = item.card_id.name_ara;
                            }else{  item.card_id = {};}
                            
                            // item.card_id.name = item.card_id.name_ara;  
                              
                          }
                          return item; })
                        
                          return  res.status(200).send({'status':true,'msg': (language == 'ar')? "النجاح"  : "success" ,  'body':records });
                  }else{
                        return res.status(200).send({'status':false,'msg':  (language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.."});
                        }
      
      
  
            } catch (error) { console.log(error);
                  return res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error"});
              }
              
      }     
    

  static playMatchCard_update = async(req,res)=>{
        try {   let id = req.params.id;
                let match_card_id        = req.body.match_card_id;
                    let user_id          = req.body.user_id;
                    let user_option      = req.body.user_option;
                    let time_range_start = req.body.time_range_start;    
                    let time_range_end   = req.body.time_range_end;

            if( isEmpty(match_card_id) || isEmpty(user_id)  || 
                  isEmpty(user_option)  || isEmpty(time_range_start)  ||
                  isEmpty(time_range_end) ){
                  return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
                      }   
      
        // let checkName = await rows_count({"name":""})             
          let updateData = { match_card_id,user_id,user_option,time_range_start,time_range_end };                
                  
       playMatchCards_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
      if(err) {  console.log(err);
          return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
      }else if(!isEmpty(updatedUser)){
                  return res.status(200).send({"status":true,"msg":'Play Match Card Updated Successfully' , "body":updatedUser  }) ;   
          }else{  return res.status(200).send({"status":false,"msg":'Invalid Play Match Card Id ' , "body": ''}) ;   
                  } 
        });



           
    }catch (error) {  console.log(error); 
               return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
   
           }
         
   
       }

     
       static playMatchCard_delete = async(req,res)=>{
        try {
                let id = req.params.id;
                playMatchCards_tbl.findByIdAndDelete(id, function (err, docs) {
              if (err){  console.log("playMatchCard_delete === ",err);        

                      let getError =  JSON.parse(JSON.stringify(err));
                return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                 }else if(!isEmpty(docs)){
                    return res.status(200).send({"status":true,"msg":'play Match Card Deleted Successfully' , "body":''}) ;   
              }else{
                return res.status(200).send({"status":false,"msg":'Invalid play Match Card Id ' , "body":''}) ;  
              }
          });

        } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

    }




    }




    module.exports = predictionController ;   