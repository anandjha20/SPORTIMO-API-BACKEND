     let  express_2 = require('express');
    let mongoose = require('mongoose');
    const axios  = require('axios');  
    const xml2js  = require('xml2js');  
 

  
const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date,send_mobile_otp_new,getLocalDateTime } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds,preferences_ar_convart } = require('../myModel/helper_fun');

  const  {MyBasePath} = require("../myModel/image_helper");
  
  
  // all mongodb schema    
    const user_tbl = require('../models/user');    
    const sport_tbl = require('../models/sport');    
    const League_tbl = require('../models/League');    
    const Team_tbl = require('../models/Team');    
    const Player_tbl = require('../models/Player');    
    const block_user_tbl = require('../models/block_user');  
    const default_massages_tbl = require('../models/default_massages');  
    const user_logs = require('../models/user_logs');  
    const content_tbls = require('../models/content_tbls'); 
    const userLanguage = require("../models/userLanguage");            
    const follower_tbls = require("../models/follower_users");         
    //const avatars_tbl = require("../models/avatars");  
    const match_cards = require('../models/match_cards');
    const transaction_tbls = require("../models/transactions")         
    const play_match_cards_tbl = require("../models/playMatchCards");     
const team_matches = require('../models/team_matches');
const userArchive = require('../models/userArchive');     
const request_tbl = require('../models/request');     
const notification_tbl = require('../models/notification_tbl');
const request = require('../models/request');




class UserController { 
    static dashboardAllCount = async(req,res)=>{
    
        let allCount = {"Registered_Players":205,"Active_Tournaments":14,"Winner_Pending":40,
               "Order_Received":150,"today_transaction":12,"total_transaction":1280,
               "KYC_Request":45,"KYC_Pending":456,"panding_orders":40};
   
      return res.status(200).send({"status":true,"msg":'Success' , "body":allCount }) ;  
          
    } 

    static User_sendEmail = async(req,res)=>{
            try {
                //let arr = ['Barclays Premier League','Austrian T-Mobile Bundesliga','Belgian Jupiler League','Japanese J League','South African ABSA Premier League','English League Two','Chinese Super League'];
                let arr = ['Hattan Bahebri','Abdullah Ateef','Abdulelah Al Amri','Harry Kane','Erling Haaland','Mohamed Salah',
                    'Cristiano Ronaldo','Trent Alexander-Arnold','Karim Benzema'];
                let obj1 = arr.map((item) =>{ let data =  {"team_name":item} ; return data;} );   
                    console.log('my_obj ==',obj1)

                let response = await Player_tbl3333.insertMany(obj1, (err, docs) => {
                                       if(err){ console.log("server error == ",err)}
                                           return docs;
                                     });
                if(response){
                    return res.status(200).send({"status":true,"msg":'Successs' , "body":response }) ;
                }else{
                    return res.status(200).send({"status":false,"msg":'Invalid' , "body":'' }) ; 
                }                         


            } catch (error) {
                console.log(error);
            return res.status(200).send({"status":false,"msg":'some error' , "body":error }) ;  
            }

    }


