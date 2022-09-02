let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp, isEmpty } = require('../myModel/common_modal');
const { sendNotificationAdd } = require('../myModel/helper_fun');
   

const { poll_percent} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const poll_result_tbl = require('../models/poll_result');    

class PollController { 

        
    

    static poll_list = async (req,res)=>{
        try {
          
           let  id = req.params.id;
           let poll_type    = req.body.poll_type;
           let fee_type  = req.body.fee_type;
           let match  = req.body.match;
           let s_date  = req.body.s_date;
           let e_date  = req.body.e_date;
           
           let page  = req.body.page;
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
          
          
            let whr ={};
            if(!isEmpty(match)){whr.match = { $regex: '.*' + match + '.*' } ;} 
            if(!isEmpty(poll_type)){whr.poll_type = poll_type;} 
            if(!isEmpty(fee_type)){whr.fee_type = fee_type;} 
            if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date = { $gte: s_date, $lte: e_date } ;} 
            if(!isEmpty(id)){whr = {_id: id} ;} 
            let query =  poll_tbl.find(whr).sort({_id:-1});
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();
              

              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
          res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':error,'body':''});
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
           
           if(user_data.noti_status == 1 || user_data.noti_in_App_status == 1 ){
                      let mm_type =  (user_data.noti_status == 1)? 1 : 0 ; 
                          let title = `New Poll has been publihed for match: ${ user_data.match} ` ;  
                      let msgs = `New Poll has been publihed for match: ${ user_data.match} Click here to participate.`; 
                  let demo =  sendNotificationAdd(title,msgs,mm_type);
          }

          let mydate = getcurntDate();

                    let add = new poll_tbl({
                       
                        "match":user_data.match,
                        "poll_type": user_data.poll_type,
                        "fee_type": user_data.fee_type,
                        "amount":user_data.amount,
                        "apperance_time": user_data.apperance_time,
                        "time_duration": user_data.time_duration,

                        "qus": user_data.qus,
                        "ops_1":user_data.ops_1,
                        "ops_2": user_data.ops_2,
                        "ops_3":user_data.ops_3,
                        "ops_4":user_data.ops_4,
                        "ops_5":user_data.ops_5,
                      
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
                              }else{
                     
                                 return res.status(200).send({"status":true,"msg":'Poll Created Successfully' , "body":data  }) ;            
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

                      "qus": user_data.qus,
                      "ops_1":user_data.ops_1,
                      "ops_2": user_data.ops_2,
                      "ops_3":user_data.ops_3,
                      "ops_4":user_data.ops_4,
                      "ops_5":user_data.ops_5,
                    
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
           let datas = await poll_result_tbl.find(whr);
            if(datas.length >0 ){   console.log( "check poll user == ",datas)
              return res.status(200).send({"status":false,"msg":'This poll allredy add ' , "body":''}) ; 
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
                    return res.status(200).send({"status":true,"msg":'Poll Result Disclosed Successfully' , "body":''  }) ;   
      
                  }else{
                    return res.status(200).send({"status":false,"msg":'Invalid poll Id ' , "body": ''}) ;   
        
                  }

                          
                      });

              } catch (error) {
                      return res.status(200).send({"status":false,"msg":'Sreve' , "body":''}) ;          

                  }

                    }




}
   






module.exports = PollController ;      