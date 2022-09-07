const admin_tbl = require("../models/admin");

module.exports =  token_check =  async (req,res,next)=>{

    try {
        var token = req.headers['token']; 
       console.log('token=='); 
       console.log(token); 
            if(token == undefined || token == ''){
                return res.status(200).send({"status":false,"msg":'Token Required' ,}) ;   
            }
          
            var response  = await admin_tbl.find({token}).countDocuments();
    
      if(response > 0)
      {       console.log('middleware token ok');
           //  req.body.user_id = response[0]._id;
               next();
       }else{
        return res.status(200).send({"status":false,"msg":'Invalid Token' ,}) ;  
       }
      } catch (error) {
        return res.status(200).send({"status":false,"msg":'some error' , "body":''}) ;          
      
      }




  
}