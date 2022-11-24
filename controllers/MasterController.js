const  express = require("express");
const {getLocalDateTime,getcurntDate,isEmpty,before_after_Date,gen_str} = require('../myModel/common_modal');
const  sport_tbl = require("../models/sport");
const  league_tbl = require("../models/League");
const  Player_tbl = require("../models/Player");
const  Team_tbl = require("../models/Team");
const  country_tbl = require("../models/country");
const  {MyBasePath} = require("../myModel/image_helper");


const team_matches   = require("../models/team_matches") ; 
const playMatchCards = require("../models/playMatchCards") ; 

class MasterController { 

    /// Sports function section 
    static  sports_add =  async(req,res) =>{
        let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
      let name = req.body.name;     let name_ara = req.body.name_ara;
                
          if(isEmpty(name) || isEmpty(name_ara)  ){
                    return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                } 
             let add = new sport_tbl({name,name_ara,image}); 
                    add.save((err,data)=>{
                        if(err){ console.log("sport err ==  ", err);  return res.status(200).send({"status":false,"msg":"something went wrong please try again","body":''});
                                }else{
                         return res.status(200).send({"status":true,"msg":"Sport Add Successfully","body": data });
                     }
           });       

                
         }

         static sports_get = async (req,res)=>{
        try {
                let  id = req.params.id;
                let page  = req.body.page;
                let name    = req.body.name;
                let whr = {};
                let paths =MyBasePath(req,res);    
                if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

                page = (isEmpty(page) || page == 0 )? 1 :page ; 
                 if(!isEmpty(id)){whr = {_id: id} ;} 

            let query =  sport_tbl.find(whr).sort({_id:-1});
              
             const query2 =  query.clone();
             const counts = await query.countDocuments();


              
             let offest = (page -1 ) * 10 ; 
             const records = await query2.skip(offest).limit(10);
        
             if(records){ records.map((item)=> { 
                item.image = (item.image)? `${paths}/image/assets/master/${item.image}` : '' ;
            return item;
        })}
        
        
             res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
  
        } catch (error) { console.log(error);
          res.status(200).send({'status':false,'msg':error,'body':''});
        }
             
            }     

