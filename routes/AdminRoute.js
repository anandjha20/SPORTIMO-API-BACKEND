const express = require('express');
const router = express.Router();
const multer  = require('multer');

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
 
  // admin login Routes  
  router.post('/admin_login/',AdminController.admin_login);
 
   // all poll  Routes  
      router.get('/poll_list/:id?',token_check,PollController.poll_list);
      router.get('/user_list/:id?',token_check,AdminController.user_list);
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
    router.delete('/delete_faq_category/:id?',AdminController.delete_faq_category);
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

   // user complaint Routes
    router.post('/add_user_complaint_category/',complaintController.add_user_complaint_category);
    router.get('/user_complaint_cat_list/:id?', complaintController.user_complaint_cat_list);  
    router.put('/user_complaint_cat_update/:id?',complaintController.user_complaint_cat_update);  
    router.delete('/user_complaint_cat_delete/:id?',complaintController.user_complaint_cat_delete); 
    
      // user complaint chat Routes  user_complaint_chat_stop 
      router.get('/user_complaint_chat_list/:id ?',complaintController.user_complaint_chat_list);   
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
     router.post('/sports',MasterController.sports_add);             
     router.get('/sports/:id?',MasterController.sports_get);             
     router.put('/sports/:id',MasterController.sports_update);             
     router.delete('/sports/:id',MasterController.sports_delete);        
 
 /////   leagues crud Route                                   
  router.post('/leagues',MasterController.league_add);             
  router.get('/leagues/:id?',MasterController.league_get);             
  router.put('/leagues/:id',MasterController.league_update);             
  router.delete('/leagues/:id',MasterController.league_delete);        

   
module.exports = router;  