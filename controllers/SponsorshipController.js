let express_2 = require('express');
const mongoose = require('mongoose');
const { MyBasePath } = require("../myModel/image_helper");
const { sentEmail, gen_str, getcurntDate, getTime, send_mobile_otp, isEmpty } = require('../myModel/common_modal');


const { poll_percent, all_list_come } = require('../myModel/helper_fun');



// const state_tbl = require('../models/state_tbl');    
const user_tbl = require('../models/user');
const admin_tbl = require('../models/admin');
const poll_tbl = require('../models/poll');
const Sponsorship_tbl = require('../models/Sponsorship');
const { insertMany } = require('../models/user');

class Sponsorship {

  static sponsor_list = async (req, res) => {
    try {
      let language = req.body.language;
      let match = req.body.match; let match_len = (match || '').length;
      let view_type = req.body.view_type; let view_type_len = (view_type || '').length;
      let Fdate = req.body.Fdate; let Fdate_len = (Fdate || '').length;
      let Ldate = req.body.Ldate; let Ldate_len = (Ldate || '').length;
      let league_id = req.body.league_id; let league_id_len = (league_id || '').length;
      let whr = {};
      if (match_len > 0) { whr.match = match; };
      if (league_id_len > 0) { whr.league_id = league_id; };
      if (view_type_len > 0) { whr.view_type = view_type; };
      if (Fdate_len > 0 && Ldate_len > 0) { whr.Fdate = { $gte: Fdate }; whr.Fdate = { $lte: Ldate }; };
      let path = MyBasePath(req, res)
      console.log(whr)
      let data = await Sponsorship_tbl.find(whr);
      data.map((item) => {
        item.image = `${path}/image/assets/sponsorship_image/${item.image}`;
      })

      res.status(200).send({ 'status': true, 'msg': (language == 'ar') ? "النجاح" : "success", 'body': data });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': (language == 'ar') ? "خطأ في الخادم" : "server error" });
    }

  }

  static sponsor_list_user = async (req, res) => {
    try {
      let language = req.body.language;
      let match = req.body.match; let match_len = (match || '').length;
      let view_type = req.body.view_type; let view_type_len = (view_type || '').length;
      let Fdate = req.body.Fdate; let Fdate_len = (Fdate || '').length;
      let Ldate = req.body.Ldate; let Ldate_len = (Ldate || '').length;
      let league_id = req.body.league_id; let league_id_len = (league_id || '').length;
      let whr = {};
      if (match_len > 0) { whr.match = match; };
      if (league_id_len > 0) { whr.league_id = league_id; };
      if (view_type_len > 0) { whr.view_type = view_type; };
      if (Fdate_len > 0 && Ldate_len > 0) { whr.Fdate = { $gte: Fdate }; whr.Fdate = { $lte: Ldate }; };
      let path = MyBasePath(req, res)
      console.log(whr)
      let data = await Sponsorship_tbl.find(whr);
      if(isEmpty(data)){
        whr.league_id = "0";
        data=await Sponsorship_tbl.find(whr);
      }
      data.map((item) => {
        item.image = `${path}/image/assets/sponsorship_image/${item.image}`;
      })

      res.status(200).send({ 'status': true, 'msg': (language == 'ar') ? "النجاح" : "success", 'body': data });

    } catch (error) {
      console.log(error);
      res.status(200).send({ 'status': false, 'msg': (language == 'ar') ? "خطأ في الخادم" : "server error" });
    }

  }

