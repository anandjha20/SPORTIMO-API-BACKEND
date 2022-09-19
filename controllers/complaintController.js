let  express_2 = require('express');
const mongoose = require('mongoose');
const { rows_count,Email,gen_str,getcurntDate,getTime,send_mobile_otp, isEmpty } = require('../myModel/common_modal');

const  {MyBasePath} = require("../myModel/image_helper");
    
  const {userSentNotification} = require('../myModel/Notification_helper');
  

const { poll_percent,all_list_come,sendNotificationAdd} = require('../myModel/helper_fun');
   
  
  
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
                let cat_name     = req.body.cat_name;
                let cat_name_ara = req.body.cat_name_ara;
                let cat_name_fr  = req.body.cat_name_fr;

            if(isEmpty(cat_name) || isEmpty(cat_name_ara) || isEmpty(cat_name_fr) ){
                return res.status(200).send({"status":false,"msg":'All Field Required' , "body": ''}) ;  
            }

         let add = new user_complaint_cat_tbl({cat_name,cat_name_ara,cat_name_fr});
          
          let response  =   await add.save();
           if( !isEmpty(response)){
                      return res.status(200).send({"status":true,"msg":'category added successfully', "body": ''}) ;          
              }else{
                    return res.status(200).send({"status":false,"msg":'category not add' , "body": ''}) ;    
                  }
      
        } catch (error) {  console.log(error); 
            return res.status(200).send({"status":false,"msg":'No data add  ' , "body":error}) ;          
            }
      }  
     
       

            static user_complaint_cat_list = async (req,res)=>{
                try {
                    let language = req.body.language;
                    language = isEmpty(language) ? '' : language ;
                    let  id = req.params.id;  let id_len = (id || '').length;
                    let whr = (id_len == 0) ? {active_status:true} :{_id:id};
              
                    let data = await user_complaint_cat_tbl.find(whr);
                      if(data){
                        data.map((item)=> {  
                                              if(language != '' && language == 'ar'){ 
                                                    item.cat_name = item.cat_name_ara;  
                                                 }else if(language != '' && language == 'fr'){
                                                item.cat_name = item.cat_name_fr}
                                            });   

                  return res.status(200).send({'status':true,'msg':"success",'body':data});
                        }else{      
                          return  res.status(200).send({'status':false,'msg':"No Data Found!..",'body':''});}
                            
                  
              
                } catch (error) { console.log(error);
                  res.status(200).send({'status':false,'msg':error,'body':''});
                }
                      
                    }     
              
 
    static user_complaint_cat_update = async (req,res)=>{
        try {
            let  id = req.params.id; 
            let cat_name     = req.body.cat_name;
            let cat_name_ara = req.body.cat_name_ara;
            let cat_name_fr  = req.body.cat_name_fr;

        if(isEmpty(cat_name) || isEmpty(cat_name_ara) || isEmpty(cat_name_fr) ){
            return res.status(200).send({"status":false,"msg":'All Field Required' , "body": ''}) ;  
        }
          
        user_complaint_cat_tbl.findOneAndUpdate({_id: id},{$set : {cat_name,cat_name_ara,cat_name_fr}},{new: true}, (err, updatedUser) => {
         if(err) {  console.log(err);
               return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
            }
        
           return res.status(200).json({ "status":true,"msg": "success" , "body":updatedUser });
     });    

        
        } catch (error) { console.log(error);
           return   res.status(200).send({'status':false,'msg':error,'body':''});
        }
                
            }     
                      
       /// user_complaint_cat_delete   
     static user_complaint_cat_delete = async (req,res)=>{
        try {
            let  id = req.params.id;  let id_len = (id || '').length;
            if( id_len == 0 ){
                      return   res.status(200).send({'status':false,'msg':"Id Field Required",'body':''});
                   }  
            
                    let check_catData = await rows_count(user_complaint_tbl,{cat_id: id})  ;             
                           
                 if(check_catData >0 ){  
                      return   res.status(200).send({'status':false,'msg':"Can't delete this category, complaint with this category is still available",'body':''});
                      
                    }else{
                            user_complaint_cat_tbl.findOneAndDelete({ _id:id }, (err, data) => {
                                if (err) { console.log(err);
                                    return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                                } else if(!isEmpty(data)) {
                                    return res.status(200).json({ "status":true,"msg": "Category Deleted successfully " , "body":''});
                                }else{
                                    return res.status(200).send({"status":false,"msg":'Invalid Category Id ' , "body":''}) ;  
                           
                                }
                            });
                      }


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
            
                   let date = getcurntDate();
                   let times = getTime();
  

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
                        return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
                        }
                    }


    static all_user_complaint_list = async (req,res)=>{
        try {
             let id = req.params.id ;
            let cat_id  = req.body.cat_id;
            let s_date  = req.body.s_date;
            let e_date  = req.body.e_date;
            let email  = req.body.email;
            let mobile  = req.body.mobile;
            
  
            let page  = req.body.page;
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
            let cat_search = {path:'cat_id' , select:'cat_name'}; 
            let user_search = {path:'user_id' , select:'name mobile email u_name '}; 
            let whr ={}; 
           // if(!isEmpty(match)){whr.match = { $regex: '.*' + match + '.*' } ;} 
            if(!isEmpty(cat_id)){  whr.cat_id = cat_id;} 
            if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date = { $gte: s_date, $lte: e_date } } 
          
          
            if(!isEmpty(id)){whr = {_id: id} ;} 
          
     if(!isEmpty(email)){user_search =   {path:'user_id' ,match: {"email":email }, select:'name mobile email u_name '};   } 
     if(!isEmpty(mobile)){user_search =   {path:'user_id' ,match: {"mobile":mobile }, select:'name mobile email u_name '};   } 
    
        //    let cat_search = {path: 'cat_id', select: 'cat_name'};
 
     // {path: 'cat_id', select: 'cat_name'}, {path: 'meal', select: 'name'}
      let query =  user_complaint_tbl.find(whr).populate([cat_search, user_search]).sort({_id:-1});
                 
             const query2 =  query.clone();  
             const counts = await query.countDocuments();
            let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);

             let paths =MyBasePath(req,res); 
             if(records){ records.map((item)=> { 
                item.image = (item.image)? `${paths}/image/assets/userComplaint_img/${item.image}` : '' ;
                        return item; })} 

          return res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
      
 ///////////////////////////////////////////////////////////////////      
            // user_complaint_tbl.aggregate()
            //         .match(whr)
                   
            //         .allowDiskUse(true)
            //         .exec(function(err, data) {
            //             if (err) { console.log('err==', err); 
            //             return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ;    
            //             }else{
            //                 console.log( data);

            //             if(data.length>0){
                    
            //             return res.status(200).send({"status":true,"msg":'success' , "body":data}) ;     
            //             }else{
            //             return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ; 
            //             }
            //         }
            //         });

    
