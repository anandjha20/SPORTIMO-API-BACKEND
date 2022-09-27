const express = require('express');
const ConjobController = require('../controllers/CronjobController');

const Router = express.Router(); 

const CronjobController = require("../controllers/CronjobController") ;

Router.get("/pollResultNotification",CronjobController.pollResultNotification);

Router.get("/get_live_match_list",ConjobController.get_live_match_list); 
Router.get("/team_match_add",ConjobController.team_match_add); 













module.exports = Router;












