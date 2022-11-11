 const  axios = require('axios');
 const {isEmpty,getcurntDate,rows_count,ArrChunks }  = require("./common_modal");   

 const user_tbl = require('../models/user');    
 const poll_result_tbl = require('../models/poll_result');    


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
                                      row_2.map((sum)=>{ if(sum.firebase_token != null){sendToken.push (sum.firebase_token); }  //firebase_token
                                      }); 
                
                         } }) }  

         return sendToken;                 

}

const UniqueArrayFun = async(myArray)=>{
     console.log(['joe', 'jane', 'mary'].includes('jane'));
     let   uniqueArrays =[]
     if(isEmpty(myArray)){ return []; }

      myArray.map((elem, pos)=> { if(! uniqueArrays.includes(elem)){ uniqueArrays.push(elem)   } });
      return  await uniqueArrays;
}

const send_poll_notification = async (req,res)=>{
     try {
          
               let sports = req.sports;  let leagues = req.leagues;
               let teams = req.teams;    let players = req.players;
               let title = req.title;    let details = req.details;
           /// get all user token get 
               let sport_preferences = await get_preferenceUserToken(sports,'sport_preferences');
               let league_preference = await get_preferenceUserToken(leagues,'league_preference');
               let team_preference   = await get_preferenceUserToken(teams,'team_preference');
               let player_preference = await get_preferenceUserToken(players,'player_preference');
               
               let myobj = {sport_preferences,league_preference,team_preference,player_preference}
              
               let bigArr = [];
           /// preferences check empty token array
               if(! isEmpty(sport_preferences)){ bigArr = [ ...bigArr,...sport_preferences ] }
               if(! isEmpty(league_preference)){ bigArr = [...bigArr, ...league_preference ] }
               if(! isEmpty(team_preference)){ bigArr = [ ...bigArr,...team_preference ] }
               if(! isEmpty(player_preference)){ bigArr = [...bigArr, ...player_preference ] }
         
           // check uniq array token      
               let new_arr = await  UniqueArrayFun(bigArr);
                   //console.log(" fun call  == ",new_arr);  
           
           // array  Chunks small array      
            const  arrPairs = await ArrChunks(new_arr,3);
               /// console.log(" arrPairs fun call  == ",arrPairs);
         
            /// ArrChunks  loop run and send notification            
               if(arrPairs.length > 0){
                    console.log("arrPairs == ",arrPairs);
                       arrPairs.map((chunkarr,i)=>{
                                   console.log("notication loop run no == ",i);
                              send_noti(chunkarr,title,details);
                         }) }

    } catch (error) { console.log("send_poll_notification errr  == ",error); }
}

const userSentNotification =  async(req,res)=>{
        try {
          
               let user_id = req.user_id; 
               let title = req.title;    
               let details = req.details;   
               let userData = await user_tbl.findOne({"_id":user_id},"firebase_token");
               console.log("send_USER_notificatioN  == ",req);
                    if(! isEmpty(userData)){
                         //let title = 'Admin has replied to your complaint';   
                       //  let details = 'Admin has replied to your complaint';  
                              send_noti([userData.firebase_token],title,details);
                    }



          } catch (error) { console.log("send_poll_notification errr  == ",error); }

}


const pollDisclosed_noti_fun = async(req)=>{
     try {    
               let poll_id = req.poll_id;
               let title   = req.title;       //  'Your poll result Disclosed';  
               let details = req.details;    //  'Admin has replied to your complaint';    
        
           let data = await poll_result_tbl.find({'poll_id':poll_id}).populate({path: "user_id",select:['firebase_token']}).exec();
           let allTokens = []; 

            if( ! isEmpty(data)){ data.map((item)=>{ if(! isEmpty(item.user_id)){ allTokens.push(item.user_id.firebase_token)}
                         }); }

         const  arrPairs = await ArrChunks(allTokens,1);
         if(arrPairs.length > 0){
           console.log("arrPairs == ",arrPairs);
              arrPairs.map((chunkarr,i)=>{
                          console.log("notication loop run no == ",i);
                     send_noti(chunkarr,title,details);
                }) }
       return true;             
      } catch (error) { console.log(error);  return false; }
      
}



module.exports = {send_noti,get_preferenceUserToken,send_poll_notification,UniqueArrayFun,userSentNotification,pollDisclosed_noti_fun}