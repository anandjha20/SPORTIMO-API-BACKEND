const cron = require('node-cron');
const axios     = require("axios");
const {day_match_getID,day_match_getID_test } = require("./myModel/Live_match_api_helper"); 
const {before_after_Date} = require('./myModel/common_modal')


// match_card -8 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
     
      let response = await day_match_getID();
      console.log("day_match_getID===",response)
      let sumArr = [];
      let url = 'http://100.26.5.179:3000/open_api/get_card_008';
     // let url = 'http://localhost:3600/open_api/get_card_008';
     
  if(response){  
     

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      //console.log("cronjob api calling ==", sumArr );

  } catch(error) { console.log( "cronjob api calling server error  == ", error);
                  return false ; 
              }    

  });

//// match end result show function calling cronjob api 
cron.schedule('* * * * *', async (req,res) => {
        try {
        let response = await day_match_getID();
        let sumArr = [];
        let url = `http://100.26.5.179:3000/open_api/matchResult_show`;
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

// match_card -21 calling conjon
 cron.schedule('* * * * *', async (req,res) => {
  try {
   
     let response = await day_match_getID();
     let sumArr = [];
 
     let url = 'http://100.26.5.179:3000/open_api/get_card_21';
    // let url = 'http://localhost:3600/open_api/get_card_21';
   
 if(response){  
   

 let allData =  await Promise.all( response.map( async (item)=>{
         var config = { method: 'get',url: url ,data: {"match_id" :item } };
          // console.log("match_id == ",item);       
         let resp = await axios(config);
         sumArr.push(resp.data);
     })) ;      
     }
     //console.log("cronjob api calling card -3 ==", sumArr );

 } catch(error) { console.log( "cronjob api calling card-3 server error  == ", error);
                 return false ; 
             }    

   });

// match_card -02 calling conjon
cron.schedule('* * * * *', async (req,res) => {
   try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_02';
     // let url = 'http://localhost:3600/open_api/get_card_03';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      //console.log("cronjob api calling card -3 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-3 server error  == ", error);
                  return false ; 
              }    

  });


// match_card -3 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
          try {
            
              let response = await day_match_getID();
              let sumArr = [];
          
              let url = 'http://100.26.5.179:3000/open_api/get_card_03';
             // let url = 'http://localhost:3600/open_api/get_card_03';
            
      if(response){  
            

          let allData =  await Promise.all( response.map( async (item)=>{
                  var config = { method: 'get',url: url ,data: {"match_id" :item } };
                  //  console.log("match_id == ",item);       
                  let resp = await axios(config);
                  sumArr.push(resp.data);
              })) ;      
              }
             // console.log("cronjob api calling card -3 ==", sumArr );

          } catch(error) { console.log( "cronjob api calling card-3 server error  == ", error);
                          return false ; 
                      }    

          });


// match_card -6 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_06';
     // let url = 'http://localhost:3600/open_api/get_card_06';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
      //console.log("cronjob api calling card -6 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-6 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -09 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_09';
    //  let url = 'http://localhost:3600/open_api/get_card_09';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
         //   console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
    //  console.log("cronjob api calling card -9 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-9 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -16 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_16';
     // let url = 'http://localhost:3600/open_api/get_card_16';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
    //  console.log("cronjob api calling card -16 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-16 server error  == ", error);
                  return false ; 
              }    

  });


// match_card -18 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_18';
     // let url = 'http://localhost:3600/open_api/get_card_18';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);  
      })) ;      
      }
    //  console.log("cronjob api calling card -22 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-22 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -19 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_19';
     // let url = 'http://localhost:3600/open_api/get_card_19';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
    //  console.log("cronjob api calling card -19 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-19 server error  == ", error);
                  return false ; 
              }    

  });

// match_card -22 calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/get_card_22';
     // let url = 'http://localhost:3600/open_api/get_card_22';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'get',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
    //  console.log("cronjob api calling card -22 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-22 server error  == ", error);
                  return false ; 
              }    

  });

// update_live_match_data_by_match_id - calling conjon
cron.schedule('* * * * *', async (req,res) => {
              
  try {
    
      let response = await day_match_getID();
      let sumArr = [];
  
      let url = 'http://100.26.5.179:3000/open_api/update_live_match_data_by_match_id';
     // let url = 'http://localhost:3600/open_api/update_live_match_data_by_match_id';
    
  if(response){  
    

  let allData =  await Promise.all( response.map( async (item)=>{
          var config = { method: 'post',url: url ,data: {"match_id" :item } };
          //  console.log("match_id == ",item);       
          let resp = await axios(config);
          sumArr.push(resp.data);
      })) ;      
      }
    //  console.log("cronjob api calling card -22 ==", sumArr );

  } catch(error) { console.log( "cronjob api calling card-22 server error  == ", error);
                  return false ; 
              }    

  });



//for after 15 days update_match_data_by_date  calling conjon
cron.schedule('0 0 * * *', async (req,res) => {
  try {
    let date = await before_after_Date(15)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

       console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });

//for after 1 days update_match_data_by_date  calling conjon
cron.schedule('1 0 * * *', async (req,res) => {
  try {
    let date=await before_after_Date(1)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

   //    console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });
//for after 2 days update_match_data_by_date  calling conjon
cron.schedule('2 0 * * *', async (req,res) => {
  try {
    let date=await before_after_Date(2)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

//console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });
//for after 3 days update_match_data_by_date  calling conjon
cron.schedule('3 0 * * *', async (req,res) => {
  try {
    let date=await before_after_Date(3)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

   //    console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });

//for after 4 days update_match_data_by_date  calling conjon
cron.schedule('4 0 * * *', async (req,res) => {
  try {
    let date=await before_after_Date(4)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

    //   console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });
//for after 5 days update_match_data_by_date  calling conjon
cron.schedule('5 0 * * *', async (req,res) => {
  try {
    let date=await before_after_Date(5)
         let url = 'http://100.26.5.179:3000/open_api/update_match_data_by_date';
    // let url = 'http://localhost:3600/open_api/update_match_data_by_date';
            
      var config = { method: 'post',url: url ,data: {date} };
       let resp = await axios(config);

    //   console.log("update_match_data_by_date is call  ==", resp );
    } catch(error) { console.log( "cronjob api calling update_match_data_by_date rror == ", error);
                 return false ; 
             }    
              
   });





//// poll result show function calling cronjob api 
cron.schedule('* * * * *', async (req,res) => {
  try {
  let response = await day_match_getID();
  let sumArr = [];
  let url = `http://100.26.5.179:3000/open_api/poll_result_show`;
  //let url = `http://localhost:3600/open_api/poll_result_show`;
  if(response){  
  let allData =  await Promise.all( response.map( async (item)=>{
  var config = { method: 'get',url: url ,
  data: {"match_id" :item } };
  let resp = await axios(config);
  sumArr.push(resp.data);
  })) ;      
  }
  //console.log("match poll result ==", sumArr );

  } catch(error) { console.log( "cronjob api calling server error  == ", error);
            return false ;  }    

  });




