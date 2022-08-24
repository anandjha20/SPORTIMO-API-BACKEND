
const user_tbl = require("../models/user");

module.exports =  user_token_check =  async (req,res,next)=>{

    try {
        var token = req.headers['token']; 
       console.log('token=='); 
       console.log(token); 
            if(token == undefined || token == ''){
                return res.status(200).send({"status":false,"msg":'Token Required'}) ;   
            }

        var response  = await user_tbl.find({token}).countDocuments();

      if(response > 0)
      {       console.log('middleware token ok');
               next();
       }else{
        return res.status(200).send({"status":false,"msg":'Invalid Token' }) ;  
       }
      } catch (error) {
        return res.status(200).send({"status":false,"msg":'some error'}) ;          
      
      }




  
}