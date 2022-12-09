let  express_2 = require('express');
let mongoose = require('mongoose');

  
  

const { rows_count,isEmpty,sentEmail,gen_str,getcurntDate,getTime,send_mobile_otp,user_logs_add,FulldateTime,before_after_Date } = require('../myModel/common_modal');
const { autoincremental,sendNotificationAdd,myBlockUserIds,matchWinUsersRank,matchWinUsersRank_one,
			AllMatchWinUsersRank,AllMatchWinUsersRank_one,leagueWinUsersRank,leagueWinUsersRank_one } = require('../myModel/helper_fun');

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
const prediction_card_tbl = require("../models/prediction_cards");      
const team_matches = require('../models/team_matches');
const admin_settings = require('../models/admin_settings');
const user_achievements = require('../models/user_achievements');




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
		//console.log(finduserID)

		var matchID = req.body.matchID



		const path=MyBasePath(req,res);

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
					points: sum
				}
				if(!isEmpty(i.image)){obj={...obj,image:`${path}/image/assets/user_img/${i.image}`}}else{obj={...obj,image:''}}
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
				if(!isEmpty(i.image)){obj={...obj,image:`${path}/image/assets/user_img/${i.image}`}}else{obj={...obj,image:''}}
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
			//console.log("leaderboard fun call == ",matchID )	;
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



