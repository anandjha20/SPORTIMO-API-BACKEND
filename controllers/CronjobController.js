const axios = require("axios");
const mongoose = require("mongoose");
const { ArrChunks, rows_count, getcurntDate, getTime, isEmpty, before_after_Date } = require("../myModel/common_modal");
const { team_match_addOne } = require('../myModel/helper_fun');
const poll_tbl = require("../models/poll");
const user_tbl = require('../models/user');
const transactions_tbl = require('../models/transactions');
const playMatchCards_tbl = require('../models/playMatchCards');
const team_matches_tbl = require('../models/team_matches');
const match_cards_tbl = require('../models/match_cards');

const match_event_shot_tbl = require('../models/match_event_shots');
const { MyBasePath } = require("../myModel/image_helper");


const leaderboardController = require('../controllers/leaderboardController');


const team_matches = require('../models/team_matches');
const { match_data_ara,day_match_getID,day_match_add, match_card_number, match_card_0011, match_card_0013, matchCardAllData, matchCardEventAllData, get_card_result_add_4,
  get_card_result_add_7, get_card_result_add_1, get_card_result_add_11, get_card_result_add_13,
  get_card_result_add_15, get_card_result_add_17, get_card_result_add_20, get_card_result_add_23,
  get_card_result_add_36, get_card_result_add_10, get_card_result_add_18,getCardResult_18_END, card_08_befor_call, get_card_result_add_08,
  get_card_result_add_37, card_39_befor_call, get_card_result_add_39, card_34_befor_call, get_card_result_add_34,
  get_card_result_add_31, get_card_result_add_5, get_card_result_add_34_endTimesCall, get_card_result_add_26,
  getCardGreaterThan_16, getCardResult_16_END, getCardGreaterThan_03, getCardResult_03_END, getCardGreaterThan_06, getCardResult_06_END, getCardGreaterThan_09,
  getCardResult_09_END, getCardGreaterThan_19, getCardResult_19_END, getCardGreaterThan_22, getCardResult_22_END,
  get_card_result_add_21,getCardResult_21_END,get_card_result_add_02,getCardResult_02_END } = require("../myModel/Live_match_api_helper");
const { Promise } = require("mongoose");

class ConjobController {
  static get_card_00122 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;
      // yellow card no == 6    
      let dates = req.body.date;  /// getcurntDate();
      let tomarro_date = before_after_Date(1);
      console.log("tomarro_date == ", tomarro_date);
      let whr = { date_utc: { $gte: dates, $lte: tomarro_date } };

      console.log(whr);
      let data = await team_matches_tbl.find(whr);
      if (data) {
        let data2 = await matchCardAllData(data[0].match_id);

        return res.status(200).send({ 'status': true, 'msg': 'success', 'body': data2 });
      } else {
        return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..', 'body': '' });

      }
      //  if(!isEmpty(data)){
      //           if( data.team_a >  data.team_b ){
      //             return  res.status(200).send({'status':true,'msg':"tam_A win success",'body': "opt_1", 'data':data });
      //           }else   if( data.team_b >  data.team_a  ){
      //             return  res.status(200).send({'status':true,'msg':"tam_B win success",'body': "opt_2",  'data':data });
      //           }else  if( data.team_b == data.team_a  ){
      //             return  res.status(200).send({'status':true,'msg':"equal to equal ( Equal )  success",'body': "opt_3", 'data':data });
      //           }else{
      //             return  res.status(200).send({'status':false,'msg':"Result not show this time", 'body':'' });
      //            }
      //  }else{
      //   return  res.status(200).send({'status':false,'msg':"Match not show this time", 'body':'' });
      //  }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
////////// //////////////////////// start  used function for card ////////////////////////////////////////////////
         
