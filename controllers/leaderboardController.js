let  express_2 = require('express');
let mongoose = require('mongoose');




const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds } = require('../myModel/helper_fun');

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
//         //let match_id=req.body.match_id
// 				const data = await transaction_tbls.find().sort({user_id:-1}).populate('user_id') ;
// 				let total_point=0;
// 				//console.log(data[0].user_id._id)
// 				let all_matches=[];
// 				let users=[];
// 				let match=[];
// 				let user;
// 				for(let i=0;i<data.length;i++){
// 					let value=users.includes(data[i].user_id)
// 					if(!users.includes(data[i].user_id)){users.push(data[i].user_id)}
// 				}
// 				const match_data = await transaction_tbls.find().sort({user_id:-1}).populate('match_id') ;
// 				for(let i=0;i<match_data.length;i++){
// 					let value=users.includes(match_data[i].user_id)
// 					if(!users.includes(match_data[i].user_id)){users.push(match_data[i].user_id)}
// 				}
// 				let match_id=''
// 				for(let i=0;i<users.length;i++)
// 				{
// 					var user_points=await transaction_tbls.find().populate('user_id',null,{mobile:users[i].mobile})
// 					//console.log(user_points)
// 					user='';
// 					total_point=0;
// 					let user_id='';
// 					let image='';
					
// 					if(user_points )
// 					{
// 						for(let i=0;i<user_points.length;i++)
// 						{
// 							if(user_points[i].user_id!=null){

// 								total_point+=user_points[i].points;
// 								user=user_points[i].user_id.name;
// 								user_id=user_points[i].user_id._id;
// 								image=user_points[i].user_id.image;
								
// 							}
// 						}
						
// 							all_matches.push({user_name:user,total_score:total_point,user_id:user_id,image:image})
						
// 					}
// 				}
// 				//console.log(all_matches)
// 				let all_match_result=[]
// 				all_matches.map((item)=>{
// 					if(item.user_id!=""){
// 						all_match_result.push(item)
// 					}
// 				});

// 				let data1=await transaction_tbls.aggregate([{$group:{match_id}}])
// 				console.log(data1)

// 				res.status(200).send({status:true,msg:"data found",body:data1})
        
// 			}catch (error){
//         console.log(error)
//         return res.status(200).send({"status":false,"msg":"server error","body":''});
//     }
// }
static leaderboard = async (req, res) => {
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

		const response=await transaction_tbls.find({}).populate('match_id card_id','match_name match_id name card_type').sort({date:-1})
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

static all_matches_leaderboard = async (req,res)	=>{		
		try{
            let response = await transaction_tbls.aggregate(
							 [{ $group: {"_id": "$match_id"}},
							// { $unwind: "$match_list" },
							// { $lookup: {from: 'transaction_tbls', localField : '_id', foreignField: 'match_id', as: 'play_match_user'} },
							// { $project: {"match_id":"$play_match_user.match_id","user_id":"$play_match_user.user_id",
							// "points":"$play_match_user.points"} } 
							],);	
			
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

}

module.exports = leaderboardController ;      