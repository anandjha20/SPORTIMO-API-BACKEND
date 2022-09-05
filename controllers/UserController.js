    let  express_2 = require('express');
    let mongoose = require('mongoose');
    


  
const { sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty,user_logs_add,FulldateTime } = require('../myModel/common_modal');
const { autoincremental } = require('../myModel/helper_fun');  

  
  
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


    static registration = async(req,res)=>{
        try {  
            let  mobile = req.body.mobile;      let email     = req.body.email;
            let address = req.body.address;     let user_type = req.body.user_type;
            let name    = req.body.name;        let device_id = req.body.device_id;
             // let gender    = req.body.gender;
            
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
                let add =new user_tbl({ user_type, date,device_id,token,otp,seq_id });
    
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


    let checkuser = ( user_type == 2 || user_type == 3 || user_type == 4 )? await user_tbl.find({email }).exec() : await user_tbl.find({mobile }).exec() ;
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
                 seq_id : seq_id
                  
            });             

           
                    let allsaveData =  await add.save();
                      

                if(user_type == 1){
                    send_mobile_otp({mobile,otp}); 
                    msgtodiv = 'otp sent to your mobile please check know ';
                }else  if(user_type == 2 || user_type == 3 || user_type == 4 ){
                    sentEmail({email,otp}); 
                    msgtodiv = 'otp sent to your Email please check know ';
                }  
                    console.log('add == ', add); 
                 return res.status(200).send({"status":true,"msg": msgtodiv , "body":add._id }) ;      

        } catch (error) { console.log(error);
            return res.status(200).send({"status":false,"msg":'no data add ' }) ;          
               
        }           
      

    }

static resend_otp_2 = async(req,res) =>{
    let otp = Math.floor(Math.random() * 900000) + 100000; 
    user_tbl.findByIdAndUpdate(req.params.id,{$set:{otp:otp}},{new:true}).then((docs)=>{
        if(docs) {
        
            let msgtodiv = '';
            if(docs.user_type == 1){
                let mobile = docs.mobile;
                let ddd =  send_mobile_otp({mobile,otp}); 
                 msgtodiv = 'otp sent to your mobile please check know';
            }else{
                let email = docs.email;
                let ddd =   sentEmail({email,otp});
  
                  msgtodiv = 'otp sent to your Email please check know';
            }


         return res.status(200).json({
            msg:msgtodiv,
            status: true,
          
        });
          


        } else {
        

          return res.status(200).json({
            title: "no such user exist",
            error: true,
            details: err
        });

        }
     }).catch((err)=>{
        return res.status(200).json({
            title: "Error occured while adding question.",
            error: true,
            details: err
        });
     })

    }           

