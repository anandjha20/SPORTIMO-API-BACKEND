
const cron = require('node-cron');
const axios     = require("axios");
const  {MyBasePath} = require("./myModel/image_helper");
const {day_match_getID } = require("./myModel/Live_match_api_helper"); 



// match_card -8 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
     
      let response = await day_match_getID();
      let sumArr = [];
      let url = 'http://34.204.253.168:3000/open_api/get_card_008';
     // let url = 'http://localhost:3600/open_api/get_card_008';
     
  if(response){  
     

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling ==", sumArr );

  } catch(error) { console.log( "cronjob api calling server error  == ", error);
                  return false ; 
              }    

  });

//// match end result show function calling cronjob api 
cron.schedule('* * * * *', async (req,res) => {
        try {
        let response = await day_match_getID();
        let sumArr = [];
        let url = `http://34.204.253.168:3000/open_api/matchResult_show`;
        //let url = `http://localhost:3600/open_api/matchResult_show`;
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

  
   //////////////////////////////////////

// match_card -3 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
          try {
            
              let response = await day_match_getID();
              let sumArr = [];
          
              let url = 'http://34.204.253.168:3000/open_api/get_card_03';
             // let url = 'http://localhost:3600/open_api/get_card_03';
            
       if(false ){ //   if(response){  
            

          let allData =  await Promise.all( response.map( async (item)=>{
                  var config = { method: 'get',url: url ,data: {"match_id" :item } };
                    console.log("match_id == ",item);       
                  let resp = await axios(config);
                  sumArr.push(resp.data);
              })) ;      
              }
              console.log("cronjob api calling card -3 ==", sumArr );

          } catch(error) { console.log( "cronjob api calling card-3 server error  == ", error);
                          return false ; 
                      }    

          });


// match_card -6 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_06';
     // let url = 'http://localhost:3600/open_api/get_card_06';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling card -6 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-6 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -09 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_09';
    //  let url = 'http://localhost:3600/open_api/get_card_09';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling card -9 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-9 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -16 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_16';
     // let url = 'http://localhost:3600/open_api/get_card_16';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling card -16 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-16 server error  == ", error);
                  return false ; 
              }    

  });


// match_card -18 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_18';
     // let url = 'http://localhost:3600/open_api/get_card_18';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);  
      })) ;      
      }
      console.log("cronjob api calling card -22 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-22 server error  == ", error);
                  return false ; 
              }    

  });




// match_card -19 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_19';
     // let url = 'http://localhost:3600/open_api/get_card_19';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling card -19 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-19 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -22 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://34.204.253.168:3000/open_api/get_card_22';
     // let url = 'http://localhost:3600/open_api/get_card_22';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
            console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      console.log("cronjob api calling card -22 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-22 server error  == ", error);
                  return false ; 
              }    

  });












