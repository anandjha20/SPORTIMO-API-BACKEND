 var axios = require('axios');
 
const send_noti = (tokens2,title,msg)=>{
    var serverKey = 'AAAAbNzLTl4:APA91bEcbPDTEwzTLUZSnPYiDoIhYOI4Jnb_v0OvNNg1tttjZpEJWKi9gMz5csQC6bx1nKz8rPpPRl_Klo_TpioQMA9C8OEkFFlZX8F9Ra7UhS4uwrC3k_w6SOgd-a9wKZfgxM2Naiaa';
     
    let tokens = ["eUKliRKtQhiVQ9mDmL8fE4:APA91bHcu4JzutxRYyHb7D4N616LlWmTeuxrPMrIrWzTJjpwGUHbr3yfQrSE0e_WRqzwuY7o0wHxBxcAW1j5atVQlZWhVSwGMrZuswipvgbJGpwiGLmrXhkypEsvz47p31F8tPp_O4jU"];
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


module.exports = {send_noti }