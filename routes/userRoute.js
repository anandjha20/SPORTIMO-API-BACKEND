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
    cb(null, uniqueSuffix+'-' + file.originalname) 
  }
});
 
const uComplaintImg = multer({ storage: storage });
   
const uComplaintImgUpload = uComplaintImg.fields([{ name: 'image', maxCount: 1 }]);
const user_img      =  img_upload('./assets/user_img','user_image');
const userReportImg =  img_upload('./assets/user_img','image');

/// import user token middleware
 const user_token_check =  require('../middleware/user_token_check.js');

//   import controllers                                                                                             
  let UserController = require('../controllers/UserController');
  let FootballController = require('../controllers/FootballController');
  const PollController = require('../controllers/PollController');    
  const SponsorshipController = require('../controllers/SponsorshipController');    
  const complaintController = require('../controllers/complaintController');    
        
      let defaultMsgController = require('../controllers/defaultMsgController');
      let chatController = require('../controllers/chatController');

      let FirebaseController = require('../controllers/FirebaseController');
      let IntroSliderController = require('../controllers/IntroSliderController');
      let NotificationController = require('../controllers/NotificationController');
      let ReportReasonController = require("../controllers/ReportReasonController");
      let AdminController = require("../controllers/AdminController");
      let predictionController = require("../controllers/predictionController");                                            
      let leaderboardController= require("../controllers/leaderboardController");       
      let MasterController = require('../controllers/MasterController');
      let avatarController = require('../controllers/avatarController');
      let emojiController = require('../controllers/emojiController');
      let geqController = require('../controllers/geqController');
      let LoginSponsorship = require('../controllers/LoginSponsorshipController');
      let TakeoverScreen = require('../controllers/takeoverScreenController');
      let prefrenceController = require('../controllers/prefrenceController');
  
  
          router.get('/JK/',UserController.dashboardAllCount);
          router.get('/sendEmail/',UserController.User_sendEmail);
          router.post('/league_list/:id?',FootballController.league_list);
          router.post('/sport_list/:id?',user_token_check,FootballController.sport_list);
          router.post('/team_list/:id?', user_token_check,FootballController.team_list);
          router.post('/player_list/:id?',user_token_check,FootballController.player_list);
          router.post('/get_tip_list/:id?',AdminController.get_tip_list);
          router.post('/faq_list/:id?',AdminController.faq_list);  
       
          router.get('/get_user_powerUp_list/:id?',AdminController.get_user_powerUp_list);  
          router.post('/power_up_used',AdminController.power_up_used); 
          router.get('/user_powerUp_used_list/:id?',AdminController.user_powerUp_used_list); 
                                   
          router.post('/registration/',UserController.registration);
          router.post('/verify_nickName',UserController.verify_nickName);
          router.post('/user_profile_update',user_img , UserController.user_profile_update);
          router.put('/user_profile_type_update/:id?', UserController.user_profile_type_update);
   
          router.post('/block_user_add',user_token_check,UserController.block_user_add);  
          router.post('/user_profile_view',UserController.user_profile_view);
          router.post('/resend_otp/:id?',UserController.resend_otp_2); 
          router.post('/verify_otp',UserController.verify_otp);         
          router.put('/user_preference_update/:id',UserController.user_preference_update);         
        
          /// PollCon troller route list      
          router.post('/poll_list/:id?',user_token_check,PollController.poll_list_user);      
          router.post('/upcomming_poll_list/:id?',PollController.upcomming_poll_list);      
        
          router.post('/poll_participant',user_token_check,PollController.poll_participant);      
          router.post('/poll_result_show/:poll_id ?',user_token_check,PollController.poll_result_show);      
          router.get('/my_polls/:id ?',user_token_check,PollController.my_polls);      
          router.post('/my_polls_postApi/:id ?',user_token_check,PollController.my_polls);      
          router.post('/my_polls_history/',user_token_check,PollController.my_polls_history);  

        //  block_user_add
         router.post('/block_user_add',user_token_check,UserController.block_user_add);
           
      ///  all Sponsorship Routes
        router.post('/sponsor_list',SponsorshipController.sponsor_list_user);
        router.get('/sponsor_detail/:id ?',SponsorshipController.sponsor_detail_user);
        router.put('/sponsorship_impressions_count_add',SponsorshipController.sponsorship_impressions_count_add);
        router.put('/sponsorship_clicks_count_add',SponsorshipController.sponsorship_clicks_count_add);

      // user complaint Routes  
        router.post('/user_complaint_cat_list/:id?', user_token_check,complaintController.user_complaint_cat_list);  
        router.post('/user_complaint_add',user_token_check,uComplaintImgUpload, complaintController.user_complaint_add);  
        router.post('/user_complaint_list/:user_id/:id?',complaintController.user_complaint_list);  

        router.get('/user_complaint_all',complaintController.user_complaint_all);  
        router.post('/user_complaint_chat_add',complaintController.user_complaint_chat_add);  
        router.post('/user_complaint_chat_list/:id',complaintController.user_complaint_chat_list); 
  
            
   // default msg  Routes
    router.post('/get_defaultMsg/:id?',defaultMsgController.get_defaultMsg);  
  
   // user logout Routes
    router.delete('/logout/:id?',user_token_check,UserController.logout);  
   
   // user social media add on
    router.put('/update_facebook_id/',UserController.update_facebook_id);  
   
   // user settings (like music_sound,haptics,chat,biometric,notifications );
    router.put('/user_settings',user_token_check,UserController.user_settings);  
    
    // user get content
     router.get('/get_content/:type?',UserController.get_content);  
     
    // chat group add   group participant 
     router.post('/chat_group_add',chatController.chat_group_add);
     router.post('/group_participant_add',chatController.group_participant_add);
     router.get('/chat_group_list/:id?',chatController.chat_group_list);  
     
     
     router.get('/group_participant_list/:id?',chatController.group_participant_list);                       
   
   // get Firebase Chat Data 
   /// new updated firebase key add routs
   router.get('/FirebaseGroupChatData/:id?',FirebaseController.FirebaseGroupChatData); 
   router.get('/FirebaseChatData/:id?',FirebaseController.FirebaseChatData);  


    // get introSlider list  
    router.post('/get_introSlider/:id?',IntroSliderController.get_introSlider_user); 
                                                           
   // get HomePageDemoApi list 
   router.get('/HomePageDemoApi', async(req,res) =>{
                let sendData = [{ "date": "2022-09-06T00:00:00.000Z",
                "league_name": "demo leagues -1",
                 "logo": "",
                 "team_one": "India",
                 "team_two": "pakistan",
                 "start_time": "10:30:00", 
                 "team_one_scorecard" : 2, 
                 "team_two_scorecard" : 4, 
                 "CardsUsed_1" : 2, 
                 "CardsUsed_2" : 3 
              },
            { "date": "2022-09-10T00:00:00.000Z",
                "league_name": "demo leagues -1",
                 "logo": "",
                 "team_one": "India",
                 "team_two": "pakistan",
                 "start_time": "10:30:00", 
                 "team_one_scorecard" : 0, 
                 "team_two_scorecard" : 0, 
                 "CardsUsed_1" : 2, 
                 "CardsUsed_2" : 3 
              },
              { "date": "2022-09-15T00:00:00.000Z",
                "league_name": "demo leagues -1",
                 "logo": "",
                 "team_one": "India",
                 "team_two": "pakistan",
                 "start_time": "10:30:00", 
                 "team_one_scorecard" : 0, 
                 "team_two_scorecard" : 0, 
                 "CardsUsed_1" : 2, 
                 "CardsUsed_2" : 3 
              }];


             return res.status(200).send({'status':true,'msg':"success",'body':sendData});

          }); 
  // get notification list  
  router.post('/notification_list/:id?',NotificationController.notification_list); 
  router.post('/notification_delete/:id?',NotificationController.notification_delete_user); 
   
