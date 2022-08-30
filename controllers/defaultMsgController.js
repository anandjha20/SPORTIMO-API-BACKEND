    let  express_2 = require('express');
    let  mongoose = require('mongoose')
  
  const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
  const { autoincremental } = require('../myModel/helper_fun');
    
 const default_massages_tbl = require('../models/default_massages');    

class defaultMsgController {

 static addDefaultMsg = async(req,res)=>{
    try {
        
   
        let d_msg = req.body.d_msg
   if(isEmpty(d_msg)){ return res.status(200).send({"status":false,"msg":'All Field Required'}) ; }
   
  // let seq_id = await autoincremental('seq',default_massages_tbl);
  
  let addData = {d_msg:d_msg } ;
   console.log("addData == ", addData);
   let add = new default_massages_tbl(addData) ;        

    let allsaveData =  await add.save();
    console.log('add == ', add); 
    return res.status(200).send({"status":true,"msg": 'Data add successfully' , "user_id":add._id }) ;  
        } catch (error) { console.log(error);
            return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
        }           
 }

    static get_defaultMsg = async(req,res)=>{
        try {
        let d_msg_id = req.params.id;
        let whr = (isEmpty(d_msg_id))? {} : {_id:d_msg_id };
        
        let data =  await default_massages_tbl.find(whr);
            if(data.length >0 ){
                return res.status(200).send({"status":true,"msg": 'success' , "body":data }) ;  
            }else{
                return res.status(200).send({"status":false,"msg":'No Data Found!.. ' }) ;
            }

        } catch (error) { console.log(error);
            return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
        }

    }

    static defaultMsg_delete = async(req,res)=>{
        try {   
        let d_msg_id = req.params.id;
        let whr = (isEmpty(d_msg_id))? {} : {_id:d_msg_id };
        
        default_massages_tbl.findByIdAndRemove(d_msg_id, (err,data)=>{
            if(err){ console.log("delete error is == ", err);
                        return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
                }else if(isEmpty(data)){
                    return res.status(200).send({"status":false,"msg":'Invalid ID' }) ;   
                }else{ return res.status(200).send({"status":true,"msg": 'Default Massages Delete Successfully' }) ;  
                        }
        });

 } catch (error) { console.log(error);
            return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
        }

    }



}

module.exports = defaultMsgController;











