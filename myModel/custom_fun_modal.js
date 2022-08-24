const syncSql = require('sync-sql');
const config = require('../database/sync_sql.js');
var axios = require('axios');


const order_details =  (order_id) =>{
      
        let query = `SELECT a.item_id,a.quantity,a.buy_type,a.price,a.coin,b.p_name,b.images FROM order_details as a join product_tbl as b on a.product_id = b.product_id WHERE a.order_id = '${order_id}'`;
        let response =   syncSql.mysql(config,query).data.rows;

       if(response.length>0)
       {
   
             let resData =  response.map((item)=>{
                  if(item.images.length >0){
                           let  myArray = item.images.split(",");
                          item.images = (myArray)? `http://13.127.139.220:5200/image/assets/product/${myArray[0]}`:'';
                        }   
                   // item.buy_type = (item.buy_type == 1)?'Money': ((item.buy_type == 2)? "coin":'' );

               return item;        
           }) 
                return resData;
        }else{
                return [];    
           }
     
 }
 
const send_noti_2 = (tokens,title,msg)=>{

  
     var serverKey = 'AAAALvZiuLA:APA91bExJt5QIxnFB3us9mxP6xxKM-Pojrjeg-GnK_lD9hJat0SnL-Rm0Q4qPTq1glHEquDB-_9Xf00Gy7eYycAIKDFgYxqq4k-ajCScFHN0tDkCUYItDTynpzNQH57uHrO7awRKv9aN';
    // var fcm = new FCM(serverKey);
   
//    let tokens = ["fUSOM-T_REWBvMaOXFOW5b:APA91bFFM04ZFg9Hvb0agEpgqouppRxUpDIYvOtyvgacp11TDhi9WCtL64Ur3WV7heXQWFbqFwiyd_vurSQRF-Zgkqq3oPXmg75iiBVtMwyJ64xlDLDQ8l4IJX2XLHfZni-Lx6RneVFx",
//                    "dxYuTRFeT_-rudERjonzuy:APA91bGTgPh8QjvziC1kzCxetbDVVxq-nyvu-TqMNFtz-yqnaW2AjBs0mzfxNk4BON2JMZR9AiCa4d2kwr1uvDU1OllNeWQFdrockIF4IP9cVvtEXIxtMyhtBex_M2rWf0wPtDK-8FuL",
//                  "czjKWAiTSSmM-q_Mr4an77:APA91bGNX87c7mBSNmkTdnTDnHmAKsTJCQqErYEVSd4Qzze6eWGZlysSMT2r8DbysD7PJhwBbxPpBLe-WUVHaa3sl0mXhjy0MO9vnBSKXVV848X8prtzfVx-GLJYwzK3iGvE-vF9OpwF" ];  
   
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

const get_game_level = (users)=>{
     let i = 1;
     let text = "";
     while (users) {
                 let a = users/9;
                   a = Math.ceil(a);
                    console.log('loop room =='+a);
                   users = a*3
                     console.log('loop user =='+users);
                             
           if(a == 1){  break;  }  
           i++;       
          }  
      return i;                              
                          
   
}            

module.exports = { order_details,send_noti_2,get_game_level}