var mongoose = require('mongoose');
const local_default = require('./local_default.json')
//mongoose.connect('mongodb://localhost:27017/football_db');
//mongoose.connect('mongodb://root:rootadmin@mbc-dev-sportsapp.cluster-ca4ypuzoojjz.us-east-1.docdb.amazonaws.com:27017/sportimo?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',{tlsCAFile: `rds-combined-ca-bundle.pem`});
mongoose.connect(`mongodb://admin:root@13.127.63.71:27017/sportimo?authSource=admin`);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log("mongodb database connected");

});

exports.test = function(req,res) {
  res.render('test');
};

























































































































































































































































































































































