require('dotenv').config();
    
       
const express = require('express');
const app = express();
const userRoute    = require('./routes/userRoute');
const AdminRoute   = require('./routes/AdminRoute');
const image_urls   = require('./routes/image_urls');
const cronJobRoutes = require("./routes/cronJobRoute");
const Port = process.env.Port || 3600; 
//const Port =  3700; 
const cors = require('cors'); 
var bodyParser = require('body-parser');
  
const config = require("./config");

const path = require('path');
app.use(cors());  
var jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/',userRoute);   
app.use('/web_api/',AdminRoute);

app.use('/image/',image_urls);

app.use("/open_api/",cronJobRoutes);

app.get('/demo/v2/', (req,res)=>{
  return res.status(200).send({"status":true,"msg":'user address already exists ' , "body":''}) ;          

      
});

app.use((req,res)=>{
  res.status(404).send("<h1 style = 'color:red;text-align: center;margin-top: 12%;'> 404 Page Not Found!..</h1>"); 
 } );


// 

app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`)
})