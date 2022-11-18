 
 const{ isEmpty} = require("../myModel/common_modal");
 const emoji_tbls = require("../models/emoji");

 const  {MyBasePath} = require("../myModel/image_helper");
class emojiController{
    
  static emoji_add = async(req,res)=>{
          try{
                let title=req.body.title;
                let emoji = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
      if(isEmpty(emoji) || isEmpty(title)){ 
          return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
          }  

    let add = new emoji_tbls({emoji,title});
    let response  = await add.save();  
    if(response){
                return res.status(200).send({"status":true,"msg":' emoji added successfully', "body":response}) ;          
        }else{
                return res.status(200).send({"status":false,"msg":'emoji not added'}) ;    
            }

    } catch (error) { console.log(error);
        return res.status(200).send({"status":false,"msg":'No data add'}) ;          
        }


  }

  static emoji_get = async (req,res)=>{
  try {
      
      let _id=req.body._id
      let whr={};
      if(!isEmpty(_id)){whr._id=_id}
      let data = await emoji_tbls.find(whr)
        
      //  const query2 =  query.clone();
      //  const counts = await query.countDocuments();


        
      //  let offest = (page -1 ) * 10 ; 
      //  const records = await query2.skip(offest).limit(10);
        let paths =MyBasePath(req,res);    
        data.map((item)=>{
          item.emoji = (item.emoji)?  `${paths}/image/assets/emoji/${item.emoji}`:''; 
        
          return item;} );
          if(data.length>0){
              res.status(200).send({'status':true,'msg':"emoji found", 'body':data });

          }else{
          res.status(200).send({'status':true,'msg':"no emoji found"  });

          }
  

  } catch (error) { console.log(error);
    res.status(200).send({'status':false,'msg':"server error"});
  }
        
  }  
        
  static emoji_delete = async(req,res)=>{
      try {
              let _id = req.params.id;
              let result = await emoji_tbls.findOneAndDelete({_id});
              if(result){
                  return res.status(200).send({"status":true,"msg":'emoji deleted' , "body":result}) ;
              }else{
                  return res.status(200).send({"status":false,"msg":'something went wrong' }) ;
              }
        
      } catch (error) { console.log(error); 
          return res.status(200).send({"status":false,"msg":'Some error' , "body":''}) ; }

  }
      
  static emoji_update = async(req,res)=>{
    try {
        let _id = req.body.id ;
        let emoji = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
        let title = req.body.title;              
            
            if( isEmpty(_id) ){ 
                return res.status(200).send({"status":false,"msg":'All Field Reqired'}) ;     
              } 

            let myobj = {};  

         
            if(!isEmpty(emoji)){  myobj.emoji = emoji;} 
              if(!isEmpty(title)){  myobj.title = title;} 
         console.log(myobj,_id)
               emoji_tbls.findOneAndUpdate({_id},{$set : myobj },{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                }else if(!isEmpty(updatedUser)){
                            return res.status(200).send({"status":true,"msg":'emoji Updated Successfully' , "body":updatedUser  }) ;   
                    }else{  return res.status(200).send({"status":false,"msg":'Invalid emoji Id ' , "body": ''}) ;   
                  }
       });
      } catch (error) {  console.log(error);
        return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
    }
    
  }          

}

module.exports = emojiController;