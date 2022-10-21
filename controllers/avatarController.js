 
 const{ isEmpty} = require("../myModel/common_modal");
 const avatar_tbls = require("../models/avatars");

 const  {MyBasePath} = require("../myModel/image_helper");
class avatarController{
    
   static avatar_add = async(req,res)=>{
            try{
    let avatar = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
       if(isEmpty(avatar)){ 
            return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
            }  

    let add = new avatar_tbls({avatar});
                 
      let response  = await add.save();  
      if(response){
                  return res.status(200).send({"status":true,"msg":' avatar added successfully', "body":response}) ;          
          }else{
                  return res.status(200).send({"status":false,"msg":'avatar not add'}) ;    
              }

      } catch (error) { console.log(error);
          return res.status(200).send({"status":false,"msg":'No data add'}) ;          
          }


   }

   static avatar_get = async (req,res)=>{
    try {
        
        
        let data = await avatar_tbls.find()
          
        //  const query2 =  query.clone();
        //  const counts = await query.countDocuments();


          
        //  let offest = (page -1 ) * 10 ; 
        //  const records = await query2.skip(offest).limit(10);
         let paths =MyBasePath(req,res);    
         data.map((item)=>{
           item.avatar = (item.avatar)?  `${paths}/image/assets/avatar_img/${item.avatar}`:''; 
          
           return item;} );
           if(data.length>0){
               res.status(200).send({'status':true,'msg':"avatar found", 'body':data });

           }else{
            res.status(200).send({'status':true,'msg':"no avatar found"  });

           }
   

    } catch (error) { console.log(error);
      res.status(200).send({'status':false,'msg':"server error"});
    }
         
        }  
        
        static avatar_delete = async(req,res)=>{
            try {
                    let _id = req.params.id;
                    let result = await avatar_tbls.findOneAndDelete({_id});
                    if(result){
                       return res.status(200).send({"status":true,"msg":'avatar deleted' , "body":result}) ;
                    }else{
                       return res.status(200).send({"status":false,"msg":'something went wrong' }) ;
                    }
              
            } catch (error) { console.log(error); 
               return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }
    
        }
      
        //  static avatar_update = async(req,res)=>{
        // try {
        //     let id = req.params.id ;
        //     let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
        //     let title = req.body.title;               let title_ara = req.body.title_ara ; 
        //     let description = req.body.description ;  let description_ara = req.body.description_ara ;  
        //     let from_date = req.body.from_date;     
        //     let to_date = req.body.to_date; 
               
        //         if( isEmpty(title) || isEmpty(description) || isEmpty(title_ara) || isEmpty(description_ara) ){ 
        //             return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
        //          } 

        //         let myobj = { title,description,title_ara,description_ara};  

        //          if(!isEmpty(image)){  myobj.image = image;  } 
        //          if(!isEmpty(from_date)){  myobj.from_date = from_date;} 
        //          if(!isEmpty(to_date)){  myobj.to_date = to_date;  }    
        //       avatar_tbls.findOneAndUpdate({_id: id},{$set : myobj },{new: true}, (err, updatedUser) => {
        // if(err) {  console.log(err);
        //     return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
        // }else if(!isEmpty(updatedUser)){
        //             return res.status(200).send({"status":true,"msg":'avatar Updated Successfully' , "body":updatedUser  }) ;   
        //     }else{  return res.status(200).send({"status":false,"msg":'Invalid avatar Id ' , "body": ''}) ;   
        //             }

            
        // });

        //  } catch (error) {  console.log(error);
        //          return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
     
        //      }
           
     
        //  }          
  
    // get_avatar_user 

//     static get_avatar_user = async (req,res)=>{
//         try {
//              let language = req.body.language;
//                let  id = req.params.id;
//                let whr = (isEmpty(id))? {}: {_id: id};
            
//             let records =  await avatar_tbls.find(whr);
//             let paths =MyBasePath(req,res); 
//              let sendData = (records)? await Promise.all( records.map((item)=>{
//                          if(language == 'ar'){ item.title = item.title_ara }
//                          if(language == 'ar'){ item.description = item.description_ara }
//                         item.image = (item.image)? `${paths}/image/assets/avatar_img/${item.image}`:'';  return item;} )):[];
        
//            return  res.status(200).send({'status':true,'msg':	 (language == 'ar')? "النجاح"  : "success" , 'body':sendData });
    
//         } catch (error) { console.log(error);
//               return  res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error"});
//         }
             
//             }  
            


    }

module.exports = avatarController;