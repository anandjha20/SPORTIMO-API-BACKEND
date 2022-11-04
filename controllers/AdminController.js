let  express_2 = require('express');
 let mongoose = require('mongoose'); 
const { rows_count,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
   
  
  
  
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const faq_category_tbl = require('../models/faq_categories');    
    const faq_tbl = require('../models/faq');   
    const tips_trick = require('../models/tips_tricks'); 
    const content_tbls = require('../models/content_tbls');      // tips_status_update
   const block_user_tbl = require("../models/block_user");
   const admin_settings= require('../models/admin_settings');
   const power_ups_tbl= require('../models/power_ups');
   const user_allotted_powerUps_tbl = require('../models/user_allotted_powerUps');
   const used_power_ups_tbl = require('../models/used_power_ups');
class AdminController { 

  static tips_status_update = async (req,res)=>{
    try {
        let  id = req.params.id; 
        let tips_status = req.body.tips_status;  
        tips_status = (isEmpty(tips_status))? 0 : tips_status;   
      console.log("tips_status",tips_status);
        tips_trick.findOneAndUpdate({_id: id},{$set : {active_status:tips_status}},{new: true}, (err, updateData) => {
    if(err) {  console.log(err);
        return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
    }
    if(isEmpty(updateData)){ 
      return res.status(200).json({ "status":false,"msg": "Invalid Id" });
    }else{
    return res.status(200).json({"status":true,"msg": "Tip status updated successfully!" , "body":updateData}); }
});    

    
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':'server error','body':''});
    }
            
        } 

    static JK = (req,res)=>{
        res.status(200).send({'status':true,'msg':"success",'body':''});        
    }

    static user_list = async (req,res)=>{
        try {
           let  id = req.params.id;  let id_len = (id || '').length;
         
           let name    = req.body.name;
           let mobile  = req.body.mobile;
           let email   = req.body.email;
           let country = req.body.country;
           let guest_user  = req.body.guest_user;
           let s_date  = req.body.s_date;
           let e_date  = req.body.e_date;
           let page  = req.body.page;
             page = (isEmpty(page) || page == 0 )? 1 :page ; 
          
           let whr ={};
           if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*' } ;} 


           if(!isEmpty(mobile)){whr.mobile = mobile;} 
           if(!isEmpty(email)){whr.email = email;} 
           if(!isEmpty(country)){whr.name = country;} 
           if(guest_user == 1 ){whr.user_type = 5;} 
           if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date = { $gte: s_date, $lte: e_date } ;} 
           
           if(!isEmpty(id)){whr = {_id: id} ;} 
            
             let query =  user_tbl.find(whr) ;
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();


              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);



           //  let data2 = await user_tbl.find(whr).sort({ _id: -1 }) ;
            
          res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);  // JSON.parse(json.stringify(error))
          res.status(200).send({'status':false,'msg':'','body':''});
        }
             
            }     
    
            static user_detail = async (req,res)=>{
              try {
                 let  id = req.params.id; 
                   const records = await  user_tbl.find({_id: id} ).exec() ;
                if(records.length >0 ){
                  return res.status(200).send({'status':true,'msg':"success",'body':records });
                }else{
                  return res.status(200).send({'status':false,'msg':'Invalid Id'});
                }
              } catch (error) { console.log(error);  // JSON.parse(json.stringify(error))
                res.status(200).send({'status':false,'msg':'Server Error','body':''});
              }
                   
                  }     


     static admin_login = async (req,res)=>{
        try {
              let email = req.body.email;
              let pass = req.body.pass;
              let token = gen_str(99); 

             admin_tbl.findOneAndUpdate({email,pass},{$set : {token} },(error, data) => {
              if(error) {  console.log("test errors is == ",error);  return res.status(200).send({'status':false ,'msg':"Something went wrong please try again",'body':''}); }
             
              if(data ){  data.token = token;  return  res.status(200).send({'status':true,'msg':"success",'body':data }); }else{
                  
                res.status(200).send({'status':false ,'msg':"Invalid User ",'body':''});
                 } 
              
             
             
          }); 


  
        } catch (error) {
          res.status(200).send({'status':false,'msg':error,'body':''});
        }
             
            }
  
     static add_admin = async(req,res)=>{

                try {
                    // console.log('By shubham');
                    let user_data = req.body;
                    // console.log(req.query);
                    // console.log(user_data);
                    const salt = await bcrypt.genSalt(10);
                    // now we set user password to hashed password
                    var test = await bcrypt.hash(user_data.pass, salt);
                    let add = new admin_tbl({
                        name: user_data.name,
                        doc_type:user_data.doc_type,
                        email: user_data.email,
                        image: req.file.filename,
                        pass:  test,
                        token: user_data.token,
                        address: user_data.address,
                        date: user_data.date,  
                        mobile: user_data.mobile,
                        gender: user_data.gender,
                        user_type: user_data.user_type,
                        date: user_data.date,
                    });
                  
                 let dd  = add.save();
                //  res.json(add);
                    return res.status(200).send({"status":true,"msg":'Admin added successfully' , "body": ''}) ;          
        
                } catch (error) {
                    return res.status(200).send({"status":false,"msg":'no data add  ' , "body":''}) ;          
        
                }
              
        
            }
    static add_tips = async(req,res)=>{  
              try {
                let user_data = req.body;
                // console.log(req);
                  let addtips = new tips_trick({
                    tips_trick: user_data.tips_trick, tips_trick_ara: user_data.tips_trick_ara,
                    active_status: user_data.active_status,
                  });
               let dd  = addtips.save();
                  return res.status(200).send({"status":true,"msg":'Tips added successfully' , "body": ''}) ;
              } catch (error) {
                  return res.status(200).send({"status":false,"msg":'no data add' , "body":''}) ;
              }
          }
   
          static update_tips = async (req,res)=>{
            try {
                let  id = req.body.id;                  
                let tips = req.body.tips_trick;         
                let tips_trick_ara = req.body.tips_trick_ara;

                if( isEmpty(id) ||  isEmpty(tips_trick) ||  isEmpty(tips_trick_ara)  ){
                return   res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});
                }    
              tips_trick.findOneAndUpdate({_id: id},{$set : {tips_trick_ara,"content_add":tips}},{new: true}, (err, updatedUser) => {
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
            }
            
            return res.status(200).json({  
                "status":true,"msg": "Tips updated successfully" , "body":updatedUser
            });
        });            
      
            
            } catch (error) { console.log(error);
              return  res.status(200).send({'status':false,'msg':error,'body':''});
            }
                    
                } 
    static delete_tip = async (req,res)=>{
          try {
            // console.log(req)
              let  id = req.params.id;  let id_len = (id || '').length;
              if( id_len == 0 ){
                    return   res.status(200).send({'status':false,'msg':"Id Field Required",'body':''});
              }                
              tips_trick.findOneAndDelete({ _id:id }, (err, data) => {
                  if (err) { console.log(err);
                      return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                  } else {
                      return res.status(200).json({ "status":true,"msg": "Tip Deleted successfully " , "body":''});
                  }
              });
          } catch (error) { console.log(error);
                    return  res.status(200).send({'status':false,'msg':error,'body':''});
          }
                          
    }    
    static get_tips = async (req,res)=>{
            try {
                let  id = req.params.id;  let id_len = (id || '').length;
                let whr = (id_len == 0) ? {active_status:true} :{_id:id};
          
                let data = await tips_trick.find(whr).exec();
                  if(data){ res.status(200).send({'status':true,'msg':"success",'body':data});
                    }else{      
                    res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                    
            } catch (error) { console.log(error);
              res.status(200).send({'status':false,'msg':error,'body':''});
            }
                  
                }
      static get_tip_list = async (req,res)=>{
                  try {
                       let language = req.body.language;
                           

                      let tips = tips_trick.find({}, function(err, tips){
                        if(err){
                         console.log(err);
                         res.status(200).send({'status':false,'msg': (language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.."});
                        }
                        else {
                            tips.map((item)=> {  if(language == 'ar'){ item.tips_trick = item.tips_trick_ara }
                                                    return item; }); 
                            res.json( {"status":true,"msg": (language == 'ar')? "النجاح"  : "success"  , "body":tips });
                            // return res.status(200).send({"status":true,"msg":'Success' , "body":dd }) ;      
                        }
                    });
                  } catch (error) { console.log(error);
                    res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error" });
                  }    
        } 
   
      static add_faq_category = async(req,res)=>{
            try {
            // console.log('By shubham');
            let user_data = req.body;
          
            let add = new faq_category_tbl({ 
                    cat_name: user_data.cat_name, cat_name_ara : user_data.cat_name_ara, 
                    cat_name_fr: user_data.cat_name_fr
                }); 
          
           add.save( (err,datas)=>{
              if(err){ console.log(err);
                    return res.status(200).send({"status":false,"msg":'FAQ category  not add' , "body": ''}) ;        
                }else{     
                return res.status(200).send({"status":true,"msg":'FAQ category added successfully' , "body": datas }) ;    }
          });
        
      
        } catch (error) { console.log(error); 
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
            }  
      }
      static update_faq_category = async (req,res)=>{
        try {
              let  id = req.body.id;             
              let cat_name = req.body.cat_name;  let cat_name_ara = req.body.cat_name_ara;   
              let cat_name_fr = req.body.cat_name_fr;  
        
              //   let cat_name_arb = req.body.cat_name; let cat_name_len = (cat_name || '').length;
            
            if( isEmpty(cat_name) || isEmpty(cat_name_ara) || isEmpty(id) || isEmpty(cat_name_fr) ){
                 return   res.status(200).send({'status':false,'msg':"All Field Required ",'body':''});
              }

            faq_category_tbl.findOneAndUpdate({_id: id},{$set :{cat_name,cat_name_ara,cat_name_fr} },{new: true}, (err, updateddata) => {
           if(err){  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
             }
        
        return res.status(200).json({ "status":true,"msg": "category update successfully ", "body":updateddata });
    });    
  
        
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
                
            }  
          static delete_faq_category = async (req,res)=>{
              try {
                // console.log(req)
                  let  id = req.params.id; 
                 
                  let check_catData = await rows_count(faq_tbl,{faq_cat_id: id})  ;             
                           
                  if(check_catData >0 ){  
                       return   res.status(200).send({'status':false,'msg':"Can't delete this category, FAQ with this category is still available",'body':''});
                       
                     }else{   
                      faq_category_tbl.findOneAndDelete({ _id:id }, (err, data) => {
                              if (err) { console.log(err);
                                  return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                              }else if(! isEmpty(data)) {
                                  return res.status(200).json({ "status":true,"msg": "FAQ Category Deleted successfully " , "body":''});
                              }else{
                                return res.status(200).send({"status":false,"msg":'Invalid FAQ Category Id ' , "body":''}) ;  
                              }
                          });
                }
              } catch (error) { console.log(error);
                        return  res.status(200).send({'status':false,'msg':"server error",'body':''});
              }
                              
        }         
     
      static add_faq = async(req,res)=>{
        try {      
            let cat_id    = req.body.cat_id;   let cat_id_lan   = (cat_id || '').length;
            let question  = req.body.question;   let question_lan = (question || '').length;
            let answer    = req.body.answer;   let answer_lan   = (answer || '').length;
           
            let question_ara  = req.body.question_ara; 
            let answer_ara    = req.body.answer_ara;  

            if(isEmpty(cat_id) || isEmpty(question) || isEmpty(answer) || 
                  isEmpty(question_ara) || isEmpty(answer_ara) ){
                    return res.status(200).send({"status":false,"msg":'All Field Required' , "body":''}) ;   
            }

            
            let add = new faq_tbl({question,answer,question_ara,answer_ara,faq_cat_id:cat_id});
          
          let response  =   await add.save();
          if(response){ 
                      return res.status(200).send({"status":true,"msg":'FAQ  added successfully' , "body": ''}) ;          
              }else{  console.log(' response == ',response);
                        return res.status(200).send({"status":false,"msg":'FAQ Not Add' , "body": ''}) ;    
                       }   
                              
        } catch (error) { console.log("error is == ", error);
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
            }
      }
      static update_faq = async(req,res)=>{
        try {      
                let id    = req.body.id;   
                let cat_id    = req.body.cat_id;   
                let question  = req.body.question;     let question_ara  = req.body.question_ara; 
                let answer    = req.body.answer;       let answer_ara    = req.body.answer_ara;  
            
              
          
             if(isEmpty(id) || isEmpty(cat_id) || isEmpty(question) || isEmpty(question_ara) ||
                   isEmpty(answer) ||isEmpty(answer_ara)){
                   return res.status(200).send({"status":false,"msg":'All Field Required' , "body":''}) ;   

                   }
          
       
                  
            faq_tbl.findOneAndUpdate({_id: id},{$set : {question_ara,answer_ara,question,answer,faq_cat_id:cat_id}},{new: true}, (err, updateddata) => {
              if(err) {  console.log(err);
                  return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
              }
              if(isEmpty(updateddata)){
                return res.status(200).send({"status":false,"msg":'Invalid Id' , "body":''}) ;   
              }else{ return res.status(200).json({ "status":true,"msg": "success" , "body":updateddata});
                   } });  

        } catch (error) { console.log("error is == ", error);
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
            }
      }
      static delete_faq = async (req,res)=>{
        try {
          // console.log(req)
            let  id = req.params.id;  let id_len = (id || '').length;
            if( id_len == 0 ){
                  return   res.status(200).send({'status':false,'msg':"Id Field Required",'body':''});
            }                
            faq_tbl.findOneAndDelete({ _id:id }, (err, data) => {
                if (err) { console.log(err);
                    return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                } else {
                    return res.status(200).json({ "status":true,"msg": "FAQ Deleted successfully " , "body":''});
                }
            });
        } catch (error) { console.log(error);
                  return  res.status(200).send({'status':false,'msg':error,'body':''});
        }
                        
  }   
      
            
  static faq_cat_list = async (req,res)=>{
    try {
        let  id = req.params.id;  let id_len = (id || '').length;
        let whr = (id_len == 0) ? {active_status:true} :{_id:id};
  
        let data = await faq_category_tbl.find(whr);
          if(data){ res.status(200).send({'status':true,'msg':"success",'body':data});
            }else{      
            res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                
      
  
    } catch (error) { console.log(error);
      res.status(200).send({'status':false,'msg':error,'body':''});
    }
          
        }     
  
  
  
        static faq_list = async (req,res)=>{
          try {
                 let language = req.body.language;
                  
            
                  let  id = req.params.id;  let id_len = (id || '').length;
                  let whr = (id_len == 0) ? {} :{_id:id}; // active_status:true
            
            let data = await faq_tbl.find(whr).populate({path: 'faq_cat_id' ,"select":'cat_name cat_name_ara cat_name_fr _id'}).select({'_id':1,'question':1,'answer':1,'question_ara':1,'answer_ara':1,'faq_cat_id': 1}).exec();
                  console.log("faq_list == ", data); 
                  if(!isEmpty(data)){
                  
                    data.map((item)=> {  if( language == 'ar')
                                            { item.question =   item.question_ara;
                                               item.answer =   item.answer_ara;
                                               if(typeof item.faq_cat_id === 'object' && item.faq_cat_id !== null){
                                                item.faq_cat_id.cat_name =  item.faq_cat_id.cat_name_ara  ; 
                                            
                                              }else {
                                                    item.faq_cat_id = {};
                                             }
                                            }else  if(language == 'fr'){
                                              if(typeof item.faq_cat_id === 'object' && item.faq_cat_id !== null){
                                                item.faq_cat_id.cat_name =  item.faq_cat_id.cat_name_fr  ; 
                                            
                                              }
                                            }
                                       return item;
                             }); 
                    
                    res.status(200).send({'status':true,'msg':  (language == 'ar')? "النجاح"  : "success" ,'body':data});
                      }else{          
                      res.status(200).send({'status':false,'msg': (language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.." ,'body':''});}
            } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':(language == 'ar')? "خطأ في الخادم" : "server error"});
          }
      }     
           
     /// content_tbls            
      
     static content_add = async(req,res)=> {
      try{    let type  = req.body.type;
              let content_data = req.body.content_data;
              let content_data_ara = req.body.content_data_ara;  
   
          if(isEmpty(type) || isEmpty(content_data) || isEmpty(content_data_ara) ){
              return res.status(200).send({"status":false,"msg":'All Field Required '}) ;       
          }
            
          content_tbls.findOneAndUpdate({type} ,{$set: {type,content_data,content_data_ara} },{new: true}, (err,updatedUser)=>{
          if(err) {  console.log(err);
              return res.status(200).send({"status":false,"msg":'some errors '}) ;          
          }
        
          if(isEmpty(updatedUser)){
                  let add =new content_tbls({type,content_data,content_data_ara});
                  add.save((err,datas)=>{
                    if(err){ console.log(err);   return res.status(200).send({"status":false,"msg":'some errors...'}) ;   
                         }else{ 
                           return res.status(200).send({"status":true,"msg":'content data add  successfully',"body":datas }) ;  
                        }

                  }); 

                   
          }else{
                  return res.status(200).send({"status":true,"msg":'content data Update successfully',"body":updatedUser }) ;  
             }
      
                     });
         }catch (error) { console.log(error);  return res.status(200).send({"status":false,"msg":'no data add' }) ; }
                 
    }     
            
      
 static get_content = async (req,res)=>{
  try {
          let c_type = req.params.type;
          let whr = isEmpty(c_type)? {} : {type:c_type} ;
          let sendData =  await content_tbls.find(whr);
            console.log("adminget content call == ",sendData ); 
          if(sendData.length >0){
              return res.status(200).send({status:true ,msg:"success",body:sendData});
          }else{
              return res.status(200).send({status:false ,msg:"No Data FOund!.. "});
          }
  } catch (error) {  console.log(error); 
      return res.status(200).send({status:false,msg: "No Data FOund!.. "});
  }


}        
    static blockedUserList = async(req,res)=>{
        try{
          let id = req.params.id;

          let whr = isEmpty(id)? {} :{"_id":id}; 
      let response =  await block_user_tbl.find(whr).populate({path:"from_user",select:"name"}).exec();
        if( isEmpty(response)){
             return res.status(200).send({status:false,msg: "No Data FOund!.. ",body:whr});
            }else{
                return res.status(200).send({status:true,msg: "Success", "body":response  });
            }
          } catch (error){  console.log(error); 
            return res.status(200).send({status:false,msg: "Server error"});
        }

    }
 
     /// chat_blockUserLIst
     static chat_blockUserLIst = async(req,res)=>{
            try{
              let id = req.params.id;

              let whr = isEmpty(id)? { "chatBlockStatus":true } :{"_id":id,"chatBlockStatus":true }; 
          let response =  await user_tbl.find(whr,).select("name" ).exec();
            if( isEmpty(response)){
                return res.status(200).send({status:false,msg: "No Data FOund!.. ",body:whr});
                }else{
                    return res.status(200).send({status:true,msg: "Success", "body":response  });
                }
              } catch (error){  console.log(error); 
                return res.status(200).send({status:false,msg: "Server error"});
            }

        }

        static admin_settings_update = async (req,res)=>{
          try{
                let condition_obj={};
                let unblock_period_days=req.body.unblock_period_days;
                let auto_chat_blocking=req.body.auto_chat_blocking;
                let guest_user_active_days=req.body.guest_user_active_days;
                let default_prediction_period=req.body.default_prediction_period;
                let default_prediction_update_period=req.body.default_prediction_update_period;
                
                if(!isEmpty(unblock_period_days)){condition_obj={...condition_obj,"unblock_period_days":unblock_period_days}}
                if(!isEmpty(auto_chat_blocking)){condition_obj={...condition_obj,"auto_chat_blocking":auto_chat_blocking}}
                if(!isEmpty(guest_user_active_days)){condition_obj={...condition_obj,"guest_user_active_days":guest_user_active_days}}
                if(!isEmpty(default_prediction_period)){condition_obj={...condition_obj,"default_prediction_period":default_prediction_period}}
                if(!isEmpty(default_prediction_update_period)){condition_obj={...condition_obj,"default_prediction_update_period":default_prediction_update_period}}
              
        if(isEmpty(condition_obj)){
               return res.status(200).send({"status":false,"msg":"All Field Required","body":''});         
            }

          let response =  await admin_settings.updateMany(condition_obj);
            if(isEmpty(response)){  console.log(err); 
              return res.status(200).send({"status":false,"msg":"No Data found!... ","body":''});  
            }else{
             
              return res.status(200).send({"status":true,"msg":"settings updated successfully","body":response})
            } ;
      
          }catch (error){
            console.log(error)
            return res.status(200).send({"status":false,"msg":"server erroe","body":''})
          }
      
        }
    static admin_settings_get = async (req,res)=>{
      try{
        let response=await admin_settings.findOne();
        if(!isEmpty(response)){
        return res.status(200).send({"status":true,"msg":"Success","body":response})
        }else{
        return res.status(200).send({"status":false,"msg":"no data found!..","body":''})
        }
      }catch (error){
        console.log(error)
        return res.status(200).send({"status":false,"msg":"server erroe","body":''})
      }
  
    }
    // static admin_settings_set = async (req,res)=>{
    //   try{
    //     let obj=new admin_settings(req.body)
    //     let response=await obj.save()
    //     if(!isEmpty(response)){
    //     return res.status(200).send({"status":true,"msg":"Success","body":response})
    //     }else{
    //     return res.status(200).send({"status":false,"msg":"no data found!..","body":''})
    //     }
    //   }catch (error){
    //     console.log(error)
    //     return res.status(200).send({"status":false,"msg":"server erroe","body":''})
    //   }
  
    // }

  static user_delete = async (req,res)=>{
    try {
     
       let _id = req.body._id;
   if(!isEmpty(_id)){
    let result=await user_tbl.findOneAndDelete({_id})
    res.status(200).send({'status':true,'msg':"user deleted",body:result});
   }else{     
       //  let data2 = await user_tbl.find(whr).sort({ _id: -1 }) ;
        
      res.status(200).send({'status':false,'msg':"all field required"});
    }
    } catch (error) { console.log(error);  // JSON.parse(json.stringify(error))
      res.status(200).send({'status':false,'msg':'','body':''});
    }
         
        }     


  static power_up_add = async (req,res)=>{
      try {
             let power_up_name = req.body.name;
             let power_up_type = req.body.type;
             let power_up_dis = req.body.dis;
             let powerup_value = req.body.powerup_value;
          console.log(req.body) ;   
         if(isEmpty(power_up_name) || isEmpty(power_up_type) || isEmpty(power_up_dis) ){
           return res.status(200).send({'status':false,'msg':"all field required"});
            }

          let add = new power_ups_tbl({power_up_name,power_up_type,power_up_dis,powerup_value });
       
                add.save((err,datas)=>{
                  if(err){ console.log(err);   return res.status(200).send({"status":false,"msg":'some errors...'}) ;   
                      }else{ 
                        return res.status(200).send({"status":true,"msg":'Power up add successfully',"body":datas }) ;  
                      }
                  }); 

          } catch (error) { console.log(error); 
            res.status(200).send({'status':false,'msg':'','body':''});
          }
               
              }  

 static powerUp_list = async (req,res)=>{
                try {
                 
                   let id = req.params.id;
                   let whr = (!isEmpty(id))? {"_id":id} : {} ; 
               

                let result = await power_ups_tbl.find(whr); 
                  if(result){
                     return res.status(200).send({'status':true,'msg':"user deleted",body:result});
                  }else{
                         res.status(200).send({'status':false,'msg':"all field required"});
                        }
               } catch (error) { console.log(error); 
                  res.status(200).send({'status':false,'msg':'','body':''});
                }
        }
        
        
  static power_up_alloted = async (req,res)=>{
          try {
                  let user_id = req.body.user_id;
                  let power_up_count = req.body.power_up_count ;
                  
             // console.log(req.body) ;   
              if(isEmpty(user_id) ){
                return res.status(200).send({'status':false,'msg':"all field required"});
                }
           /// check user     
           let rows = await user_allotted_powerUps_tbl.find({user_id}).countDocuments();         
          
           if(rows>0){
                 return res.status(200).send({'status':false,'msg':"power up already alloted"});
            }   

              let add = new user_allotted_powerUps_tbl({user_id,power_up_count });
            
                    add.save((err,datas)=>{
                      if(err){ console.log(err);   return res.status(200).send({"status":false,"msg":'some errors...'}) ;   
                          }else{ 
                            return res.status(200).send({"status":true,"msg":'This user Power up alotted successfully',"body":datas }) ;  
                          }
                      }); 
    
              } catch (error) { console.log(error); 
                res.status(200).send({'status':false,'msg':'','body':''});
              }
                    
                  }  
          

   static alloted_powerUp_list = async (req,res)=>{
        try {
                        let id = req.params.id;
                    
                       let obj_id =  mongoose.Types.ObjectId(id);
    
                          let pipeline =  [];
                          if(!isEmpty(id)){
                            pipeline.push({ $match:{"_id":obj_id} });
                          }
            
              pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_tbl'} });
              pipeline.push({ $unwind: "$user_tbl" }); 
              pipeline.push({ $project: {"_id":1,"power_up_count": 1,"user_id":1, "user_name":"$user_tbl.name", } });
       
           console.log("pipeline", pipeline);

     let result = await user_allotted_powerUps_tbl.aggregate(pipeline).exec();
                  if(result){ return res.status(200).send({'status':true,'msg':"Success",body:result});
                      }else{ res.status(200).send({'status':false,'msg':"all field required"});
                            }
                   } catch (error) { console.log(error); 
                      res.status(200).send({'status':false,'msg':'','body':''});
                    }
            }

  static get_user_powerUp_list = async (req,res)=>{
        try {
                        let id = req.params.id;
                    if( isEmpty(id)){
                      return res.status(200).send({'status':false,'msg':'User id Field Required'});
                    }
                        let obj_id =  mongoose.Types.ObjectId(id);
    
                          let pipeline =  [];
                         
              pipeline.push({ $match:{"user_id":obj_id} });
              pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user_tbl'} });
              pipeline.push({ $unwind: "$user_tbl" }); 
              pipeline.push({ $project: {"_id":1,"power_up_count": 1,"user_id":1, "user_name":"$user_tbl.name", } });
        
            console.log("pipeline", pipeline);

      let result = await user_allotted_powerUps_tbl.aggregate(pipeline).exec();
                  if(result){ return res.status(200).send({'status':true,'msg':"Success",body:result});
                      }else{ return res.status(200).send({'status':false,'msg':"all field required"});
                            }
                    } catch (error) { console.log(error); 
                      return res.status(200).send({'status':false,'msg':'','body':''});
                    }
            }
      
            static power_up_used = async (req,res)=>{
              try {
                      let user_id = req.body.user_id;
                      let match_id = req.body.match_id;
                      let card_id = req.body.card_id;
                      let power_up_type = req.body.power_up_type ;
                      
                 // console.log(req.body) ;   
                  if(isEmpty(user_id) ){
                    return res.status(200).send({'status':false,'msg':"all field required"});
                    }
               /// check user     
                 
    
                  let add = new used_power_ups_tbl({user_id,match_id,card_id,power_up_type });
                
                        add.save((err,datas)=>{
                          if(err){ console.log(err);   return res.status(200).send({"status":false,"msg":'some errors...'}) ;   
                              }else{ 
                                return res.status(200).send({"status":true,"msg":'Data add  successfully',"body":datas }) ;  
                              }
                          }); 
        
                  } catch (error) { console.log(error); 
                    res.status(200).send({'status':false,'msg':'','body':''});
                  }
                        
                      }    
  
}
   






module.exports = AdminController ;      