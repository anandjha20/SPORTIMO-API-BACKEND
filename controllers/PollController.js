let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp, isEmpty,rows_count,ArrChunks } = require('../myModel/common_modal');
const { sendNotificationAdd } = require('../myModel/helper_fun');
  const {send_noti,get_preferenceUserToken,send_poll_notification,userSentNotification,pollDisclosed_noti_fun} = require('../myModel/Notification_helper');

const { poll_percent} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const poll_result_tbl = require('../models/poll_result');    
    const poll_skips_tbl = require('../models/poll_skips');    
    const user_complaint_tbl = require('../models/user_complaint');     
class PollController {   
      static jk_test = async(req,res)=>{
        let complaint_id = req.body.complaint_id;
        let title   =  'Your poll result Disclosed';  
        let details =  'Admin has replied to your complaint';    
 
  
     ////////////////////////////////   
     let data = await  user_complaint_tbl.findOne({"_id":complaint_id}).populate({path:"user_id",select:['firebase_token']}).exec();
        if ( (!isEmpty(data)) && (! isEmpty(data.user_id)) && (! isEmpty(data.user_id.firebase_token) ))  {
                 let sdd =  send_noti([data.user_id.firebase_token],title,details);
        }
      //let data = await pollDisclosed_noti_fun({poll_id,title,details});

        return res.status(200).send({'status':false,'msg':'Success',"body":data });

     
        
    }
   


      static poll_skip_add = async(req,res) =>{  

          let poll_id = req.body.poll_id;
          let user_id = req.body.user_id;
    
         if(isEmpty(poll_id) || isEmpty(user_id) ){
               return  res.status(200).send({'status':false,'msg':"All Field Required",'body':''});
               }

               let add = new poll_skips_tbl({ poll_id,user_id });
               add.save((err, data) => {
                if (err) {     console.log(err);
                  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
              }else{ return res.status(200).send({"status":true,"msg":'Poll Created Successfully' , "body":data  }) ;            
                    }
         } );
     } 
   
    static poll_analytics = async (req,res)=>{
      try {
            let id = req.params.id
         let skip_user_count = await poll_skips_tbl.find({"poll_id":id}).countDocuments();
         let poll_participate_user_count = await poll_result_tbl.find({"poll_id":id}).countDocuments();
           return  res.status(200).send({'status':true,'msg':"success",'body':{skip_user_count,poll_participate_user_count}});
        } catch (error) {
          return  res.status(200).send({'status':false,'msg':"server error",'body':''});
        }


    }

      

