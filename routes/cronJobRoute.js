const express = require('express');
const ConjobController = require('../controllers/CronjobController');

const Router = express.Router(); 

const CronjobController = require("../controllers/CronjobController") ;

Router.get("/pollResultNotification",CronjobController.pollResultNotification);

Router.get("/get_live_match_list",ConjobController.get_live_match_list); 
Router.get("/team_match_add",ConjobController.team_match_add); 
Router.get("/get_card_001",ConjobController.get_card_001); 
Router.get("/get_card_004",ConjobController.get_card_004); 
Router.get("/get_card_007",ConjobController.get_card_007); 
Router.get("/get_card_0011",ConjobController.get_card_0011); 
Router.get("/get_card_0013",ConjobController.get_card_0013); 
Router.get("/get_card_0015",ConjobController.get_card_0015); 
Router.get("/get_card_0017",ConjobController.get_card_0017); 
Router.get("/get_card_0020",ConjobController.get_card_0020); 
Router.get("/get_card_0023",ConjobController.get_card_0023); 
Router.get("/get_card_0036",ConjobController.get_card_0036); 

Router.get("/get_test",ConjobController.get_test);   

  

module.exports = Router;