    static registration_old = async(req,res)=>{
        try {  
            let  mobile = req.body.mobile;      let email     = req.body.email;
            let address = req.body.address;     let user_type = req.body.user_type;
            let name    = req.body.name;        let device_id = req.body.device_id;
           let firebase_token    = req.body.firebase_token;
              
            let user_type_len = (user_type || '').length;    let device_id_len = (device_id || '').length;
            let name_len = (name || '').length;              let mobile_len    = (mobile || '').length;
           
            let email_len = (email || '').length;            //let device_id_len = (device_id || '').length;
           
            if(user_type_len == 0 || device_id_len == 0){
                return res.status(200).send({"status":false,"msg":'All Field Required ' , "body":''}) ;     
            }

            let otp = Math.floor(Math.random() * 900000) + 100000; 
            let date = getcurntDate(); 
            
            let token = gen_str(99);
           
            let seq_id = await autoincremental('seq_id',user_tbl);
            console.log("seq_id is ==",seq_id);
            
         if(user_type == 1 || user_type == 2 || user_type == 3 || user_type == 4 || user_type == 5 ){ }else{
                return res.status(200).send({"status":false,"msg":'Invalid User type Field Value '}) ;     
            }

    // case 1 if user type == 5 (guest user )  and  device_id id arready exists then
       if(user_type == 5){
        let check_d_id = '';


            ///////////////////////////////////////////////////////////////////////////////      
           let myobjs = { token};
            user_tbl.findOneAndUpdate({user_type: 5,device_id,is_deleted :{$ne : 1}},{$set : myobjs},{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                   return  res.status(200).send({"status":false,"msg":'some errors '}) ;   
                }
               if(updatedUser){
                              let ddsq = user_logs_add(updatedUser._id,'login');  
                return res.status(200).json({ "status":true,"msg": "Guset user login successfully" , "body":updatedUser });
               }else{
                let add =new user_tbl({ user_type, date,device_id,token,otp,seq_id,firebase_token});
    
                         add.save( (err, data) => {
                              if (err) {        

                                return res.status(200).send({"status":false,"msg":'An error occurred'}) ;            
                                      }else{        let ddsqq = user_logs_add(data._id,'login');   
                                      return res.status(200).send({"status":true,"msg":'Guset user add successfully' , "body":data  }) ; 
                               } });
                             
                      
                      
                      
                            }
               
            });       
                
            ///////////////////////////////////////////////////////////////////////////
        }


    let checkuser = ( user_type == 2 || user_type == 3 || user_type == 4 )? await user_tbl.find({email }).exec() : await user_tbl.find({mobile}).exec() ;
    let sendmsg = ( user_type == 2 || user_type == 3 || user_type == 4 )? "Email already exists" :  "Mobile already exists" ;


    console.log('checkuser == ',checkuser)  ;         
           
     if(checkuser.length >0 ){
        let check_user_id = checkuser[0]._id;   
        const doc = await user_tbl.findOneAndUpdate({ _id: check_user_id},{ otp: otp },
                                     { upsert: true, useFindAndModify: false });
         
              let check_type = checkuser[0].user_type;  let msgtodiv = '';   
                if(check_type == 1){
                    send_mobile_otp({mobile,otp}); 
                   
                    msgtodiv = 'otp sent to your mobile please check know ';
                }else  if(check_type == 2 || check_type == 3 || check_type == 4 ){
                    sentEmail({email,otp}); 
                    msgtodiv = 'otp sent to your Email please check know ';
                }  

   
                return res.status(200).send({"status":true,"msg":msgtodiv, "body":checkuser[0]._id }) ;     
         }
              
            let add =new user_tbl({
                name: name,
                email: email,
                 user_type:user_type,
                address: address,
                  date: date,  
                 mobile:mobile,
                 device_id:device_id,
                 otp : otp,
                 token : token,
                 seq_id : seq_id,
                 firebase_token : firebase_token
            });             

           
                    let allsaveData =  await add.save();
            if(allsaveData){

                 let msgtodiv2 = '';

                if(user_type == 1){
                    send_mobile_otp({mobile,otp}); 
                      msgtodiv2 = 'otp sent to your mobile please check know ';
                }else  if(user_type == 2 || user_type == 3 || user_type == 4 ){
                    sentEmail({email,otp}); 
                    msgtodiv2 = 'otp sent to your Email please check know ';
                }  
                    console.log('add == ', add);    
                 return res.status(200).send({"status":true,"msg": msgtodiv2 , "body":add._id }) ;      
                }else{
                    return res.status(200).send({"status":false,"msg":'no data add ' }) ;           
                }    
        } catch (error) { console.log("user register api == ",error);
            return res.status(200).send({"status":false,"msg":'Server errror' }) ;          
               
        }           
      

    }

    static registration = async(req,res)=>{
      //  try {  
            let  mobile = req.body.mobile;      let email     = req.body.email;
            let address = req.body.address;     let user_type = req.body.user_type;
            let name    = req.body.name;        let device_id = req.body.device_id;
           let firebase_token    = req.body.firebase_token;
              
            let user_type_len = (user_type || '').length;    let device_id_len = (device_id || '').length;
            let name_len = (name || '').length;              let mobile_len    = (mobile || '').length;
           
            let email_len = (email || '').length;            //let device_id_len = (device_id || '').length;
           
            if(user_type_len == 0 || device_id_len == 0){
                return res.status(200).send({"status":false,"msg":'All Field Required ' , "body":''}) ;     
            }

            let sportimo_id = Math.floor(Math.random() * 9000000) + 1000000; 
            let otp = Math.floor(Math.random() * 900000) + 100000; 
            let date = getcurntDate(); 
            
            let token = gen_str(99);
           
            let seq_id = await autoincremental('seq_id',user_tbl);
            
         if(user_type == 1 || user_type == 2 || user_type == 3 || user_type == 4 || user_type == 5 ){ }else{
                return res.status(200).send({"status":false,"msg":'Invalid User type Field Value '}) ;     
            }
//ckecking of delete user account
let condition_obj={user_type};
if(user_type==1){condition_obj={...condition_obj,mobile}};
if(user_type==2){condition_obj={...condition_obj,email}};

let user = await user_tbl.find(condition_obj);

    if( ! isEmpty(user) &&  user[0].is_deleted==1){
        
    return res.status(200).send({"status":false,"msg":'your account was deleted..register yourself first!!! '}) ;
}else{

    // case 1 if user type == 5 (guest user )  and  device_id id arready exists then
       if(user_type == 5){
        let check_d_id = '';


            ///////////////////////////////////////////////////////////////////////////////      
           let myobjs = { token};
            user_tbl.findOneAndUpdate({user_type: 5,device_id,is_deleted :{$ne : 1}},{$set : myobjs},{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                   return  res.status(200).send({"status":false,"msg":'some errors '}) ;   
                }
               if(updatedUser){
                              let ddsq = user_logs_add(updatedUser._id,'login');  
                return res.status(200).json({ "status":true,"msg": "Guset user login successfully" , "body":updatedUser });
               }else{
                let add =new user_tbl({name:"guest:"+sportimo_id, user_type, date,device_id,token,otp,seq_id,firebase_token,sportimo_id:"guest:"+sportimo_id});
    
                         add.save( (err, data) => {
                              if (err) {        

                                return res.status(200).send({"status":false,"msg":'An error occurred'}) ;            
                                      }else{        let ddsqq = user_logs_add(data._id,'login');   
                                      return res.status(200).send({"status":true,"msg":'Guset user add successfully' , "body":data  }) ; 
                               } });
                             
                      
                      
                      
                            }
               
            });       
                
            ///////////////////////////////////////////////////////////////////////////
        }else{


    let checkuser = ( user_type == 2 || user_type == 3 || user_type == 4 )? await user_tbl.find({email }).exec() : await user_tbl.find({mobile}).exec() ;
    let sendmsg = ( user_type == 2 || user_type == 3 || user_type == 4 )? "Email already exists" :  "Mobile already exists" ;

           
     if(checkuser.length >0 ){
        let check_user_id = checkuser[0]._id; 
        let check_type = checkuser[0].user_type;  let msgtodiv = '';   
       
        var apiGenOtp = 10000;  // otp ;
       
        if(check_type == 1){  
            //send_mobile_otp({mobile,otp});   
            apiGenOtp =  await send_mobile_otp_new({mobile}); 
            console.log("apiGenOtp",apiGenOtp)
            msgtodiv = 'otp sent to your mobile please check know ';
        }else  if(check_type == 2 || check_type == 3 || check_type == 4 ){
               sentEmail({email,otp}); 
            msgtodiv = 'otp sent to your Email please check know ';
        } 

           
    let newOtp = (check_type == 1)? apiGenOtp : otp;
    
         console.log("new oootp == ", newOtp); 

        const doc = await user_tbl.findOneAndUpdate({ _id: check_user_id},{ otp: newOtp },
                                     { upsert: true, useFindAndModify: false });
         
             return res.status(200).send({"status":true,"msg":msgtodiv, "body":checkuser[0]._id }) ;     
         }
         let msgtodiv2 = ''; let apiGenOtp_2 = 1000;
         if(user_type == 1){
            // send_mobile_otp({mobile,otp}); 
            apiGenOtp_2 = await send_mobile_otp_new({mobile}); 
               msgtodiv2 = 'otp sent to your mobile please check know ';
         }
         console.log("apiGenOtp == ",apiGenOtp_2);
            let add =new user_tbl({
                name: sportimo_id,
                email: email,
                 user_type:user_type,
                address: address,
                  date: date,  
                 mobile:mobile,
                 device_id:device_id,
                 otp : (user_type == 1)? apiGenOtp_2 : otp,
                 token : token,
                 seq_id : seq_id,
                 firebase_token : firebase_token,
                 sportimo_id:sportimo_id
            });             

           
                    let allsaveData =  await add.save();
            if(allsaveData){
                if(user_type == 2 || user_type == 3 || user_type == 4 ){
                    sentEmail({email,otp}); 
                    msgtodiv2 = 'otp sent to your Email please check know ';
                }  
                    console.log('add == ', add);    
                 return res.status(200).send({"status":true,"msg": msgtodiv2 , "body":allsaveData }) ;      
                }else{
                    return res.status(200).send({"status":false,"msg":'no data add ' }) ;           
                } 
            } 
          }  
        // } catch (error) { console.log("user register api == ",error);
        //     return res.status(200).send({"status":false,"msg":'Server errror' }) ;          
               
        // }             
      

    }


