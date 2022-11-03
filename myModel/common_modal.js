
var nodemailer = require('nodemailer');
let mongoose = require('mongoose');
var axios = require('axios');
const user_tbl = require('../models/user'); 
const logins= require('../models/logins');     
const user_logs = require('../models/user_logs');  
const user_reportings_tbl = require('../models/user_reportings');

const sentEmail = async (req,res) => {
   var email =  req.email; 
    var otp =  req.otp;
console.log(email+" ==jk== "+otp);

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jafarkhan17861@gmail.com',
      pass: 'jyfkrrlurrensqlr',
    // user: 'donotreply@d49.co.in',
    //   pass: '&4e=XSQB'
  }
});


var mailOptions = {
  from: 'jafarkhan17861@gmail.com',
  to:email,
  subject: 'Sending Email using Node.js',
  text: 'your OTP is " '+ otp +' " do not share this otp' 
 // text : otp
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log( 'email error line 34 ===  ',error);
    return false;     
  } else {
    console.log('Email sent: ' + info.messageId);
    return info.messageId; 
  }
});



} 
////////////////////////////////
   

function gen_str (length) {
  var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;


    }
  
  const getTime = () =>{
    return  new Date().toTimeString().slice(0,8);
  } 
   const getcurntDate = () =>{
      let date = new Date();
    var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            if (dd < 10) {
              dd = '0' + dd;
            }
            if (mm < 10) {
              mm = '0' + mm;
            }
            //return dd + '/' + mm + '/' + yyyy;
                 return yyyy + '-' + mm + '-' +dd ;
    
    
  }  
 const before_after_Date = (days)=>{
        var date = new Date();
     date.setDate(date.getDate() + parseInt(days));
     var finalDate = date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate();
     return finalDate;
 }

const send_mobile_otp = async (req,res)=>{
    console.log('common modal ==');
let mobile = req.mobile;
let otp = req.otp;
    console.log("mobile == "+mobile);         
    console.log("otp == "+otp);

 // let msg = `your OTP is  ${otp}  do not share this otp` ;

let url = `http://sms.bulksmsind.in/v2/sendSMS?username=d49games&message=Dear+user+your+registration+OTP+for+D49+is+${otp}+GLDCRW&sendername=GLDCRW&smstype=TRANS&numbers=${mobile}&apikey=b1b6190c-c609-4add-b03d-ab3a22e9d635&peid=1701165034632151350&%20templateid=1707165155715063574`;

       
try {
          return await axios.get(url).then(function(response) {
            console.log(response);
            return response;
        });
         } catch (error) {
           console.log(error);

         }
          
}

const isEmpty = (value) => (
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
)
const isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};

const isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};

const FulldateTime = ()=>{
  var dt = new Date();
    var timeString = dt.getFullYear() +  "-" + dt.getMonth() + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() +":" + dt.getSeconds()
    return timeString;

}

const user_logs_add =async (user_id,type) =>{
  try{   
          let date =   FulldateTime();
           console.log(user_id+ " == user_logs_add is call == "+ type);
        let whr = (type == 'logout')? {'logout_date':date }:{'login_date':date } ;
      let login=new logins({user_id});
      let logsave=await login.save()
     user_logs.findOneAndUpdate({user_id:user_id} ,{$set: whr },{new: true}, (err,updatedUser)=>{
        if(err) {  console.log(err); return false ; }   
        if(isEmpty(updatedUser)){
            //return res.status(200).send({"status":false,"msg":'Invalid user '}) ;  
            let add =new user_logs({  "user_id": user_id, "login_date":date,"logout_date":date, });
                    add.save((err,datas)=>{
                      if(err){ console.log(err);   }else{console.log("add data ==",datas);  }

                    });
              return true;  
        }else{
            return true;  
        }     

                  });
   }catch (error) { console.log(error); }
              



}

const rows_count =  async(tbl,whr) =>{
      try {
        let count =  await tbl.find(whr).countDocuments(); 
          let sendData = (count >0 )? count : 0 ; 
        return sendData;
      } catch (error) {
              return 0 ;  
      }
    ///   let dd = await rows_count(poll_result_tbl,{});

}

const ArrChunks =  async (array, size = 1)=>{
                            let results = [];
                            while (array.length) {
                              results.push(array.splice(0, size));
                            }
                            return results;
                          };

module.exports = { getTime,sentEmail,gen_str,getcurntDate,send_mobile_otp,isEmpty,user_logs_add,FulldateTime,
          rows_count,ArrChunks,before_after_Date,isArray,isObject};
