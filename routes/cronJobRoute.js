const express = require('express');
const ConjobController = require('../controllers/CronjobController');

const Router = express.Router(); 

const CronjobController = require("../controllers/CronjobController") ;

Router.get("/pollResultNotification",CronjobController.pollResultNotification);

Router.get("/get_live_match_list",ConjobController.get_live_match_list); 
Router.get("/team_match_add",ConjobController.team_match_add); 
Router.get("/get_card_001",ConjobController.get_card_001); 

Router.get("/get_card_03",ConjobController.get_card_03); 
Router.get("/get_card_06",ConjobController.get_card_06); 
Router.get("/get_card_09",ConjobController.get_card_09); 
Router.get("/get_card_16",ConjobController.get_card_16); 
Router.get("/get_card_18",ConjobController.get_card_18); 
Router.get("/get_card_19",ConjobController.get_card_19); 
Router.get("/get_card_22",ConjobController.get_card_22); 



Router.get("/get_card_004",ConjobController.get_card_004); 
Router.get("/get_card_007",ConjobController.get_card_007); 
Router.get("/get_card_008",ConjobController.get_card_008); 
Router.get("/get_card_0011",ConjobController.get_card_0011); 
Router.get("/get_card_0013",ConjobController.get_card_0013); 
Router.get("/get_card_0015",ConjobController.get_card_0015); 
Router.get("/get_card_0017",ConjobController.get_card_0017); 
Router.get("/get_card_0020",ConjobController.get_card_0020); 
Router.get("/get_card_0023",ConjobController.get_card_0023); 
Router.get("/get_card_0036",ConjobController.get_card_0036); 
Router.post("/update_match_data_by_date",ConjobController.update_match_data_by_date);  
// add on mhn
Router.get("/get_card_02",ConjobController.get_card_02); 
Router.get("/get_card_21",ConjobController.get_card_21); 


Router.get("/matchResult_show",ConjobController.matchResult_show);   
Router.get("/jkk",ConjobController.jkk);   
Router.get("/match_run",ConjobController.match_run);   

  
   
module.exports = Router;