//  user reports route      
    router.post('/report_reason_types/:id?',ReportReasonController.report_reason_types);
    router.post('/add_user_reports',userReportImg,ReportReasonController.add_user_reports);  
    router.get('/get_user_report_list/:id',ReportReasonController.get_user_report_list);
   
    router.get('/user_chatBlock_chacked/:id',chatController.user_chatBlock_chacked);
   
    // userFirebaseTokenUpdate route
    router.post('/userFirebaseTokenUpdate',UserController.userFirebaseTokenUpdate);
    
  // userLenguageAdd route  getUserLenguage
    
    router.post('/userLenguageAdd',UserController.userLenguageAdd);
                             
  // getUserLenguage route  
      router.get('/getUserLenguage/:id?',UserController.getUserLenguage);
   
     // match_card_list route   
      router.post('/match_card_list',predictionController.match_card_list); 
     // router.post('/match_card_list_2',predictionController.match_card_list_2); 
 
      // play Match  card add    
      router.post('/playMatchCard_add',predictionController.playMatchCard_add);
      router.post('/my_playMatchCard_list',predictionController.my_playMatchCard_list);
      router.put('/playMatchCard_update/:id?',predictionController.playMatchCard_update);
      router.delete('/playMatchCard_delete/:id?',predictionController.playMatchCard_delete);
     
      // team_match_list  
      // router.post('/all_team_match_list',MasterController.live_upcoming_match_list);           
       router.post('/all_team_match_list',MasterController.all_team_match_list_mobile);           
       router.post('/all_team_match_list_new',MasterController.all_team_match_list_mobile_new);           
       router.post('/all_league_list',MasterController.all_league_list_mobile);           
       router.post('/my_match_list:id?',UserController.my_match_list);           
       router.post('/match_details:id?',UserController.match_details);           
      
      
       //userFollower_add    
      router.post('/userFollower_add',UserController.userFollower_add);           
      router.get('/follower_list/:id?',UserController.follower_list);           
      router.get('/following_list/:id?',UserController.following_list);           
      router.post('/remove_follower',UserController.remove_follower);           
      router.delete('/delete_user/:id?',UserController.delete_user)
      router.post('/request_action',UserController.request_action)
     
    // user block list 
      router.post('/block_user_list',UserController.block_user_list);
     // mobile and email update routes     
      router.post('/user_mobile_email_update', UserController.user_mobile_email_update);
      router.post('/verify_update_otp', UserController.verify_update_otp);  

    //avatar api
   router.get('/avatar_get',avatarController.avatar_get); 
  
    //emoji api
    router.get('/emoji_get',emojiController.emoji_get); 
  

    //leaderboard api
    router.post('/leaderboard',leaderboardController.leaderboard);
    router.post('/user_point_details',leaderboardController.user_point_details);
    router.post('/all_matches_leaderboard',leaderboardController.all_matches_leaderboard);
    router.post('/all_league_leaderboard',leaderboardController.all_league_leaderboard);
    router.post('/topMostWinners',leaderboardController.topMostWinners);
   
    //geq api
    router.post('/geq_list',geqController.geq_list_user);
    router.post('/geq_answer_add',geqController.geq_answer_add);
    router.post('/geq_result',geqController.geq_result);
  