   static sports_update = async(req,res)=>{
                try {
                           let id = req.params.id;
                           let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
       
                           let name = req.body.name;  let name_ara = req.body.name_ara;
                
                           if(isEmpty(name) || isEmpty(name_ara)  ){
                                     return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                                 } 
                     let updateData = isEmpty(image)? {name,name_ara} : {name,name_ara,image};       

                sport_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new : true}, (err, updatedUser) => {
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
        let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
        let name_ara = req.body.name_ara;
                
          if(isEmpty(name) || isEmpty(name_ara)  ){
                    return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                } 


            let add = new league_tbl({name,image,name_ara}); 
            add.save((err,data)=>{
                if(err){   return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                        }else{
                return res.status(200).send({"status":true,"msg":"League Add Successfully","body": data });
             }
   });     

        
 }

     static league_get = async (req,res)=>{
      try {
                let  id     = req.params.id;
                let page    = req.body.page;
                let name    = req.body.name;
                let whr = {};

                if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

                page = (isEmpty(page) || page == 0 )? 1 :page ; 
                 if(!isEmpty(id)){whr = {_id: id} ;} 

    let query =  league_tbl.find(whr).sort({_id:-1}) ;
      
     const query2 =  query.clone();
     const counts = await query.countDocuments();


      
     let offest = (page -1 ) * 10 ; 
     const records = await query2.skip(offest).limit(10);
 
     let paths =MyBasePath(req,res); 
     if(records){ records.map((item)=> { 
        item.image = (item.image)? `${paths}/image/assets/master/${item.image}` : '' ;
                return item; })}
        


  res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

} catch (error) { console.log(error);
  res.status(200).send({'status':false,'msg':error,'body':''});
}
     
                  }     

    static league_update = async(req,res)=>{
        try { 
                   let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
                   let id = req.params.id;
                   let name = req.body.name;
                   let name_ara = req.body.name_ara;
                   
                    if(isEmpty(name) || isEmpty(name_ara)  ){
                                return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                            } 

            let updateData = isEmpty(image)? {name,name_ara} : {name,name_ara,image} ;     
                     
               league_tbl.findOneAndUpdate({_id: id},{$set :updateData },{new: true}, (err, updatedUser) => {
        if(err) {  console.log(err);
            return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
        }else if(!isEmpty(updatedUser)){
                    return res.status(200).send({"status":true,"msg":'league Updated Successfully' , "body":updatedUser  }) ;   
            }else{  return res.status(200).send({"status":false,"msg":'Invalid league Id ' , "body": ''}) ;   
                    }

            
        });

         } catch (error) {  console.log(error); 
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
     
      /// Team_tbl function section   team
   static  team_add =  async(req,res) =>{
        let name = req.body.name;
        let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
        let name_ara = req.body.name_ara;
                
          if(isEmpty(name) || isEmpty(name_ara)  ){
                    return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                } 
            let add = new Team_tbl({name,name_ara,image}); 
            add.save((err,data)=>{
                if(err){   return res.status(200).send({"status":false,"msg":"Name Field Required","body":''});
                        }else{
                return res.status(200).send({"status":true,"msg":"Team Add Successfully","body": data });
             }
   });     

        
      }

    static team_get = async (req,res)=>{
    try {
            let  id = req.params.id;
            let page  = req.body.page;
            let name    = req.body.name;
            let whr = {};
            console.log(name)
            if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

            page = (isEmpty(page) || page == 0 )? 1 :page ; 
            if(!isEmpty(id)){whr = {_id: id} ;} 



        let query =  Team_tbl.find(whr).sort({_id:-1}) ;
            const query2 =  query.clone();
        const counts = await query.countDocuments();


        
        let offest = (page -1 ) * 10 ; 
        const records = await query2.skip(offest).limit(10);
        
        let paths =MyBasePath(req,res); 
        if(records){ records.map((item)=> { 
           item.image = (item.image)? `${paths}/image/assets/master/${item.image}` : '' ;
                   return item; })}
           
    res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

    } catch (error) { console.log(error);
    res.status(200).send({'status':false,'msg':error,'body':''});
    }
        
        }     

    static team_update = async(req,res)=>{
        try {
                   let id = req.params.id;
                   let name = req.body.name;
                   let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
                   let name_ara = req.body.name_ara;
                
                   if(isEmpty(name) || isEmpty(name_ara)  ){
                             return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                         } 

        let updateData = (isEmpty(image))? {name,name_ara} : {name,name_ara,image} ;
  
                   Team_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new: true}, (err, updatedUser) => {
                    if(err) {  console.log(err);
                        return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
                    }else if(!isEmpty(updatedUser)){
                                return res.status(200).send({"status":true,"msg":'Team Updated Successfully' , "body":updatedUser  }) ;   
                        }else{  return res.status(200).send({"status":false,"msg":'Invalid Team Id ' , "body": ''}) ;   
                                }
            
            
        });

         } catch (error) {
                 return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
     
             }
           
     
         }          
  
   static team_delete = async(req,res)=>{
         try {
                 let id = req.params.id;  
                 Team_tbl.findByIdAndDelete(id, function (err, docs) {
               if (err){  console.log("jjj === ",err);           //json(err)

                       let getError =  JSON.parse(JSON.stringify(err));
                 return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                  }else if(!isEmpty(docs)){
                     return res.status(200).send({"status":true,"msg":'Team Deleted Successfully' , "body":''}) ;   
               }else{
                 return res.status(200).send({"status":false,"msg":'Invalid Team Id ' , "body":''}) ;  
               }
           });

         } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

     }
      /// Player_tbl function section   Player
      
      static  player_add =  async(req,res) =>{
                let name = req.body.name;
                let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
                let name_ara = req.body.name_ara;
                
                if(isEmpty(name) || isEmpty(name_ara)  ){
                          return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                      } 

              let add = new Player_tbl({name_ara,name,image}); 
                    add.save((err,data)=>{   
                        if(err){ console.log(err);     
                                return res.status(200).send({"status":false,"msg":'something went wrong please try again' ,"body":'' });
                                }else{
                                   return res.status(200).send({"status":true,"msg":"Player Add Successfully","body": data });
                                }  
            });     

    
             }

  static player_get = async (req,res)=>{
        try {
            let  id = req.params.id;
            let page  = req.body.page;
            let name    = req.body.name;
            let whr = {};

            if(!isEmpty(name)){whr.name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 

            page = (isEmpty(page) || page == 0 )? 1 :page ; 
            if(!isEmpty(id)){whr = {_id: id} ;} 
        
            let query =  Player_tbl.find(whr).sort({_id:-1}) ;
                const query2 =  query.clone();
            const counts = await query.countDocuments();


            
            let offest = (page -1 ) * 10 ; 
            const records = await query2.skip(offest).limit(10);
            let paths =MyBasePath(req,res);    
            if(records){ records.map((item)=> { 
                        item.image = (item.image)? `${paths}/image/assets/master/${item.image}` : '' ;
                    return item;
                })}   

        res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

        } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':error,'body':''});
        }
            
            }     

    static player_update = async(req,res)=>{
            try {
                    let id = req.params.id;
                    let name = req.body.name;
                    let image = ((req.files) && (req.files.image != undefined ) && (req.files.image.length >0) )? req.files.image[0].filename : '';
                    let name_ara = req.body.name_ara;
                
                    if(isEmpty(name) || isEmpty(name_ara)  ){
                              return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                          } 
                 let updateData  = (isEmpty(image))? {name_ara,name} : {name_ara,name,image}            


                    Player_tbl.findOneAndUpdate({_id: id},{$set : updateData },{new: true}, (err, updatedUser) => {
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;   
            }else if(!isEmpty(updatedUser)){
                        return res.status(200).send({"status":true,"msg":'Player Updated Successfully' , "body":updatedUser  }) ;   
                }else{  return res.status(200).send({"status":false,"msg":'Invalid Player Id ' , "body": ''}) ;   
                        }

                
            });

            } catch (error) {
                    return res.status(200).send({"status":false,"msg":'Server error' , "body":''}) ;          
        
                }
            
        
            }          

