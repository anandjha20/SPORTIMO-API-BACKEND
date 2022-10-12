let  express_2 = require('express');
let mongoose = require('mongoose');




const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds,matchWinUsersRank } = require('../myModel/helper_fun');

const  {MyBasePath} = require("../myModel/image_helper");


// all mongodb schema    
const user_tbl = require('../models/user');    
const sport_tbl = require('../models/sport');    
const League_tbl = require('../models/League');    
const Team_tbl = require('../models/Team');    
const Player_tbl = require('../models/Player');    
const block_user_tbl = require('../models/block_user');  
const default_massages_tbl = require('../models/default_massages');  
const user_logs = require('../models/user_logs');  
const content_tbls = require('../models/content_tbls'); 
const userLanguage = require("../models/userLanguage");            
const follower_tbls = require("../models/follower_users");   
const transaction_tbls = require("../models/transactions")      
const prediction_card_tbl = require("../models/prediction_cards")      




class leaderboardController { 

// static leaderboard = async (req,res)=>{
//     try{
//         let match_id =  req.body.match_id;
// 		if(isEmpty(match_id)){
// 			return res.status(200).send({"status":false,"msg":"Match Id Field Required"});
// 		}

// 		   let response =  await matchWinUsersRank(match_id);     
// 		   if(response){
// 			return res.status(200).send({"status":false,"msg":"success","body":response});
// 		}else{
// 			return res.status(200).send({"status":false,"msg":"server error"});
// 		}
        
// 			}catch (error){
//         console.log(error)
//         return res.status(200).send({"status":false,"msg":"server error","body":''});
//     }
//}

static leaderboard = async (req, res) => {
	try {
		let finduserID = await transaction_tbls.find()
		console.log(finduserID)

		var matchID = req.body.matchID





		if (isEmpty(matchID)) {

			let userIDs = []
			for (let items of finduserID) {
				//console.log(items)
				let finduser = await user_tbl.find({ _id: items.user_id })
				userIDs.push(finduser)
			}

			let finduser = await user_tbl.find()

			var trans = []
			for (let userr of finduser) {

				let findtransections = await transaction_tbls.find({ user_id: userr._id })

				trans.push({ ...userr._doc, transections: findtransections })
			}


			let final = []
			let final1 = []
			for (let ele of trans) {
				if (ele.transections) {
					final1.push(ele)
				}

			}

			let final12 = []
			for (let i of final1) {
				var sum = 0;
				for (let j of i.transections) {
					sum += j.points
				}

				let obj = {
					_id: i._id,
					name: i.name,
					Image:i.image,
					points: sum
				}
				final12.push(obj)

			}

			let sorted = final12.sort(function (c1, c2) {
				if (c1.points < c2.points) {
					return 1;
				} else {
					return -1;
				}
			})


			let findthree = [];
			sorted.map((item)=>{
				if(item.points>0){
					findthree.push(item)
				}
			})
			//.slice(0,3);

			//console.log(findthree)

			return res.status(200).send({ status: true, data: findthree })

		} else {

			let findtrans = await transaction_tbls.find({ match_id: matchID })

			//console.log(findtrans)

			if (findtrans.length == 0) {
				return res.status(200).send({ status: false, msg: "No data found" })
			}



			let userIDs = []
			for (let items of finduserID) {
				//console.log(items)
				let finduser = await user_tbl.find({ _id: items.user_id })
				userIDs.push(finduser)
			}

			let finduser = await user_tbl.find()

			var trans = []
			for (let userr of finduser) {

				let findtransections = await transaction_tbls.find({ match_id: matchID, user_id: userr._id })

				trans.push({ ...userr._doc, transections: findtransections })
			}


			let final = []
			let final1 = []
			for (let ele of trans) {
				if (ele.transections) {
					final1.push(ele)
				}

			}

			let final12 = []
			for (let i of final1) {
				var sum = 0;
				let matchdata = []
				for (let j of i.transections) {
					matchdata.push(j)
					sum += j.points
				}

				let obj = {
					_id: i._id,
					name: i.name,
					Image:i.image,
					points: sum,
					//match_id: findmatchID
				}
				final12.push(obj)


			}

			let sorted = final12.sort(function (c1, c2) {
				if (c1.points < c2.points) {
					return 1;
				} else {
					return -1;
				}
			})

			let findthree = [];
			sorted.map((item)=>{
				if(item.points>0){
					findthree.push(item)
				}
			})
			

			//console.log(findthree)

			return res.status(200).send({ status: true,msg:"data found", body: findthree })

		}

	} catch (error) {
		console.log(error)
		return res.status(200).send({ status: false,msg:"server error"})
	}
}



static leaderboard2 = async (req, res) => {
	try {
		let finduserID = await transaction_tbls.find();

		var matchID = req.body.match_id;
			console.log("leaderboard fun call == ",matchID )	;
		if (Object.keys(req.body).length == 0) {

			let userIDs = []
			for (let items of finduserID) {
				//console.log(items)
				let finduser = await user_tbl.find({ _id: items.user_id })
				userIDs.push(finduser)
			}

			let finduser = await user_tbl.find()

			var trans = []
			for (let userr of finduser) {

				let findtransections = await transaction_tbls.find({ user_id: userr._id })

				trans.push({ ...userr._doc, transections: findtransections })
			}


			let final = []
			let final1 = []
			for (let ele of trans) {
				if (ele.transections) {
					final1.push(ele)
				}

			}

			let final12 = []
			for (let i of final1) {
				var sum = 0;
				for (let j of i.transections) {
					sum += j.points
				}

				let obj = {
					_id: i._id,
					name: i.name,
					points: sum
				}
				final12.push(obj)

			}

			let sorted = final12.sort(function (c1, c2) {
				if (c1.points < c2.points) {
					return 1;
				} else {
					return -1;
				}
			})


			let findthree = sorted.slice(0,3);

			//console.log(findthree)

			return res.status(200).send({ status: true, data: findthree })

		} else {

			let findtrans = await transaction_tbls.find({ match_id: matchID })

			//console.log(findtrans)

			if (findtrans.length == 0) {
				return res.status(200).send({ status: false, msg: "Not data found" })
			}



			let userIDs = []
			for (let items of finduserID) {
				//console.log(items)
				let finduser = await user_tbl.find({ _id: items.user_id })
				userIDs.push(finduser)
			}

			let finduser = await user_tbl.find()

			var trans = []
			for (let userr of finduser) {

				let findtransections = await transaction_tbls.find({ match_id: matchID, user_id: userr._id })

				trans.push({ ...userr._doc, transections: findtransections })
			}


			let final = []
			let final1 = []
			for (let ele of trans) {
				if (ele.transections) {
					final1.push(ele)
				}

			}

			let final12 = []
			for (let i of final1) {
				var sum = 0;
				let matchdata = []
				for (let j of i.transections) {
					matchdata.push(j)
					sum += j.points
				}

				//for(let k of matchdata){ 

				//let findmatchID = await transaction_tbls.findOne({ user_id: i._id }).select({ match_id: 1, _id: 0 })
				//console.log(findmatchID)
				//console.log(i._id )

				let obj = {
					_id: i._id,
					name: i.name,
					points: sum,
				
				}
				final12.push(obj)


			}

			let sorted = final12.sort(function (c1, c2) {
				if (c1.points < c2.points) {
					return 1;
				} else {
					return -1;
				}
			})


			let findthree = sorted.slice(0,3);

			//console.log(findthree)

			return res.status(200).send({ status: true, data: findthree })

		}

	} catch (error) {
		console.log(error)
	}
}



static user_point_details= async (req,res)=>{
	try{
		let user_id=req.body.user;
	  let match_id=req.body.match;
	
		let condition_obj={}
		if(!isEmpty(user_id)){condition_obj={...condition_obj,"user_id":user_id}};
		if(!isEmpty(match_id)){condition_obj={...condition_obj,"match_id":match_id}};

		const response=await transaction_tbls.find(condition_obj).populate('user_id match_id card_id','name image match_name match_id name card_type').sort({date:-1})
		if(!isEmpty(response)){
			return res.status(200).send({"status":true,"msg":"success","body":response});
		}else{
			return res.status(200).send({"status":false,"msg":"no data found"});
		}
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}
}

static all_matches_leaderboard = async (req,res)	=>{		
		try{
            let response = await transaction_tbls.aggregate([{ $group: {"_id": "$match_id"}} ],);   

		 if(response){
				let sumdata = []; 
			let forGat = await Promise.all(response.map( async(item)=>{ let dx =  await matchWinUsersRank( item._id.toString() ); 
											  sumdata.push(dx ) } ));
      		//let response2 = await matchWinUsersRank(response[0]._id.toString());

			return res.status(200).send({"status":false,"msg":"success","body":sumdata});
		}else{
			return res.status(200).send({"status":false,"msg":"server error"});
		}				 	
							 
		}catch (error){
			console.log(error)
			return res.status(200).send({"status":false,"msg":"server error"});
		}

}

//////////testing of transaction table
static testing_of_transaction = async (req,res)	=>{		
	try{
		let response = await transaction_tbls.find()
		
	 if(response){
		return res.status(200).send({"status":false,"msg":"success","body":response});
	}else{
		return res.status(200).send({"status":false,"msg":"server error"});
	}				 	
						 
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}

}

static add_transaction = async (req,res)	=>{		
	try{
		let obj = new transaction_tbls(req.body)
		let response=await obj.save()
		
	 if(response){


		return res.status(200).send({"status":false,"msg":"success","body":response});
	}else{
		return res.status(200).send({"status":false,"msg":"server error"});
	}				 	
						 
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}

}


static add_transaction2 = async (req,res)	=>{		
	try{
		let response = matchWinUsersRank()
		
	 if(!isEmpty(response)){
		return res.status(200).send({"status":true,"msg":"success","body":response});
	}else{
		return res.status(200).send({"status":false,"msg":"something went wrong"});
	}				 	
						 
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}

}






}

module.exports = leaderboardController ;      