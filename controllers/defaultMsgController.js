    let  express_2 = require('express');
    let  mongoose = require('mongoose')
  
  const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
  const { autoincremental } = require('../myModel/helper_fun');
    
 const default_massages_tbl = require('../models/default_massages');    

class defaultMsgController {

    static addDefaultMsg = async(req,res)=>{
        try {
                let d_msg = req.body.d_msg; let d_msg_ara = req.body.d_msg_ara; 
                if(isEmpty(d_msg) || isEmpty(d_msg_ara)){ return res.status(200).send({"status":false,"msg":'All Field Required'}) ; }
                
                let addData = {d_msg_ara,d_msg:d_msg } ;
                
                let add = new default_massages_tbl(addData) ;        
    
                        let allsaveData =  await add.save();
                            if(isEmpty(allsaveData)){
                                return res.status(200).send({"status":false,"msg": 'something went wrong please try again'}) ;  
                                        }else{
                                          
                                        return res.status(200).send({"status":true,"msg": 'Data add successfully' , "body":allsaveData }) ;  
    
                                    }
                    } catch (error) { console.log(error);
                            return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
                        }           
        }
        
    static get_defaultMsg = async(req,res)=>{
        try {
              let language = req.body.language;
                  language = isEmpty(language) ? '' : language ;

                let d_msg_id = req.params.id;
                let whr = (isEmpty(d_msg_id))? {} : {_id:d_msg_id };
                
                let data =  await default_massages_tbl.find(whr);
                    if(data.length >0 ){
                        data.map((item)=> {if(language != '' && language == 'ar'){ item.d_msg = item.d_msg_ara }
                        return item;
                    }); 
                        return res.status(200).send({"status":true,"msg": (language == 'ar')? "النجاح"  : "success", "body":data }) ;  
                    }else{
                            
                        return res.status(200).send({"status":false,"msg": (language == 'ar')? "لاتوجد بيانات!.." :  "No Data Found!.."}) ;
                    }

                } catch (error) { console.log(error);
                    return res.status(200).send({"status":false,"msg":  (language == 'ar')? "خطأ في الخادم" : "server error" }) ;          
                }

    }

    static defaultMsg_delete = async(req,res)=>{
        try {   
              let d_msg_id = req.params.id;
             let whr = (isEmpty(d_msg_id))? {} : {_id:d_msg_id };
                
                default_massages_tbl.findByIdAndRemove(d_msg_id, (err,data)=>{
                    if(err){     console.log("delete error is == ", err);
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
    static defaultMsg_update = async(req,res)=>{
        try {   
              let d_msg_id = req.params.id;
              let d_msg = req.body.d_msg; let d_msg_ara = req.body.d_msg_ara; 
            
             let whr = {};
                if(!isEmpty(d_msg)){whr={...whr,"d_msg":d_msg}}
                if(!isEmpty(d_msg_ara)){whr={...whr,"d_msg_ara":d_msg_ara}}
                console.log(whr)
                if(!isEmpty(d_msg_id)){
                default_massages_tbl.findByIdAndUpdate(d_msg_id,whr, (err,data)=>{
                    if(err){     console.log("delete error is == ", err);
                                return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
                        }else if(isEmpty(data)){
                            return res.status(200).send({"status":false,"msg":'Invalid ID' }) ;   
                        }else{ return res.status(200).send({"status":true,"msg": 'Default Massages updated Successfully' }) ;  
                            }
                });
            }else{
                return res.status(200).send({"status":false,"msg":'ID required' }) ;
            }

 } catch (error) { console.log(error);
            return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;          
        }

    }


}

module.exports = defaultMsgController;











