
const {getcurntDate,isEmpty,gen_str} = require('../myModel/common_modal');


const report_reason_tbl = require('../models/report_reason');


class ReportReasonController {
         

    /// Report Reason function section report_reason 
    static  report_reason_add =  async(req,res) =>{
             let name = req.body.name;
                if(isEmpty(name) ){
                    return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                }
                    let add = new report_reason_tbl({name}); 
                    add.save((err,data)=>{
                        if(err){ console.log("sport err ==  ", err);    return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
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
                           let id = req.params.id;
                          let name = req.body.name;
                           if(isEmpty(name)){
                               return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                           }
                        

                     report_reason_tbl.findOneAndUpdate({_id: id},{$set : {name} },{new: true}, (err, updatedUser) => {
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
                  // console.log(req)
                    let  id = req.params.id; 
                   
                    // let check_catData = await rows_count(faq_tbl,{faq_cat_id: id})  ;             
                             
                    // if(check_catData >0 ){  
                    //      return   res.status(200).send({'status':false,'msg':"Can't delete this category, FAQ with this category is still available",'body':''});
                         
                    //    }else{   
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

}

module.exports = ReportReasonController ; 



