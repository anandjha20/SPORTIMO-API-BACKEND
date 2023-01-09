 
 const{ isEmpty} = require("../myModel/common_modal");
 const IntroSlider_tbls = require("../models/IntroSlider_tbls");

 const  {MyBasePath} = require("../myModel/image_helper");
class IntroSliderController{
    
   static introSlider_add = async(req,res)=>{
            try{
    let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
    let title = req.body.title;                      let title_ara = req.body.title_ara;                  let title_fr = req.body.title_fr; 
    let description = req.body.description ;         let description_ara = req.body.description_ara ;     let description_fr = req.body.description_fr ;      

    // let from_date = req.body.from_date; 
    // let to_date = req.body.to_date; 
       if(isEmpty(image) || isEmpty(title) || isEmpty(description) || isEmpty(title_ara) ||
              isEmpty(description_ara) || isEmpty(title_fr) || isEmpty(description_fr) ){ 
            return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
            }  

    let add = new IntroSlider_tbls({ title,description,title_ara,description_ara,title_fr,description_fr,image});
                 
      let response  = await add.save();  
      if(response){
                  return res.status(200).send({"status":true,"msg":' Slider added successfully', "body":response}) ;          
          }else{
                  return res.status(200).send({"status":false,"msg":'Slider not add'}) ;    
              }

      } catch (error) { console.log(error);
          return res.status(200).send({"status":false,"msg":'No data add'}) ;          
          }


   }

   static introSlider_get = async (req,res)=>{
    try {
            let  id = req.params.id;
            let page  = req.body.page;
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
      
      
        let whr = (isEmpty(id))? {}: {_id: id};
        let query =  IntroSlider_tbls.find(whr).sort({_id:-1});
          
         const query2 =  query.clone();
         const counts = await query.countDocuments();


          
         let offest = (page -1 ) * 10 ; 
         const records = await query2.skip(offest).limit(10);
         let paths =MyBasePath(req,res);    
         let sendData = (records)?  await Promise.all( records.map((item)=>{
           item.image = (item.image)?  `${paths}/image/assets/introSlider_img/${item.image}`:''; 
          
           return item;} )):[];
   
           res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':sendData });

    } catch (error) { console.log(error);
      res.status(200).send({'status':false,'msg':error,'body':''});
    }
         
        }  
        
         static introSlider_update = async(req,res)=>{
        try {
            let id = req.params.id ;
            let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
            let title = req.body.title;               let title_ara = req.body.title_ara ;              let title_fr = req.body.title_fr ; 
            let description = req.body.description ;  let description_ara = req.body.description_ara ;  let description_fr = req.body.description_fr ;  
            let from_date = req.body.from_date;     
            let to_date = req.body.to_date; 
               
                if( isEmpty(title) || isEmpty(description) || isEmpty(title_ara) || isEmpty(description_ara)|| isEmpty(title_fr) || isEmpty(description_fr) ){ 
                    return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
                 } 

                let myobj = { title,description,title_ara,description_ara,title_fr,description_fr};  

                 if(!isEmpty(image)){  myobj.image = image;  } 
                //  if(!isEmpty(from_date)){  myobj.from_date = from_date;} 
                //  if(!isEmpty(to_date)){  myobj.to_date = to_date;  }    
              IntroSlider_tbls.findOneAndUpdate({_id: id},{$set : myobj },{new: true}, (err, updatedUser) => {
        if(err) {  console.log(err);
            return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
        }else if(!isEmpty(updatedUser)){
                    return res.status(200).send({"status":true,"msg":'Slider Updated Successfully' , "body":updatedUser  }) ;   
            }else{  return res.status(200).send({"status":false,"msg":'Invalid Slider Id ' , "body": ''}) ;   
                    }

            
        });

         } catch (error) {  console.log(error);
                 return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
     
             }
           
     
         }          
  
     static introSlider_delete = async(req,res)=>{
         try {
                 let id = req.params.id;
                 IntroSlider_tbls.findByIdAndDelete(id, function (err, docs) {
               if (err){  console.log("jjj === ",err);  
                       let getError =  JSON.parse(JSON.stringify(err));
                 return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                  }else if(!isEmpty(docs)){
                     return res.status(200).send({"status":true,"msg":'Slider Deleted Successfully' , "body":''}) ;   
               }else{
                 return res.status(200).send({"status":false,"msg":'Invalid Slider Id ' , "body":''}) ;  
               }
           });

         } catch (error) { console.log(error); return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

     }
   
    // get_introSlider_user 

    static get_introSlider_user = async (req,res)=>{
        try {
             let language = req.body.language;
               let  id = req.params.id;
               let whr = (isEmpty(id))? {}: {_id: id};
            
            let records =  await IntroSlider_tbls.find(whr);
            let paths =MyBasePath(req,res); 
             let sendData = (records)? await Promise.all( records.map((item)=>{
                         if(language == 'ar'){ item.title = item.title_ara }
                         if(language == 'ar'){ item.description = item.description_ara }
                        item.image = (item.image)? `${paths}/image/assets/introSlider_img/${item.image}`:'';  return item;} )):[];
        
           return  res.status(200).send({'status':true,'msg':	 (language == 'ar')? "النجاح"  : "success" , 'body':sendData });
    
        } catch (error) { console.log(error);
              return  res.status(200).send({'status':false,'msg': (language == 'ar')? "خطأ في الخادم" : "server error"});
        }
             
            }  
            

}


module.exports = IntroSliderController;