 const  axios = require('axios');
 const {isEmpty,getcurntDate,rows_count }  = require("./common_modal");   

 const user_tbl = require('../models/user');    
 
const send_noti = (tokens,title,msg)=>{
    var serverKey = 'AAAAbNzLTl4:APA91bEcbPDTEwzTLUZSnPYiDoIhYOI4Jnb_v0OvNNg1tttjZpEJWKi9gMz5csQC6bx1nKz8rPpPRl_Klo_TpioQMA9C8OEkFFlZX8F9Ra7UhS4uwrC3k_w6SOgd-a9wKZfgxM2Naiaa';
     
    let tokens2 = ["eUKliRKtQhiVQ9mDmL8fE4:APA91bHcu4JzutxRYyHb7D4N616LlWmTeuxrPMrIrWzTJjpwGUHbr3yfQrSE0e_WRqzwuY7o0wHxBxcAW1j5atVQlZWhVSwGMrZuswipvgbJGpwiGLmrXhkypEsvz47p31F8tPp_O4jU"];
                 let url = 'https://fcm.googleapis.com/fcm/send';
           
                
var notification = {
     'title': title,
     'text': msg,
     'message':msg
   };       
var notification_body = {
     'notification': notification,
           'registration_ids': tokens
   }
            axios({
                    method: "post",
                    url:  url,
                    data: JSON.stringify(notification_body),
                    headers: { "Content-Type": "application/json", "Authorization": 'key='+serverKey },
               })
                    .then(function (response) {
                    //handle success
                    console.log(response.data);
                    console.log("user ids == ",response.data.results);
                    })
                    .catch(function (response) {
                    //handle error
                    console.log(response);
                    });        


}

const get_sportsUserToken = async(sports)=>{
       if(isEmpty(sports)){  return []; }
       let my_sports = sports.split(",");
       console.log("my_sports == ", my_sports);
       
       let like_som =  await Promise.all( my_sports.map( async (item)=>  { 
              let newData = await user_tbl.find({sport_preferences: { $regex: '.*' + item + '.*', $options: 'i' }}).select("firebase_token");
             
        let newss = (newData.length>0)? newData.filter((row,index)=> row.firebase_token != '' ):[]; 
                return newss ; }));
    
      let sendToken = []; 
          if(like_som.length>0 ){ 
               like_som.map( (row_2)=> {
                                          if(row_2.length > 0){
                                        row_2.map((sum)=>{ sendToken.push (sum.firebase_token);
                                        }); 
                  
                           } }) }  

           return sendToken;                 

}


const get_preferenceUserToken = async(preference,preference_name)=>{
     if(isEmpty(preference)){  return []; }
     let my_sports = preference.split(",");
      console.log("my_sports == ", my_sports);
     
     let like_som =  await Promise.all( my_sports.map( async (item)=>  { 
            let newData = await user_tbl.find({preference_name: { $regex: '.*' + item + '.*', $options: 'i' }}).select("firebase_token");
           
      let newss = (newData.length>0)? newData.filter((row,index)=> row.firebase_token != '' ):[]; 
              return newss ; }));       
  
    let sendToken = []; 
        if(like_som.length>0 ){ 
             like_som.map( (row_2)=> {
                                        if(row_2.length > 0){
                                      row_2.map((sum)=>{ sendToken.push (sum.firebase_token);
                                      }); 
                
                         } }) }  

         return sendToken;                 

}




module.exports = {send_noti,get_preferenceUserToken }