static resend_otp_2_old = async(req,res) =>{
    let language = req.body.language;
    let otp = Math.floor(Math.random() * 900000) + 100000; 
    user_tbl.findByIdAndUpdate(req.params.id,{$set:{otp:otp}},{new:true}).then((docs)=>{
        if(docs) {
        
            let msgtodiv = '';
            if(docs.user_type == 1){
                let mobile = docs.mobile;
                let ddd =  send_mobile_otp({mobile,otp}); 
                 msgtodiv = (language == 'ar')?  'otp أرسلت إلى هاتفك المحمول يرجى التحقق من العلم' : 'otp sent to your mobile please check know';
            }else{
                let email = docs.email;
                let ddd =   sentEmail({email,otp});
  
                  msgtodiv =   (language == 'ar')? 'otp أرسلت إلى البريد الإلكتروني الخاص بك يرجى التحقق من علم' : 'otp sent to your Email please check know';
            }


         return res.status(200).json({
            msg:msgtodiv,
            status: true,
          
        });
          


        } else {
        

          return res.status(200).json({
            title: (language == 'ar')? 'لا يوجد مثل هذا المستخدم' : "no such user exist",
            error: true,
            details: err
        });

        }
     }).catch((err)=>{
        return res.status(200).json({
            title: (language == 'ar')? "حدث خطأ أثناء إضافة السؤال." :  "Error occured while adding question.",
            error: true,
            details: err
        });
     })

    }           


    static resend_otp_2 = async(req,res) =>{
        try{
        let _id=req.params.id;
        let language = req.body.language;
        let otp = Math.floor(Math.random() * 900000) + 100000; 
        let docs=await user_tbl.findOne({_id})
        if(docs){
            let msgtodiv = '';
            if(docs.user_type == 1){
                let mobile = docs.mobile;
                let new_otp_mobile =await  send_mobile_otp_new({mobile});
                let dd=await user_tbl.findOneAndUpdate({_id},{$set:{otp:new_otp_mobile}}); 
                 msgtodiv = (language == 'ar')?  'otp أرسلت إلى هاتفك المحمول يرجى التحقق من العلم' : 'otp sent to your mobile please check know';
            }else{
                let email = docs.email;
                let ddd =   sentEmail({email,otp});
                let dd=await user_tbl.findOneAndUpdate({_id},{$set:{otp:otp}}); 
                  msgtodiv =   (language == 'ar')? 'otp أرسلت إلى البريد الإلكتروني الخاص بك يرجى التحقق من علم' : 'otp sent to your Email please check know';
            }

            return res.status(200).json({
                msg:msgtodiv,
                status: true,
              
            });
              

        }else {
        

            return res.status(200).json({
              title: (language == 'ar')? 'لا يوجد مثل هذا المستخدم' : "no such user exist",
              error: true,
              details: err
          });
        }
            
                
        }catch (error){
            return res.status(200).json({
                title:  "Error occured while adding question.",
                error: true,
                details: err
            });

        }
    }           
    

static verify_otp = async(req,res)=>{
    try {
        let user_id    = req.body.user_id;
        let otp    = req.body.otp;
        
        
        otp = ( otp.charAt( 0 ) === '0' )? otp.slice( 1 ) : otp ;

       
        let otp_len = (otp || '').length;    let user_id_len = (user_id || '').length;
     
        if(otp_len == 0 || user_id_len == 0){
            return res.status(200).send({"status":false,"msg":'All Field Required ' }) ;     
        }
        
////////////////////////////////////
var query = user_tbl.findOne({ '_id': user_id});

query.exec(function (err, person) {
  if (err){
    return res.status(200).send({"status":false,"msg":'Invalid User' }) ; 
  } 
  // Prints "Space Ghost is a talk show host."

  console.log(" db user  otp is == ", person.otp); 
  let ddsq = user_logs_add(person._id,'login');  
  if(person.otp == otp){
    return res.status(200).send({"status":true,"msg":'Success' , "body": person }) ;     
  }else{ // console.log(person); 
    return res.status(200).send({"status":false,"msg":'Invalid otp'}) ;     
  }

  });

} catch (error) { console.log("some error is == ",error);
    return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

}
       



}

static user_profile_view_old = async(req,res)=>{
    try {
            let user_id     = req.body.user_id;        let view_user_id  = req.body.view_user_id;
            let user_id_len = (user_id || '').length;  let view_user_id_len = (view_user_id || '').length;
     
        if( user_id_len == 0 || view_user_id_len == 0 ){
            return res.status(200).send({"status":false,"msg":'All Field Required ' }) ;     
        }
        
////////////////////////////////////

const checkusers = await block_user_tbl.find({ 'from_user': user_id,'to_user': view_user_id}).countDocuments();


const checkFollowStatus = await follower_tbls.find({ follower_id : user_id,following_id: view_user_id}).countDocuments();

var query = user_tbl.findOne({ '_id': user_id});




query.exec(function (err, person) {
  if (err){
                 return res.status(200).send({"status":false,"msg":'Invalid User' }) ; 
             }else{
                let paths =MyBasePath(req,res); 
               
                if (!isEmpty(person)){
                    person.image = (person.image == '')? '': `${paths}/image/assets/user_img/${person.image}` ;      
                    person.block_status = checkusers;
                }   
              
                return res.status(200).send({"status":true,"msg":'Success' , "body": person,'blockuser':checkusers,'followStatus':checkFollowStatus }) ;  
      } });


///////////////////////////////////////////


} catch (error) { console.log("some error is == ",error);
    return res.status(200).send({status:false,msg:'some error'}) ;          

}

}


static user_profile_view = async(req,res)=>{
    try {
            let user_id     = req.body.user_id;        let view_user_id  = req.body.view_user_id;
            let user_id_len = (user_id || '').length;  let view_user_id_len = (view_user_id || '').length;
     
        if( user_id_len == 0 || view_user_id_len == 0 ){
            return res.status(200).send({"status":false,"msg":'All Field Required ' }) ;     
        }
        
////////////////////////////////////

const checkusers = await block_user_tbl.find({ 'from_user': user_id,'to_user': view_user_id}).countDocuments();


const checkFollowStatus = await follower_tbls.find({ follower_id : user_id,following_id: view_user_id}).countDocuments();

var view_user_count = await user_tbl.find({ '_id': view_user_id, "user_language": "Arabic"}).countDocuments();
    var person = await user_tbl.findOne({ '_id': user_id }) ; 
    if (!isEmpty(person)){
        var paths =MyBasePath(req,res); 
    if (view_user_count > 0){
       
      
            person.image = (person.image == '')? '': `${paths}/image/assets/user_img/${person.image}` ;      
            person.block_status = checkusers;
         let sport_preferences =  person.sport_preferences;
         let league_preference =  person.league_preference;
         let team_preference =  person.team_preference;
         let player_preference =  person.player_preference;
         
         person.sport_preferences = await preferences_ar_convart(sport_tbl, sport_preferences);
         person.league_preference = await preferences_ar_convart(League_tbl, league_preference);
         person.team_preference   = await preferences_ar_convart(Team_tbl, team_preference);
         person.player_preference = await preferences_ar_convart(Player_tbl, player_preference);
         
        
       
         return res.status(200).send({"status":true,"msg":'Success' , "body": person ,'blockuser':checkusers,'followStatus':checkFollowStatus }) ;  
     
    }else{

        person.image = (person.image == '')? '': `${paths}/image/assets/user_img/${person.image}` ;      
        person.block_status = checkusers;
        return res.status(200).send({"status":true,"msg":'Success' , "body": person ,'blockuser':checkusers,'followStatus':checkFollowStatus }) ;  
     
       }   



    }else{
      return res.status(200).send({"status":false,"msg":'Invalid User' }) ; 

     } 


///////////////////////////////////////////


} catch (error) { console.log("some error is == ",error);
    return res.status(200).send({status:false,msg:'some error'}) ;          

}

}


