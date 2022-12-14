const express = require("express");
const { getLocalDateTime, getcurntDate, isEmpty, before_after_Date, gen_str } = require('../myModel/common_modal');
const sport_tbl = require("../models/sport");
const league_tbl = require("../models/League");
const Player_tbl = require("../models/Player");
const Team_tbl = require("../models/Team");
const country_tbl = require("../models/country");
const { MyBasePath } = require("../myModel/image_helper");


const team_matches = require("../models/team_matches");
const playMatchCards = require("../models/playMatchCards");
const user_preference = require("../models/user_preference");
const league_list = require("../models/league_list");
const admin_settings = require('../models/admin_settings');


class MasterController {

  /// Sports function section 
  static sports_add = async (req, res) => {
    let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
    let name = req.body.name; let name_ara = req.body.name_ara; let name_fr = req.body.name_fr;

    if (isEmpty(name) || isEmpty(name_ara)) {
      return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
    }
    let add = new sport_tbl({ name, name_ara, name_fr, image });
    add.save((err, data) => {
      if (err) {
        console.log("sport err ==  ", err); return res.status(200).send({ "status": false, "msg": "something went wrong please try again", "body": '' });
      } else {
        return res.status(200).send({ "status": true, "msg": "Sport Add Successfully", "body": data });
      }
    });


  }

  static sports_get = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let name = req.body.name;
      let whr = {};
      let paths = MyBasePath(req, res);
      if (!isEmpty(name)) { whr.name = { $regex: '.*' + name + '.*', $options: 'i' }; }

      page = (isEmpty(page) || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }

      let query = sport_tbl.find(whr).sort({ _id: -1 });