        static get_card_21 = async (req, res) => {
              try {

              
                let match_id = "2701241"//req.body.match_id; // 2701198;
                console.log("get_card-21 match_id is  === ", match_id);
                let data = await matchCardEventAllData(match_id);
                if (data) {
                  let sum = data.events[0].corners[0].event;

                  let team_a_original_name = data.team_a_original_name;
                  let team_b_original_name = data.team_b_original_name;

                  // check event count     
                  let shots_count = await match_event_shot_tbl.find({ "match_id": match_id, "event_type": "corners" }, "shots_count");
                  let right_ans = '';
                  console.log(shots_count)
                  if (isEmpty(shots_count)) {
                    // add event count row   for  match_event_shot table   
                    let add = new match_event_shot_tbl({
                      match_id, "event_type": "corners", "shots_count": sum.length
                    });
                    let add_rows = await add.save();


                    if (sum.length > 0) {
                      if (team_a_original_name == sum[0].team) {
                        right_ans = "opt_1";
                      } else if (team_b_original_name == sum[0].team) {
                        right_ans = "opt_2";
                      } else { right_ans = "opt_3"; }
                      console.log("first function call == ");
                      // this function use for user card result set  on  
                      let resss = await get_card_result_add_21({ right_ans, match_id });
                    }

                    return res.status(200).send({ 'status': true, 'msg': 'success', 'body': shots_count });

                  } else {
                    let num_my = shots_count[0].shots_count;
                    let all_arr = sum[num_my];


                    if (all_arr) {
                      if (team_a_original_name == all_arr.team) {
                        right_ans = "opt_1";
                      } else if (team_b_original_name == all_arr.team) {
                        right_ans = "opt_2";
                      } else { right_ans = "opt_3"; }

                      // this function use for user card result set  on  
                      let resss = await get_card_result_add_21({ right_ans, match_id });

                      // match_event count update 
                      let match_eventUpdate = match_event_shot_tbl.findOneAndUpdate({ "match_id": match_id, "event_type": "corners" }, { $set: { "shots_count": sum.length } }, { new: true }, (err, updatedUser) => {
                        if (err) { console.log(err); return false } else { return true }
                      });



                    }

                    return res.status(200).send({ 'status': true, 'msg': 'success 11', 'body': all_arr });
                  }
                } else {
                  return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..', 'body': '' });

                }

              } catch (error) {
                console.log(error);
                return res.status(200).send({ 'status': false, 'msg': 'servr error' });
              }
            }