static user_profile_update = async(req,res)=>{
    try {
    
        let img = ((req.files) && (req.files.user_image != undefined ) && (req.files.user_image.length >0) )? req.files.user_image[0].filename : '';
        console.log('img ==', img); 
        let  id      = req.body.user_id;
        let  name    = req.body.name;
        let  nickname    = req.body.nickname ;
        let  status_msg  = req.body.status_msg ;
        let  gender  = req.body.gender ;
        let  date_of_birth  = req.body.date_of_birth ;

        let  country = req.body.country;   
        
        // let  sport_preferences = req.body.sport_preferences; 
        // let  league_preference = req.body.league_preference; 
        // let  team_preference = req.body.team_preference;        
        // let  player_preference = req.body.player_preference;    
       
        let  device_id = req.body.device_id;    
        let  email = req.body.email;    
        let  city = req.body.city;    
        let  address = req.body.address;     
        let name_len = (name || '').length;      let country_len = (country || '').length;  
        let id_len = (id || '').length;    
         
        //   let sport_preferences_len = (sport_preferences || '').length;
        //   let league_preference_len = (league_preference || '').length;
        //   let team_preference_len   = (team_preference || '').length;
        //   let player_preference_len = (player_preference || '').length;
          
        //   if( id_len == 0 || sport_preferences_len == 0 || league_preference_len == 0 || team_preference_len == 0 || player_preference_len == 0  ){ 
        //     return res.status(200).send({"status":false,"msg":'All Field Required ' , "body":''}) ;     
        // }

      //  let token = gen_str(99);

        let num = Math.floor(Math.random() * 9000) + 1000; 
        let date = getcurntDate(); 
      //  let newName = name.replaceAll( " ", '') ;
        
        let newName = name.replace(/ /g,"-");  
        let myobjs = {  name: name,
                        device_id: device_id,
                        country : country,
                        u_name :nickname ,  
                        status_msg : status_msg,
                        gender : gender  
                    };
    if(img){ myobjs.image = img }
  if(!isEmpty(email)){ myobjs.email = email }
  if(!isEmpty(city)){ myobjs.city = city }
  if(!isEmpty(address)){ myobjs.address = address }
  if(!isEmpty(date_of_birth)){ myobjs.date_of_birth = date_of_birth }

    
///////////////////////////////////////////////////////////////////////////////      
user_tbl.findOneAndUpdate({_id: id},{$set : myobjs},{new: true}, (err, updatedUser) => {
    if(err) {  console.log(err);
        return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
    }
    let paths =MyBasePath(req,res); 
   
      if(!isEmpty(updatedUser)){
     updatedUser.image = (updatedUser.image == '')? '':  `${paths}/image/assets/user_img/${updatedUser.image}` ;
      }
    return res.status(200).json({  
        "status":true,"msg": "success" , "body":updatedUser
    });
});       
      
///////////////////////////////////////////////////////////////////////////
     
    } catch (error) { console.log(error);
        return res.status(200).send({"status":false,"msg":'no data add ' , "body":''}) ;          

    }           
  

}
  


   static user_preference_update = async(req,res)=>{
            try {
                    let  id   = req.params.id;
                    let  sport_preferences = req.body.sport_preferences; 
                    let  league_preference = req.body.league_preference; 
                    let  team_preference = req.body.team_preference;        
                    let  player_preference = req.body.player_preference;    
                    
        // if(isEmpty(sport_preferences) || isEmpty(league_preference) ||
        //          isEmpty(team_preference) || isEmpty(player_preference) ){
        //         return res.status(200).send({"status":false,"msg":'All Field Required ' , "body":''}) ;    
        //     }
        
      
        let myobjs = { sport_preferences,league_preference,team_preference,player_preference};
     

                
            ///////////////////////////////////////////////////////////////////////////////      
            user_tbl.findOneAndUpdate({_id: id},{$set : myobjs},{new: true}, (err, updatedUser) => {
                if(err) {  console.log(err);
                    return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
                }
                let paths =MyBasePath(req,res); 
            
                if(!isEmpty(updatedUser)){
                updatedUser.image = (updatedUser.image == '')? '':  `${paths}/image/assets/user_img/${updatedUser.image}` ;
                 return res.status(200).json({"status":true,"msg": "success" , "body":updatedUser }) ;
                }else{
                    return res.status(200).json({"status":false,"msg": "Invalid user"  }) ;
                }
               
            });       
                
            ///////////////////////////////////////////////////////////////////////////
                
                } catch (error) { console.log(error);
                    return res.status(200).send({"status":false,"msg":'no data add ' , "body":''}) ;          

                }           
            

    }

   

    static block_user_add = async(req,res)=>{
        try {
                   let user_data = req.body;
                   let from_user_len = (user_data.from_user || '').length;
                   let to_user_len = (user_data.to_user || '').length;
             
           if(from_user_len == 0 || to_user_len == 0  ){
               return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 
              } 
    
           let date = getcurntDate();
           let seven_dayDate = before_after_Date(-7);
           let fUser = mongoose.Types.ObjectId(user_data.from_user);
           let toUser = mongoose.Types.ObjectId(user_data.to_user);
          
           let F_name  = await user_tbl.findById(fUser, 'name').exec();
           let to_name = await user_tbl.findById(toUser, 'name').exec();
    
    
           let whr1   = { "from_user": fUser ,"to_user": toUser};
           let whr    = { "from_user": fUser ,"to_user": toUser ,"date":date};
           let whrRow = { "from_user": fUser ,"to_user": toUser,date :{
    
    $gte: seven_dayDate } };
       
           let response = await rows_count(block_user_tbl,whrRow);   
            
           if(response>0){
               return res.status(200).send({"status":false,"msg":'This user Not unblocked befor 7 days  ' , "body":''}) ; 
           }else{
                       let datas = await block_user_tbl.find(whr1);
                               if(datas.length >0 ){ 
                                          var query = block_user_tbl.remove(whr1);
                                            query.exec((err, data) => { 
                                                       if (err) {  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;            
                                                   }else{     
                                                       let type_status = 1; 
                                                       let title = `${to_name.name} you have unblocked by ${F_name.name}`;  
                                                       let msg   = `${to_name.name} you have unblocked by ${F_name.name}`;  
                                        let demo = sendNotificationAdd({title,msg,type_status,"user_id":user_data.to_user,"module_id":user_data.from_user,"module_type":"profile",category_type:"block"}); 
                                        return res.status(200).send({"status":true,"msg":'this blocked user  Delete  Successfully' , "body":''  }) ; 
                                } });
                                   
                               }else{     
                           
                           
                       let add = new block_user_tbl(whr);
                       let respose = await add.save((err, data) => {
                   
                       
                       if (err) {  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;            
                               }else{   
                                   let type_status = 1; 
                                   let title = `${to_name.name} you have blocked by ${F_name.name}`;  
                                   let msg   = `${to_name.name} you have blocked by ${F_name.name}`;  
                                   
                                   let demo = sendNotificationAdd({title,msg,type_status,"user_id":user_data.to_user,"module_id":user_data.from_user,"module_type":"profile",category_type:"block"});
                                   
                               return res.status(200).send({"status":true,"msg":'this user blocked  Successfully' , "body":''  }) ; 
                       } });
                   
    
                       }
                   }
          
       } catch (error) {
           return res.status(200).send({"status":false,"msg":'no data add' , "body":''}) ;          
    
       }
     
    
    }