    static poll_list = async (req,res)=>{
        try {
               
           let  id = req.params.id;
           let poll_type    = req.body.poll_type;
           let fee_type  = req.body.fee_type;
           let match  = req.body.match;
           let s_date  = req.body.s_date;
           let e_date  = req.body.e_date;
           let U_id =  req.body.user_id ; 
           let leagues =  req.body.leagues ; 

          // console.log("poll list call == ", req.body.user_id);   
      
           let page  = req.body.page;  
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
          
          
            let whr ={};
            if(!isEmpty(match)){whr.match = { $regex: '.*' + match + '.*', $options: 'i' } ;} 
            if(!isEmpty(poll_type)){whr.poll_type = poll_type;} 
            if(!isEmpty(fee_type)){whr.fee_type = fee_type;} 
            if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date = { $gte: s_date, $lte: e_date } ;} 
           
            if(!isEmpty(leagues)){whr.leagues = { $regex: '.*' + leagues + '.*' } ;} 
            if(!isEmpty(id)){whr = {_id: id} ;} 
            let query =  poll_tbl.find(whr).sort({_id:-1});
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();   
              

              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
          return res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          return  res.status(200).send({'status':false,'msg':"server error",'body':''});
        }
               
            }     
 
     static add_poll = async(req,res)=>{

         try {   
               let user_data = req.body;
                    console.log(  'server get value == ',user_data);
                  
                  let match_len = (user_data.match || '').length;
           if(match_len == 0){
            return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 

           }   
           
             
          let mydate = getcurntDate();

                    let add = new poll_tbl({
                       
                        "match":user_data.match,
                        "poll_type": user_data.poll_type,
                        "fee_type": user_data.fee_type,
                        "amount":user_data.amount,
                        "apperance_time": user_data.apperance_time,
                        "time_duration": user_data.time_duration,             

                        "qus": user_data.qus,        "qus_ara": user_data.qus_ara,
                        "ops_1":user_data.ops_1,     "ops_1_ara":user_data.ops_1_ara,
                        "ops_2": user_data.ops_2,    "ops_2_ara":user_data.ops_2_ara,
                        "ops_3":user_data.ops_3,     "ops_3_ara":user_data.ops_3_ara,
                        "ops_4":user_data.ops_4,     "ops_4_ara":user_data.ops_4_ara,
                        "ops_5":user_data.ops_5,     "ops_5_ara":user_data.ops_5_ara,
                      
                        "noti_status":user_data.noti_status,               
                       
                        "noti_in_App_status":user_data.noti_in_App_status,
                        "result_type":user_data.result_type,
                       
                        "sports":user_data.sports,
                        "leagues":user_data.leagues,
                        "teams":user_data.teams,
                        "players":user_data.players,
                        "reward_type":user_data.reward_type,
                        "reward_quantity":user_data.reward_quantity,
                        "date":mydate,
  
                        



                    });
                  
                          add.save((err, data) => {
                                if (err) {     console.log(err);
                                  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                              }else if(! isEmpty(data)) {
                                    
                                if(user_data.noti_status == 1 || user_data.noti_in_App_status == 1 ){
                                  let type_status =  1 ; 
                                      let title = `New Poll has been publihed for match: ${ user_data.match} ` ;  
                                  let msg = `New Poll has been publihed for match: ${ user_data.match} Click here to participate.`; 
                                  let module_id = data._id;
                                  let module_type = 'polls';
                                  let category_type = 'results';

                                  let demo =  sendNotificationAdd({title,msg,type_status,module_type,module_id,category_type} );
                      }
                      if(user_data.noti_status == 1){
                        let title2 = `New Poll has been publihed for match: ${ user_data.match} ` ;  
                        let msg2 = `New Poll has been publihed for match: ${ user_data.match} Click here to participate.`; 
                       
                        let poll_noti_parms = { "sports":user_data.sports,"leagues":user_data.leagues,"teams":user_data.teams,
                                    "players":user_data.players,"title":title2, details: msg2 };
                        
                         let sendTokenSS =  send_poll_notification(poll_noti_parms);
                     
                      }
                           
                          
                          return res.status(200).send({"status":true,"msg":'Poll Created Successfully' , "body":data  }) ;            
                            }else{
                                  return res.status(200).send({"status":false,"msg":'something went wrong please try again' , "body":''  }) ;            
                       
                            }
                }   );
                
      } catch (error) {
                    return res.status(200).send({"status":false,"msg":'No data add' , "body":''}) ;          
        
                }
              
        
            }
  
    static update_poll = async(req,res)=>{
         try {
                    let id = req.params.id;
                    let  user_data = req.body;
              console.log(  'server get value == ',user_data);
                
                let match_len = (user_data.match || '').length;
         if(match_len == 0){
          return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
            }   
         
         if(user_data.noti_status == 1 || user_data.noti_in_App_status == 1 ){
                    let mm_type =  (user_data.noti_status == 1)? 1 : 0 ; 
                    let title = ' new poll add on' ;  
                    let msgs = "demo text add on by jk"; 
                let demo =  sendNotificationAdd(title,msgs,mm_type);
        }



                  let setDataMy = {
                     
                      "match":user_data.match,
                      "poll_type": user_data.poll_type,
                      "fee_type": user_data.fee_type,
                      "amount":user_data.amount,
                      "apperance_time": user_data.apperance_time,
                      "time_duration": user_data.time_duration,
                      
                      "qus": user_data.qus,        "qus_ara": user_data.qus_ara,
                      "ops_1":user_data.ops_1,     "ops_1_ara":user_data.ops_1_ara,
                      "ops_2": user_data.ops_2,    "ops_2_ara":user_data.ops_2_ara,
                      "ops_3":user_data.ops_3,     "ops_3_ara":user_data.ops_3_ara,
                      "ops_4":user_data.ops_4,     "ops_4_ara":user_data.ops_4_ara,
                      "ops_5":user_data.ops_5,     "ops_5_ara":user_data.ops_5_ara,


                      "noti_status":user_data.noti_status,
                     
                      "noti_in_App_status":user_data.noti_in_App_status,
                      "result_type":user_data.result_type,
                     
                      "sports":user_data.sports,
                      "leagues":user_data.leagues,
                      "teams":user_data.teams,
                      "players":user_data.players,
                      "reward_type":user_data.reward_type,
                      "reward_quantity":user_data.reward_quantity,
                      
    



                  };
                

                  poll_tbl.findOneAndUpdate({_id: id},{$set : setDataMy},{new: true}, (err, updatedUser) => {
                    if(err) {  console.log(err);
                      return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                    }else if(!isEmpty(updatedUser)){
                              return res.status(200).send({"status":true,"msg":'Poll Updated Successfully' , "body":updatedUser  }) ;   
                
                            }else{
                              return res.status(200).send({"status":false,"msg":'Invalid poll Id ' , "body": ''}) ;   
                  
                            }

                       
                  });

          } catch (error) {
                  return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
      
              }
            
      
          }          
   
      static delete_poll = async(req,res)=>{
          try {
                  let id = req.params.id;
                  poll_tbl.findByIdAndDelete(id, function (err, docs) {
                if (err){  console.log("jjj === ",err);           //json(err)

                        let getError =  JSON.parse(JSON.stringify(err));
                  return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                   }else if(!isEmpty(docs)){
                      return res.status(200).send({"status":true,"msg":'Poll Deleted Successfully' , "body":''}) ;   
                }else{
                  return res.status(200).send({"status":false,"msg":'Invalid Poll Id ' , "body":''}) ;  
                }
            });

          } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

      }
      
    



     static poll_participant = async(req,res)=>{

                try {   

                    let user_data = req.body;
                console.log(  'server get value == ',user_data);
                  let user_id_len = (user_data.user_id || '').length;
                  let poll_id_len = (user_data.poll_id || '').length;
                  let poll_option_len = (user_data.poll_option || '').length;

           if(user_id_len == 0 ||  poll_id_len == 0  ||  poll_option_len == 0   ) {
            return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 

           } 
           
           


            let whr = { "poll_id": user_data.poll_id,"user_id": user_data.user_id,"user_ans":user_data.poll_option };
            let checkWhr = { "poll_id": user_data.poll_id,"user_id": user_data.user_id};
         
            let datas = await poll_result_tbl.find(checkWhr);
            if(datas.length >0 ){   console.log( "check poll user == ",datas)
              return res.status(200).send({"status":false,"msg":'This poll is already taken.' , "body":''}) ; 
            }

                    let add = new poll_result_tbl(whr);
               add.save((err, data) => {
                      if (err) { console.log("errror sii == ", err); 
                          return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''});
                    }else{
                        return res.status(200).send({"status":true,"msg":'Poll Created Successfully' , "body":data  }) ;  
                       } }  );
                    
                   
                         
        
                } catch (error) {  console.log(error);
                    return res.status(200).send({"status":false,"msg":'no data add' , "body":''}) ;          
        
                }
              
        
            }

      static poll_result_show = async(req,res) =>{
  try {

         let poll_id = req.params.poll_id;

      // console.log("poll_id == ",poll_id);

////////////////////////////////////////////////////////////////////////
              poll_result_tbl.aggregate()
                                .match({ poll_id :  mongoose.Types.ObjectId(poll_id)  })
                                .append({ "$group" : {_id:"$user_ans",   count: { $sum: 1 }} })
                                .allowDiskUse(true)
                                .exec(function(err, data) {
                                    if (err) { console.log('err==', err); 
                                    return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ;    
                                   }else{
                                       console.log( data);

                                    if(data.length>0){
                                  
                                    return res.status(200).send({"status":true,"msg":'success' , "body":data}) ;     
                                    }else{
                                      return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ; 
                                    }
                                  }
                               });
                

////////////////////////////////////////////////////////////////
//let datass =  poll_result_tbl.find({"poll_id":poll_id}).select({name:1}).countDocuments();
       

   } catch (error) {  console.log(error);
    return res.status(200).send({"status":false,"msg":'no data add' , "body":''}) ;          

}

            }                    