/////////////////////////////////////////////////////////////////////////////////////


        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
                
  }     
        
    static user_complaint_list = async (req,res)=>{
        try {
            let  user_id = req.params.user_id; 
            let  id = req.params.id;  let id_len =(id || '').length;
        let whr = (id_len == 0)? {user_id:user_id} : {_id:id} ;
          
            let data = await user_complaint_tbl.find(whr).populate('cat_id','cat_name').sort({_id:-1}).exec() ;
          
            console.log("whr value1111 == ",data );
           // let data = await user_complaint_tbl.find(whr).populate('cat_id' ).select({'_id':1,'question':1,'admin_status':1,'image':1,'cat_id':1}).exec();
              
           let paths =MyBasePath(req,res); 
             
     if(data){  let allData =  data.map( (item)=>{ item.image = (item.image == '')? '' : `${paths}/image/assets/userComplaint_img/${item.image}`; return item;});
                
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
             
            let paths =MyBasePath(req,res); 
            
            
            
            if(appdata){
                  
                       let allData =  appdata.map( (item)=>{
                        let whr = {_id:item.cat_id};
                        let cat_data =  user_complaint_cat_tbl.find(whr);
                        item.image = (item.image == '')? '' :`${paths}/image/assets/master/${item.image}`;
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
                
        let getData =   await  user_complaint_tbl.find({_id:complaint_id,admin_status:true }).exec();


          if(getData.length >0){
            return res.status(200).send({"status":false,"msg":'Complaint status marked closed already.'}) ; 
                  
          }else{
                     let objMy = {complaint_id,message,sender_type} ;    
                     let add = new user_complaint_chat_tbl(objMy);
                 
                 let response  =   await add.save();
                 if(response){
                          
                        let type_status = 1; 
                       
                        let title = 'Admin has replied to your complaint'; 
                        let msg = `Admin has replied to your complaint Click here to view.`; 
                        

                       let module_type = "complaint";
                       let module_id  = response._id;
                        let demo =  sendNotificationAdd({title,msg,type_status,module_type,module_id});
                              
                        let data = await userSentNotification({ "user_id": complaint_id,"title":title,"details":msg});


                             return res.status(200).send({"status":true,"msg":'Complaint cht added successfully', "body":response}) ;          
                     }else{
                             return res.status(200).send({"status":false,"msg":'Complaint chat not add'}) ;    
                         }
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
     user_complaint_tbl.findOneAndUpdate({_id:id},{$set : {admin_status:true}},{new: true},(err, updatedUser) => {
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
                }

            if(!isEmpty(updatedUser)){
                let com_user_id =  updatedUser.user_id;    
                let type_status = 1; 
                let title = `complaint marked closed by admin ` ;  
                let msg = `complaint marked closed by admin Click here to view.`; 
                let module_type = "complaint";
                let module_id  = updatedUser._id;
                let demo =  sendNotificationAdd({title,msg,type_status,module_type,module_id});
                let demo3 = userSentNotification({"user_id":com_user_id,"details": msg,title});
             return res.status(200).json({ "status":true,"msg": "Complaint marked as closed successfully." ,
                                             "body":updatedUser });

        }else{ return res.status(200).json({  "status":false,"msg": "Invalid Id " });
                }
        });    
    
            
            } catch (error) { console.log(error);
                res.status(200).send({'status':false,'msg':error,'body':''});
            }
                    
                }   

}
   






module.exports = ComplaintController ;      