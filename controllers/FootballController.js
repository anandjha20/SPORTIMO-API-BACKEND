let  express_2 = require('express');
  
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
   

  
  
  // const state_tbl = require('../models/state_tbl');    
    const user_tbl = require('../models/user');    
    const sport_tbl = require('../models/sport');    
    const League_tbl = require('../models/League');    
    const Team_tbl = require('../models/Team');    
    const Player_tbl = require('../models/Player');    
    const country_tbl = require('../models/country');    

       
class FootballController { 
    
static jks = async()=>{
     let data = new country_tbl({name: "Bangladesh"}) ;  
              //  data.save();
    // country_tbl.save({name: "China"});
    // country_tbl.save({name: "India"});
    // country_tbl.save({name: "Pakistan"});
    // country_tbl.execute(function(err, result) {
    //     if (err) console.error(err);
    //     console.log('Inserted ' + result.nInserted + ' row(s).');
    // });
          
}


    static league_list = async(req,res)=>{
        try {
            let id = req.params.id ;
            let id_len = (id || '').length;
            
            let whr = (id_len == 0)? {} : { "_id":id};
            let response = await League_tbl.find(whr).select("_id league_name").exec();
                    
            if(response){
                return res.status(200).send({status:true,msg:'Success' , "body": response }) ;   
                }else{
                    return res.status(200).send({status:false,msg:'No Data Found'}) ;  
                }

         } catch (error) { console.log("some error is == ",error);
                return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

                }
   
    } 

       
    static sport_list = async(req,res)=>{
        try {
            // let id = req.params.id ;
            // let id_len = (id || '').length;
            
            // let whr = (id_len == 0)? {} : { "_id":id};
            // let response = await sport_tbl.find(whr).select("_id name").exec();
                    
            // if(response){
            //     return res.status(200).send({status:true,msg:'Success' , "body": response }) ;   
            //     }else{
            //         return res.status(200).send({status:false,msg:'No Data Found'}) ;  
            //     }
//////////////////////////////////////////////////////////////
                    let  id = req.params.id;
                    let page  = req.body.page;
                    page = (isEmpty(page) || page == 0 )? 1 :page ; 


                    let whr = (isEmpty(id))? {}: {_id: id} ;
                    let query =  sport_tbl.find(whr).select("_id name").sort({_id:-1}) ;

                    const query2 =  query.clone();
                    const counts = await query.countDocuments();
    
                    let offest = (page -1 ) * 10 ; 
                    const records = await query2.skip(offest).limit(10);
                  //  res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });       

                    if(records){
                       return  res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });       

                        }else{
                            return res.status(200).send({status:false,msg:'No Data Found'}) ;  
                        }


////////////////////////////////////////
         } catch (error) { console.log("some error is == ",error);
                return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

                }
   
    }  // sport_lists
    
    static team_list = async(req,res)=>{
        try {
            let id = req.params.id ;
            let id_len = (id || '').length;
            
            let whr = (id_len == 0)? {} : { "_id":id};
            let response = await Team_tbl.find(whr).select("_id team_name").exec();
                    
            if(response){
                return res.status(200).send({status:true,msg:'Success' , "body": response }) ;   
                }else{
                    return res.status(200).send({status:false,msg:'No Data Found'}) ;  
                }

         } catch (error) { console.log("some error is == ",error);
                return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

                }
   
    } 

    static player_list = async(req,res)=>{
        try {
            let id = req.params.id ;
            let id_len = (id || '').length;
            
            let whr = (id_len == 0)? {} : { "_id":id};
            let response = await Player_tbl.find(whr).select("_id team_name").exec();
                    
            if(response){
                return res.status(200).send({status:true,msg:'Success' , "body": response }) ;   
                }else{
                    return res.status(200).send({status:false,msg:'No Data Found'}) ;  
                }

         } catch (error) { console.log("some error is == ",error);
                return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

                }
   
    } 

    static country_list = async(req,res)=>{
        try {
            let id = req.params.id ;
            let id_len = (id || '').length;
            
            let whr = (id_len == 0)? {} : { "_id":id};
            let response = await country_tbl.find(whr).select("_id name").exec();
                    
            if(response){
                return res.status(200).send({status:true,msg:'Success' , "body": response }) ;   
                }else{
                    return res.status(200).send({status:false,msg:'No Data Found'}) ;  
                }

         } catch (error) { console.log("some error is == ",error);
                return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

                }
   
    }  
}



module.exports = FootballController ;