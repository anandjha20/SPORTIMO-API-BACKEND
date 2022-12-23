const express = require('express');
const router = express.Router();
const multer  = require('multer');

const{ img_upload } = require('../myModel/image_helper');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/sponsorship_image')
  }, 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+'-' + file.originalname ) 
  }
});


const sponsorImg = multer({ storage: storage });
   
const sponsorImgUpload = sponsorImg.fields([{ name: 'image', maxCount: 1 }]);

const IntroSliderImgUpload =  img_upload('./assets/introSlider_img','image');
const avatarImgUpload =  img_upload('./assets/avatar_img','image');
const loginSponsorshipImgUpload =  img_upload('./assets/login_sponsorship_img','image');
const takeoverScreenImgUpload =  img_upload('./assets/takeover_screen_img','image');
const emojiImgUpload =  img_upload('./assets/emoji','image');
const MasterImgUpload =  img_upload('./assets/master','image');
const predictionCardImgUpload = img_upload('./assets/predictionCard_img','image');
const leagueLogoImgUpload = img_upload('./assets/league_logo','image');
const teamLogoImgUpload = img_upload('./assets/team_logo','image');
 /// import user token middleware  
const token_check =  require('../middleware/token_check');                                                                                                 
 
//   import controllers                 
  let AdminController = require('../controllers/AdminController');
  let PollController = require('../controllers/PollController');
  let FootballController = require('../controllers/FootballController');
  let SponsorshipController = require('../controllers/SponsorshipController');
  let complaintController = require('../controllers/complaintController');
  let defaultMsgController = require('../controllers/defaultMsgController');
  let FirebaseController = require('../controllers/FirebaseController');
  let MasterController = require('../controllers/MasterController');
  let IntroSliderController = require('../controllers/IntroSliderController');
  let NotificationController = require('../controllers/NotificationController');
  let ReportReasonController = require('../controllers/ReportReasonController');
  const UserController = require('../controllers/UserController');
  let chatController = require("../controllers/chatController");
  let predictionController = require("../controllers/predictionController");
  let leaderboardController= require("../controllers/leaderboardController");
  let dashboardController= require("../controllers/dashboardController");
  let geqController= require("../controllers/geqController");
  let avatarController= require("../controllers/avatarController");
  let LoginSponsorship= require("../controllers/LoginSponsorshipController");
  let TakeoverScreen= require("../controllers/takeoverScreenController");
  let emojiController= require("../controllers/emojiController");
  let analyticsController= require("../controllers/analyticsController");
  let prefrenceController= require("../controllers/prefrenceController");

  // admin login Routes  
  router.post('/admin_login/',AdminController.admin_login);
 
   // all poll  Routes            
      router.post('/add_poll',PollController.add_poll);
      router.post('/poll_list/:id?',token_check,PollController.poll_list);
     
      router.post('/user_list/:id?',AdminController.user_list);
      router.post('/user_delete',AdminController.user_delete);
      router.get('/user_detail/:id',AdminController.user_detail);

      router.get('/poll_result_show/:poll_id?',PollController.poll_result_show);
      router.put('/update_poll/:id?',PollController.update_poll);
      router.delete('/delete_poll/:id?',PollController.delete_poll);
      router.put('/poll_result_disclosed/:id?',PollController.poll_result_disclosed);
     
 ///  all list for add on Sponsorship form    
    router.post('/sport',SponsorshipController.sponsor_list);
    router.get('/sport_list/:id?',token_check,FootballController.sport_list);
    router.get('/league_list/:id?',token_check,FootballController.league_list);
    router.get('/team_list/:id?',token_check,FootballController.team_list);
    router.get('/player_list/:id?',token_check,FootballController.player_list);
    router.get('/country_list/:id?',FootballController.country_list);
    router.post('/add_sponsor',sponsorImgUpload,SponsorshipController.add_sponsor);
    router.post('/sponsor_list',SponsorshipController.sponsor_list);
    router.get('/sponsor_detail/:id?',SponsorshipController.sponsor_detail);
    router.put('/update_sponsor/:id?',sponsorImgUpload,SponsorshipController.update_sponsor);
    router.delete('/delete_sponsor/:id?',SponsorshipController.delete_sponsor);

       
 // FAQ section Routes 
    router.post('/add_faq_category/',AdminController.add_faq_category);
    router.put('/update_faq_category/',AdminController.update_faq_category);
    router.delete('/delete_faq_category/:id',AdminController.delete_faq_category);

    router.post('/add_faq/',AdminController.add_faq);  

    router.put('/update_faq/',AdminController.update_faq);         
    router.delete('/delete_faq/:id?',AdminController.delete_faq);
    router.post('/add_tips/',AdminController.add_tips);
    router.get('/faq_cat_list/:id?',AdminController.faq_cat_list);      
    router.get('/faq_list/:id?',AdminController.faq_list);     
    router.get('/get_tips/:id?',AdminController.get_tips);     
    router.get('/get_tip_list',AdminController.get_tip_list); 
    router.put('/update_tips/:id?',AdminController.update_tips);    
    router.delete('/delete_tip/:id?',AdminController.delete_tip);
    router.put("/tips_status_update/:id",AdminController.tips_status_update);

   // user complaint Routes    
    router.post('/add_user_complaint_category/',complaintController.add_user_complaint_category);
    router.get('/user_complaint_cat_list/:id?', complaintController.user_complaint_cat_list);  
    router.put('/user_complaint_cat_update/:id',complaintController.user_complaint_cat_update);  
    router.delete('/user_complaint_cat_delete/:id?',complaintController.user_complaint_cat_delete); 
    
      router.post('/user_complaint_list/:id?', complaintController.all_user_complaint_list);  
      // user complaint chat Routes  user_complaint_chat_stop 
      router.get('/user_complaint_chat_list/:id?',complaintController.user_complaint_chat_list);   
      router.post('/user_complaint_chat_add', complaintController.user_complaint_chat_add); 
      router.delete('/user_complaint_chat_stop/:id',complaintController.user_complaint_chat_stop);
 
      router.post('/adminUserChatBlockUnblock',chatController.adminUserChatBlock); 

          // default msg  Routes
          router.post('/addDefaultMsg',defaultMsgController.addDefaultMsg);
           router.get('/get_defaultMsg/:id?', defaultMsgController.get_defaultMsg);  
           router.delete('/defaultMsg_delete/:id',defaultMsgController.defaultMsg_delete); 

        
       // content Routes
          router.post('/content_add',AdminController.content_add);
          router.get('/get_content/:type?',AdminController.get_content);
    
          // get Firebase Chat Data 
    router.get('/firebase_group_chat_data/:id?',FirebaseController.firebase_group_chat_data);      
    router.get('/getFirebaseUser_list/:id?',FirebaseController.getFirebaseUser_list);      
    router.get('/getFirebaseUser/:id?',FirebaseController.getFirebaseUser);      
   /// new updated firebase key add routs
    router.get('/FirebaseGroupChatData/:id',FirebaseController.FirebaseGroupChatData); 
     router.get('/FirebaseChatData/:id?',FirebaseController.FirebaseChatData);  

     router.get('/FirebaseGroupListData',FirebaseController.FirebaseGroupListData);  
     router.get('/FirebaseGroupUserList/:id',FirebaseController.FirebaseGroupListData);  

    /////   sports crud Route 
                      
     router.post('/sports',MasterImgUpload,MasterController.sports_add);             
     router.post('/sports_get/:id?',MasterController.sports_get);             
     router.put('/sports/:id',MasterImgUpload,MasterController.sports_update);             
     router.delete('/sports/:id',MasterController.sports_delete);        
      
   /////   leagues crud Route                                   
        router.post('/leagues',MasterImgUpload,MasterController.league_add);             
        router.post('/leagues_get/:id?',MasterController.league_get);             
        router.put('/leagues/:id',MasterImgUpload,MasterController.league_update);             
        router.delete('/leagues/:id',MasterController.league_delete);        
          
    /////   teams crud Route                                   
      router.post('/teams',MasterImgUpload,MasterController.team_add);             
      router.post('/teams_get/:id?',MasterController.team_get);             
      router.put('/teams/:id',MasterImgUpload,MasterController.team_update);             
      router.delete('/teams/:id',MasterController.team_delete);        
  
  /////   player _get crud Route                                   
        router.post('/players',MasterImgUpload,MasterController.player_add);             
        router.post('/players_get/:id?',MasterController.player_get);             
        router.put('/players/:id',MasterImgUpload,MasterController.player_update);                
        router.delete('/players/:id',MasterController.player_delete);        