static verify_otp = async(req,res)=>{
    try {
        let user_id    = req.body.user_id;
        let otp    = req.body.otp;
        
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
  let ddsq = user_logs_add(person._id,'login');  
  if(person.otp == otp){
    return res.status(200).send({"status":true,"msg":'Success' , "body": person }) ;     
  }else{  console.log(person); 
    return res.status(200).send({"status":false,"msg":'Invalid otp'}) ;     
  }

  });

} catch (error) { console.log("some error is == ",error);
    return res.status(200).send({status:false,msg:'some error' , "body":''}) ;          

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

var query = user_tbl.findOne({ '_id': user_id});




query.exec(function (err, person) {
  if (err){
                 return res.status(200).send({"status":false,"msg":'Invalid User' }) ; 
             }else{
            
                if (!isEmpty(person)){
                    person.image = (person.image == '')? '': "http://localhost:3600/image/assets/user_img/"+ person.image ;      
                    person.block_status = checkusers;
                }
              
                return res.status(200).send({"status":true,"msg":'Success' , "body": person,'blockuser':checkusers }) ;  
      } });


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

        let  country = req.body.country;   
        let  sport_preferences = req.body.sport_preferences; 
        let  league_preference = req.body.league_preference; 
        let  team_preference = req.body.team_preference;        
        let  device_id = req.body.device_id;    
        let  player_preference = req.body.player_preference;    
         
          let name_len = (name || '').length;      let country_len = (country || '').length;  
          let sport_preferences_len = (sport_preferences || '').length;
          let league_preference_len = (league_preference || '').length;
          let team_preference_len = (team_preference || '').length;
          let id_len = (id || '').length;
          let player_preference_len = (player_preference || '').length;
              
          if( id_len == 0 || sport_preferences_len == 0 || league_preference_len == 0 || team_preference_len == 0 || player_preference_len == 0  ){ 
            return res.status(200).send({"status":false,"msg":'All Field Required ' , "body":''}) ;     
        }

      //  let token = gen_str(99);

        let num = Math.floor(Math.random() * 9000) + 1000; 
        let date = getcurntDate(); 
      //  let newName = name.replaceAll( " ", '') ;
        
        let newName = name.replace(/ /g,"-");  
        let myobjs = {
            name: name,
            device_id: device_id,
            country : country,
            sport_preferences: sport_preferences,
            league_preference:league_preference,
            team_preference: team_preference,
            player_preference: player_preference,
            u_name :nickname ,  
       
            status_msg : status_msg,
            gender : gender,  
        };
    if(img){ myobjs.image = img }
///////////////////////////////////////////////////////////////////////////////      
user_tbl.findOneAndUpdate({_id: id},{$set : myobjs},{new: true}, (err, updatedUser) => {
    if(err) {  console.log(err);
        return res.status(200).send({"status":false,"msg":'some errors ' , "body":''}) ;   
    }
    
      if(!isEmpty(updatedUser)){
     updatedUser.image = (updatedUser.image == '')? '': "http://localhost:3600/image/assets/user_img/"+ updatedUser.image ;
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

   
static block_user_add = async(req,res)=>{

    try {

        let user_data = req.body;
    

      let from_user_len = (user_data.from_user || '').length;
      let to_user_len = (user_data.to_user || '').length;

if(from_user_len == 0 || to_user_len == 0  ){
    return res.status(200).send({"status":false,"msg":'All filed Required' , "body":''}) ; 

}         
        let date = getcurntDate();
        let fUser = mongoose.Types.ObjectId(user_data.from_user);
        let toUser = mongoose.Types.ObjectId(user_data.to_user);
       
        let whr1 = { "from_user": fUser ,"to_user": toUser};
        let whr = { "from_user": fUser ,"to_user": toUser ,"date":date};
        
      
      
      let datas = await block_user_tbl.find(whr1);
            if(datas.length >0 ){ 
                     var query = block_user_tbl.remove(whr1);
                                query.exec((err, data) => { 
                                    if (err) {  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;            
                                }else{       
                                return res.status(200).send({"status":true,"msg":'this blocked user  Delete  Successfully' , "body":''  }) ; 
                         } });
                            

            }else{     
         
         
     let add = new block_user_tbl(whr);
     let respose = await add.save((err, data) => {
   
    
      if (err) {  return res.status(200).send({"status":false,"msg":'An error occurred' , "body": ''}) ;            
            }else{       
            return res.status(200).send({"status":true,"msg":'this user blocked  Successfully' , "body":''  }) ; 
     } });


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
                   
                    music_sound = (music_sound == 1)? 1 : 0;
                    haptics     = (haptics == 1)? 1 : 0;
                    chat        = (chat == 1)? 1 : 0;
                    biometric   = (biometric == 1)? 1 : 0;
                    notifications = (notifications == 1)? 1 : 0;
          
                    console.log("get all data ==  ",req.body);


            user_tbl.findByIdAndUpdate({ _id:user_id} ,{$set: {music_sound,haptics,chat,biometric,notifications }},{new: true}, (err,updatedUser)=>{
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



}
       

module.exports = UserController ;      