   static player_delete = async(req,res)=>{
            try {
                    let id = req.params.id;  
                    Player_tbl.findByIdAndDelete(id, function (err, docs) {
                if (err){  console.log("jjj === ",err);           //json(err)

                        let getError =  JSON.parse(JSON.stringify(err));
                    return res.status(200).send({"status":false,"msg":getError.message , "body":''}) ; 
                    }else if(!isEmpty(docs)){
                        return res.status(200).send({"status":true,"msg":'Player Deleted Successfully' , "body":''}) ;   
                }else{
                    return res.status(200).send({"status":false,"msg":'Invalid Player Id ' , "body":''}) ;  
                }
            });

            } catch (error) { return res.status(200).send({"status":true,"msg":'Some error' , "body":''}) ; }

        }
   
     
  static live_upcoming_match_list = async (req,res)=>{
    try {
        let name    = req.body.name;
        let date = getcurntDate(); 
      
        let whr = {} ;  // {date_utc:{$gte : date}};     
        
       
        if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
        let records = await team_matches.find(whr,'match_id _id match_name').sort({'date_utc': 1}) ;
       
        
    res.status(200).send({'status':true,'msg':"success", 'body':records });

    } catch (error) { console.log(error);
    res.status(200).send({'status':false,'msg':error,'body':''});
    }
        
        } 
        
        

 static all_team_match_list = async (req,res)=>{
            try {
                let  id = req.params.id;
                let page  = req.body.page;
                let s_date  = req.body.s_date;
                let e_date  = req.body.e_date;
                let name    = req.body.name;
                let whr = {};
        
                if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
                if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date_utc = { $gte: s_date, $lte: e_date } ;} 
                page = (isEmpty(page) || page == 0 )? 1 :page ; 
                if(!isEmpty(id)){whr = {_id: id} ;} 
            
                let query =  team_matches.find(whr).sort({_id:-1}) ;
                    const query2 =  query.clone();
                const counts = await query.countDocuments();
        
        
                
                let offest = (page -1 ) * 10 ; 
                const records = await query2.skip(offest).limit(10);
                let paths =MyBasePath(req,res); 
                  
        
            res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
        
            } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':error,'body':''});
            }
                
                }        
   
static all_team_match_list_mobile_old = async (req,res)=>{
    try {
        let  id = req.params.id;
        let page  = req.body.page;
        let s_date  = req.body.s_date;
        let e_date  = req.body.e_date;
        let name    = req.body.name;
        let language= req.body.language;
        let whr = {};
        let date = before_after_Date(); 
        if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
        if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date_utc = { $gte: s_date, $lte: e_date } ;}else{
            whr.date_utc ={$gte : date}; 
        } 
        page = (isEmpty(page)

|| page == 0 )? 1 :page ; 
        if(!isEmpty(id)){whr = {_id: id} ;} 
    
        let query =  team_matches.find(whr).sort({date_utc:1}) ;
            const query2 =  query.clone();
        const counts = await query.countDocuments();

        
        let offest = (page -1 ) * 10 ; 
        const records = await query2.skip(offest).limit(10);
        records.map((item)=>{
            if(language=="ar"){
                item.match_name=item.match_name_ara;
                item.team_a_name=item.team_a_name_ara;
                item.team_a_short_name=item.team_a_short_name_ara;
                item.team_b_name=item.team_b_name_ara;
                item.team_b_short_name=item.team_b_short_name_ara;
            }
        }) 
        let paths =MyBasePath(req,res); 
            

    res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });

    } catch (error) { console.log(error);
    res.status(200).send({'status':false,'msg':"server error"});
    }
                    
}     