// poll_skip_add
   router.post('/poll_skip_add',PollController.poll_skip_add); 
  
  // poll_analytics route add on 
   router.get('/poll_analytics/:id',PollController.poll_analytics); 

  // poll_analytics route add on 
   router.get('/poll_analytics/:id',PollController.poll_analytics); 
  
  
 
  // IntroSlider route add on  introSlider_update  introSlider_delete
  router.post('/introSlider_add',IntroSliderImgUpload,IntroSliderController.introSlider_add); 
  router.post('/introSlider_get/:id?',IntroSliderController.introSlider_get); 
  router.put('/introSlider_update/:id',IntroSliderImgUpload,IntroSliderController.introSlider_update);             
  router.delete('/introSlider_delete/:id',IntroSliderController.introSlider_delete);       

  // get notification list  
  router.post('/notification_list/:id?',NotificationController.notification_list_admin); 
  router.delete('/notification_delete/:id',NotificationController.notification_delete_admin); 
  router.post('/addNotification',NotificationController.addNotification); 


// ReportReason route  
 router.post('/report_reason_add',ReportReasonController.report_reason_add); 
router.post('/report_reason_get/:id?',ReportReasonController.report_reason_get); 
router.put('/report_reason_update/:id',ReportReasonController.report_reason_update); 
router.delete('/report_reason_delete/:id',ReportReasonController.report_reason_delete); 