////////////////////////////////////////////
      router.post('/deleteOne',MasterController.deleteOne)

   // make by mhn
      router.put('/update_google_id/',UserController.update_google_id); 
     
    //login sponsorship
     router.get('/login_sponsorship_get/',LoginSponsorship.login_sponsorship_get_user); 
            
    //TakeoverScreen
    router.get('/takeover_screen_get/',TakeoverScreen.takeover_screen_get_user); 
     
   /// testing routs  
      router.get('/my_played_matches/:id?',predictionController.my_played_matches); 
      router.get('/my_played_leagues/:id?',predictionController.my_played_leagues); 
      router.post('/my_played_matches_postApi/:id?',predictionController.my_played_matches); 
      router.post('/my_played_leagues_postApi/:id?',predictionController.my_played_leagues); 

      router.post('/sms_api_test/:mobile?',UserController.sms_api_test)

      router.get('/sms_api_test/:mobile?',UserController.sms_api_test)


//prefrence api
  router.post('/user_preference_add_update',prefrenceController.user_preference_add_update);
  router.post('/league_list_new',prefrenceController.league_list_new);
  router.post('/team_list_new',prefrenceController.team_list_new);
  router.post('/sport_list_new',prefrenceController.sport_list_new);
  router.post('/my_fav_league',prefrenceController.my_fav_league);
  router.post('/my_fav_team',prefrenceController.my_fav_team);
  router.post('/my_fav_sport',prefrenceController.my_fav_sport);

   

    



module.exports = router;             