  static sponsor_detail_user = async (req, res) => {
    try {
      let id = req.params.id;
      let data = await Sponsorship_tbl.find({ "_id": mongoose.Types.ObjectId(id) });

      let paths = MyBasePath(req, res);
      if (data.length > 0) {
        let allData = await Promise.all(data.map(async (sendData) => {
          let sport_name = await all_list_come(sendData.sports, 1);
          let league_name = await all_list_come(sendData.league, 2);
          let team_name = await all_list_come(sendData.team, 3);
          let players_name = await all_list_come(sendData.players, 4);
          let country_name = await all_list_come(sendData.country, 5);


          let img = `${paths}/image/assets/sponsorship_image/${sendData.image}`;
          //console.log ("call my data == " , dd );
          return { img, sport_name, league_name, team_name, players_name, country_name, "allData": sendData };
        }));

        return res.status(200).send({ 'status': true, 'msg': "success", 'body': allData });

      } else {
        return res.status(200).send({ 'status': false, 'msg': "No data Found !..", 'body': '' });
      }

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }

  static sponsor_detail = async (req, res) => {
    try {
      let id = req.params.id;
      let data = await Sponsorship_tbl.find({ "_id": mongoose.Types.ObjectId(id) });

      let paths = MyBasePath(req, res);
      if (data.length > 0) {
        data.map( (sendData) => {
        

          sendData.image = `${paths}/image/assets/sponsorship_image/${sendData.image}`;
          //console.log ("call my data == " , dd );
          return  sendData ;
        });

        return res.status(200).send({ 'status': true, 'msg': "success", 'body': data });

      } else {
        return res.status(200).send({ 'status': false, 'msg': "No data Found !..", 'body': '' });
      }

    } catch (error) {
      console.log(error);
      return res.status(200).send({ 'status': false, 'msg': error, 'body': '' });
    }

  }



  static add_sponsor_old = async (req, res) => {

    try {
      let user_data = req.body;
      console.log('server get value == ', user_data);
      let match_len = (user_data.match || '').length;
      if (match_len == 0) {
        return res.status(200).send({ "status": false, "msg": 'All filed Required', "body": '' });

      }

      let img = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';

      let add = new Sponsorship_tbl({

        "match": user_data.match,
        "image": img,
        "sports": user_data.sports,
        "league": user_data.league,
        "team": user_data.team,
        "players": user_data.players,
        "country": user_data.country,

        "skip_add": user_data.skip_add,
        "view_type": user_data.view_type,
        "Fdate": user_data.Fdate,
        "Ldate": user_data.Ldate,
        "reward_type": user_data.reward_type,
        "reward_quantity": user_data.reward_quantity,
        "created_date": getcurntDate(),
      });

      add.save((err, data) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else {

          return res.status(200).send({ "status": true, "msg": 'Sponsorship Created Successfully', "body": data });
        }
      });







    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'some errors ', "body": '' });

    }


  }
  /// updated date 2022-09-27          
  static add_sponsor = async (req, res) => {
    try {
      let user_data = req.body;
      //console.log('server get value == ', user_data);
      let match_len = (user_data.match || '').length;
      if (match_len == 0) {
        return res.status(200).send({ "status": false, "msg": 'All filed Required', "body": '' });

      }

      let img = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';
      var sponseor = {

        "match": user_data.match,
        "league_name": user_data.league_name,
        "league_id": user_data.league_id,
        "image": img,
        // "sports": JSON.parse(user_data.sports),
        // "league": JSON.parse(user_data.league),
        // "team": JSON.parse(user_data.team),
        // "country": JSON.parse(user_data.country),

        "skip_add": user_data.skip_add,
        "view_type": user_data.view_type,
        "Fdate": user_data.Fdate,
        "Ldate": user_data.Ldate,
        "reward_type": user_data.reward_type,
        "reward_quantity": user_data.reward_quantity,
        "created_date": getcurntDate()
      }
      if (user_data.cta == 1) {
        sponseor = {
          ...sponseor,
          "cta": user_data.cta,
          "cta_label": user_data.cta_label,
          "cta_url": user_data.cta_url,
          "cta_module": user_data.cta_module,
          "cta_moduleID": user_data.cta_moduleID
        }
      }

      var add = new Sponsorship_tbl(sponseor)
      add.save((err, data) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else {

          return res.status(200).send({ "status": true, "msg": 'Sponsorship Created Successfully', "body": data });
        }
      });







    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'some errors ', "body": '' });

    }


  }



  static update_sponsor = async (req, res) => {

    try {

      let id = req.params.id;
      let user_data = req.body;
      console.log('server get value == ', user_data);

    
      let img = ((req.files) && (req.files.image != undefined) && (req.files.image.length > 0)) ? req.files.image[0].filename : '';

      let setDataMy = {};

      let match = user_data.match;
      let image = img;
      // let sports =  JSON.parse(user_data.sports);
      // let league =  JSON.parse(user_data.league);
      // let team =  JSON.parse(user_data.team);
      // let country =  JSON.parse(user_data.country);
      let skip_add = user_data.skip_add;
      let view_type = user_data.view_type;
      let Fdate = user_data.Fdate;
      let Ldate = user_data.Ldate;
      let league_id = user_data.league_id;
      let league_name = user_data.league_name;
    
      if (!isEmpty(match)) { setDataMy = { ...setDataMy, match} }
      if (!isEmpty(image)) { setDataMy = { ...setDataMy, image} }
      // if (!isEmpty(league)) { setDataMy = { ...setDataMy, league} }
      // if (!isEmpty(sports)) { setDataMy = { ...setDataMy, sports} }
      // if (!isEmpty(team)) { setDataMy = { ...setDataMy, team} }
      // if (!isEmpty(country)) { setDataMy = { ...setDataMy,country} }
      if (!isEmpty(skip_add)) { setDataMy = { ...setDataMy, skip_add} }
      if (!isEmpty(view_type)) { setDataMy = { ...setDataMy, view_type} }
      if (!isEmpty(Fdate)) { setDataMy = { ...setDataMy, Fdate} }
      if (!isEmpty(Ldate)) { setDataMy = { ...setDataMy, Ldate} }
      if (!isEmpty(league_id)) { setDataMy = { ...setDataMy, league_id} }
      if (!isEmpty(league_name)) { setDataMy = { ...setDataMy, league_name} }
      if (user_data.cta == 1) {
        setDataMy = {
          ...setDataMy,
          "cta": user_data.cta,
          "cta_label": user_data.cta_label,
          "cta_url": user_data.cta_url,
          "cta_module": user_data.cta_module,
          "cta_moduleID": user_data.cta_moduleID
        }
      } else {
        setDataMy = {
          ...setDataMy,
          "cta": 0,
          "cta_label": '',
          "cta_url": '',
          "cta_module": '',
          "cta_moduleID": ''
        }
      }

      if (img != '') { setDataMy.image = img }

      Sponsorship_tbl.findOneAndUpdate({ _id: id }, { $set: setDataMy }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'Sponsorship Updated Successfully', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Sponsorship Id ', "body": '' });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'some errors ', "body": '' });

    }


  }

  static delete_sponsor = async (req, res) => {

    try {

      let id = req.params.id;

      Sponsorship_tbl.findOneAndDelete({ _id: id }, (err, updatedUser) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else if (!isEmpty(updatedUser)) {
          return res.status(200).send({ "status": true, "msg": 'Sponsorship Deleted ', "body": updatedUser });
        } else {
          return res.status(200).send({ "status": false, "msg": 'Invalid Sponsorship Id ', "body": '' });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'some errors ', "body": '' });

    }


  }

  static poll_participant = async (req, res) => {

    try {

      let user_data = req.body;
      console.log('server get value == ', user_data);


      let user_id_len = (user_data.user_id || '').length;
      let poll_id_len = (user_data.poll_id || '').length;
      let poll_option_len = (user_data.poll_option || '').length;

      if (user_id_len == 0 || poll_id_len == 0 || poll_option_len == 0) {
        return res.status(200).send({ "status": false, "msg": 'All filed Required', "body": '' });

      }
      let whr = { "poll_id": user_data.poll_id, "user_id": user_data.user_id, "user_ans": user_data.poll_option };
      let datas = await poll_result_tbl.find(whr);
      if (datas.length > 0) {
        console.log("check poll user == ", datas)
        return res.status(200).send({ "status": false, "msg": 'This poll allredy add ', "body": '' });
      }

      let add = new poll_result_tbl(whr);
      add.save((err, data) => {
        if (err) {
          console.log("errror sii == ", err);
          return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
        } else {
          return res.status(200).send({ "status": true, "msg": 'Poll Created Successfully', "body": data });
        }
      });




    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'no data add', "body": '' });

    }


  }

  static poll_result_show = async (req, res) => {
    try {

      let poll_id = req.params.poll_id;



      ////////////////////////////////////////////////////////////////////////
      poll_result_tbl.aggregate()
        .match({ poll_id: mongoose.Types.ObjectId(poll_id) })
        .append({ "$group": { _id: "$user_ans", count: { $sum: 1 } } })
        .allowDiskUse(true)
        .exec(function (err, data) {
          if (err) {
            console.log('err==', err);
            return res.status(200).send({ "status": false, "msg": 'No data Found!..', "body": '' });
          } else {
            console.log(data);

            if (data.length > 0) {

              return res.status(200).send({ "status": true, "msg": 'success', "body": data });
            } else {
              return res.status(200).send({ "status": false, "msg": 'No data Found!..', "body": '' });
            }
          }
        });


      ////////////////////////////////////////////////////////////////
      //let datass =  poll_result_tbl.find({"poll_id":poll_id}).select({name:1}).countDocuments();


    } catch (error) {
      console.log(error);
      return res.status(200).send({ "status": false, "msg": 'no data add', "body": '' });

    }

  }


  /// my_polls


  static my_polls_old = async (req, res) => {
    try {
      let user_id = req.params.id;

      //          var query = poll_result_tbl.find({ 'user_id': user_id});
      //          query.populate({path: "poll_id",select:['match','qus','ops_1','ops_2','ops_3']});
      //           query.exec(function (err, person) {
      //           if (err){ console.log(err); 
      //             return res.status(200).send({"status":false,"msg":'No Data found1..' }) ; 
      //           }else{ 
      //           // Prints "Space Ghost is a talk show host."

      //             return res.status(200).send({"status":true,"msg":'Success' , "body": person }) ;     
      //                 }

      // });                                                   

      ////////////////////////////////////
      poll_result_tbl.aggregate([
        { "$match": { "user_id": mongoose.Types.ObjectId(user_id) } },
        {
          $lookup: {
            from: "poll_tbls",
            localField: "poll_id",
            foreignField: "_id",
            as: "jkDatas",
          }
        }, {
          $lookup: {
            from: "user_tbls",
            localField: "user_id",
            foreignField: "_id",
            as: "uData",
          }
        }
      ])

        .exec(function (err, data) {
          if (err) {
            console.log('err==', err);
            return res.status(200).send({ "status": false, "msg": 'No data Found!..', "body": '' });
          } else {
            console.log(data);

            if (data.length > 0) {

              return res.status(200).send({ "status": true, "msg": 'success', "body": data });
            } else {
              return res.status(200).send({ "status": false, "msg": 'No data Found!..', "body": '' });
            }
          }
        });




      /////////////////////////////////////////////////////////////////////

    } catch (error) {
      console.log("some error is == ", error);
      return res.status(200).send({ status: false, msg: 'some error', "body": '' });

    }
  }


  static my_polls = async (req, res) => {
    try {
      let pipeline = [];

      pipeline.push({ $match: { user_id: mongoose.Types.ObjectId(req.params.id) } });

      //    pipeline.push({ $lookup: {from: 'user_tbls', localField: 'user_id', foreignField: '_id', as: 'user'} });
      pipeline.push({ $lookup: { from: 'poll_tbls', localField: 'poll_id', foreignField: '_id', as: 'pollData' } });

      //   pipeline.push({ $unwind: "$user" });
      pipeline.push({ $unwind: "$pollData" });

      pipeline.push({
        $project: {
          "_id": 1, "user_ans": 1, "poll_id": 1, "match": "$pollData.match", "poll_qs": "$pollData.qus", "ops_1": "$pollData.ops_1",
          "ops_2": "$pollData.ops_2", "ops_3": "$pollData.ops_3", "ops_4": "$pollData.ops_4"
        }
      });

      let someData = await poll_result_tbl.aggregate(pipeline).exec();

      if (someData.length > 0) {

        let allData = await Promise.all(someData.map(async (item) => {
          item.poll_parcents = await poll_percent(item.poll_id);
          return item;
        }));

        return res.status(200).send({ "status": true, "msg": 'success', "body": allData });
      } else {
        return res.status(200).send({ "status": false, "msg": 'No data found', "body": [] });
      }


    }
    catch (err) {
      console.log("some error == ", err);
      return res.status(200).json({
        title: "Something went wrong. Please try again.",
        error: true,
        details: err
      });
    }

  }


  static sponsorship_impressions_count_add = async (req, res) => {
    try {

      let sponsorship_id = req.body.sponsorship_id;
      if (isEmpty(sponsorship_id)) {
        return res.status(200).sened({ "status": false, "msg": "Sponsorship Id Required ", "body": "" });
      }
      let getData = await Sponsorship_tbl.find({ "_id": sponsorship_id });

      if (getData.length > 0) {
        let impressions_count = (getData[0].impressions_count > 0) ? getData[0].impressions_count + 1 : 1;

        Sponsorship_tbl.findOneAndUpdate({ _id: sponsorship_id }, { $set: { impressions_count } }, { new: true }, (err, updatedUser) => {
          if (err) {
            console.log(err);
            return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
          } else if (!isEmpty(updatedUser)) {
            return res.status(200).send({ "status": true, "msg": 'impressions_count add  Successfully', "body": updatedUser.impressions_count });
          } else {
            return res.status(200).send({ "status": false, "msg": 'Invalid Sponsorship Id ', "body": '' });
          }
        });



      } else {
        return res.status(200).sened({ "status": false, "msg": "Invalid Sponsorship Id ", "body": "" });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).sened({ "status": false, "msg": "Invalid Sponsorship Id ", "body": "" });
    }



  }


  static sponsorship_clicks_count_add = async (req, res) => {
    try {

      let sponsorship_id = req.body.sponsorship_id;
      if (isEmpty(sponsorship_id)) {
        return res.status(200).sened({ "status": false, "msg": "Sponsorship Id Required ", "body": "" });
      }
      let getData = await Sponsorship_tbl.find({ "_id": sponsorship_id });

      if (getData.length > 0) {
        let clicks_count = (getData[0].clicks_count > 0) ? getData[0].clicks_count + 1 : 1;

        Sponsorship_tbl.findOneAndUpdate({ _id: sponsorship_id }, { $set: { clicks_count } }, { new: true }, (err, updatedUser) => {
          if (err) {
            console.log(err);
            return res.status(200).send({ "status": false, "msg": 'An error occurred', "body": '' });
          } else if (!isEmpty(updatedUser)) {
            return res.status(200).send({ "status": true, "msg": 'Sponsorship clicks add Successfully', "body": updatedUser.clicks_count });
          } else {
            return res.status(200).send({ "status": false, "msg": 'Invalid Sponsorship Id ', "body": '' });
          }
        });



      } else {
        return res.status(200).sened({ "status": false, "msg": "Invalid Sponsorship Id ", "body": "" });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).sened({ "status": false, "msg": "Invalid Sponsorship Id ", "body": "" });
    }



  }






}







module.exports = Sponsorship;      