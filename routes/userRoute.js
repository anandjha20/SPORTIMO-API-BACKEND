const express = require('express');
const router = express.Router();
const{ img_upload } = require('../myModel/image_helper');

const multer  = require('multer');  

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/userComplaint_img')
  },                             
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+'-' + file.originalname ) 
  }
});
 
const uComplaintImg = multer({ storage: storage });
   
const uComplaintImgUpload = uComplaintImg.fields([{ name: 'image', maxCount: 1 }]);
const user_img =  img_upload('./assets/user_img','user_image');

/// import user token middleware
 const user_token_check =  require('../middleware/user_token_check.js');

//   import controllers                                                                                             
  let UserController = require('../controllers/UserController');
  let FootballController = require('../controllers/FootballController');
  const PollController = require('../controllers/PollController');    
  const SponsorshipController = require('../controllers/SponsorshipController');    
  const complaintController = require('../controllers/complaintController');    
                                                 
          router.get('/JK/',UserController.dashboardAllCount);
          router.get('/sendEmail/',UserController.User_sendEmail);
          router.get('/league_list/:id?',user_token_check,FootballController.league_list);
          router.get('/sport_list/:id?',user_token_check,FootballController.sport_list);
          router.get('/team_list/:id?', user_token_check,FootballController.team_list);
          router.get('/player_list/:id?',user_token_check,FootballController.player_list);
                       
                                   
          router.post('/registration/',UserController.registration);
          router.post('/user_profile_update/',user_img,UserController.user_profile_update);
         
          router.post('/user_profile_view',UserController.user_profile_view);
          
          router.get('/resend_otp/:id?',UserController.resend_otp_2); 
          router.post('/verify_otp',UserController.verify_otp);         
        
          /// PollController route list
          router.get('/poll_list/:id?',user_token_check,PollController.poll_list);      
          router.post('/poll_participant',user_token_check,PollController.poll_participant);      
          router.get('/poll_result_show/:poll_id ?',user_token_check,PollController.poll_result_show);      
          router.get('/my_polls/:id ?',user_token_check,PollController.my_polls);      
        

        //  block_user_add
         router.post('/block_user_add',user_token_check,UserController.block_user_add);
           
      ///  all Sponsorship Routes
        router.get('/sponsor_list',SponsorshipController.sponsor_list);
        router.get('/sponsor_detail/:id ?',SponsorshipController.sponsor_detail);

      // user complaint Routes  
        router.get('/user_complaint_cat_list/:id?', user_token_check,complaintController.user_complaint_cat_list);  
        router.post('/user_complaint_add',user_token_check,uComplaintImgUpload, complaintController.user_complaint_add);  
        router.get('/user_complaint_list/:user_id/:id?',complaintController.user_complaint_list);  
        router.get('/user_complaint_all',complaintController.user_complaint_all);  
        router.post('/user_complaint_chat_add',complaintController.user_complaint_chat_add);  
        router.get('/user_complaint_chat_list/:id',complaintController.user_complaint_chat_list);  
         
module.exports = router;  