//  user reports route 
   router.post('/get_user_report_admin/:id?',ReportReasonController.get_user_report_admin);
  
  // get autocomplete users name like route
   router.get('/get_autocomplete_users',UserController.get_autocomplete_users);
   router.get('/jk_noti',NotificationController.jk_noti);
  
   // blocked User List 
   router.get('/blockedUserList/:id?',AdminController.blockedUserList);

   
   // chat block User LIst  
   router.get('/chat_blockUserLIst/:id?',AdminController.chat_blockUserLIst);
  
   // chat block User LIst  
   router.get('/get_prediction_card_Cat_list/:id?',predictionController.getprediction_card_Cat_list);
  
   //prediction_card_add
   router.post('/prediction_card_add',predictionCardImgUpload,predictionController.prediction_card_add);
   router.put('/prediction_card_update/:id?',predictionCardImgUpload,predictionController.prediction_card_update);

   router.post('/prediction_card_list',predictionController.prediction_card_list);
  // router.post('/user_prediction',predictionController.user_prediction);
  
  // match card add    
   router.post('/match_card_add',predictionController.match_card_add);
   router.post('/match_card_list',predictionController.match_card_list); 
   router.put('/match_card_update/:id?',predictionController.match_card_update);
   router.delete('/match_card_delete/:id?',predictionController.match_card_delete);  
 
   // team_match_list
   router.post('/live_upcoming_match_list',MasterController.live_upcoming_match_list);           
   router.post('/all_team_match_list',MasterController.all_team_match_list);           
  
   
   // chat block User LIst  
    router.post('/admin_settings_update',AdminController.admin_settings_update);
    router.get('/admin_settings_get',AdminController.admin_settings_get);
    router.post('/power_up_add',AdminController.power_up_add); 
    router.post('/power_up_alloted',AdminController.power_up_alloted); 
    router.get('/powerUp_list/:id?',AdminController.powerUp_list); 
    router.get('/alloted_powerUp_list/:id?',AdminController.alloted_powerUp_list); 
    router.get('/powerUp_used_list/:id?',AdminController.powerUp_used_list); 
        
   
    //router.post('/admin_settings_set',AdminController.admin_settings_set);
  
  
   router.get('/jk_test',PollController.jk_test);    
   
   
   //leaderboard api
   router.post('/user_point_details',leaderboardController.user_point_details);
   router.post('/leaderboard',leaderboardController.leaderboard);
   router.post('/bonus_points',leaderboardController.bonus_points);


   //loginSponsorship api 
   router.post('/login_sponsorship_add',loginSponsorshipImgUpload,LoginSponsorship.login_sponsorship_add); 
   router.get('/login_sponsorship_get',LoginSponsorship.login_sponsorship_get); 
   router.delete('/login_sponsorship_delete/:id',LoginSponsorship.login_sponsorship_delete);       
   router.put('/login_sponsorship_status_update/:id',LoginSponsorship.login_sponsorship_status_update);       
 
   //takeoverScreen api 
   router.post('/takeover_screen_add_update',takeoverScreenImgUpload,TakeoverScreen.takeover_screen_add_update); 
   router.get('/takeover_screen_get',TakeoverScreen.takeover_screen_get); 
   router.put('/takeover_screen_status_update/:id',TakeoverScreen.takeover_screen_status_update);       

   //avatar api 
   router.post('/avatar_add',avatarImgUpload,avatarController.avatar_add); 
   router.get('/avatar_get',avatarController.avatar_get); 
   router.delete('/avatar_delete/:id',avatarController.avatar_delete);       

   //emoji api 
  router.post('/emoji_add',emojiImgUpload,emojiController.emoji_add); 
  router.put('/emoji_update',emojiImgUpload,emojiController.emoji_update); 
  router.post('/emoji_get',emojiController.emoji_get); 
  router.delete('/emoji_delete/:id',emojiController.emoji_delete);       

    // past_match_list 
   router.post('/past_match_list',MasterController.past_match_list);          

   router.post('/all_matches_leaderboard',leaderboardController.all_matches_leaderboard);
   router.post('/all_matches_leaderboard_old',leaderboardController.all_matches_leaderboard_old);

