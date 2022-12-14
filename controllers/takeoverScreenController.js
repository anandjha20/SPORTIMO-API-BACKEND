let  express_2 = require('express');
const mongoose = require('mongoose');
const  {MyBasePath} = require("../myModel/image_helper");
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
   

const { poll_percent,all_list_come} = require('../myModel/helper_fun');
   
  
   
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const takeover_screen_tbls = require('../models/takeoverScreen');    
const { insertMany } = require('../models/user');
    
class TakeoverScreen { 
     
static takeover_screen_add = async(req,res)=>{
    try{
      let view_type=req.body.view_type;
      let skip=req.body.skip;
      let skip_time=req.body.skip_time;
      
let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
if(isEmpty(image)){ 
    return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
    }
let details={image}
if(!isEmpty(view_type)){details={...details,view_type}}
if(!isEmpty(skip)){details={...details,skip}}
if(!isEmpty(skip_time)){details={...details,skip_time}}

let deactive=await takeover_screen_tbls.updateMany({},{status:0})
let add = new takeover_screen_tbls(details);
  let response  = await add.save();  
  if(response){
    return res.status(200).send({"status":true,"msg":' Takeover Screen added successfully', "body":response}) ;          
  }else{
    return res.status(200).send({"status":false,"msg":'Takeover Screen not added'}) ;    
 }
     
  
} catch (error) { console.log(error);
  return res.status(200).send({"status":false,"msg":'No data added'}) ;          
  }


}

static takeover_screen_update = async(req,res)=>{
  try{
    let id=req.params.id;
    let view_type=req.body.view_type;
    let skip=req.body.skip;
    let skip_time=req.body.skip_time;
    
let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
let details={}
if(!isEmpty(image)){details={...details,image}}
if(!isEmpty(view_type)){details={...details,view_type}}
if(!isEmpty(skip)){details={...details,skip}}
if(!isEmpty(skip_time)){details={...details,skip_time}}

let response  = await takeover_screen_tbls.findByIdAndUpdate(id,details,{new:true})  
console.log({id,response})
if(response){
  return res.status(200).send({"status":true,"msg":' Takeover Screen updated successfully', "body":response}) ;          
}else{
  return res.status(200).send({"status":false,"msg":'Takeover Screen not updated'}) ;    
}
   

} catch (error) { console.log(error);
return res.status(200).send({"status":false,"msg":'No data added'}) ;          
}


}

static takeover_screen_get = async (req,res)=>{
try {
console.log(req.body.page)
 let page = req.body.page == undefined || req.body.page == 0 ? 1 : req.body.page;
 let offset=(page-1)*5;
 let data = await takeover_screen_tbls.find().skip(offset).limit(5);
 let rows = await takeover_screen_tbls.find().countDocuments()
 let paths =MyBasePath(req,res);    
 data.map((item)=>{
   item.image = (item.image)?  `${paths}/image/assets/takeover_screen_img/${item.image}`:''; 
  
   return item;} );
   if(data.length>0){
       res.status(200).send({'status':true,'msg':"Takeover Screen found",rows ,'body':data });

   }else{
    res.status(200).send({'status':false,'msg':"no Takeover Screen found"  });

   }


} catch (error) { console.log(error);
res.status(200).send({'status':false,'msg':"server error"});
}
 
}  

static takeover_screen_get_user = async (req,res)=>{
  try {
  
  
  let data = await takeover_screen_tbls.findOne({status:1})
    
  if(!isEmpty(data)){
   let paths =MyBasePath(req,res);    
   //data.map((item)=>{
    data.image = (data.image)?  `${paths}/image/assets/takeover_screen_img/${data.image}`:''; 
    
     //return item;} );
         res.status(200).send({'status':true,'msg':"success", 'body':data });
        }else{
          res.status(200).send({'status':false,'msg':"no data found" });

        }
  
  } catch (error) { console.log(error);
  res.status(200).send({'status':false,'msg':"server error"});
  }
   
  }  
  

static takeover_screen_delete = async(req,res)=>{
    try {
            let _id = req.params.id;
            let result = await takeover_screen_tbls.findOneAndDelete({_id});
            if(result){
               return res.status(200).send({"status":true,"msg":'takeover_screen deleted' , "body":result}) ;
            }else{
               return res.status(200).send({"status":false,"msg":'something went wrong' }) ;
            }
      
    } catch (error) { console.log(error); 
       return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }

}

static takeover_screen_status_update = async(req,res)=>{
  try {
          let _id = req.params.id;
          let status=req.body.status;

          if(status==0||status==1){
            let d1 = await takeover_screen_tbls.updateMany({},{status:0},{new:true});
            
            let result = await takeover_screen_tbls.findOneAndUpdate({_id},{status},{new:true});
            if(result){
                return res.status(200).send({"status":true,"msg":'Takeover Screen updated' , "body":result}) ;
            }else{
                return res.status(200).send({"status":false,"msg":'invalid Takeover Screen id' }) ;
            }
        }else{
            return res.status(200).send({"status":false,"msg":'invalid status code' }) ;
      }
          
    
  } catch (error) { console.log(error); 
     return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }

}


}
   






module.exports = TakeoverScreen ;      