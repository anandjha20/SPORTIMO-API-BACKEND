let  express_2 = require('express');
const mongoose = require('mongoose');
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp } = require('../myModel/common_modal');
   

const { poll_percent} = require('../myModel/helper_fun');
   
  
  
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const admin_tbl = require('../models/admin');    
    const poll_tbl = require('../models/poll');    
    const poll_result_tbl = require('../models/poll_result');    

class PollController { 

    static JK = (req,res)=>{
        res.status(200).send({'status':true,'msg':"success",'body':''});        
    }

        
    

    static poll_list = async (req,res)=>{
        try {
           let  id = req.params.id;  let id_len = (id || '').length;
           let whr = (id_len == 0) ? {} :{_id:id};

             let data = await poll_tbl.find(whr);
       
          res.status(200).send({'status':true,'msg':"success",'body':data});
  
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


                    });
                  
                       add.save((err, data) => {
                                if (err) {     console.log(err);
                                  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                              }else{
                     
                                 return res.status(200).send({"status":true,"msg":'Poll Created Successfully' , "body":data  }) ;            
                            }
                }   );
                
                  




                   
                } catch (error) {
                    return res.status(200).send({"status":false,"msg":'no data add' , "body":''}) ;          
        
                }
              
        
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


/// my_polls


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






}
   






module.exports = PollController ;      