        static get_card_02 = async (req, res) => {
              try {

              
                let match_id = "2701241"//req.body.match_id; // 2701198;
                console.log("get_card-21 match_id is  === ", match_id);
                let data = await matchCardEventAllData(match_id);
                if (data) {
                  let sum = data.events[0].bookings[0].event;

                  // check event count     
                  let shots_count = await match_event_shot_tbl.find({ "match_id": match_id, "event_type": "yellow_card_02" }, "shots_count");
                  let right_ans = '';
                  console.log(shots_count)
                  if (isEmpty(shots_count) ) {
                    // add event count row   for  match_event_shot table   
                    let add = new match_event_shot_tbl({
                      match_id, "event_type": "yellow_card_02", "shots_count": sum.length
                    });
                    let add_rows = await add.save();


                    if (sum.length > 0) {
                      if (sum[0].type=="yellow_card") {
                        right_ans = "opt_1";
                        console.log("first function call == ");
                        // this function use for user card result set  on  
                        let resss = await get_card_result_add_02({ right_ans, match_id });
                      } 
                    }

                    return res.status(200).send({ 'status': true, 'msg': 'success', 'body': shots_count });

                  } else {
                    let num_my = shots_count[0].shots_count;
                    let all_arr = sum[num_my];


                    if (all_arr) {
                      if (all_arr.type=="yellow_card") {
                        right_ans = "opt_1";
                        let resss = await get_card_result_add_02({ right_ans, match_id });
                      }
                      // this function use for user card result set  on  

                      // match_event count update 
                      let match_eventUpdate = match_event_shot_tbl.findOneAndUpdate({ "match_id": match_id, "event_type": "yellow_card_02" }, { $set: { "shots_count": sum.length } }, { new: true }, (err, updatedUser) => {
                        if (err) { console.log(err); return false } else { return true }
                      });



                    }

                    return res.status(200).send({ 'status': true, 'msg': 'success 11', 'body': all_arr });
                  }
                } else {
                  return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..', 'body': '' });

                }

              } catch (error) {
                console.log(error);
                return res.status(200).send({ 'status': false, 'msg': 'servr error' });
              }
            }

/////////////////---------------------------------------------////////////////////////////////////////
static get_card_16 = async (req, res) => {
    try {

      let response = await day_match_getID();
      let sumArr = [];

      if (response) {

        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_16(item);

          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -16  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -16 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }
  static get_card_03 = async (req, res) => {
    try {

      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_03(item);
          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -03  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -03 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }

  static get_card_06 = async (req, res) => {
    try {

      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_06(item);
          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -06  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -06 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }


  static get_card_09 = async (req, res) => {
    try {
      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_09(item);
          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -19  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -19 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }

  static get_card_19 = async (req, res) => {
    try {
      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_19(item);
          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -19  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -19 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }
  static get_card_22 = async (req, res) => {
    try {
      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          console.log("match_id is == ", item);
          let resp = await getCardGreaterThan_22(item);
          sumArr.push(resp);
        }));
      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -19  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -19 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }

 // importent code for cronjob  
 static get_card_18 = async (req, res) => {
  try {

   
    let match_id = req.body.match_id; // 2701198;
    console.log("get_card-18 match_id is  === ", match_id);
    let data = await matchCardEventAllData(match_id);
    if (data) {
      let sum = data.events[0].shots_on_target[0].event;

      let team_a_original_name = data.team_a_original_name;
      let team_b_original_name = data.team_b_original_name;

      // check event count     
      let shots_count = await match_event_shot_tbl.find({ "match_id": match_id, "event_type": "shots_on_target" }, "shots_count");
      let right_ans = '';
      if (isEmpty(shots_count)) {
        // add event count row   for  match_event_shot table   
        let add = new match_event_shot_tbl({
          match_id, "event_type": "shots_on_target", "shots_count": sum.length
        });
        let add_rows = await add.save();


        if (sum.length > 0) {
          if (team_a_original_name == sum[0].team) {
            right_ans = "opt_1";
          } else if (team_b_original_name == sum[0].team) {
            right_ans = "opt_2";
          } else { right_ans = "opt_3"; }
          console.log("first function call == ");
          // this function use for user card result set  on  
          let resss = await get_card_result_add_18({ right_ans, match_id });
        }

        return res.status(200).send({ 'status': true, 'msg': 'success33', 'body': shots_count });

      } else {
        let num_my = shots_count[0].shots_count;
        let all_arr = sum[num_my];


        if (all_arr) {
          if (team_a_original_name == all_arr.team) {
            right_ans = "opt_1";
          } else if (team_b_original_name == all_arr.team) {
            right_ans = "opt_2";
          } else { right_ans = "opt_3"; }

          // this function use for user card result set  on  
          let resss = await get_card_result_add_18({ right_ans, match_id });

          // match_event count update 
          let match_eventUpdate = match_event_shot_tbl.findOneAndUpdate({ "match_id": match_id, "event_type": "shots_on_target" }, { $set: { "shots_count": sum.length } }, { new: true }, (err, updatedUser) => {
            if (err) { console.log(err); return false } else { return true }
          });



        }

        return res.status(200).send({ 'status': true, 'msg': 'success 11', 'body': all_arr });
      }
    } else {
      return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..', 'body': '' });

    }

  } catch (error) {
    console.log(error);
    return res.status(200).send({ 'status': false, 'msg': 'servr error' });
  }
}

static get_card_008 = async (req, res) => {
  try {
    let match_id = req.body.match_id;
    let data = await team_matches_tbl.findOne({ match_id }, 'match_id date_utc ');

    if (data) {
      var date_cur = new Date();
      var date_old = new Date(data.date_utc);
      var seconds_cur = Math.floor(date_cur.getTime() / 1000);
      var seconds_old = Math.floor(date_old.getTime() / 1000);

      let apperance_times_data = await match_cards_tbl.findOne({ match_id: data._id }, 'apperance_times');
      let card_apperance_times = parseInt(apperance_times_data.apperance_times) * 60;
      let match_time = seconds_old + card_apperance_times;
      let matchEnd_seconds = seconds_old * 9000;

      console.log("seconds_cur == ", seconds_cur);
      console.log("seconds_old == ", seconds_old);
      console.log("match_time == ", match_time);

      if (seconds_cur >= match_time) {
        console.log("this card active");
        card_08_befor_call(match_id);
        card_39_befor_call(match_id);
        card_34_befor_call(match_id);
      } else { console.log("this card Not active "); }
      // let sum    = data.events.fouls.event;     
      return res.status(200).send({ 'status': true, 'msg': 'Success', 'body': data });

    } else {

      return res.status(200).send({ 'status': false, 'msg': 'no data found! ..', });
    }

  } catch (error) {
    console.log(error);
    return res.status(200).send({ 'status': false, 'msg': 'servr error' });
  }
}




////////// //////////////////////// end  used function for card ////////////////////////////////////////////////

  static get_card_001 = async (req, res) => {
    try {

      let response = await day_match_getID();
      let sumArr = [];


      if (response) {
        let resp = await getCardGreaterThan_22(response[0]);
        sumArr.push(resp);


        // let allData =  await Promise.all( response.map( async (item)=>{
        //   console.log( "match_id is == ",item );
        //    let resp = await getCardGreaterThan_22(item);
        //       sumArr.push(resp); })) ; 

      }

      return res.status(200).send({ 'status': true, 'msg': 'cronjob api card -16  calling ', 'body': sumArr });
    } catch (error) {
      console.log("cronjob api card -16 calling server error  == ", error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });

    }

  }


  static get_card_001_OLD = async (req, res) => {
    try {
      let match_id = '2701234';   // get_card_001_OLD;

      let card_id = mongoose.Types.ObjectId("63627be29f1c3eb8594fa7c4");

      console.log("get_card_001 is calling ");
      let pipeline = [];

      pipeline.push({ $match: { match_id: match_id } });
      pipeline.push({ $lookup: { from: 'play_match_cards', localField: '_id', foreignField: 'match_id', as: 'play_match_user' } });
      pipeline.push({ $unwind: "$play_match_user" });

      pipeline.push({
        $match: {
          "play_match_user.card_id": card_id, "play_match_user.active": true,
          "play_match_user.time_range_start": { $lte: 11 },
          "play_match_user.time_range_end": { $gte: 11 }
        }
      });


      pipeline.push({
        $project: {
          "_id": 0, "user_option": "$play_match_user.user_option", "point": "$play_match_user.point",
          "ans": "$play_match_user.ans", "user_play_card_id": "$play_match_user._id",
          "user_id": "$play_match_user.user_id", "card_id": "$play_match_user.card_id",
          "time_range_start": "$play_match_user.time_range_start", "time_range_end": "$play_match_user.time_range_end",
          "match_id": "$play_match_user.match_id", "active": "$play_match_user.active"
        }
      });




      let allUsersData = await team_matches_tbl.aggregate(pipeline).exec();



      return res.status(200).send({ 'status': true, 'msg': 'Success', 'body': allUsersData });

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
 
  // importent code for cronjob get_card_008 
  static get_card_0082 = async (req, res) => {
    try {
      let match_id = '2701198'; // 2701168;

      let data = await team_matches_tbl.findOne({ match_id }, 'match_id date_utc ');
      if (data) {
        var date_cur = new Date(); var date_old = new Date(data.date_utc);
        var seconds_cur = Math.floor(date_cur.getTime() / 1000); var seconds_old = Math.floor(date_old.getTime() / 1000);

        let apperance_times_data = await match_cards_tbl.findOne({ match_id: data._id }, 'apperance_times');
        let card_apperance_times = parseInt(apperance_times_data.apperance_times) * 60;
        let match_time = seconds_old + card_apperance_times;
        let matchEnd_seconds = seconds_old * 9000;

        console.log("seconds_cur == ", seconds_cur);
        console.log("seconds_old == ", seconds_old);
        console.log("match_time == ", match_time);

        if (seconds_cur >= match_time) {
          console.log("this card active");
          fouls_data_add(match_id);
        } else { console.log("this card Not active "); }



        // let sum    = data.events.fouls.event;     
        return res.status(200).send({ 'status': true, 'msg': 'Success', 'body': data });

      } else {

        return res.status(200).send({ 'status': false, 'msg': 'Success', });
      }

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
  // importent code for cronjob get_card_008 
 



  static get_card_004 = async (req, res) => {
    try {
      ///  Which team will receive most Red Cards?
      // READ CARD NO == 8      
      let match_id = 2701168; // 2701168;

      let data = await match_card_number(match_id, 8);
      console.log('get_card_004 == ', data);
      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_3", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });
        }

      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }


  static get_card_007 = async (req, res) => {
    try {
      ///  Which team will receive most Red Cards?

      let match_id = 2701168; // 2701168;

      let data = await match_card_number(match_id, 1);
      console.log('get_card_004 == ', data);
      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == '0' && data.team_a == '0') {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( no Fouls)  success", 'body': "opt_3", 'data': data });
        } else if (data.team_b == data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_3", 'data': data });

        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });

        }
        return res.status(200).send({ 'status': true, 'msg': " success", 'data': data });
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
  static get_card_0011 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;

      let data = await match_card_0011(match_id, 1);

      if (!isEmpty(data)) {
        if (data.team_a > 0 && data.team_b == 0) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > 0 && data.team_a == 0) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b > 0 && data.team_a > 0) {
          return res.status(200).send({ 'status': true, 'msg': "Both Team A & Team B  success", 'body': "opt_3", 'data': data });
        } else if (data.team_b == '0' && data.team_a == '0') {
          return res.status(200).send({ 'status': true, 'msg': "Neither Team A Nor Team B success", 'body': "opt_4", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': data });
        }
        return res.status(200).send({ 'status': true, 'msg': " success", 'data': data });
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }

  static get_card_0013 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;

      let data = await match_card_0013(match_id, 1);

      if (!isEmpty(data)) {
        if (data.winner == 'team_A') {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.winner == 'team_B') {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': " option_3 success", 'body': data });
        }
        return res.status(200).send({ 'status': true, 'msg': " success", 'data': data });
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }


  static get_card_0015 = async (req, res) => {
    try {
      ///  Which team will receive most Red Cards?




      let match_id = 2701168; // 2701168;

      let data = await match_card_0011(match_id);
      console.log('get_card_004 == ', data);
      if (!isEmpty(data)) {
        let x = data.team_a - data.team_b;
        let resultx = Math.abs(x);

        if (resultx == 1 || resultx == 2) {
          return res.status(200).send({ 'status': true, 'msg': "opt_1 win success", 'body': "opt_1", 'data': data });
        } else if (resultx == 3 || resultx == 4) {
          return res.status(200).send({ 'status': true, 'msg': "opt_2 win success", 'body': "opt_2", 'data': data });
        } else if (resultx > 4) {
          return res.status(200).send({ 'status': true, 'msg': "opt_3 success", 'body': "opt_3", 'data': data });
        } else {
          return res.status(200).send({ 'status': true, 'msg': "opt_4 success", 'body': "opt_4", 'data': data });
        }

      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
  static get_card_0017 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;
      let data = await match_card_number(match_id, 4);

      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == '0' && data.team_a == '0') {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_3", 'data': data });
        } else if (data.team_b == data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': " No shots by either team success", 'body': "opt_4", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });
        }
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
  static get_card_0020 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;
      let data = await match_card_number(match_id, 0);

      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == '0' && data.team_a == '0') {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_3", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });
        }
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }

  static get_card_0023 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;
      let data = await match_card_number(match_id, 2);

      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == '0' && data.team_a == '0') {
          return res.status(200).send({ 'status': true, 'msg': " 4. No offsite    success", 'body': "opt_3", 'data': data });
        } else if (data.team_b == data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_4", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });
        }
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }
  static get_card_0036 = async (req, res) => {
    try {
      let match_id = 2701168; // 2701168;
      let data = await match_card_number(match_id, 2);
      console.log("test fun call == ", data);
      // return data ; 

      if (!isEmpty(data)) {
        if (data.team_a > data.team_b) {
          return res.status(200).send({ 'status': true, 'msg': "tam_A win success", 'body': "opt_1", 'data': data });
        } else if (data.team_b > data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "tam_B win success", 'body': "opt_2", 'data': data });
        } else if (data.team_b == data.team_a) {
          return res.status(200).send({ 'status': true, 'msg': "equal to equal ( Equal )  success", 'body': "opt_3", 'data': data });
        } else {
          return res.status(200).send({ 'status': false, 'msg': "Result not show this time", 'body': '' });
        }
      } else {
        return res.status(200).send({ 'status': false, 'msg': "Match not show this time", 'body': '' });
      }





    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }

  static matchResult_show = async (req, res) => {
    try {

      let match_id = req.body.match_id;
      let data = await matchCardAllData(match_id);

      //  if( (!isEmpty( data)) && (!isEmpty(data.winner) && data.winner != 'yet unknown' )){

      if ((!isEmpty(data)) && (data[0].status == 'Played')) {
          let dx1 = await get_card_result_add_1({data});  //stat
              let dx4  = await get_card_result_add_4({data});  //stat
           let dx5  = await get_card_result_add_5({data});  //stat
           let dx7 = await get_card_result_add_7({data});  //stat

         let dx8 =   await get_card_result_add_08({data}); //stat //  *******spl fun ***

          let dx11  = await get_card_result_add_11({data});  //stat
         let dx13 = await get_card_result_add_13({data});     //stat
          let dx15 = await get_card_result_add_15({data});  //stat

        //test
        let dx18 = await getCardResult_18_END({data});  


          let dx17  = await get_card_result_add_17({data});    //
           let dx20 = await get_card_result_add_20({data});      //   
            let dx23 = await get_card_result_add_23({data});     //

        let dx34   = await get_card_result_add_34_endTimesCall({data})//  *******spl fun ***  
        //let dx36   = await get_card_result_add_36({data});   //no data in events
        let dx37   = await get_card_result_add_37({data});  
        let dx39   = await get_card_result_add_39({data});   // *******spl fun ***  
        
          let dx10  = await get_card_result_add_10({data});  
         let dx26  = await get_card_result_add_26({data});
         let dx31  = await get_card_result_add_31({data}); 
        
        let dx16 = await getCardResult_16_END({data});   // **** make date 2022-11-01 ***
        let dx03 = await getCardResult_03_END({data});   // **** make date 2022-11-01 ***
        let dx06 = await getCardResult_06_END({data});   // **** make date 2022-11-04 ***
        let dx09 = await getCardResult_09_END({data});   // **** make date 2022-11-02 ***
        let dx19   = await getCardResult_19_END({data});  // **** make date 2022-11-02 ***
         let dx22   = await getCardResult_22_END({data});   // **** make date 2022-11-02 ***
      /// add this function by mhn
         let dx21 = await getCardResult_21_END({data});  
         let dx2 = await getCardResult_02_END({data});  
 
      //top rankers bonus
        let bonus = await leaderboardController.rankBonus(match_id)

        return res.status(200).send({ 'status': true, 'msg': "success", 'body': "" });
      } else {
        return res.status(200).send({ 'status': false, 'msg': 'This match result not show time ', "body": "" });
      }


    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': 'servr error' });
    }
  }



  static jkk = async (req, res) => {
    try {
      // let updateData = { point: "10" };
      let updateData = { active: true, card_id: "634d37d58f16160a62ea52fc" };

      let response = await playMatchCards_tbl.updateMany({}, updateData);

      if (response) {
        return res.status(200).send({ 'status': true, 'msg': 'success', "body": response });
      } else {
        // res.json(result);
        return res.status(200).send({ 'status': false, 'msg': 'servr error' });
      }
    } catch (error) {
      console.log(error);
      return false;
    }

  }




  ///////////////////////////////////////////    
  static get_live_match_list = async (req, res) => {
    try {

      const encodedToken = `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=round&id=70596&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;

      var config = {
        method: 'get',
        url: session_url,
        headers: { 'Authorization': 'Basic ' + encodedToken }
      };

      let response = await axios(config);
      if (response) {
        let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;


        //  ['datasportsgroup', 'tour ', 'tour_season','competition','season','discipline','gender','round','list','match']); // true
        return res.status(200).send({ 'status': true, 'msg': 'success', 'body': datas });
      } else {
        return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..' });
      }



    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
  }


  static team_match_add = async (req, res) => {
    try {

      const encodedToken = `${Buffer.from('zimbori:8PFsL2Ce&!').toString('base64')}`;
      const session_url = `https://dsg-api.com/clients/zimbori/soccer/get_matches?type=round&id=67145&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;

      var config = {
        method: 'get',
        url: session_url,
        headers: { 'Authorization': 'Basic ' + encodedToken }
      };

      let response = await axios(config);
      if (response) {
        let datas = response.data.datasportsgroup.tour.tour_season.competition.season.discipline.gender.round.list.match;

        if (!isEmpty(datas)) {
          let sum = [];
          datas.map((item, index) => { team_match_addOne(item); sum.push(index); return item; });
          return res.status(200).send({ 'status': true, 'msg': 'success', 'body': sum });

        } else {
          return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..' });
        }

      } else {
        return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..' });
      }



    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
  }

  static pollResultNotification = async (req, res) => {
    try {


      return res.status(200).send({ 'status': true, 'msg': "success", 'body': '' });

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
  }

  static match_run = async (req, res) => {
    try {
      let paths = MyBasePath(req, res);
      let response = await day_match_getID();
      let sumArr = [];
      if (response) {
        let allData = await Promise.all(response.map(async (item) => {
          var config = {
            method: 'get', url: `${paths}/open_api/matchResult_show`,
            data: { "match_id": item }
          };

          let resp = await axios(config);
          sumArr.push(resp);
        }));
      }
      // console.log("new fun call == ", sumArr);

      return res.status(200).send({ 'status': true, 'msg': "success", 'body': '' });

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
  }

  static get_match_by_date = async (req, res) => {
    try {
      let date = req.body.date;
      let response = await day_match_getID()
      if (response) {
        return res.status(200).send({ 'status': true, 'msg': 'success', 'body': response });

      } else {
        return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..' });
      }



    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
  }
 

  static update_match_data_by_date = async (req, res) => {
    try {
      let date = req.body.date;
     if(date==undefined){
        date = getcurntDate();
      }
      

      let response = await day_match_add(date)
      
    if (response) {
        response.map(async (item)=>{
          let detail= await match_data_ara(item.match_id)
          let ara=detail.data;
          let league=detail.league_data;
        let match_details={
              "match_id": item.match_id,
              "match_name": item.team_a_name+" vs "+item.team_b_name,
              "match_name_ara": ara.team_a_name+" ضد "+ara.team_b_name,
              "league_logo": league.logo,
              "league_name": league.original_name,
              "league_id": league.season_id,
              "team_a_id": item.team_a_id,
              "team_a_name": item.team_a_name,
              "team_a_name_ara": ara.team_a_name,
              "team_a_logo": ara.team_a_logo,
              "team_a_short_name": item.team_a_short_name,
              "team_a_short_name_ara": ara.team_a_short_name,
              "team_b_id": item.team_b_id,
              "team_b_name": item.team_b_name,
              "team_b_name_ara": ara.team_b_name,
              "team_b_logo": ara.team_b_logo,
              "team_b_short_name": item.team_b_short_name,
              "team_b_short_name_ara": ara.team_b_short_name,
              "date_utc": item.date_utc,
              "time_utc": item.time_utc,
              "last_updated": item.last_updated,
              "status": item.status,
              "score_a": item.score_a,
              "score_b": item.score_b,
              "live": item.live[0]
          }
        let findOld=await team_matches_tbl.find({match_id:item.match_id});
        if(!isEmpty(findOld)){
          let update=await team_matches_tbl.findOneAndUpdate({match_id:item.match_id},match_details);
        }else{
          let add=new team_matches_tbl(match_details);
          let data=await add.save();
        }
          
      })


      return res.status(200).send({ 'status': true, 'msg': 'success', 'body': response });

      } else {
        return res.status(200).send({ 'status': false, 'msg': 'No Data Found!..' });
      }

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }
     }

}



module.exports = ConjobController;