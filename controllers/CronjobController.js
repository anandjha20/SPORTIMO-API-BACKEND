
const { rows_count,getcurntDate,getTime,isEmpty} = require("../myModel/common_modal");
  
  const poll_tbl  = require("../models/poll");
  const poll_tblD = require("../models/poll_result");


class ConjobController{

 static pollResultNotification =  async(req,res)=>{
       try {
                    
                    return  res.status(200).send({'status':true,'msg':"success", 'body':'' });
            
                } catch (error) { console.log(error);
                    return  res.status(200).send({'status':false,'msg':error,'body':''});
                }
        }


}



module.exports = ConjobController;