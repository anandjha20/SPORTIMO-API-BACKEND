   const { isEmpty } = require("../myModel/common_modal");
   const { send_noti } = require("../myModel/Notification_helper");
   
   const notification_tbl = require("../models/notification_tbl");
    

class notificationController {

    static notification_list_admin = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;  //module type, category type ,from_date,to_date ,noti_type
                let module_type = req.body.module_type;                                
                let category_type = req.body.category_type;                                
                let from_date = req.body.from_date;                                
                let to_date = req.body.to_date;                                
                let noti_type = req.body.noti_type;                                
                 let whr = {};                                
         
              if(!isEmpty(module_type)){whr.module_type = module_type};
              if(!isEmpty(category_type)){whr.category_type = category_type};
              if(!isEmpty(from_date) && !isEmpty(to_date) ){whr.date = { $gte: from_date} ; whr.date = { $lte :to_date } ; };
              if(noti_type == 1 || noti_type == 0){whr.type_status = noti_type }
            console.log("filter == ",whr); 
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
         if(!isEmpty(id)){whr = {_id: id} ; page = 1;}            

            let query =  notification_tbl.find(whr).sort({_id:-1});
              const query2 =  query.clone();   
              const counts = await query.countDocuments();   
    
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);  
                     
          return res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          return res.status(200).send({'status':false,'msg':'server error','body':''});
        }
             
            } 
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
                           
                return res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
        
              } catch (error) { console.log(error);
                return res.status(200).send({'status':false,'msg':'server error','body':''});
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
        
      static addNotification = async(req,res) =>{
        let title = req.body.title;
        let message = req.body.message;
        let type_status = req.body.type_status;
        let country = req.body.country;
        let sports = req.body.sports;
        let leagues = req.body.leagues;
        let team = req.body.team;
        let players = req.body.players;
       if(isEmpty(title) || isEmpty(message)){
             return res.status(200).send({'status':false,'msg':"All Field Required",'body':'' });
          }  
         if(type_status == 0 || type_status == 1){}else{ return res.status(200).send({'status':false,'msg':"Invalid status_type Field value",'body':'' }); }
          let addData = new notification_tbl({ title,message,type_status,country,sports,leagues,team,players});
          let results = await addData.save();
          if(isEmpty(results)){
            return res.status(200).send({'status':false,'msg':"All Field Required",'body':'' });
          }else{
            return res.status(200).send({'status':true,'msg':"Notification Add Successfully",'body':results });
            }       

      }
        
   
 static jk_noti = async(req, res) =>{
      let title = "welcome to sportimo Football";
      let msg = "welcome to sportimo Football leages ";
         let ddd =  send_noti([],title,msg);
         return res.status(200).send({'status':false,'msg':"All Field Required",'body':'' });
      
 }


}


module.exports = notificationController ;