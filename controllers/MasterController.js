const  express = require("express");
const {getcurntDate,isEmpty,gen_str} = require('../myModel/common_modal');
const  sport_tbl = require("../models/sport");
const  league_tbl = require("../models/League");
const  Player_tbl = require("../models/Player");
const  Team_tbl = require("../models/Team");
const  country_tbl = require("../models/country");

class MasterController {

    /// Sports function section 
    static  sports_add =  async(req,res) =>{
                let name = req.body.name;
                if(isEmpty(name)){
                    return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                }
                    let add = new sport_tbl({name}); 
                    add.save((err,data)=>{
                        if(err){   return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                                }else{
                        return res.status(200).send({"status":true,"msg":"Sport Add Successfully","body": data });
                     }
           });     

                
         }

         static sports_get = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;
                page = (isEmpty(page) || page == 0 )? 1 :page ; 
          
          
            let whr = (isEmpty(id))? {}: {_id: id} ;
            let query =  sport_tbl.find(whr).sort({_id:-1}) ;
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();


              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
          res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':error,'body':''});
        }
             
            }     

            static sports_update = async(req,res)=>{
                try {
                           let id = req.params.id;
                           let name = req.body.name;
                           if(isEmpty(name)){
                               return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                           }
                            
       
                sport_tbl.findOneAndUpdate({_id: id},{$set : {name}},{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                }else if(!isEmpty(updatedUser)){
                            return res.status(200).send({"status":true,"msg":'Sport Updated Successfully' , "body":updatedUser  }) ;   
                    }else{  return res.status(200).send({"status":false,"msg":'Invalid Sport Id ' , "body": ''}) ;   
                            }

                    
                });
       
                 } catch (error) {
                         return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
             
                     }
                   
             
                 }          
          
             static sports_delete = async(req,res)=>{
                 try {
                         let id = req.params.id;
                         sport_tbl.findByIdAndDelete(id, function (err, docs) {
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
             
       /// league function section 
    static  league_add =  async(req,res) =>{
        let name = req.body.name;
        if(isEmpty(name)){
            return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
        }
            let add = new league_tbl({"league_name":name}); 
            add.save((err,data)=>{
                if(err){   return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                        }else{
                return res.status(200).send({"status":true,"msg":"League Add Successfully","body": data });
             }
   });     

        
 }

 static league_get = async (req,res)=>{
try {
        let  id = req.params.id;
        let page  = req.body.page;
        page = (isEmpty(page) || page == 0 )? 1 :page ; 
  
  
    let whr = (isEmpty(id))? {}: {_id: id} ;
    let query =  league_tbl.find(whr).sort({_id:-1}) ;
      
     const query2 =  query.clone();
     const counts = await query.countDocuments();


      
     let offest = (page -1 ) * 10 ; 
     const records = await query2.skip(offest).limit(10);
  res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

} catch (error) { console.log(error);
  res.status(200).send({'status':false,'msg':error,'body':''});
}
     
    }     

    static league_update = async(req,res)=>{
        try {
                   let id = req.params.id;
                   let name = req.body.name;
                   if(isEmpty(name)){
                       return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                   }
               league_tbl.findOneAndUpdate({_id: id},{$set : {"league_name":name}},{new: true}, (err, updatedUser) => {
        if(err) {  console.log(err);
            return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
        }else if(!isEmpty(updatedUser)){
                    return res.status(200).send({"status":true,"msg":'league Updated Successfully' , "body":updatedUser  }) ;   
            }else{  return res.status(200).send({"status":false,"msg":'Invalid league Id ' , "body": ''}) ;   
                    }

            
        });

         } catch (error) {
                 return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
     
             }
           
     
         }          
  
     static league_delete = async(req,res)=>{
         try {
                 let id = req.params.id;
                 league_tbl.findByIdAndDelete(id, function (err, docs) {
               if (err){  console.log("jjj === ",err);           //json(err)

                       let getError =  JSON.parse(JSON.stringify(err));
                 return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                  }else if(!isEmpty(docs)){
                     return res.status(200).send({"status":true,"msg":'league Deleted Successfully' , "body":''}) ;   
               }else{
                 return res.status(200).send({"status":false,"msg":'Invalid league Id ' , "body":''}) ;  
               }
           });

         } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

     }
     
    

}

module.exports = MasterController;