      const query2 = query.clone();
      const counts = await query.countDocuments();



      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);
      let sport = [];
      if (records) {
        let d1 = await Promise.all(records.map(async (item) => {
          let total_select = await user_preference.find({ sport_id_mongo: item._id }).countDocuments();
          item.image = (item.image) ? `${paths}/image/assets/master/${item.image}` : '';
          sport.push({ ...item._doc, total_select })
          return item;
        }))
      }
      sport.sort((a, b) => {
        if (a.total_select > b.total_select) {
          return -1
        } else {
          return 1
        }
      })


      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': sport });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static sports_update = async (req, res) => {
    try {
      let id = req.params.id;
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';

      let name = req.body.name; let name_ara = req.body.name_ara; let name_fr = req.body.name_fr;

      if (isEmpty(name) || isEmpty(name_ara)) {
        return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
      }
      let updateData = isEmpty(image) ? { name, name_ara, name_fr } : { name, name_ara, image, name_fr };

      sport_tbl.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'Sport Updated Successfully', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Sport Id ', "body": '' });
        }


      });

    } catch (error) {
      return res.status(200).send({ "status": false, "msg": 'Server error', "body": '' });

    }


  }

  static sports_delete = async (req, res) => {
    try {
      let id = req.params.id;
      sport_tbl.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          console.log("jjj === ", err);           //json(err)

          let getError = JSON.parse(JSON.stringify(err));
          return res.status(200).send({ "status": false, "msg": getError.message, "body": '' });
        } else if (!isEmpty(docs)) {
          return res.status(200).send({ "status": true, "msg": 'Sport Deleted Successfully', "body": '' });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Sport Id ', "body": '' });
        }
      });

    } catch (error) { return res.status(200).send({ "status": true, "msg": 'Some error', "body": '' }); }

  }

  /// league function section 
  static league_add = async (req, res) => {
    let name = req.body.name;
    let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
    let name_ara = req.body.name_ara;

    if (isEmpty(name) || isEmpty(name_ara)) {
      return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
    }


    let add = new league_tbl({ name, image, name_ara });
    add.save((err, data) => {
      if (err) {
        return res.status(200).send({ "status": false, "msg": "Name Field Required", "body": '' });
      } else {
        return res.status(200).send({ "status": true, "msg": "League Add Successfully", "body": data });
      }
    });


  }

  static league_get = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let name = req.body.name;
      let whr = {};

      if (!isEmpty(name)) { whr.name = { $regex: '.*' + name + '.*', $options: 'i' }; }

      page = (isEmpty(page) || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }

      let query = league_tbl.find(whr).sort({ _id: -1 });

      const query2 = query.clone();
      const counts = await query.countDocuments();



      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);

      let paths = MyBasePath(req, res);
      if (records) {
        records.map((item) => {
          item.image = (item.image) ? `${paths}/image/assets/master/${item.image}` : '';
          return item;
        })
      }



      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static league_update = async (req, res) => {
    try {
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      let id = req.params.id;
      let name = req.body.name;
      let name_ara = req.body.name_ara;

      if (isEmpty(name) || isEmpty(name_ara)) {
        return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
      }

      let updateData = isEmpty(image) ? { name, name_ara } : { name, name_ara, image };

      league_tbl.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'league Updated Successfully', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid league Id ', "body": '' });
        }


      });

    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'Server error', "body": '' });

    }


  }

  static league_delete = async (req, res) => {
    try {
      let id = req.params.id;
      league_tbl.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          console.log("jjj === ", err);           //json(err)

          let getError = JSON.parse(JSON.stringify(err));
          return res.status(200).send({ "status": false, "msg": getError.message, "body": '' });
        } else if (!isEmpty(docs)) {
          return res.status(200).send({ "status": true, "msg": 'league Deleted Successfully', "body": '' });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid league Id ', "body": '' });
        }
      });

    } catch (error) { return res.status(200).send({ "status": true, "msg": 'Some error', "body": '' }); }

  }

  /// Team_tbl function section   team
  static team_add = async (req, res) => {
    let name = req.body.name;
    let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
    let name_ara = req.body.name_ara;

    if (isEmpty(name) || isEmpty(name_ara)) {
      return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
    }
    let add = new Team_tbl({ name, name_ara, image });
    add.save((err, data) => {
      if (err) {
        return res.status(200).send({ "status": false, "msg": "Name Field Required", "body": '' });
      } else {
        return res.status(200).send({ "status": true, "msg": "Team Add Successfully", "body": data });
      }
    });


  }

  static team_get = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let name = req.body.name;
      let whr = {};
      console.log(name)
      if (!isEmpty(name)) { whr.name = { $regex: '.*' + name + '.*', $options: 'i' }; }

      page = (isEmpty(page) || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }



      let query = Team_tbl.find(whr).sort({ _id: -1 });
      const query2 = query.clone();
      const counts = await query.countDocuments();



      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);

      let paths = MyBasePath(req, res);
      if (records) {
        records.map((item) => {
          item.image = (item.image) ? `${paths}/image/assets/master/${item.image}` : '';
          return item;
        })
      }

      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static team_update = async (req, res) => {
    try {
      let id = req.params.id;
      let name = req.body.name;
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      let name_ara = req.body.name_ara;

      if (isEmpty(name) || isEmpty(name_ara)) {
        return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
      }

      let updateData = (isEmpty(image)) ? { name, name_ara } : { name, name_ara, image };

      Team_tbl.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'Team Updated Successfully', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Team Id ', "body": '' });
        }


      });

    } catch (error) {
      return res.status(200).send({ "status": false, "msg": 'Server error', "body": '' });

    }


  }

  static team_delete = async (req, res) => {
    try {
      let id = req.params.id;
      Team_tbl.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          console.log("jjj === ", err);           //json(err)

          let getError = JSON.parse(JSON.stringify(err));
          return res.status(200).send({ "status": false, "msg": getError.message, "body": '' });
        } else if (!isEmpty(docs)) {
          return res.status(200).send({ "status": true, "msg": 'Team Deleted Successfully', "body": '' });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Team Id ', "body": '' });
        }
      });

    } catch (error) { return res.status(200).send({ "status": true, "msg": 'Some error', "body": '' }); }

  }
  /// Player_tbl function section   Player

  static player_add = async (req, res) => {
    let name = req.body.name;
    let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
    let name_ara = req.body.name_ara;

    if (isEmpty(name) || isEmpty(name_ara)) {
      return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
    }

    let add = new Player_tbl({ name_ara, name, image });
    add.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(200).send({ "status": false, "msg": 'something went wrong please try again', "body": '' });
      } else {
        return res.status(200).send({ "status": true, "msg": "Player Add Successfully", "body": data });
      }
    });


  }

  static player_get = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let name = req.body.name;
      let whr = {};

      if (!isEmpty(name)) { whr.name = { $regex: '.*' + name + '.*', $options: 'i' }; }

      page = (isEmpty(page) || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }

      let query = Player_tbl.find(whr).sort({ _id: -1 });
      const query2 = query.clone();
      const counts = await query.countDocuments();



      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);
      let paths = MyBasePath(req, res);
      if (records) {
        records.map((item) => {
          item.image = (item.image) ? `${paths}/image/assets/master/${item.image}` : '';
          return item;
        })
      }

      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static player_update = async (req, res) => {
    try {
      let id = req.params.id;
      let name = req.body.name;
      let image = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      let name_ara = req.body.name_ara;

      if (isEmpty(name) || isEmpty(name_ara)) {
        return res.status(200).send({ "status": false, "msg": "All Field Required", "body": '' });
      }
      let updateData = (isEmpty(image)) ? { name_ara, name } : { name_ara, name, image }


      Player_tbl.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'Player Updated Successfully', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Player Id ', "body": '' });
        }


      });

    } catch (error) {
      return res.status(200).send({ "status": false, "msg": 'Server error', "body": '' });

    }


  }

  static player_delete = async (req, res) => {
    try {
      let id = req.params.id;
      Player_tbl.findByIdAndDelete(id, function (err, docs) {
        if (err) {
          console.log("jjj === ", err);           //json(err)

          let getError = JSON.parse(JSON.stringify(err));
          return res.status(200).send({ "status": false, "msg": getError.message, "body": '' });
        } else if (!isEmpty(docs)) {
          return res.status(200).send({ "status": true, "msg": 'Player Deleted Successfully', "body": '' });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Player Id ', "body": '' });
        }
      });

    } catch (error) { return res.status(200).send({ "status": true, "msg": 'Some error', "body": '' }); }

  }


  static live_upcoming_match_list = async (req, res) => {
    try {
      let name = req.body.name;
      let date = getcurntDate();

      let whr = { date_utc: { $gte: date } };


      if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
      let records = await team_matches.find(whr, 'match_id _id match_name').sort({ 'date_utc': 1 });


      res.status(200).send({ 'status': true, 'msg': "success", 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static live_upcoming_match_all_data = async (req, res) => {
    try {
      let name = req.body.name;
      let date = getcurntDate();
      console.log(date)

      let whr = { date_utc: { $gte: date } };


      if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
      let records = await team_matches.find(whr).sort({ 'date_utc': 1 });

      let default_chat_time=await admin_settings.findOne().select("default_chat_start_time default_chat_end_time");
      records.map((item)=>{
         item.chat_start_time=item.chat_start_time==""?default_chat_time.default_chat_start_time.toString():item.chat_start_time;
         item.chat_end_time=item.chat_end_time==""?default_chat_time.default_chat_end_time.toString():item.chat_end_time;
         
      });
      res.status(200).send({ 'status': true, 'msg': "success", 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static all_team_match_list = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let s_date = req.body.s_date;
      let e_date = req.body.e_date;
      let name = req.body.name;
      let whr = {};

      if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
      if (!isEmpty(s_date) && !isEmpty(e_date)) { whr.date_utc = { $gte: s_date, $lte: e_date }; }
      page = (isEmpty(page) || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }

      let query = team_matches.find(whr).sort({ _id: -1 });
      const query2 = query.clone();
      const counts = await query.countDocuments();



      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);
      let paths = MyBasePath(req, res);


      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static all_team_match_list_mobile_old = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let s_date = req.body.s_date;
      let e_date = req.body.e_date;
      let name = req.body.name;
      let language = req.body.language;
      let whr = {};
      let date = before_after_Date();
      if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
      if (!isEmpty(s_date) && !isEmpty(e_date)) { whr.date_utc = { $gte: s_date, $lte: e_date }; } else {
        whr.date_utc = { $gte: date };
      }
      page = (isEmpty(page)

        || page == 0) ? 1 : page;
      if (!isEmpty(id)) { whr = { _id: id }; }

      let query = team_matches.find(whr).sort({ date_utc: 1 });
      const query2 = query.clone();
      const counts = await query.countDocuments();


      let offest = (page - 1) * 10;
      const records = await query2.skip(offest).limit(10);
      records.map((item) => {
        if (language == "ar") {
          item.match_name = item.match_name_ara;
          item.team_a_name = item.team_a_name_ara;
          item.team_a_short_name = item.team_a_short_name_ara;
          item.team_b_name = item.team_b_name_ara;
          item.team_b_short_name = item.team_b_short_name_ara;
        }
      })
      let paths = MyBasePath(req, res);


      res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': "server error" });
    }

  }

  static all_team_match_list_mobile_new = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let s_date = req.body.s_date;
      let e_date = req.body.e_date;
      let name = req.body.name;
      let language = req.body.language;
      let zone = req.body.zone;
      let user_id = req.body.user_id;
      if (!isEmpty(user_id)) {
        let whr = {};
        let league = await user_preference.distinct('season_id', { "user_id": user_id })
        console.log(league)
        if (!isEmpty(league)) { whr.league_id = { $in: league }; }
        if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
        if (!isEmpty(s_date) && !isEmpty(e_date)) { whr.date_utc = { $gte: s_date, $lte: e_date }; }
        page = (isEmpty(page) || page == 0) ? 1 : page;
        if (!isEmpty(id)) { whr = { _id: id }; }
        let query = team_matches.find(whr).sort({ date_utc: -1, time_utc: -1 });
        const query2 = query.clone();
        const counts = await query.countDocuments();


        let offest = (page - 1) * 10;
        const records = await query2.skip(offest).limit(10);
        records.map((item) => {
          let local = getLocalDateTime({ date_utc: item.date_utc, time_utc: item.time_utc, zone })
          item.date_utc = local.local_date;
          item.time_utc = local.local_time;
          if (language == "ar") {
            item.match_name = item.match_name_ara;
            item.team_a_name = item.team_a_name_ara;
            item.team_a_short_name = item.team_a_short_name_ara;
            item.team_b_name = item.team_b_name_ara;
            item.team_b_short_name = item.team_b_short_name_ara;
          }
        })
        let paths = MyBasePath(req, res);


        res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

      } else {
        let whr = {};
        let date = getcurntDate();
        console.log(date)
        if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
        if (!isEmpty(s_date) && !isEmpty(e_date)) { whr.date_utc = { $gte: s_date, $lte: e_date }; } else { whr.date_utc = { $gte: date }; }
        page = (isEmpty(page)


          || page == 0) ? 1 : page;
        if (!isEmpty(id)) { whr = { _id: id }; }

        let query = team_matches.find(whr).sort({ date_utc: 1, time_utc: 1 });
        const query2 = query.clone();
        const counts = await query.countDocuments();


        let offest = (page - 1) * 10;
        const records = await query2.skip(offest).limit(10);
        records.map((item) => {
          let local = getLocalDateTime({ date_utc: item.date_utc, time_utc: item.time_utc, zone })
          item.date_utc = local.local_date;
          item.time_utc = local.local_time;
          if (language == "ar") {
            item.match_name = item.match_name_ara;
            item.team_a_name = item.team_a_name_ara;
            item.team_a_short_name = item.team_a_short_name_ara;
            item.team_b_name = item.team_b_name_ara;
            item.team_b_short_name = item.team_b_short_name_ara;
          }
        })
        let paths = MyBasePath(req, res);


        res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

      }

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': "server error" });
    }

  }

  static all_team_match_list_mobile = async (req, res) => {
    try {
      let id = req.params.id;
      let page = req.body.page;
      let s_date = req.body.s_date;
      let e_date = req.body.e_date;
      let name = req.body.name;
      let language = req.body.language;
      let zone = req.body.zone;
      let user_id = req.body.user_id;
      if (!isEmpty(user_id)) {
        let whr = {};
        let date = getcurntDate();
        let pipeline = [
          {
            '$lookup': {
              'from': 'team_lists',
              'localField': 'team_a_id',
              'foreignField': 'team_id',
              'as': 'team_a_data'
            }
          }, {
            '$lookup': {
              'from': 'team_lists',
              'localField': 'team_b_id',
              'foreignField': 'team_id',
              'as': 'team_b_data'
            }
          }, {
            '$lookup': {
              'from': 'league_lists',
              'localField': 'league_id',
              'foreignField': 'season_id',
              'as': 'league_data'
            }
          }, {
            '$unwind': {
              'path': '$team_a_data'
            }
          }, {
            '$unwind': {
              'path': '$team_b_data'
            }
          }, {
            '$unwind': {
              'path': '$league_data'
            }
          }
        ]

        if (!isEmpty(name)) { pipeline.push({ $match: { match_name: { $regex: '(?i)' + name, $options: 'i' } } }); }
        if (!isEmpty(s_date) && !isEmpty(e_date)) { pipeline.push({ $match: { date_utc: { $gte: new Date(s_date), $lte: new Date(e_date) } } }) }
        let league = await user_preference.distinct('season_id', { "user_id": user_id, league_id_mongo: { $ne: "" } })
        console.log(league)
        pipeline.push({ $match: { league_id: { $in: league } } })
        page = (isEmpty(page)
          || page == 0) ? 1 : page;
        if (!isEmpty(id)) { whr = { _id: id }; }

        let query = team_matches.find(whr).sort({ date_utc: 1, time_utc: 1 });
        const query2 = query.clone();
        const counts = await query.countDocuments();


        let offest = (page - 1) * 10;

        const records = await team_matches.aggregate(pipeline).sort({ date_utc: 1, time_utc: 1 }).skip(offest).limit(10);
        let path = MyBasePath(req, res);
        records.map((item) => {
          let local = getLocalDateTime({ date_utc: item.date_utc, time_utc: item.time_utc, zone })
          item.date_utc = local.local_date;
          item.time_utc = local.local_time;
          if (language == "ar") {
            item.team_a_data.short_name_sportimo = item.team_a_data.short_name_ara_sportimo;
            item.team_b_data.short_name_sportimo = item.team_b_data.short_name_ara_sportimo;
            item.league_data.original_name_sportimo = item.league_data.original_name_ara_sportimo;

          } else if (language == "fr") {
            item.team_a_data.short_name_sportimo = item.team_a_data.short_name_fr_sportimo;
            item.team_b_data.short_name_sportimo = item.team_b_data.short_name_fr_sportimo;
            item.league_data.original_name_sportimo = item.league_data.original_name_fr_sportimo;
          }

          let match1 = item.team_a_data.team_logo_sportimo.match('http');
          if (item.team_a_data.team_logo_sportimo != 0 && match1 == null) {
            item.team_a_data.team_logo_sportimo = `${path}/image/assets/team_logo/${item.team_a_data.team_logo_sportimo}`
          }
          let match2 = item.team_b_data.team_logo_sportimo.match('http');
          if (item.team_b_data.team_logo_sportimo != 0 && match2 == null) {
            item.team_b_data.team_logo_sportimo = `${path}/image/assets/team_logo/${item.team_b_data.team_logo_sportimo}`
          }

          let match3 = item.league_data.league_logo_sportimo.match('http');
          if (item.league_data.league_logo_sportimo != 0 && match3 == null) {
            item.league_data.league_logo_sportimo = `${path}/image/assets/team_logo/${item.league_data.league_logo_sportimo}`
          }

        })



        res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

      } else {
        let whr = {};
        let date = getcurntDate();
        let pipeline = [
          {
            '$lookup': {
              'from': 'team_lists',
              'localField': 'team_a_id',
              'foreignField': 'team_id',
              'as': 'team_a_data'
            }
          }, {
            '$lookup': {
              'from': 'team_lists',
              'localField': 'team_b_id',
              'foreignField': 'team_id',
              'as': 'team_b_data'
            }
          }, {
            '$lookup': {
              'from': 'league_lists',
              'localField': 'league_id',
              'foreignField': 'season_id',
              'as': 'league_data'
            }
          }, {
            '$unwind': {
              'path': '$team_a_data'
            }
          }, {
            '$unwind': {
              'path': '$team_b_data'
            }
          }, {
            '$unwind': {
              'path': '$league_data'
            }
          }
        ]

        if (!isEmpty(name)) { pipeline.push({ $match: { match_name: { $regex: '(?i)' + name, $options: 'i' } } }); }
        if (!isEmpty(s_date) && !isEmpty(e_date)) { pipeline.push({ $match: { date_utc: { $gte: new Date(s_date), $lte: new Date(e_date) } } }) } else { pipeline.push({ $match: { date_utc: { $gte: new Date(date) } } }) }
        page = (isEmpty(page)
          || page == 0) ? 1 : page;
        if (!isEmpty(id)) { whr = { _id: id }; }

        let query = team_matches.find(whr).sort({ date_utc: 1, time_utc: 1 });
        const query2 = query.clone();
        const counts = await query.countDocuments();


        let offest = (page - 1) * 10;

        const records = await team_matches.aggregate(pipeline).sort({ date_utc: 1, time_utc: 1 }).skip(offest).limit(10);
        let path = MyBasePath(req, res);
        records.map((item) => {
          let local = getLocalDateTime({ date_utc: item.date_utc, time_utc: item.time_utc, zone })
          item.date_utc = local.local_date;
          item.time_utc = local.local_time;
          if (language == "ar") {
            item.team_a_data.short_name_sportimo = item.team_a_data.short_name_ara_sportimo;
            item.team_b_data.short_name_sportimo = item.team_b_data.short_name_ara_sportimo;
            item.league_data.original_name_sportimo = item.league_data.original_name_ara_sportimo;

          } else if (language == "fr") {
            item.team_a_data.short_name_sportimo = item.team_a_data.short_name_fr_sportimo;
            item.team_b_data.short_name_sportimo = item.team_b_data.short_name_fr_sportimo;
            item.league_data.original_name_sportimo = item.league_data.original_name_fr_sportimo;
          }

          let match1 = item.team_a_data.team_logo_sportimo.match('http');
          if (item.team_a_data.team_logo_sportimo != 0 && match1 == null) {
            item.team_a_data.team_logo_sportimo = `${path}/image/assets/team_logo/${item.team_a_data.team_logo_sportimo}`
          }
          let match2 = item.team_b_data.team_logo_sportimo.match('http');
          if (item.team_b_data.team_logo_sportimo != 0 && match2 == null) {
            item.team_b_data.team_logo_sportimo = `${path}/image/assets/team_logo/${item.team_b_data.team_logo_sportimo}`
          }

          let match3 = item.league_data.league_logo_sportimo.match('http');
          if (item.league_data.league_logo_sportimo != 0 && match3 == null) {
            item.league_data.league_logo_sportimo = `${path}/image/assets/team_logo/${item.league_data.league_logo_sportimo}`
          }

        })


        res.status(200).send({ 'status': true, 'msg': "success", "page": page, "rows": counts, 'body': records });

      }

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': "server error" });
    }

  }

  static all_league_list_mobile = async (req, res) => {
    try {
      let id = req.params.id;
      let s_date = req.body.s_date;
      let e_date = req.body.e_date;
      let language = req.body.language;
      let zone = req.body.zone;
      let user_id = req.body.user_id;

      let whr = { status: { $ne: "Played" } };

      if (!isEmpty(s_date) && !isEmpty(e_date)) { whr.date_utc = { $gte: s_date, $lte: e_date }; }
      if (!isEmpty(id)) { whr = { _id: id }; }
      let league = await team_matches.distinct('league_id', whr)
      let records = await league_list.find({ season_id: { $in: league } })
      let path = MyBasePath(req, res);
      records.map((item) => {
        let match = item.league_logo.match('http')
        if (item.league_logo.length != 0 && match == null) {
          item.league_logo = `${path}/image/assets/league_logo/${item.league_logo}`
        }
        if (language == "ar") {
          item.original_name = item.original_name_ara
        }
      })


      res.status(200).send({ 'status': true, 'msg': "success", 'body': records });



    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': "server error" });
    }

  }


  static deleteOne = async (req, res) => {
    let _id = req.body._id
    let result = await team_matches.findOneAndDelete({ _id })
    res.status(200).send({ 'status': true, 'msg': "success", 'body': result });

  }

  static past_match_list = async (req, res) => {
    try {
      let name = req.body.name;
      let date = getcurntDate();

      let whr = { date_utc: { $lt: date } };


      if (!isEmpty(name)) { whr.match_name = { $regex: '.*' + name + '.*', $options: 'i' }; }
      let records = await team_matches.find(whr, 'match_id _id match_name').sort({ 'date_utc': 1 });


      res.status(200).send({ 'status': true, 'msg': "success", 'body': records });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static match_chat_time_update = async (req,res)=>{
    try{
      let _id=req.params.id;
      let chat_start_time=req.body.chat_start_time;
      let chat_end_time=req.body.chat_end_time;
      let details={}
      if(!isEmpty(chat_start_time)){details={...details,chat_start_time}};
      if(!isEmpty(chat_end_time)){details={...details,chat_end_time}};
      let update=await team_matches.findOneAndUpdate({_id},details,{new:true});
      if(!isEmpty(update)){
        return res.status(200).send({status:true,msg:"success",body:update});
      }else{
      return res.status(200).send({status:false,msg:"something went wrong"});
      }
    }catch (error){
      console.log(error)
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

}

module.exports = MasterController;

