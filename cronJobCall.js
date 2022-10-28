
const cron = require('node-cron');
const axios     = require("axios");
const  {MyBasePath} = require("./myModel/image_helper");
const {day_match_getID } = require("./myModel/Live_match_api_helper"); 

// cronJob setup functin call 

   cron.schedule('* * * * *', async (req,res) => {
              
                    try {
                       
                        let response = await day_match_getID();
                        let sumArr = [];
                        let url = 'http://34.204.253.168:3000/open_api/get_card_008';
                    if(response){  
                    let allData =  await Promise.all( response.map( async (item)=>{
                            var config = { method: 'get',url: url ,data: {"match_id" :item } };

                            let resp = await axios(config);
                            sumArr.push(resp.data);
                        })) ;      
                        }
                        console.log("cronjob api calling ==", sumArr );

                    } catch(error) { console.log( "cronjob api calling server error  == ", error);
                                    return false ; 
                                }    
       
                    });
  

// match end result show function calling cronjob api 
cron.schedule('* * * * *', async (req,res) => {
       try {
            let response = await day_match_getID();
            let sumArr = [];
            let url = `http://34.204.253.168:3000/open_api/matchResult_show`;
            if(response){  
            let allData =  await Promise.all( response.map( async (item)=>{
                var config = { method: 'get',url: url ,
                data: {"match_id" :item } };
              let resp = await axios(config);
                sumArr.push(resp.data);
            })) ;      
            }
             console.log("match end result ==", sumArr );

         } catch(error) { console.log( "cronjob api calling server error  == ", error);
                             return false ;  }    

    });