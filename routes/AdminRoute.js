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
const MasterImgUpload =  img_upload('./assets/master','image');

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
  // admin login Routes  
  router.post('/admin_login/',AdminController.admin_login);
 
   // all poll  Routes            
      router.post('/add_poll',PollController.add_poll);
      router.post('/poll_list/:id?',token_check,PollController.poll_list);
     
      router.post('/user_list/:id?',AdminController.user_list);
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
    router.put('/user_complaint_cat_update/:id?',complaintController.user_complaint_cat_update);  
    router.delete('/user_complaint_cat_delete/:id?',complaintController.user_complaint_cat_delete); 
    
      router.post('/user_complaint_list/:id?', complaintController.all_user_complaint_list);  
      // user complaint chat Routes  user_complaint_chat_stop 
      router.get('/user_complaint_chat_list/:id?',complaintController.user_complaint_chat_list);   
      router.post('/user_complaint_chat_add', complaintController.user_complaint_chat_add); 
      router.delete('/user_complaint_chat_stop/:id',complaintController.user_complaint_chat_stop);


          // default msg  Routes
          router.post('/addDefaultMsg',defaultMsgController.addDefaultMsg);
           router.get('/get_defaultMsg/:id?', defaultMsgController.get_defaultMsg);  
           router.delete('/defaultMsg_delete/:id',defaultMsgController.defaultMsg_delete); 

        
       // default msg  Routes
          router.post('/content_add',AdminController.content_add);
          router.get('/get_content/:type?',AdminController.get_content);
    
          // get Firebase Chat Data 
    router.get('/firebase_group_chat_data/:id?',FirebaseController.firebase_group_chat_data);      
           
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
  
   router.get('/jk_test',PollController.jk_test); 
 
  // IntroSlider route add on  introSlider_update  introSlider_delete
  router.post('/introSlider_add',IntroSliderImgUpload,IntroSliderController.introSlider_add); 
  router.post('/introSlider_get/:id?',IntroSliderController.introSlider_get); 
  router.put('/introSlider_update/:id',IntroSliderImgUpload,IntroSliderController.introSlider_update);             
  router.delete('/introSlider_delete/:id',IntroSliderController.introSlider_delete);       

// get notification list  
router.post('/notification_list/:id?',NotificationController.notification_list_admin); 
router.delete('/notification_delete/:id',NotificationController.notification_delete); 
router.post('/addNotification',NotificationController.addNotification); 


// ReportReason route  
 router.post('/report_reason_add',ReportReasonController.report_reason_add); 
router.post('/report_reason_get/:id?',ReportReasonController.report_reason_get); 
router.put('/report_reason_update/:id',ReportReasonController.report_reason_update); 
router.delete('/report_reason_delete/:id',ReportReasonController.report_reason_delete); 

module.exports = router;     