static verify_nickName = async(req,res)=>{
        let {user_id,nickname} = req.body;    
        console.log('user_id',user_id);
        console.log('nickname',nickname);
     let datas = await user_tbl.find({"u_name":nickname,_id:{ "$ne": user_id } }).countDocuments(); 
      
     // let datas = await user_tbl.find({"u_name":nickname,_id:{ "$ne": user_id } }).countDocuments();  
      
      
        if(datas >0 ){  console.log("datas == ",nickname); 
             return res.status(200).send({"status":true,"msg":'this nick name already exists ' ,body:datas}) ;            
                       }else{       
                       return res.status(200).send({"status":false,"msg":'No data found!..' }) ; 
                }            
                                 
            }
            
  static logout = async(req,res)=> {
        try{    let id = req.params.id;
                let token = gen_str(70);

            user_tbl.findByIdAndUpdate({_id:id} ,{$set: {'is_deleted':1,token:token}},{new: true}, (err,updatedUser)=>{
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors '}) ;          
            }
            if(isEmpty(updatedUser)){
                return res.status(200).send({"status":false,"msg":'Invalid user '}) ;  
            }else{
                          let dd = user_logs_add(id,'logout');  
                return res.status(200).send({"status":true,"msg":'User Deleted successfully' }) ;  
            }
        
                       });
           }catch (error) { return res.status(200).send({"status":false,"msg":'no data add'}) ; }
                   
      }     

      static update_facebook_id = async(req,res)=> {
        try{    let user_id  = req.body.user_id;
                let facebook_id = req.body.facebook_id;
     
            if(isEmpty(user_id) || isEmpty(facebook_id)){
                return res.status(200).send({"status":false,"msg":'All Field Required '}) ;       
            }

            user_tbl.findByIdAndUpdate({_id:user_id} ,{$set: {'facebook_id':facebook_id }},{new: true}, (err,updatedUser)=>{
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors '}) ;          
            }
            if(isEmpty(updatedUser)){
                return res.status(200).send({"status":false,"msg":'Invalid user '}) ;  
            }else{
                return res.status(200).send({"status":true,"msg":'Facebook_id add  successfully',"body":updatedUser }) ;  
            }
        
                       });
           }catch (error) { console.log(error);  return res.status(200).send({"status":false,"msg":'no data add' }) ; }
                   
      }     
      
        static user_settings = async(req,res)=> {
                    try{      let user_id      = req.body.user_id;
                                let music_sound  = req.body.music_sound;
                                let haptics      = req.body.haptics;
                                let chat         = req.body.chat;
                                let biometric    = req.body.biometric;
                                let notifications = req.body.notifications;
                                let follower = req.body.follower;
                                let firebase_token = req.body.firebase_token ;

                                music_sound = (music_sound == 1)? 1 : 0;
                                haptics     = (haptics == 1)? 1 : 0;
                                chat        = (chat == 1)? 1 : 0;
                                biometric   = (biometric == 1)? 1 : 0;
                                notifications = (notifications == 1)? 1 : 0;
                                follower       = (follower == 1)? 1 : 0;
                    
                                console.log("get all data ==  ",req.body);


                        user_tbl.findByIdAndUpdate({ _id:user_id} ,{$set: {music_sound,haptics,chat,biometric,notifications,follower,firebase_token }},{new: true}, (err,updatedUser)=>{
                        if(err) {  console.log(err);
                            return res.status(200).send({"status":false,"msg":'some errors '}) ;          
                        }
                        if(isEmpty(updatedUser)){
                            return res.status(200).send({"status":false,"msg":'Invalid user '}) ;  
                        }else{
                            return res.status(200).send({"status":true,"msg":'settings add  successfully',"body":updatedUser }) ;  
                        }
                    
                                });
                    }catch (error) { console.log(error);  return res.status(200).send({"status":false,"msg":'no data add' }) ; }
                            
                }     

     static get_content = async (req,res)=>{
                        try {
                                let c_type = req.params.type;
                                let sendData =  await content_tbls.findOne({type:c_type}).exec();
                                if(! isEmpty(sendData)){
                                    return res.status(200).send({status:true ,msg:"success",body:sendData});
                                }else{
                                    return res.status(200).send({status:false ,msg:"No Data FOund!.. "});
                                }
                        } catch (error) {  console.log(error); 
                            return res.status(200).send({status:false,msg: "some errors  "});
                        }
                
                
            }

             // get_autocomplete_users
   static get_autocomplete_users = async(req,res)=>{
                            try {
                                let name    = req.body.name;
                                if(isEmpty(name)){
                                   return  res.status(200).send({'status':false,'msg':"Name Field Required",'body':''});     
                                } 
   
                            let whr = { "name" :{ $regex: '.*' + name + '.*', $options: 'i' }} ;
                         let query =  user_tbl.find(whr).select("name").sort({_id:-1});
                            
                            const query2 =  query.clone();
                            const counts = await query.countDocuments();
                      const records = await query2.skip(0).limit(8);

                        res.status(200).send({'status':true,'msg':"success", 'body':records });

                        } catch (error) { console.log(error);
                        res.status(200).send({'status':false,'msg':error,'body':''});
                        }
}

  static  userFirebaseTokenUpdate = async(req,res)=>{
    try {
            let user_id = req.body.user_id;
            let firebase_token = req.body.firebase_token;
    
          if(isEmpty(user_id) || isEmpty(firebase_token) ){
               return res.status(200).send({"status":false,"msg":'no data add' }) ; 
            }
              
       let dds = user_tbl.findByIdAndUpdate({ _id:user_id},{$set: {firebase_token }},{new: true},
                                    (err,updatedUser)=>{ if(err) {  console.log(err); return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;
                                                                }else if (!isEmpty(updatedUser)){
                                                                    return res.status(200).send({"status":true,"msg":'Firebase Token update successfully' }) ;
                                                                  }else{
                                                                    return res.status(200).send({"status":false,"msg":'Invalid user' }) ;
                                                                  }});
                    } catch (error) {  console.log(error); 
                return res.status(200).send({"status":false,"msg":'Server error' }) ;
          }



  }          

  static user_profile_type_update = async(req,res)=>{
        try{  
            let user_id = req.params.id;
             let profile_type  = req.body.profile_type;   
             
             if(isEmpty(user_id) || isEmpty(profile_type)){
                         return res.status(200).send({"status":false,"msg":'All Field Required' }) ;
                 }
           user_tbl.findByIdAndUpdate({ _id:user_id},{$set: {profile_type }},{new: true},
                    (err,updatedUser)=>{ if(err) {  console.log(err); return res.status(200).send({"status":false,"msg":'something went wrong please try again' }) ;
                                                }else if (!isEmpty(updatedUser)){
                                                    return res.status(200).send({"status":true,"msg":'Profile type update successfully' }) ;
                                                  }else{
                                                    return res.status(200).send({"status":false,"msg":'Invalid user' }) ;
                                                  }});
                    } catch (error) {  console.log('user_profile_type_update fun call ==  ',error); 
                return res.status(200).send({"status":false,"msg":'Server error' }) ;
                }             

        }          
    
     
     static  userLenguageAdd =  async(req,res) =>{
            try {
                    let user_id = req.body.user_id;     let lenguage = req.body.lenguage;
                
             if(isEmpty(user_id) || isEmpty(lenguage)){
                    return res.status(200).send({"status":false,"msg":"All Field Required","body":''});
                } 

             let add = new userLanguage({user_id,lenguage});    
                let response =   await add.save();
                    if(isEmpty(response)){ console.log("sport err ==  ", err);  return res.status(200).send({"status":false,"msg":"something went wrong please try again","body":''});
                                }else{

                             let dxx = await userLanguage.updateMany({user_id,"_id" :{$ne :response._id }},{$set : {"active": false }});            


                         return res.status(200).send({"status":true,"msg":"user Language Add Successfully","body": response });
                     }
             

            } catch (error) { console.log(error); 
                return res.status(200).send({"status":false,"msg":"Server error ","body":''});  
            }     
         }


     static getUserLenguage = async(req,res) =>{
            try {
                    let user_id = req.params.id; 
                    let response    = await userLanguage.findOne({user_id,"active":true });
                    if(response){
                        return res.status(200).send({"status":true,"msg":" Success","body": response });
                
                    }else{
                        return res.status(200).send({"status":false,"msg":"No data Found1.." });
               
                    }
            } catch (error) {
                console.log(error); 
                return res.status(200).send({"status":false,"msg":"Server error ","body":''});  
            }     

            }   
            
    static userFollower_add = async (req,res)=>{
        try{
                    let follower_id=req.body.follower_id;
                    let following_id=req.body.following_id;
                    let follower_user_data=await user_tbl.find({_id:follower_id});
                    let following_user_data=await user_tbl.find({_id:following_id});
                    console.log({follower_user_data,following_user_data})
                    let date=getcurntDate()
                    if(isEmpty(follower_id)||isEmpty(following_id)){
                        return res.status(200).send({"status":false,"msg":"all field required","body":''});
                    }else{
            let check_rows =  await rows_count(follower_tbls,{follower_id,following_id}) ;     

        if(check_rows>0){
                    await follower_tbls.deleteOne({follower_id,following_id});
                    let type_status = 1; 
                    let title = `${following_user_data[0].name} you have unfollowed by ${follower_user_data[0].name}`;  
                    let msg   = `${following_user_data[0].name} you have unfollowed by ${follower_user_data[0].name}`;  
            let demo = sendNotificationAdd({title,msg,type_status,"user_id":following_id,"module_id":follower_id,"module_type":"profile",category_type:"unfollow"}); 
   
            return res.status(200).send({"status":false,"msg":"This user unfollowed"});        
          }else{            
          if(following_user_data[0].profile_type=="private"){
            let details={
                user_id:following_id,
                another_user_id:follower_id,
                
            }
            let obj=new request_tbl(details);
            let response= await obj.save();
            if(isEmpty(response)){
                  return res.status(200).send({"status":false,"msg":"something went wrong","body":''});        
            }
            else{
              let type_status = 1; 
              let title = `${following_user_data[0].name} you have received an following request by ${follower_user_data[0].name}`;  
              let msg   = `${following_user_data[0].name} you have received an following request by ${follower_user_data[0].name}`;  
              let demo = sendNotificationAdd({title,msg,type_status,"user_id":following_id,"module_id":follower_id,"module_type":"profile",category_type:"request"}); 

                return res.status(200).send({"status":true,"msg":"following request sent","body": response });
            }  
          }else{
          let obj=new follower_tbls({follower_id,following_id});
            let response= await obj.save();
            if(isEmpty(response)){
                  return res.status(200).send({"status":false,"msg":"something went wrong","body":''});        
            }
            else{
              let type_status = 1; 
              let title = `${following_user_data[0].name} you have followed by ${follower_user_data[0].name}`;  
              let msg   = `${following_user_data[0].name} you have followed by ${follower_user_data[0].name}`;  
          let demo = sendNotificationAdd({title,msg,type_status,"user_id":following_id,"module_id":follower_id,"module_type":"profile",category_type:"follow"}); 

                return res.status(200).send({"status":true,"msg":"user Followed Successfully","body": response });
            }
          }
        }
      }
    }catch(error) { console.log(error);
        return res.status(200).send({"status":false,"msg":"server error","body":''});
    }
    }   
      
      static follower_list = async (req,res)=>{
                try{
                          /// block_user_tbls
                let following_id=req.params.id;
                if(isEmpty(following_id)){
                    return res.status(200).send({"status":false,"msg":"all field required","body":''});
                }

                let blockIds = await myBlockUserIds(following_id);
                           console.log("follower_list  == ",blockIds );
                    let whr = (isEmpty(blockIds))? {following_id} : {following_id,follower_id :{$ne: blockIds }} ;

                    
                    let response= await follower_tbls.find(whr).populate("follower_id","name mobile email")
                    if(isEmpty(response)){  
                        return res.status(200).send({"status":false,"msg":"No data found!..","body":''});        
                    }        
                    else{
                        return res.status(200).send({"status":true,"msg":"data fetched","body": response });
                    }
                         
            }catch(error){ console.log(error);
                return res.status(200).send({"status":false,"msg":"server error","body":''});
            }
            }
        
     static following_list = async (req,res)=>{
                try{

                let follower_id=req.params.id;
                if(isEmpty(follower_id)){
                    return res.status(200).send({"status":false,"msg":"all field required","body":''});
                }

                let blockIds = await myBlockUserIds(follower_id);
                     console.log("blockIds == ",blockIds );

                let whr = (isEmpty(blockIds))? {follower_id} : {follower_id,following_id :{$ne: blockIds }} ;

                    let response= await follower_tbls.find(whr ).populate("following_id","name mobile email")
                    if(isEmpty(response)){
                        return res.status(200).send({"status":false,"msg":"No Data Found!..","body":''});        
                    }
                    else{
                        return res.status(200).send({"status":true,"msg":"data fetched","body": response });
                    }
                
            }catch{
                return res.status(200).send({"status":false,"msg":"server error","body":''});
            }
            }        

  static remove_follower = async (req,res)=>{
            try{
                        let follower_id=req.body.follower_id;
                        let following_id=req.body.following_id;
                        if(isEmpty(follower_id)||isEmpty(following_id)){
                            return res.status(200).send({"status":false,"msg":"all field required","body":''});
                        }
                
                let response =await follower_tbls.deleteOne({follower_id,following_id})
                if(isEmpty(response)){
                    return res.status(200).send({"status":false,"msg":"something went wrong","body":''});        
                }
                else{
                    return res.status(200).send({"status":true,"msg":"removed",});
                }
            
        }catch(error) { console.log(error);
            return res.status(200).send({"status":false,"msg":"server error","body":''});
        }
      }      

     static delete_user= async (req,res)=>{
           try{
                    let _id=req.params.id;
                    if(!isEmpty(_id)){
                        let response= await user_tbl.findOneAndDelete({_id})
                        let archiveData={
                            name: response.name,
                            doc_type: response.doc_type,
                            token: response.token,
                            city: response.city,
                            address: response.address,
                            user_language : response.user_language,
                            email: response.email,
                            otp: response.otp,
                            mobile: response.mobile,
                            gender: response.gender,
                            user_type: response.user_type, 
                            image: response.image, 
                            country :response.country,
                            date: response.date,   
                            active_status: response.active_status,     
                            email_status:response.email_status,
                            mobile_status: response.mobile_status,
                            device_id: response.device_id,
                            sport_preferences:  response.sport_preferences,
                            league_preference: response.league_preference,
                            team_preference:  response.team_preference,
                            player_preference:  response.player_preference,
                            u_name :  response.u_name,
                            status_msg :  response.status_msg,
                            seq_id : response.seq_id,
                            is_deleted : response.is_deleted,
                            facebook_id : response.facebook_id,
                            google_id  : response.google_id,
                            music_sound : response.music_sound,
                            haptics : response.haptics,
                            chat : response.chat,          
                            biometric  : response.biometric,
                            notifications : response.notifications, 
                            chatBlockStatus :response.chatBlockStatus,
                            firebase_token :  response.firebase_token,
                            profile_type : response.profile_type,  
                            points: response.points,
                            follower : response.follower,
                  
                        }
                        if(!isEmpty(response)){
                            let obj=new userArchive(archiveData);
                            let archive=await obj.save()
                            return res.status(200).send({"status":true,"msg":"this user account deleted","body":''});        
                        }else{
                            return res.status(200).send({"status":false,"msg":"Invalid user id "});
                        }
                    }else{
                        return res.status(200).send({"status":false,"msg":"userID required","body":''});
                    }
        
                }catch (error){
                    console.log(error);
                    return res.status(200).send({"status":false,"msg":"server error","body":''});
                }
            }

    static block_user_list = async (req,res)=>{
        try{
            let from_user=req.body.user_id
            let response=await block_user_tbl.find({from_user}).populate("to_user")
            if(response.length>0){
                return res.status(200).send({"status":true,"msg":"data found","body":response});
            }else{
                return res.status(200).send({"status":false,"msg":"no data found"})
            }
        }catch (err){
            console.log(err)
            return res.status(200).send({"status":false,"msg":"server error"});
        }
    }
     /// this function make by moh
    static user_mobile_email_update = async (req,res)=>{
        try{
        let _id=req.body.user_id;
        let new_email=req.body.email;
      
        let new_mobile=req.body.mobile;
          
        let userDetails= await user_tbl.find({"_id":_id});
        if(!isEmpty(new_email)){
            if(userDetails[0].email!=new_email){
                let data=await user_tbl.find({email:new_email});
                if(data.length==0){
                    let otp = Math.floor(Math.random() * 900000) + 100000;
                    let save=await user_tbl.findOneAndUpdate({_id},{$set:{otp:otp}},{new:true});
                    if(save){
                        let ddd = sentEmail({email:new_email,otp});
                        return res.status(200).send({status:true,msg:'otp sent to user email , please verify userself by otp'}); 
                    }else{
                        return res.status(200).send({status:false,msg:'something went wrong , please try again!!!'});
                    }
    
                }else{
                    return res.status(200).send({status:false,msg:'email already exist , please try with different email!!'});    
                }
    
            }else{
                return res.status(200).send({status:false,msg:'new email and old email matched'});
            }
    
        }else if(!isEmpty(new_mobile)){
            if(userDetails[0].mobile!=new_mobile){
                let data=await user_tbl.find({mobile:new_mobile});
                if(data.length==0){
                  //  let otp = Math.floor(Math.random() * 900000) + 100000;
                
                     let otp = await send_mobile_otp_new({"mobile":new_mobile});

                    let save=await user_tbl.findOneAndUpdate({_id},{$set:{otp:otp}},{new:true});
                    if(save){
                      return res.status(200).send({status:true,msg:'otp sent to your mobile , please verify userself by otp'}); 
                    }else{
                        return res.status(200).send({status:false,msg:'something went wrong , please try again!!!'});
                    }
    
                }else{
                    return res.status(200).send({status:false,msg:'mobile already exist , please try with different mobile!!'});    
                }
    
            }else{
                return res.status(200).send({status:false,msg:'new mobile and old mobile matched'});
            }
    
        }else{
            return res.status(200).send({status:false,msg:'please send the data which has to be update!!'}) ; 
        }
      }catch (error){
        console.log(error)
        return res.status(200).send({status:false,msg:'server error'}) ; 
      }
    
    }
    /// this function make by moh
    static verify_update_otp = async(req,res)=>{
        try {
          
            const _id    = req.body.user_id;
            const new_otp = req.body.otp;
            const new_email=req.body.email;
            const new_mobile=req.body.mobile;
          
            let otp_len = (new_otp || '').length;    let user_id_len = (_id || '').length;
         
            if(otp_len == 0 || user_id_len == 0){
                return res.status(200).send({"status":false,"msg":'All Field Required ' }) ;     
            }else{
                let userDetails =await user_tbl.find({"_id":_id});
                console.log(userDetails[0].otp)
                if(!isEmpty(new_email)){
                    if(userDetails[0].otp==new_otp){
                        let result=await user_tbl.findOneAndUpdate({"_id":_id},{$set:{email:new_email}},{new:true})
                        if(result){
                            return res.status(200).send({status:true,msg:'email updated',body:result});    
                        }else{
                            return res.status(200).send({status:false,msg:'something went wrong , please try again!!!'});
                        }
            
                    }else{
                        return res.status(200).send({status:false,msg:'incorrect otp'});
                    }
            
                }else if(!isEmpty(new_mobile)){
                    if(userDetails[0].otp==new_otp){
                        let result=await user_tbl.findOneAndUpdate({"_id":_id},{$set:{mobile:new_mobile}},{new:true})
                        if(result){
                            return res.status(200).send({status:true,msg:'mobile updated',body:result});    
                        }else{
                            return res.status(200).send({status:false,msg:'something went wrong , please try again!!!'});
                        }
            
                    }else{
                        return res.status(200).send({status:false,msg:'incorrect otp'});
                    }
            
                }else{
                    return res.status(200).send({status:false,msg:'please send the data which has to be update!!'}) ; 
                }
            }
            
    } catch (error) { console.log("some error is == ",error);
        return res.status(200).send({status:false,msg:'server error' }) ;          
    
    }
           
    
    }

    // static add_avatar = async (req,res)=>{
    //     try{
    //         console.log(req.files); 
    //         console.log(req.body.name); 
        
    //         let img = ((req.files) && (req.files.user_image != undefined ) && (req.files.user_image.length >0) )? req.files.user_image[0].filename : '';
    //     console.log('img ==', img); 
        
    //     }catch (error){
    //         console.log(error);
    //     return res.status(200).send({status:false,msg:'server error' }) ;          
    //     }
    // }
    static my_match_list = async (req,res)=>{
        try{
            let user_id=req.body.id
            if(isEmpty(user_id)){
                return res.status(200).send({"status":true,"msg":"userID required"});
            }else{
             let response=await play_match_cards_tbl.find({user_id}).populate("match_id","match_id match_name")
             
             let data=[]
            response.map((item)=>{
                if(data.length==0){
                    data.push(item);
                }
                data.map((i)=>{
                    if(item.match_id._id!=i.match_id._id){
                        data.push(item);
                    }
                })
            })
            if(response.length>0){
                return res.status(200).send({"status":true,"msg":"data found","body":data});
            }else{
                return res.status(200).send({"status":false,"msg":"no data found"})
            }
        }
        }catch (err){
            console.log(err)
            return res.status(200).send({"status":false,"msg":"server error"});
        }
    }

    static match_details_old = async (req,res)=>{
        try{
            let _id=req.body.id;
            let user_id=req.body.user_id;
               
            let condition_obj={};
            if(!isEmpty(_id)){condition_obj={...condition_obj,_id}}
             let response=await team_matches.find(condition_obj)
             let total_cards=await match_cards.find({"match_id":_id}).countDocuments()
             let total_played_cards=await play_match_cards_tbl.find({"match_id":_id,"user_id":user_id}).countDocuments()
            let transaction= await transaction_tbls.find({"match_id":_id,"user_id":user_id});
            let score=0;
            transaction.map((item)=>{
                score+=item.points;
            })
            console.log(score)
            if(response.length>0){
                return res.status(200).send({"status":true,"msg":"data found","body":response,total_cards,total_played_cards,score});
            }else{
                return res.status(200).send({"status":false,"msg":"no data found"})
            }
        
        }catch (err){
            console.log(err)
            return res.status(200).send({"status":false,"msg":"server error"});
        }
    }

    static match_details = async (req,res)=>{
        try{
            let _id=req.body.id;
            let user_id=req.body.user_id;
            let zone=req.body.zone;
               
            let condition_obj={};
            if(!isEmpty(_id)){condition_obj={...condition_obj,_id}}
             let response=await team_matches.find(condition_obj)
             console.log()
             let local=await getLocalDateTime({date_utc:response[0].date_utc,time_utc:response[0].time_utc,zone})
             response.map((item)=>{
                item.date_utc=local.local_date;
                item.time_utc=local.local_time;
             });
             
             let total_cards=await match_cards.find({"match_id":_id}).countDocuments()
             let total_played_cards=await play_match_cards_tbl.find({"match_id":_id,"user_id":user_id}).countDocuments()
            let transaction= await transaction_tbls.find({"match_id":_id,"user_id":user_id});
            let score=0;
            transaction.map((item)=>{
                score+=item.points;
            })
            if(response.length>0){
                return res.status(200).send({"status":true,"msg":"data found","body":response,total_cards,total_played_cards,score});
            }else{
                return res.status(200).send({"status":false,"msg":"no data found"})
            }
        
        }catch (err){
            console.log(err)
            return res.status(200).send({"status":false,"msg":"server error"});
        }
    }
    

    static update_google_id = async(req,res)=> {
        try{   
             let user_id  = req.body.user_id;
             let google_id = req.body.google_id;
     
            if(isEmpty(user_id) || isEmpty(google_id)){
                return res.status(200).send({"status":false,"msg":'All Field Required '}) ;       
            }

            user_tbl.findByIdAndUpdate({_id:user_id} ,{$set: {'google_id':google_id }},{new: true}, (err,updatedUser)=>{
            if(err) {  console.log(err);
                return res.status(200).send({"status":false,"msg":'some errors '}) ;          
            }
            if(isEmpty(updatedUser)){
                return res.status(200).send({"status":false,"msg":'Invalid user '}) ;  
            }else{
                return res.status(200).send({"status":true,"msg":'google_id add  successfully',"body":updatedUser }) ;  
            }
        
                       });
           }catch (error) { console.log(error);  return res.status(200).send({"status":false,"msg":'no data add' }) ; }
                   
      }     

      static sms_api_test = async (req, res) =>{
        try {
          let mobile=req.params.mobile;
        let data = await send_mobile_otp_new({mobile}); 
        console.log("otp new gen == ",data);       
       if(!isEmpty(data)){
            return res.status(200).send({ 'status': true, 'data': data  });
       }else{
          return res.status(200).send({ 'status': false, 'data': ''  });
       } 
          
         
////////////////////////////////////////////////
          
          
        } catch (error) {
          console.log(error);
          return res.status(200).send({ 'status': false, 'msg': error,  });
        }
      }


      static request_list= async (req,res)=>{
        try{
              let user_id=req.params.id;
              if(!isEmpty(user_id)){
                let request=await request_tbl.find({user_id})
                  if(!isEmpty(request)){
                      return res.status(200).send({"status":true,"msg":"success","body":request});        
                  }else{
                      return res.status(200).send({"status":false,"msg":"no request found "});
                  }
              }else{
                  return res.status(200).send({"status":false,"msg":"requestID required","body":''});
              }
      
          }catch (error){
              console.log(error);
              return res.status(200).send({"status":false,"msg":"server error","body":''});
          }
      } 

      static request_action= async (req,res)=>{
        try{
              let _id=req.body._id;
              let action=req.body.action;
              let date=getcurntDate()
              if(!isEmpty(_id)){
                let notification=await notification_tbl.findOneAndDelete({_id});
                console.log(notification)
                if(!isEmpty(notification)){
                    let following_id=notification.user_id;
                    let follower_id=notification.module_id;
                            
                    if(action=="accept"){
                      let details={
                        following_id,
                        follower_id,
                        
                      }
                      let follower = await user_tbl.findOne({_id:follower_id});
                      let following = await user_tbl.findOne({_id:following_id});
                      let obj = new follower_tbls(details);
                      let data = obj.save()
                      let request=await request_tbl.findOneAndDelete({user_id:following_id,another_user_id:follower_id});
                      let type_status = 1; 
                      let title = `${follower.name} your request has been accepted by ${following.name}`;  
                      let msg   = `${follower.name} your request has been accepted by ${following.name}`;  
                      let demo = sendNotificationAdd({title,msg,type_status,"user_id":follower_id,"module_id":following_id,"module_type":"profile",category_type:"follow"}); 
                     return res.status(200).send({"status":true,"msg":"request accepted"});        
                    }else{
                        let request=await request_tbl.findOneAndDelete({user_id:following_id,another_user_id:follower_id});
                      return res.status(200).send({"status":true,"msg":"request deleted"});
                    }
                  }else{
                      return res.status(200).send({"status":false,"msg":"no data found "});
                  }
              }else{
                  return res.status(200).send({"status":false,"msg":"all field required"});
              }
      
          }catch (error){
              console.log(error);
              return res.status(200).send({"status":false,"msg":"server error","body":''});
          }
      } 

 
}

  

module.exports = UserController ;      