static all_team_match_list_mobile = async (req,res)=>{
    try {
        let  id = req.params.id;
        let page  = req.body.page;
        let s_date  = req.body.s_date;
        let e_date  = req.body.e_date;
        let name    = req.body.name;
        let language= req.body.language;
        let zone= req.body.zone;
        let user_id= req.body.user_id;
        if(!isEmpty(user_id)){
            let whr = {};
            let matches=await playMatchCards.distinct('match_id',{"user_id":user_id})
            if(!isEmpty(matches)){whr._id = matches ;} 
            if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
            if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date_utc = { $gte: s_date, $lte: e_date } ;}
            page = (isEmpty(page) || page == 0 )? 1 :page ; 
            if(!isEmpty(id)){whr = {_id: id} ;} 
            let query =  team_matches.find(whr).sort({date_utc:1,time_utc:-1}) ;
                const query2 =  query.clone();
            const counts = await query.countDocuments();
    
            
            let offest = (page -1 ) * 10 ; 
            const records = await query2.skip(offest).limit(10);
            records.map( (item)=>{
                let local= getLocalDateTime({date_utc:item.date_utc,time_utc:item.time_utc,zone})
                item.date_utc=local.local_date;
                item.time_utc=local.local_time;
                if(language=="ar"){
                    item.match_name=item.match_name_ara;
                    item.team_a_name=item.team_a_name_ara;
                    item.team_a_short_name=item.team_a_short_name_ara;
                    item.team_b_name=item.team_b_name_ara;
                    item.team_b_short_name=item.team_b_short_name_ara;
                }
            }) 
            let paths =MyBasePath(req,res); 
                
    
        res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
        
        }else{
        let whr = {};
        let date = getcurntDate();
        console.log(date) 
        if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
        if(!isEmpty(s_date) && !isEmpty(e_date) ){ whr.date_utc = { $gte: s_date, $lte: e_date } ;}else{whr.date_utc ={$gte : date}; } 
        page = (isEmpty(page)


        || page == 0 )? 1 :page ; 
        if(!isEmpty(id)){whr = {_id: id} ;} 
    
        let query =  team_matches.find(whr).sort({date_utc:1,time_utc:1}) ;
            const query2 =  query.clone();
        const counts = await query.countDocuments();

        
        let offest = (page -1 ) * 10 ; 
        const records = await query2.skip(offest).limit(10);
        records.map( (item)=>{
            let local= getLocalDateTime({date_utc:item.date_utc,time_utc:item.time_utc,zone})
            item.date_utc=local.local_date;
            item.time_utc=local.local_time;
            if(language=="ar"){
                item.match_name=item.match_name_ara;
                item.team_a_name=item.team_a_name_ara;
                item.team_a_short_name=item.team_a_short_name_ara;
                item.team_b_name=item.team_b_name_ara;
                item.team_b_short_name=item.team_b_short_name_ara;
            }
        }) 
        let paths =MyBasePath(req,res); 
            

    res.status(200).send({'status':true,'msg':"success", "page":page, "rows":counts, 'body':records });
     
        }
       
    } catch (error) { console.log(error);
    res.status(200).send({'status':false,'msg':"server error"});
    }
                    
}    



    static deleteOne=async (req,res)=>{
        let _id=req.body._id
        let result=await team_matches.findOneAndDelete({_id})
        res.status(200).send({'status':true,'msg':"success",'body':result });
            
    }

    static past_match_list = async (req,res)=>{
        try {
            let name    = req.body.name;
            let date = getcurntDate(); 
            
            let whr = {date_utc:{$lt : date}};     
            
            
            if(!isEmpty(name)){whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' } ;} 
            let records = await team_matches.find(whr,'match_id _id match_name').sort({'date_utc': 1}) ;
            
            
        res.status(200).send({'status':true,'msg':"success", 'body':records });
    
        } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':error,'body':''});
        }
            
            }   
}

module.exports = MasterController;

