
const {getcurntDate,isEmpty,gen_str} = require('../myModel/common_modal');
 const  {MyBasePath} = require("../myModel/image_helper");
 const  {userBlocked_fun} = require("../myModel/helper_fun");

const report_reason_tbl = require('../models/report_reason');
const user_reportings_tbl = require('../models/user_reportings');

  
class ReportReasonController { 
       
       static  report_reason_add =  async(req,res) =>{  
             let name = req.body.name;    let name_ara = req.body.name_ara;
                if(isEmpty(name) || isEmpty(name_ara)){   
                    return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                }
                    let add = new report_reason_tbl({name,name_ara}); 
                    add.save((err,data)=>{
                        if(err){ console.log("sport err ==  ", err);    return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                                }else{
                        return res.status(200).send({"status":true,"msg":"Report Reason  Add Successfully","body": data });
                     }
           });     

                
         }

     static report_reason_get = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;
                let name    = req.body.name;
                let whr = {};
               
                if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

                page = (isEmpty(page) || page == 0 )? 1 :page ; 
                 if(!isEmpty(id)){whr = {_id: id} ;} 

            let query =  report_reason_tbl.find(whr).sort({_id:-1});
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();


              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
        
          res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':error,'body':''});
        }
             
            }     

   static report_reason_update = async(req,res)=>{
                try {
                           let id = req.params.id;   let name_ara = req.body.name_ara; 
                          let name = req.body.name; 
                           if(isEmpty(name)  || isEmpty(name_ara) ){  
                               return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                           }
                        

                     report_reason_tbl.findOneAndUpdate({_id: id},{$set : {name,name_ara} },{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                }else if(!isEmpty(updatedUser)){
                            return res.status(200).send({"status":true,"msg":'Report Reason Updated Successfully' , "body":updatedUser  }) ;   
                    }else{  return res.status(200).send({"status":false,"msg":'Invalid Report Reason Id ' , "body": ''}) ;   
                            }

                    
                });
       
                 } catch (error) { console.log(error);
                         return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
             
                     }
                   
             
                 }          
          
     static sports_delete = async(req,res)=>{
                 try {
                         let id = req.params.id;
                         report_reason_tbl.findByIdAndDelete(id, function (err, docs) {
                       if (err){  console.log("jjj === ",err);           //json(err)
       
                               let getError =  JSON.parse(JSON.stringify(err));
                         return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                          }else if(!isEmpty(docs)){
                             return res.status(200).send({"status":true,"msg":'Sport Deleted Successfully' , "body":''}) ;   
                       }else{
                         return res.status(200).send({"status":false,"msg":'Invalid Sport Id ' , "body":''}) ;  
                       }
                   });
       
                 } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }
       
             }
      
         static report_reason_delete = async (req,res)=>{
                try {
                
                    let  id = req.params.id; 
                   report_reason_tbl.findOneAndDelete({ _id:id }, (err, data) => {
                                if (err) { console.log(err);
                                    return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;  
                                }else if(! isEmpty(data)) {
                                    return res.status(200).json({ "status":true,"msg": "Report Reason Deleted successfully " , "body":''});
                                }else{
                                  return res.status(200).send({"status":false,"msg":'Invalid Report Reason  Id ' , "body":''}) ;  
                                }
                            });
                 // }
                } catch (error) { console.log(error);
                          return  res.status(200).send({'status':false,'msg':"server error",'body':''});
                }
                                
          }     

    static report_reason_types = async (req,res)=>{
            try {
                    let language = req.body.language;
                    let  id = req.params.id;
                    let page  = req.body.page;
                    let name    = req.body.name;
                    let whr = {};
                    
                    if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

                
                        if(!isEmpty(id)){whr = {_id: id} ;} 

                let records =  await report_reason_tbl.find(whr).sort({_id:-1});
              console.log(records)      
              if(records.length >0){

                 records.map((item)=> {  if(language == 'ar'){item.name = item.name_ara }
                       return item;  })
                         res.status(200).send({'status':true,'msg':(language == 'ar')? "النجاح"  : "success" ,  'body':records });
                    }else{
                        res.status(200).send({'status':false,'msg':(language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.." });
                    }    
            
               

            } catch (error) { console.log(error);
                res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error" });
            }
         }  

    static add_user_reports = async(req,res)=>{
      try {
            let reported_user_id = req.body.reported_user_id;
            let reporting_user_id = req.body.reporting_user_id;
            let reason_id = req.body.reason_id;
            let discription = req.body.discription;
            let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
       
      if(isEmpty(reported_user_id) || isEmpty(reporting_user_id) || isEmpty(reason_id) || isEmpty(discription) ){
              return res.status(200).send({'status':false,'msg':"No Data Found!..",  'body':'' });  
          }
    
          let addData = new user_reportings_tbl({reported_user_id,reporting_user_id,reason_id,discription,image});

              let response = await addData.save();
           
              if(isEmpty(response)){
                       return res.status(200).send({'status':false,'msg':"Something went wrong please try again",'body':'' });  
                }else{  

                          let dsx = await userBlocked_fun(reported_user_id);   
                    return res.status(200).send({'status':true,'msg':"Report add successfully",'body':response });  
                   }  
      
                } catch (error) { console.log(error); 
                    return res.status(200).send({'status':false,'msg':"Server error",  'body':'' });       
                }


    }

    static get_user_report_list = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;
                page = (isEmpty(page) || page == 0 )? 1 :page ; 
                let whr = {"reporting_user_id": id};
               //if(!isEmpty(id)){whr = {_id: id} ;} 

               let query =  user_reportings_tbl.find(whr).populate([{path: 'reported_user_id', select : " name"},
                           {path: 'reporting_user_id', select : " name"}, {path: 'reason_id', select : " name"} ]).sort({_id:-1}) ;
               const query2 =  query.clone();
           const counts = await query.countDocuments();     
           let offest = (page -1 ) * 10 ; 
           const records = await query2.skip(offest).limit(10);
  if(records.length >0){

                    let paths =MyBasePath(req,res); 
                     records.map((item)=> { 
                    item.image = (item.image)? `${paths}/image/assets/user_img/${item.image}` : '' ;
                            return item; });
                 return  res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

                }else{
                    return res.status(200).send({'status':false,'msg':"No Data Found!..",  'body':'' });
                }    
        
           

        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
     } 

     static get_user_report_admin = async (req,res)=>{
        try {
                let  id = req.params.id;
                let  reported_user_id = req.body.user_id ;    
                let  reason_id = req.body.reason_id ;    
                let from_date = req.body.from_date;                                
                let to_date = req.body.to_date;  
                  let page  = req.body.page;
                    page = (isEmpty(page) || page == 0 )? 1 :page ; 
              
                   let whr = {};
                   
              if(!isEmpty(from_date) && !isEmpty(to_date) ){whr.date = { $gte: from_date} ; whr.date = { $lte :to_date } ; };
              if(!isEmpty(reported_user_id)){whr.reported_user_id = reported_user_id ;}  
              if(!isEmpty(reason_id)){whr.reason_id = reason_id ;}  



                if(!isEmpty(id)){whr = {_id: id} ;} 

               let query =  user_reportings_tbl.find(whr).populate([{path: 'reported_user_id', select : " name"},
                           {path: 'reporting_user_id', select : " name"}, {path: 'reason_id', select : " name"} ]).sort({_id:-1}) ;
               const query2 =  query.clone();
           const counts = await query.countDocuments();       
           let offest = (page -1 ) * 10 ; 
           const records = await query2.skip(offest).limit(10);
     
           if(records.length >0){
                        let paths =MyBasePath(req,res); 
                        records.map((item)=> { 
                    item.image = (item.image)? `${paths}/image/assets/user_img/${item.image}` : '' ;
                            return item; });
                   return res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
             }else{
                    return res.status(200).send({'status':false,'msg':"No Data Found!..",  'body':records });
                  }    
             
           

        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
        }
     } 


  }    

module.exports = ReportReasonController ; 