static user_point_details = async (req,res)=>{
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

static  all_matches_leaderboard = async (req,res)	=>{		
		try{
			let user_id = req.body.user_id ; 
			let newUserId=mongoose.Types.ObjectId(user_id);
			let s_date = req.body.s_date;
			let e_date = req.body.e_date;
			let match_id = req.body.match_id;
			let page=(req.body.page==''||req.body.page==undefined)?1:req.body.page;
			let offset=(page-1)*5;
			let pipeLine=[{
				$match:{"user_id":newUserId}
			},{
				'$group': {
					'_id': '$match_id', 
					'date': {
						'$last': '$date'
					}
				}
			}, {
				'$sort': {
					'date': -1
				}
			}]
			if(!isEmpty(match_id)){
				var response=[];
				let matchId=mongoose.Types.ObjectId(match_id);
				response.push(matchId)
			
			}else if(!isEmpty(s_date) && !isEmpty(e_date)){
				var response=[] 
				let matchID= await transaction_tbls.distinct('match_id',{user_id:user_id,date:{$gte:s_date,$lte:e_date}});   
				
				let b=matchID.length>offset+5?offset+5:matchID.length-offset+5;
				
				for(let i=offset;i<b;i++){
					response.push(matchID[i])
				}
				
			}else{
				var response = await transaction_tbls.aggregate(pipeLine).skip(offset).limit(5) ;  
			
			}
			
		 if(response){	
				let sumdata = [];     

			let forGat = await Promise.all(response.map( async(item)=>{
				  let matchTopWinners =  await matchWinUsersRank( item._id.toString() ); 
					let userReankData = await matchWinUsersRank_one( item._id.toString(),user_id);

										if(! isEmpty(matchTopWinners)) { sumdata.push({ matchTopWinners,userReankData}) } } ));
      		
										///let response2 = await matchWinUsersRank(response[0]._id.toString());

			return res.status(200).send({"status":true ,"msg":"success","body":sumdata});
		}else{
			return res.status(200).send({"status":false,"msg":"server error"});
		}				 	   
				          			 
		}catch (error){
			console.log(error)
			return res.status(200).send({"status":false,"msg":"server error"});
		}

}

static  all_league_leaderboard = async (req,res)	=>{		
	try{
		let user_id = req.body.user_id ; 
		let s_date = req.body.s_date;
		let e_date = req.body.e_date;
		let league_id = req.body.league_id;
		let page=(req.body.page==''||req.body.page==undefined)?1:req.body.page;
		let offset=(page-1)*5;
		let pipeLine=[{
			'$group': {
				'_id': '$league_id', 
				'date': {
					'$last': '$date'
				}
			}
		}, {
			'$sort': {
				'date': -1
			}
		}]
		if(!isEmpty(league_id)){
			var response=[league_id];
			
		}else if(!isEmpty(s_date) && !isEmpty(e_date)){
			var response = await transaction_tbls.distinct('league_id',{date:{$gte:s_date,$lte:e_date}}).skip(offset).limit(5);   
		
		}else{
			var response = await transaction_tbls.aggregate(pipeLine).skip(offset).limit(5) ;  
		
		}
		
		let sumdata = [];     
	 if(response){	

		let forGat = await Promise.all(response.map( async(item)=>{
		
		let data =  await leagueWinUsersRank( item._id.toString(),user_id ); 
    let leagueData = await team_matches.find({league_id:item._id,status:"Played"},'league_name league_logo league_id date_utc').sort({_id:-1}).limit(1);
		let leagueTopWinners=data.allUsersData;
		let userReankData=data.newobj;
		
		if(Object.keys( leagueTopWinners).length!=0 ) { 
			if(Object.keys( userReankData).length!=0){
			let achievements=await user_achievements.findOne({user_id:user_id,league_id:leagueData[0].league_id});
			if( isEmpty(achievements) ){
				let rank=(userReankData.rank==undefined || userReankData.rank==null)?0:userReankData.rank;
				let obj=new user_achievements({user_id:user_id,league_id:leagueData[0].league_id,rank})
				let d1=await obj.save()
				
			}else{
				let rank=achievements.rank<((userReankData.rank==undefined || userReankData.rank==null)?0:userReankData.rank)?achievements.rank:userReankData.rank;
				let dd=await user_achievements.findOneAndUpdate({user_id:user_id,league_id:leagueData[0].league_id},{$set:{rank}})
				
			
			}}
			sumdata.push({ leagueTopWinners,userReankData,leagueData:leagueData[0]}) } 
		
		} ));
				
									///let response2 = await matchWinUsersRank(response[0]._id.toString());

		return res.status(200).send({"status":true ,"msg":"success","body":sumdata});
	}else{
		return res.status(200).send({"status":false,"msg":"no data found"});
	}				 	   
											 
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}

}



static jks_lod = async(req,res) =>{

	let user_id = req.body.user_id ; 
	let matchID = req.body.match_id ; 
		let dx = await  matchWinUsersRank_one(matchID,user_id);

		if(dx){
			return res.status(200).send({"status":true ,"msg":"success","body":dx});
		}else{
			return res.status(200).send({"status":false,"msg":"server error"});
		}	


}


static topMostWinners = async(req,res) =>{

	let user_id = req.body.user_id ; 
	//let matchID = req.body.match_id ; 
	let data=[]
		
		let matchTopWinners =  await AllMatchWinUsersRank(  ); 
		let userReankData = await AllMatchWinUsersRank_one(user_id);
		if(Object.keys( userReankData).length!=0){
			let achievements=await user_achievements.findOne({user_id:user_id,league_id:"61217"});
			
			if( isEmpty(achievements) ){
				let rank=(userReankData.rank==undefined || userReankData.rank==null)?0:userReankData.rank;
				let obj=new user_achievements({user_id:user_id,league_id:"61217",rank})
				let d1=await obj.save()
				
			}else{
				let rank=achievements.rank<((userReankData.rank==undefined || userReankData.rank==null)?0:userReankData.rank)?achievements.rank:userReankData.rank;
				let dd=await user_achievements.findOneAndUpdate({user_id:user_id,league_id:"61217"},{$set:{rank}})
				
			
			}}
		if(matchTopWinners.length!=0 && Object.keys( userReankData).length!=0){

			data.push({matchTopWinners,userReankData})
		}	
		if(matchTopWinners){
				return res.status(200).send({"status":true ,"msg":"success","body":data});
		}else{
			return res.status(200).send({"status":false,"msg":"server error"});
		}	


}

static all_matches_leaderboard_old = async (req,res)	=>{		
	try{
		let response
		let date=getcurntDate()
		let matches = await transaction_tbls.find().distinct("match_id");   
		let result=[]
		for(let i of matches){
			let data=await transaction_tbls.aggregate([{ 
						"$match": { 
							"match_id": mongoose.Types.ObjectId(i) 
						} 
					},
					{
						"$lookup": {
							from : "team_matches",
							foreignField : "_id",
							localField : "match_id",
							as : "match_details",
						}
					},
					{
						"$lookup": {
							from : "user_tbls",
							foreignField : "_id",
							localField : "user_id",
							as : "user_details",
						}
					},
					{
						$set: {
						   Score: { $add: "$points" } }
					  },
					// {
					// 	$setWindowFields: {
					// 	   partitionBy: "$user_id",
					// 	   output: {
					// 		  score: {
					// 			 $sum: "$points",
					// 			}
								
					// 	   }
					// 	}
					//  }
					{
						"$group": {
							_id:"$user_id",
							score:{$sum:"$points"} 
						}
					}
				])
			if(!isEmpty(data)){
				result.push(data)
			}
		}
		response=await transaction_tbls.aggregate([
		
			{
				"$group": {
					_id:["$match_id","$user_id"],
					total_score:{$sum:"$points"},
					user_id:{$push:"$user_id"} 
				}
				
			},
			{
				$lookup:{
					from:"user_tbls",
					foreignField:"_id",
					localField:"user_id",
					as:"data"
				}
			}
		
		
			// 	{ 
		// 	"$match": { 
		// 		"match_id": mongoose.Types.ObjectId(i) 
		// 	} 
		// },
		// {
		// 	"$lookup": {
		// 		from : "team_matches",
		// 		foreignField : "_id",
		// 		localField : "match_id",
		// 		as : "match_details",
		// 	}
		// },
		// {
		// 	"$lookup": {
		// 		from : "user_tbls",
		// 		foreignField : "_id",
		// 		localField : "user_id",
		// 		as : "user_details",
		// 	}
		// },
		// {
		// 	$set: {
		// 	   Score: { $add: "$points" } }
		//   },
		// {
		// 	$setWindowFields: {
		// 	   partitionBy: "$user_id",
		// 	   output: {
		// 		  score: {
		// 			 $sum: "$points",
		// 			}
					
		// 	   }
		// 	}
		//  }
		// {
		// 	"$group": {
		// 		_id:"$user_id",
		// 		score:{$sum:"$points"} 
		// 	}
		// }
	])


	 if(!isEmpty(result)){
		
		return res.status(200).send({"status":true,"msg":"success","body":response});
	}else{
		return res.status(200).send({"status":false,"msg":"no data found"});
	}				 	
						 
	}catch (error){
		console.log(error)
		return res.status(200).send({"status":false,"msg":"server error"});
	}

}  

static bonus_points = async (req,res)	=>{		
	try{
		let points = req.body.points;
		let type = req.body.type;
		let description = req.body.description;
		let user_id = req.body.user_id;
		let points_by ="admin"
		if(isEmpty(points) || isEmpty(type) || isEmpty(description) || isEmpty(user_id) ){
			return res.status(200).send({"status":false,"msg":"all field required"});
		}else{
			let details={points,type,points_by,description,user_id}
			//console.log(details)
			let obj = new transaction_tbls(details)
			let response=await obj.save()
			
			if(!isEmpty(response)){
				return res.status(200).send({"status":true,"msg":"bonus points add","body":response});
			}else{
				return res.status(200).send({"status":false,"msg":"something went wrong"});
			}				 	
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


		return res.status(200).send({"status":true,"msg":"success","body":response});
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

static rankBonus = async (match_id)=>{
	try{
		let rankBonus=await admin_settings.findOne()
		let match=await team_matches.findOne({match_id},"_id")
		let topRanker=await matchWinUsersRank((match._id).toString());
		if(!isEmpty(topRanker)){
			for(let i=0;i<10;i++){
			let obj={
				type:"credit",
				points_by:"admin",
				description:"rank bonus",
				user_id:topRanker[i]._id.user_id,
				match_id:topRanker[i]._id.match_id
			}
			if(i<1){
				obj.points=rankBonus.rank_1_bonus;
			}else if(i<3){
				obj.points=rankBonus.rank_2to3_bonus;
			}else if(i<5){
				obj.points=rankBonus.rank_4to5_bonus;
			}else if(i<10){
				obj.points=rankBonus.rank_6to10_bonus;
			}
			let transaction=new transaction_tbls(obj);
			let aa=await transaction.save()
			let user=await user_tbl.findOneAndUpdate({_id:topRanker[i]._id.user_id},{$inc:{points:obj.points}},{new:true})
				
			}
			
		}else{
			return false
		}
	}catch (error){
		console.log(error);
		return false
	}
}



}

module.exports = leaderboardController ;      