//////////////
  router.post('/transaction_list',leaderboardController.testing_of_transaction);
  router.post('/add_transaction',leaderboardController.add_transaction);
 //geq routers
 router.post('/add_geq',geqController.add_geq);
 router.put('/update_geq',geqController.update_geq);
 router.post('/geq_list',geqController.geq_list);
 router.delete('/delete_geq/:id?',geqController.delete_geq);
 router.post('/geq_ans_update',geqController.geq_ans_update);
 
 
   
 router.post('/all_user_prediction',predictionController.all_user_prediction);
 router.post('/user_prediction/:id?',predictionController.user_prediction);

 router.put('/defaultMsg_update/:id',defaultMsgController.defaultMsg_update); 

 ////dashboard api
 router.get('/dashboard_count',dashboardController.dashboard_count); 

///analytics api
router.post('/all_user_analytics',analyticsController.all_user_analytics); 
router.post('/user_profile_analytics',analyticsController.user_profile_analytics); 
router.post('/polls_analytics',analyticsController.polls_analytics); 
router.post('/support_analytics',analyticsController.support_analytics); 
router.post('/geq_analytics',analyticsController.geq_analytics); 
router.post('/chat_analytics',FirebaseController.chat_analytics); 
router.post('/reported_user_list',analyticsController.reported_user_list); 
router.get('/user_report_detail/:id?',analyticsController.user_report_detail); 


//perefrence api 
router.post('/add_league_by_competition_id',prefrenceController.add_league_by_competition_id); 
router.post('/add_team_by_season_id',prefrenceController.add_team_by_season_id); 
router.post('/league_list_new',prefrenceController.league_list_new);
router.get('/league_list_new',prefrenceController.league_list_new);
router.post('/team_list_new',prefrenceController.team_list_new);
router.get('/league_list_dropDown',prefrenceController.league_list_dropDown);
router.get('/team_list_dropDown',prefrenceController.team_list_dropDown);
router.get('/teams_for_sponsor',prefrenceController.teams_for_sponsor);
router.post('/league_status_update',prefrenceController.league_status_update);
router.post('/add_custom_league',leagueLogoImgUpload,prefrenceController.add_custom_league);
router.post('/add_custom_team',teamLogoImgUpload,prefrenceController.add_custom_team);
router.put('/update_league/:id?',leagueLogoImgUpload,prefrenceController.update_league);
router.put('/update_team/:id?',teamLogoImgUpload,prefrenceController.update_team);
router.delete('/delete_custom_league/:id?',prefrenceController.delete_custom_league);
router.put('/restore_league_logo/:id?',prefrenceController.restore_league_logo);
router.put('/restore_team_logo/:id?',prefrenceController.restore_team_logo);



module.exports = router;       