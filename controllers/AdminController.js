let  express_2 = require('express');
  
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp } = require('../myModel/common_modal');
   

  
  
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const faq_category_tbl = require('../models/faq_categories');    
    const faq_tbl = require('../models/faq');   
    const tips_trick = require('../models/tips_tricks'); 

class AdminController { 

    static JK = (req,res)=>{
        res.status(200).send({'status':true,'msg':"success",'body':''});        
    }

    static user_list = async (req,res)=>{
        try {
           let  id = req.params.id;  let id_len = (id || '').length;
           let whr = (id_len == 0) ? {} :{_id:id};

             let data = await user_tbl.find(whr);

console.log('tttttt=======  ',data);         
          res.status(200).send({'status':true,'msg':"success",'body':data});
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':error,'body':''});
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
                    tips_trick: user_data.tips_trick,
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
                let  id = req.body.id;  let id_len = (id || '').length;
                let tips = req.body.tips_trick; let tips_trick_len = (tips_trick || '').length;
                
                if(tips_trick_len == 0 || id_len == 0 ){
                return   res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});
                }
            tips_trick.findOneAndUpdate({_id: id},{$set : {tips_trick:tips}},{new: true}, (err, updatedUser) => {
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
            }
            
            return res.status(200).json({  
                "status":true,"msg": "success" , "body":updatedUser
            });
        });    
      
            
            } catch (error) { console.log(error);
                res.status(200).send({'status':false,'msg':error,'body':''});
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
                      return res.status(200).json({ "status":true,"msg": "Category Deleted successfully " , "body":''});
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
                      let tips = tips_trick.find({}, function(err, tips){
                        if(err){
                         console.log(err);
                        }
                        else {
                             res.json( {"status":true,"msg":'Success' , "body":tips });
                            // return res.status(200).send({"status":true,"msg":'Success' , "body":dd }) ;      
                        }
                    });
                  } catch (error) { console.log(error);
                    res.status(200).send({'status':false,'msg':error,'body':''});
                  }    
        }
      
  


      static add_faq_category = async(req,res)=>{

        try {
            // console.log('By shubham');
            let user_data = req.body;
          
            let add = new faq_category_tbl({
                cat_name: user_data.cat_name,
                
            });
          
          let response  =   await add.save();
          if(response){
                      return res.status(200).send({"status":true,"msg":'FAQ category added successfully' , "body": ''}) ;          
              }else{
                    return res.status(200).send({"status":false,"msg":'FAQ category  not add' , "body": ''}) ;    
                  }
      
        } catch (error) {
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
            }
      }
      static update_faq_category = async (req,res)=>{
        try {
            let  id = req.body.id;  let id_len = (id || '').length;
            let cat_name = req.body.cat_name; let cat_name_len = (cat_name || '').length;
            
            if(cat_name_len == 0 || id_len == 0 ){
            return   res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});
            }
            faq_category_tbl.findOneAndUpdate({_id: id},{$set : {cat_name:cat_name}},{new: true}, (err, updateddata) => {
        if(err) {  console.log(err);
            return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
        }
        
        return res.status(200).json({  
            "status":true,"msg": "success" , "body":updateddata
        });
    });    
  
        
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
                
            } 
            static delete_faq_category = async (req,res)=>{
              try {
                // console.log(req)
                  let  id = req.params.id;  let id_len = (id || '').length;
                  if( id_len == 0 ){
                        return   res.status(200).send({'status':false,'msg':"Id Field Required",'body':''});
                  }                
                  faq_category_tbl.findOneAndDelete({ _id:id }, (err, data) => {
                      if (err) { console.log(err);
                          return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                      } else {
                          return res.status(200).json({ "status":true,"msg": "FAQ Category Deleted successfully " , "body":''});
                      }
                  });
              } catch (error) { console.log(error);
                        return  res.status(200).send({'status':false,'msg':error,'body':''});
              }
                              
        }         
     
      static add_faq = async(req,res)=>{
        try {      
            let cat_id    = req.body.cat_id;   let cat_id_lan   = (cat_id || '').length;
            let question  = req.body.question;   let question_lan = (question || '').length;
            let answer    = req.body.answer;   let answer_lan   = (answer || '').length;
            if(cat_id_lan == 0 || cat_id_lan == 0 || cat_id_lan == 0){
              return res.status(200).send({"status":false,"msg":'All Field Required' , "body":''}) ;   
            }
            let add = new faq_tbl({
            
              question,
              answer,
              faq_cat_id: cat_id,
            });
          
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
            let id    = req.body.id;   let id_lan   = (id || '').length;
            let cat_id    = req.body.cat_id;   let cat_id_lan   = (cat_id || '').length;
            let question  = req.body.question;   let question_lan = (question || '').length;
            let answer    = req.body.answer;   let answer_lan   = (answer || '').length;
            if(cat_id_lan == 0 || cat_id_lan == 0 || cat_id_lan == 0){
              return res.status(200).send({"status":false,"msg":'All Field Required' , "body":''}) ;   
            }
            
            faq_tbl.findOneAndUpdate({_id: id},{$set : {cat_id:cat_id,question:question,answer:answer}},{new: true}, (err, updateddata) => {
              if(err) {  console.log(err);
                  return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
              }
              
              return res.status(200).json({  
                  "status":true,"msg": "success" , "body":updateddata
              });
            });                  
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
              let  id = req.params.id;  let id_len = (id || '').length;
              let whr = (id_len == 0) ? {active_status:true} :{_id:id};
        
             // let data = await faq_tbl.find(whr).populate('faq_cat_id' ).select({'_id':1,'question':1,'answer':1,'faq_cat_id':'faq_cat_id._id','cat_name':"faq_cat_id.cat_name"}).exec();
              let data = await faq_tbl.find(whr).populate({path: 'faq_cat_id' ,"select":'cat_name _id'}).select({'_id':1,'question':1,'answer':1,'faq_cat_id': 1}).exec();
               
              if(data){ res.status(200).send({'status':true,'msg':"success",'body':data});
                  }else{          
                  res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                        
               
        
          } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
          }
                
              }     
        
                  
            
              


}
   






module.exports = AdminController ;      