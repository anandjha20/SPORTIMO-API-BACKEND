const express = require('express');
const app = express();
const port = process.env.port || 3600;
const userRoute = require('./routes/userRoute');
const AdminRoute = require('./routes/AdminRoute');
const image_urls = require('./routes/image_urls');

const cors = require('cors'); 
var bodyParser = require('body-parser');
                     
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/football_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log("mongodb database connected");
});
                
exports.test = function(req,res) {
  res.render('test');
};
   

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

app.get('/demo/v2/', (req,res)=>{
  return res.status(200).send({"status":true,"msg":'user address already exists ' , "body":''}) ;          


});

app.use((req,res)=>{
  res.status(404).send("<h1 style = 'color:red;text-align: center;margin-top: 12%;'> 404 Page Not Found!..</h1>"); 
 } );


// 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})