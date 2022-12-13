let  express_2 = require('express');
const mongoose = require('mongoose');
const  {MyBasePath} = require("../myModel/image_helper");
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
   

const { poll_percent,all_list_come} = require('../myModel/helper_fun');
   
  
   
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const login_sponsorship_tbls = require('../models/loginSponsorship');    
const { insertMany } = require('../models/user');
    
class Sponsorship { 
     
  static login_sponsorship_add = async(req,res)=>{
    try{
let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
if(isEmpty(image)){ 
    return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
    }  

let add = new login_sponsorship_tbls({image});
         
let response  = await add.save();  
if(response){
          return res.status(200).send({"status":true,"msg":' login sponsorship added successfully', "body":response}) ;          
  }else{
          return res.status(200).send({"status":false,"msg":'login sponsorship not added'}) ;    
      }

} catch (error) { console.log(error);
  return res.status(200).send({"status":false,"msg":'No data added'}) ;          
  }


}

static login_sponsorship_get = async (req,res)=>{
try {


let data = await login_sponsorship_tbls.find()
  
//  const query2 =  query.clone();
//  const counts = await query.countDocuments();


  
//  let offest = (page -1 ) * 10 ; 
//  const records = await query2.skip(offest).limit(10);
 let paths =MyBasePath(req,res);    
 data.map((item)=>{
   item.image = (item.image)?  `${paths}/image/assets/login_sponsorship_img/${item.image}`:''; 
  
   return item;} );
   if(data.length>0){
       res.status(200).send({'status':true,'msg':"login sponsorship found", 'body':data });

   }else{
    res.status(200).send({'status':false,'msg':"no login sponsorship found"  });

   }


} catch (error) { console.log(error);
res.status(200).send({'status':false,'msg':"server error"});
}
 
}  

static login_sponsorship_get_user = async (req,res)=>{
  try {
  
  
  let data = await login_sponsorship_tbls.find({status:1})
    
  //  const query2 =  query.clone();
  //  const counts = await query.countDocuments();
  
  
    
  //  let offest = (page -1 ) * 10 ; 
  //  const records = await query2.skip(offest).limit(10);
   let paths =MyBasePath(req,res);    
   data.map((item)=>{
     item.image = (item.image)?  `${paths}/image/assets/login_sponsorship_img/${item.image}`:''; 
    
     return item;} );
     if(data.length>0){
         res.status(200).send({'status':true,'msg':"login sponsorship found", 'body':data });
  
     }else{
      res.status(200).send({'status':false,'msg':"no login sponsorship found"  });
  
     }
  
  
  } catch (error) { console.log(error);
  res.status(200).send({'status':false,'msg':"server error"});
  }
   
  }  
  

static login_sponsorship_delete = async(req,res)=>{
    try {
            let _id = req.params.id;
            let result = await login_sponsorship_tbls.findOneAndDelete({_id});
            if(result){
               return res.status(200).send({"status":true,"msg":'login_sponsorship deleted' , "body":result}) ;
            }else{
               return res.status(200).send({"status":false,"msg":'something went wrong' }) ;
            }
      
    } catch (error) { console.log(error); 
       return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }

}

static login_sponsorship_status_update = async(req,res)=>{
  try {
          let _id = req.params.id;
          let status=req.body.status;
          console.log(status)
          if(status==0||status==1){
            let result = await login_sponsorship_tbls.findOneAndUpdate({_id},{status},{new:true});
          if(result){
             return res.status(200).send({"status":true,"msg":'login sponsorship updated' , "body":result}) ;
          }else{
             return res.status(200).send({"status":false,"msg":'invalid login sponsorship id' }) ;
          }}else{
            return res.status(200).send({"status":false,"msg":'invalid status code' }) ;
          }
          
    
  } catch (error) { console.log(error); 
     return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }

}


}
   






module.exports = Sponsorship ;      