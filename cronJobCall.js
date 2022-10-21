
const cron = require('node-cron');
const axios     = require("axios");
// cronJob setup functin call 

// cron.schedule('* * * * *', async () => {
//     try {   
//           let response = await axios.get("http://34.204.253.168:3600/open_api/get_card_008");
//             if(response){
//                     console.log(" cronjob api calling ==",response.data ) ;          
                
//                 }else{  
//                         console.log(" cronjob api calling errors " ) ;  
//                 }    
//           } catch (error) { console.log( "cronjob api calling  server error  == ", error);
//                         return false ; }
//                     });
  