let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp } = require('../myModel/common_modal');
   

const { poll_percent,all_list_come} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    

    const user_complaint_cat_tbl = require('../models/user_complaint_cat');    
    const user_complaint_tbl = require('../models/user_complaint');    
    const user_complaint_chat_tbl = require('../models/user_complaint_chat');    
    const complaint_categories = require('../models/user_complaint_cat');    
    
class ComplaintController{

        
   static add_user_complaint_category = async(req,res)=>{
            try {
                let user_data = req.body;
            
            let add = new user_complaint_cat_tbl({
                cat_name: user_data.cat_name,
                
            });
          
          let response  =   await add.save();
          if(response){
                      return res.status(200).send({"status":true,"msg":'category added successfully' , "body": ''}) ;          
              }else{
                    return res.status(200).send({"status":false,"msg":'category  not add' , "body": ''}) ;    
                  }
      
        } catch (error) {
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
            }
      }
     
       

            static user_complaint_cat_list = async (req,res)=>{
                try {
                    let  id = req.params.id;  let id_len = (id || '').length;
                    let whr = (id_len == 0) ? {active_status:true} :{_id:id};
              
                    let data = await user_complaint_cat_tbl.find(whr);
                      if(data){ res.status(200).send({'status':true,'msg':"success",'body':data});
                        }else{      
                        res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                            
                  
              
                } catch (error) { console.log(error);
                  res.status(200).send({'status':false,'msg':error,'body':''});
                }
                      
                    }     
              
 
    static user_complaint_cat_update = async (req,res)=>{
        try {
            let  id = req.params.id;  let id_len = (id || '').length;
            let cat_name = req.body.cat_name; let cat_name_len = (cat_name || '').length;
            
            if(cat_name_len == 0 || id_len == 0 ){
            return   res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});
            }  
            
            let whr = (cat_name_len == 0) ? {active_status:true} :{_id:id};
        //////////////////////////////////////////
        user_complaint_cat_tbl.findOneAndUpdate({_id: id},{$set : {cat_name:cat_name}},{new: true}, (err, updatedUser) => {
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
                      
       /// user_complaint_cat_delete   
     static user_complaint_cat_delete = async (req,res)=>{
        try {
            let  id = req.params.id;  let id_len = (id || '').length;
            let cat_name = req.body.cat_name; let cat_name_len = (cat_name || '').length;
            
            if( id_len == 0 ){
                         return   res.status(200).send({'status':false,'msg':"Id Field Required",'body':''});
                         }  
            
             user_complaint_cat_tbl.findOneAndDelete({ _id:id }, (err, data) => {
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
 

     //user_complaint_add 
    
     static user_complaint_add = async(req,res)=>{
        
       try {   
                let user_id = req.body.user_id;       let user_id_len  = (user_id || '').length;       
                let cat_id = req.body.cat_id;         let cat_id_len   = (cat_id || '').length;       
                let question = req.body.question;     let question_len = (question || '').length;       
             
                let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
          
                 if(user_id_len == 0 || cat_id_len == 0 || question_len == 0 ){
                          return res.status(200).send({"status":false,"msg":'All field Required'}) ;       
                    }


                        let add = new user_complaint_tbl({ user_id,cat_id,question,image });
                    
                    let response  =   await add.save();
                    if(response){
                                return res.status(200).send({"status":true,"msg":'Complaint added successfully', "body":response}) ;          
                        }else{
                                return res.status(200).send({"status":false,"msg":'Complaint not add'}) ;    
                            }

                    } catch (error) {
                        return res.status(200).send({"status":false,"msg":'No data add  ' , "body":''}) ;          
                        }
                    }


    static all_user_complaint_list = async (req,res)=>{
        try {
            let  id = req.params.id;  let id_len = (id || '').length;
            let whr = (id_len == 0) ? {admin_status:false} :{_id:id};
        
            let data = await user_complaint_tbl.find(whr);
                if(data){     let allData =  data.map( (item)=>{ item.image = (item.image == '')? '' : "http://192.168.1.95:3500/image/assets/userComlaint_img/" +item.image; return item;});
                
                res.status(200).send({'status':true,'msg':"success",'body':allData});
                }else{      
                res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                    
            
        
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
                
            }     
        
    static user_complaint_list = async (req,res)=>{
        try {
            let  user_id = req.params.user_id; 
            let  id = req.params.id;  let id_len =(id || '').length;
        let whr = (id_len == 0)? {user_id:user_id} : {_id:id} ;
            console.log("whr value == ",whr )
            let data = await user_complaint_tbl.find(whr);

           // let data = await user_complaint_tbl.find(whr).populate('cat_id' ).select({'_id':1,'question':1,'admin_status':1,'image':1,'cat_id':1}).exec();
              


                if(data){     let allData =  data.map( (item)=>{ item.image = (item.image == '')? '' : "http://192.168.1.95:3500/image/assets/userComplaint_img/" +item.image; return item;});
                
                res.status(200).send({'status':true,'msg':"success",'body':allData});
                }else{      
                res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                    
            
        
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error.name});
        }
                
            }     
    static user_complaint_all = async (req,res)=>{
                try {
                    let appdata =[];
            
            let  id = req.body.id;  let id_len =(id || '').length;
            let data = user_complaint_tbl.aggregate([{
                $lookup: {
                    from: "complaint_categories",
                    localField: "cat_id",
                    foreignField: "_id",
                    as: "category"
                    }},
                    {
                    $lookup: {
                        from: "user_tbls",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "userdata"
                        }},

            ]);
            for await (let doc of data) {
                appdata.push(doc) ;
                // console.log(doc);
              }
           
          
            // let data = await user_complaint_tbl.find({});
            // let data = await user_complaint_tbl.find(whr).populate('cat_id' ).select({'_id':1,'question':1,'admin_status':1,'image':1,'cat_id':1}).exec();
                if(appdata){
                  
                       let allData =  appdata.map( (item)=>{
                        let whr = {_id:item.cat_id};
                        let cat_data =  user_complaint_cat_tbl.find(whr);
                        item.image = (item.image == '')? '' : "http://192.168.1.95:3500/image/assets/userComplaint_img/" +item.image;
                         return item;
                        });

                     res.status(200).send({'status':true,'msg':"success",'body':allData});
                }else{      
                    res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});
                }

                } catch (error) { console.log(error);
                    res.status(200).send({'status':false,'msg':error.name});
                }      
                    }  
   // user_complaint_chat_tbl


   static user_complaint_chat_add = async(req,res)=>{
        
    try {   
               
             let complaint_id = req.body.complaint_id;    let complaint_id_len   = (complaint_id || '').length;       
             let message = req.body.message;                let message_len = (message || '').length;       
             let sender_type = req.body.sender_type;                    let  sender_type_len = (sender_type || '').length;       
              
          
              if(complaint_id_len == 0 || message_len == 0 || sender_type_len == 0 ){
                       return res.status(200).send({"status":false,"msg":'All field Required'}) ;       
                 }
                
            user_complaint_tbl.find({_id:complaint_id,admin_status:true }).exec((err,data)=>{
                if(err){  console.log("check err",err); }else{
                     if(data.length >0){
                        return res.status(200).send({"status":false,"msg":'stop chate for admin'}) ; 
                     }
                }

              });
          
            
                     let objMy = {complaint_id,message,sender_type} ;    
                     let add = new user_complaint_chat_tbl(objMy);
                 
                 let response  =   await add.save();
                 if(response){
                             return res.status(200).send({"status":true,"msg":'Complaint cht added successfully', "body":response}) ;          
                     }else{
                             return res.status(200).send({"status":false,"msg":'Complaint chat not add'}) ;    
                         }

                 } catch (error) { console.log(error);
                     return res.status(200).send({"status":false,"msg":'No data add'}) ;          
                     }
                 }

     
    static user_complaint_chat_list = async (req,res)=>{
    try {
       
        let  id = req.params.id;  let id_len = (id || '').length;
     
        let data = await user_complaint_chat_tbl.find({complaint_id:id});

            if(data){ 
                      res.status(200).send({'status':true,'msg':"success",'body':data});
                }else{      
                   res.status(200).send({'status':false,'msg':"No Data Found!.."});}
                
        
    
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':error.name});
    }
            
        }    

        static user_complaint_chat_stop = async (req,res)=>{
            try {
                let  id = req.params.id;  let id_len = (id || '').length;
                
            //////////////////////////////////////////
            user_complaint_tbl.findOneAndUpdate({_id: id},{$set : {admin_status:true}},{new: true}, (err, updatedUser) => {
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

}
   






module.exports = ComplaintController ;      