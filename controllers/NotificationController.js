   const { isEmpty } = require("../myModel/common_modal");
   
   const notification_tbl = require("../models/notification_tbl");


class notificationController {

    static notification_list = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;
              
                let whr = {};
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
                 if(!isEmpty(id)){whr = {_id: id} ;} 

            let query =  notification_tbl.find(whr).sort({_id:-1});
              const query2 =  query.clone();
              const counts = await query.countDocuments();
    
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
                     
            res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':'server error','body':''});
        }
             
            } 
     static notification_delete = async(req,res)=>{
         try {       let id = req.params.id;
                      notification_tbl.findByIdAndDelete(id, function (err, docs) {
                    if (err){  console.log("notification_delete  === ",err);  
                            let getError =  JSON.parse(JSON.stringify(err));
                      return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                       }else if(!isEmpty(docs)){
                          return res.status(200).send({"status":true,"msg":'Notification Deleted Successfully' , "body":''}) ;   
                    }else{
                      return res.status(200).send({"status":false,"msg":'Invalid Notification Id ' , "body":''}) ;  
                    }
                });
     
              } catch (error) { console.log(error); return res.status(200).send({"status":true,"msg":'Server error' , "body":''}) ; }
     
          }


   



}


module.exports = notificationController ;