static my_polls_old = async(req,res)=>{
  try {
      let user_id    = req.params.id;
    
          //          var query = poll_result_tbl.find({ 'user_id': user_id});
          //          query.populate({path: "poll_id",select:['match','qus','ops_1','ops_2','ops_3']});
          //           query.exec(function (err, person) {
          //           if (err){ console.log(err); 
          //             return res.status(200).send({"status":false,"msg":'No Data found1..' }) ; 
          //           }else{ 
          //           // Prints "Space Ghost is a talk show host."

          //             return res.status(200).send({"status":true,"msg":'Success' , "body": person }) ;     
          //                 }

          // });                                                   

////////////////////////////////////
                      poll_result_tbl.aggregate([
                        { "$match": { "user_id": mongoose.Types.ObjectId(user_id) } },
                                    {$lookup: {
                                    from: "poll_tbls",
                                    localField:"poll_id",
                                    foreignField:  "_id",
                                    as: "jkDatas",
                                } }, {$lookup: {
                                  from: "user_tbls",
                                  localField:"user_id",
                                  foreignField:  "_id",
                                  as: "uData",
                              } }
                               ])
                   
                      .exec(function(err, data) {
                          if (err) { console.log('err==', err); 
                          return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ;    
                        }else{
                            console.log( data);

                          if(data.length>0){
                        
                          return res.status(200).send({"status":true,"msg":'success' , "body":data}) ;     
                          }else{
                            return res.status(200).send({"status":false,"msg":'No data Found!..' , "body":''}) ; 
                          }
                        }
                      });




/////////////////////////////////////////////////////////////////////

} catch (error) { console.log("some error is == ",error);
  return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

}
}  


      static my_polls = async (req,res)=>{
                try{
                  let pipeline = [];
                  
                      pipeline.push({$match:{user_id:  mongoose.Types.ObjectId(req.params.id)}});
                  
              //    pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user'} });
                pipeline.push({ $lookup: {from: 'poll_tbls', localField: 'poll_id', foreignField: '_id', as: 'pollData'} });
             
                //   pipeline.push({ $unwind: "$user" });
                  pipeline.push({ $unwind: "$pollData" });
              
               pipeline.push({ $project: {"_id":1,"user_ans":1,"poll_id":1,"match":"$pollData.match","poll_qs":"$pollData.qus","ops_1":"$pollData.ops_1",
                  "ops_2":"$pollData.ops_2","ops_3":"$pollData.ops_3","ops_4":"$pollData.ops_4"} });
        
      let someData = await poll_result_tbl.aggregate(pipeline).exec();

        if(someData.length >0){

          let allData = await Promise.all( someData.map( async (item)=>{
            item.poll_parcents = await poll_percent(item.poll_id);
              return item;
          })) ; 
          
          
          return res.status(200).send({"status":true,"msg":'success' , "body":allData}) ;   
        }else{
          return res.status(200).send({"status":false,"msg":'No data found' , "body":''}) ;   
        }
                 

              }
              catch(err) {  console.log("some error == ",err);
                  return res.status(200).json({
                      title: "Something went wrong. Please try again.",
                      error: true,
                      details: err
                  });
              }
                  
            }
             
 static poll_result_disclosed = async(req,res)=>{
        try {
          let id = req.params.id;
          let  disclosed_status = req.body.disclosed_status;
        if(disclosed_status == 0 || disclosed_status == 1){}else{
          return res.status(200).send({"status":false,"msg":'Invalid disclosed status' , "body": disclosed_status }) ;   
        }  
       
        poll_tbl.findOneAndUpdate({_id: id,result_type:"Undisclosed"},{$set : {"disclosed_status":disclosed_status}},{new: true}, (err, updatedUser) => {
          if(err) {  console.log(err);
            return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
          }else if(!isEmpty(updatedUser)){
                      
                     let type_status =  (updatedUser.noti_status == 1)? 1 : 0 ; 
                     let title = `${updatedUser.match} Poll Result has been disclosed ` ;  
                     let msg = `${updatedUser.match} Poll Result has been disclosed  Click here to view.`; 
                     let category_type = 'results';
                     let module_type = "polls";
                     let module_id  = updatedUser._id;
                     let demo =  sendNotificationAdd({title,msg,type_status,category_type,module_type,module_id});
                     let noti_damo =   pollDisclosed_noti_fun({title,poll_id:id,details:msg});             
                    return res.status(200).send({"status":true,"msg":'Poll Result Disclosed Successfully' , "body":''  }) ;   
      
              }else{  return res.status(200).send({"status":false,"msg":'Invalid poll Id ' , "body": ''}) ;   
                      }  });

              } catch (error) {
                      return res.status(200).send({"status":false,"msg":'Sreve' , "body":''}) ;          

                  }

                    }




}
   






module.exports = PollController ;      