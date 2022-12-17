const{ isEmpty} = require("../myModel/common_modal");
const axios = require('axios')

const  {MyBasePath} = require("../myModel/image_helper");
const { Promise } = require("mongoose");

const team_list = require("../models/team_list");
const league_list = require("../models/league_list");
const sport_list = require("../models/sport");
const user_preference = require("../models/user_preference");

const get_competition_id = async ()=>{
  try{
    let encodedToken=`${Buffer.from('zimbori:8PFsL2Ce&!').toString("base64")}`
    let session_url=`https://dsg-api.com/clients/zimbori/soccer/get_competitions?client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
    var config = {  
      method: 'get',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };
  let response=await axios(config)
  let data=response.data.datasportsgroup.competition;
  let competition_id=[];
  data.map((item)=>{
    competition_id.push(item.competition_id)
  })
    return competition_id;
  }catch (error) {
    console.log(error);
    return false;
  }
} 

const get_season_data = async (competition_id)=>{
  try{
    let encodedToken=`${Buffer.from('zimbori:8PFsL2Ce&!').toString("base64")}`
    let session_url=`https://dsg-api.com/clients/zimbori/soccer/get_seasons?comp_id=${competition_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json`;
    let session_url_ara=`https://dsg-api.com/clients/zimbori/soccer/get_seasons?comp_id=${competition_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json&lang=ar`;
    let session_url_fr=`https://dsg-api.com/clients/zimbori/soccer/get_seasons?comp_id=${competition_id}&client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&ftype=json&lang=fr`;
    var config = {  
      method: 'get',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };
    var config_ara = {  
      method: 'get',
      url: session_url_ara,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };
    var config_fr = {  
      method: 'get',
      url: session_url_fr,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };
  let response=await axios(config)
  let data=response.data.datasportsgroup.competition[0].season[0];
  let response_ara=await axios(config_ara)
  let original_name_ara=response_ara.data.datasportsgroup.competition[0].season[0].original_name;
  let response_fr=await axios(config_fr)
  let original_name_fr=response_fr.data.datasportsgroup.competition[0].season[0].original_name;
    return {...data,original_name_ara,original_name_fr};
  }catch (error) {
    console.log(error);
    return false;
  }
} 

const get_team_data = async (season_id)=>{
  try{
    let encodedToken=`${Buffer.from('zimbori:8PFsL2Ce&!').toString("base64")}`;
    let session_url=`https://dsg-api.com/clients/zimbori/soccer/get_contestants?client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&type=discipline&type_id=27&season=${season_id}&ftype=json`;
    let session_url_ara=`https://dsg-api.com/clients/zimbori/soccer/get_contestants?client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&type=discipline&type_id=27&season=${season_id}&ftype=json&lang=ar`;
    let session_url_fr=`https://dsg-api.com/clients/zimbori/soccer/get_contestants?client=zimbori&authkey=oGV7DpLYPKukS5HcZlJQM0m94O8z3s1xe2b&type=discipline&type_id=27&season=${season_id}&ftype=json&lang=fr`;
    let config={
      method:'get',
      url:session_url,
      headers:{'Authorization':'Basic '+encodedToken}
    }
    let config_ara={
      method:'get',
      url:session_url_ara,
      headers:{'Authorization':'Basic '+encodedToken}
    }
    let config_fr={
      method:'get',
      url:session_url_fr,
      headers:{'Authorization':'Basic '+encodedToken}
    }
    let response=await axios(config);
    let data=response.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].team;
    let response_ara=await axios(config_ara);
    let data_ara=response_ara.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].team;
    let response_fr=await axios(config_fr);
    let data_fr=response_fr.data.datasportsgroup.tour[0].tour_season[0].competition[0].season[0].discipline[0].gender[0].team;
    console.log(data_fr)
    let team_data=[];
    let d1=await data.map((item,index)=>{
      if(item.team_id==data_ara[index].team_id && item.team_id==data_fr[index].team_id){
        team_data.push({...item,team_name_ara:data_ara[index].team_name,short_name_ara:data_ara[index].short_name,team_name_fr:data_fr[index].team_name,short_name_fr:data_fr[index].short_name})
      }
    })
    return team_data;
  }catch(error){
    console.log(error);
    return false;
  }
}


class prefrenceController{

  static add_league_by_competition_id = async (req,res)=>{
    try{
      let id=req.body.competition_id;
      if(!isEmpty(id)){
        var competition_id=[id]
      }else{
        var competition_id=await get_competition_id();
      }
      let path=await MyBasePath(req);
      //console.log(path)
      let d1=await Promise.all(competition_id.map( async (item)=>{
        let season_data=await get_season_data(item);
        let league_detail={
          competition_id:item,
          season_id:season_data.season_id,
          original_name:season_data.original_name,
          original_name_sportimo:season_data.original_name,
          original_name_ara:season_data.original_name_ara,
          original_name_ara_sportimo:season_data.original_name_ara,
          original_name_fr:season_data.original_name_fr,
          original_name_fr_sportimo:season_data.original_name_fr,
          league_logo:season_data.logo,
          league_logo_sportimo:season_data.logo,
        }
        let update_league_detail={
          competition_id:item,
          season_id:season_data.season_id,
          original_name:season_data.original_name,
          original_name_ara:season_data.original_name_ara,
          original_name_fr:season_data.original_name_fr
        }
        let old_data=await league_list.find({competition_id:item});
        if(!isEmpty(old_data)){
          let d2=await league_list.findOneAndUpdate({competition_id:item},update_league_detail);
          let config={
            method:'post',
            url:`${path}/web_api/add_team_by_season_id`,
            data:{"season_id":season_data.season_id}
                }
              let response=await axios(config)
              return item;
        }else{
          let obj=new league_list(league_detail);
          let d2=await obj.save();
          //console.log({d2})
          let config={
            method:'post',
            url:`${path}/web_api/add_team_by_season_id`,
            data:{"season_id":season_data.season_id}
                }
            let response=await axios(config)
          return item;
        } 
        
            
      }));
      return res.status(200).send({status:true,msg:"success"})
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"})
    }
  }  

  static add_team_by_season_id = async (req,res)=>{
    try{
        let season_id=req.body.season_id;
        //console.log({season_id})
        let whr={}
        if(!isEmpty(season_id)){whr={...whr,season_id}};
        var league_data=await league_list.find(whr);
        let d1=Promise.all(league_data.map(async (item)=>{
        let team_data=await get_team_data(item.season_id);
        let d2=await team_data.map(async(i)=>{
          console.log(i)
        let code=i.short_name.slice(0,3);
        
        let team_detail={
            competition_id:item.competition_id,
            season_id:item.season_id,
            league_name:item.original_name_sportimo,
            team_id:i.team_id,
            team_code:code,
            team_name:i.team_name,
            team_name_ara:i.team_name_ara,
            team_name_fr:i.team_name_fr,
            short_name:i.short_name,
            short_name_sportimo:i.short_name,
            short_name_ara:i.short_name_ara,
            short_name_ara_sportimo:i.short_name_ara,
            short_name_fr:i.short_name_fr,
            short_name_fr_sportimo:i.short_name_fr,
            team_logo:i.team_logo,
            team_logo_sportimo:i.team_logo
          }
        let update_team_detail={
            competition_id:item.competition_id,
            season_id:item.season_id,
            team_id:i.team_id,
            team_name:i.team_name,
            team_name_ara:i.team_name_ara,
            team_name_fr:i.team_name_fr,
            short_name:i.short_name,
            short_name_ara:i.short_name_ara,
            short_name_fr:i.short_name_fr
          }
        let old_team=await team_list.find({competition_id:item.competition_id,team_id:i.team_id})
          if(!isEmpty(old_team)){
            let d1=await team_list.findOneAndUpdate({competition_id:item.competition_id,team_id:i.team_id},update_team_detail)
           // console.log({d1})
          }else{
            let obj=new team_list(team_detail);
            let d2=await obj.save();
            //console.log({d2})
          }
        })
          
        }))
      return res.status(200).send({status:true,msg:"success"})
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"})
    }
  }

  static user_preference_add_update = async (req,res)=>{
    try{
      let data = req.body;
      let old_data=await user_preference.findOne(data);
      if(!isEmpty(old_data)){
        let remove=await user_preference.findOneAndDelete(data);
        return res.status(200).send({status:true,msg:"preference removed"});
      }else{
        let obj =new user_preference(data);
        let add = await obj.save()
        return res.status(200).send({status:true,msg:"preference added"});
        
      } 
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static league_list_new = async (req,res)=>{
    try{
      let user_id = req.body.user_id;
      let type = req.body.type;
      let name = req.body.name;
      let page = req.body.page;
      let whr = {};
      if(!isEmpty(name)){whr.team_name = { $regex: '.*' + name + '.*', $options: 'i' } ;}
       if(!isEmpty(type)){whr.type=type}
      if(!isEmpty(user_id)){
        var response = await league_list.find({status:1,type:"default"});
      //  return res.status(200).send({status:true,msg:"data found",body:response});
      }else{
        page = (isEmpty(page) || page == 0 )? 1 :page ; 
        let offset=(page-1)*5;
        var response = await league_list.find(whr).skip(offset).limit(5);
      }
      let leagues=[];
      let path=MyBasePath(req);
      let d1=await Promise.all( response.map(async (item)=>{
        let total_select=await user_preference.find({competition_id:item.competition_id}).countDocuments()
        let match=item.league_logo.match('http')
        if(item.league_logo.length!=0 && match==null){
          item.league_logo=`${path}/image/assets/league_logo/${item.league_logo}`
        }
        let match1=item.league_logo_sportimo.match('http')
        if(item.league_logo_sportimo.length!=0 && match1==null){
          item.league_logo_sportimo=`${path}/image/assets/league_logo/${item.league_logo_sportimo}`
        }
        if(!isEmpty(user_id)){
          let select=await user_preference.find({competition_id:item.competition_id,user_id}).countDocuments()
          let select_status=select==0?false:true;
          leagues.push({...item._doc,total_select,select_status})
        }else{
          
          leagues.push({...item._doc,total_select})
        }
        return item;
      }))
      leagues.sort(function(a, b){ if ( a.total_select < b.total_select ){
        return 1;
      }
      if ( a.total_select > b.total_select ){
        return -1;
      }
      return 0;});
      let total_league=await league_list.find(whr).countDocuments();
      return res.status(200).send({status:true,msg:"data found",rows:total_league,body:leagues});
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static team_list_new = async (req,res)=>{
    try{
      let page = req.body.page;
      let name = req.body.name;
      let whr = {};
      if(!isEmpty(name)){whr.team_name = { $regex: '.*' + name + '.*', $options: 'i' } ;}
      page = (isEmpty(page) || page == 0 )? 1 :page ; 
      let user_id = req.body.user_id;
      if(!isEmpty(user_id)){
        
        let user_leagues=await user_preference.distinct('season_id',{user_id})
        let conditio={}
        if(!isEmpty(user_leagues)){conditio={...conditio,season_id:{$in:user_leagues}}}
        var response = await team_list.find(conditio);
        
      }else{
        let offset=(page-1)*5;
        var response = await team_list.find(whr).skip(offset).limit(5);
      }
      let teams=[]
      let path=MyBasePath(req);
      let d1=await Promise.all( response.map(async (item)=>{
        let total_select=await user_preference.find({team_id:item.team_id}).countDocuments();
        let match=item.team_logo.match('http');
        if(item.team_logo.length!=0 && match==null){
          item.team_logo=`${path}/image/assets/team_logo/${item.team_logo}`
        }
        let match1=item.team_logo_sportimo.match('http');
        if(item.team_logo_sportimo.length!=0 && match1==null){
          item.team_logo_sportimo=`${path}/image/assets/team_logo/${item.team_logo_sportimo}`
        }
        if(!isEmpty(user_id)){
          let select=await user_preference.find({team_id:item.team_id,user_id}).countDocuments()
          let select_status=select==0?false:true;
          teams.push({...item._doc,total_select,select_status})
        }else{
          teams.push({...item._doc,total_select})
        }return item;
      }))
      teams.sort(function(a, b){ if ( a.total_select < b.total_select ){
        return 1;
      }
      if ( a.total_select > b.total_select ){
        return -1;
      }
      return 0;});
      let total_team=await team_list.find(whr).countDocuments();
      return res.status(200).send({status:true,msg:"data found",rows:total_team,body:teams});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static sport_list_new = async (req,res)=>{
    try{
    
      let user_id = req.body.user_id;
      let response= await sport_list.find({active_status:true});
      let sport=[]
      let path=MyBasePath(req);
      let d1=await Promise.all( response.map(async (item)=>{
        let total_select=await user_preference.find({sport_id_mongo:item._id}).countDocuments();
        let match=item.image.match('http');
        if(item.image.length!=0 && match==null){
          item.image=`${path}/image/assets/team_logo/${item.image}`
        }
        
          let select=await user_preference.find({sport_id_mongo:item._id,user_id}).countDocuments()
          let select_status=select==0?false:true;
          sport.push({...item._doc,total_select,select_status})
        
      }))
      sport.sort(function(a, b){ if ( a.total_select < b.total_select ){
        return 1;
      }
      if ( a.total_select > b.total_select ){
        return -1;
      }
      return 0;});
      
      return res.status(200).send({status:true,msg:"data found",body:sport});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }


  static my_fav_league = async (req,res)=>{
    try{
      let user_id = req.body.user_id;
      let  response = await user_preference.distinct('league_id_mongo',{user_id,league_id_mongo:{$ne:""}});
      let user_league=await league_list.find({_id:{$in:response}})
      return res.status(200).send({status:true,msg:"success",body:user_league});
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static my_fav_team = async (req,res)=>{
    try{
      let user_id = req.body.user_id;
      let team_id=await user_preference.distinct('team_id_mongo',{user_id,team_id_mongo:{$ne:""}})
      let user_team=await team_list.find({_id:{$in:team_id}})
      return res.status(200).send({status:true,msg:"success",body:user_team});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static my_fav_sport = async (req,res)=>{
    try{
      let user_id = req.body.user_id;
      let sport=await user_preference.distinct('sport_id_mongo',{user_id,sport_id_mongo:{$ne:""}})
      let user_sport=await sport_list.find({_id:{$in:sport}})
      return res.status(200).send({status:true,msg:"success",body:user_sport});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }


  static teams_for_sponsor = async (req,res)=>{
    try{
        let response = await team_list.find();
      
      let path=MyBasePath(req);
      response.map((item)=>{
        let match=item.team_logo.match('http');
        if(item.team_logo.length!=0 && match==null){
          item.team_logo=`${path}/image/assets/team_logo/${item.team_logo}`
        }
      })
      return res.status(200).send({status:true,msg:"data found",body:response});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static league_status_update = async (req,res)=>{
    try{
      let _id = req.body._id;
      let status = req.body.status;
      if(status==0 || status==1){
        let response = await league_list.findByIdAndUpdate(_id,{status},{new:true});
        return res.status(200).send({status:true,msg:"updated",body:response});
      }else{
        return res.status(200).send({status:true,msg:"invalid status code"});
      } 
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static add_custom_league = async (req,res)=>{
    try{
      let competition_id = Math.floor(Math.random() * 9000) + 1000;;
      let season_id = Math.floor(Math.random() * 90000000) + 10000000;;
      let original_name = req.body.original_name;
      let original_name_sportimo = req.body.original_name;
      let original_name_ara = req.body.original_name_ara;
      let original_name_ara_sportimo = req.body.original_name_ara;
      let original_name_fr = req.body.original_name_fr;
      let original_name_fr_sportimo = req.body.original_name_fr;
      let league_logo = req.files.image==''||req.files.image==undefined?'':req.files.image[0].filename;
      let league_logo_sportimo = req.files.image==''||req.files.image==undefined?'':req.files.image[0].filename;
      let type = "custom";
      if(isEmpty(competition_id)||isEmpty(season_id)||isEmpty(original_name)||isEmpty(original_name_ara)||isEmpty(league_logo)){
        return res.status(200).send({status:false,msg:"all field required"});
      }
      let competition_id_data = await league_list.findOne({competition_id});
      if(isEmpty(competition_id_data)){
        let season_id_data = await league_list.findOne({season_id});
        if(isEmpty(season_id_data)){
          let obj = new league_list({competition_id,season_id,original_name,original_name_sportimo,original_name_ara,original_name_ara_sportimo,original_name_fr,original_name_fr_sportimo,league_logo,league_logo_sportimo,type})
          let response = await obj.save()
          return res.status(200).send({status:true,msg:"league added",body:response});
        }else{
          return res.status(200).send({status:false,msg:"season id already exist"});
        }
      }else{
        return res.status(200).send({status:false,msg:"competition id already exist"});
      } 
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static add_custom_team = async (req,res)=>{
    try{
      let competition_id = req.body.competition_id;
      let season_id = req.body.season_id;
      let team_id = Math.floor(Math.random() * 900000) + 100000;;
      let team_name = req.body.team_name;
      let team_name_ara = req.body.team_name_ara;
      let short_name = req.body.short_name;
      let short_name_ara = req.body.short_name_ara;
      let team_logo = req.files.image==''||req.files.image==undefined?'':req.files.image[0].filename;
      let type = "custom";
      if(isEmpty(competition_id)||isEmpty(season_id)||isEmpty(team_id)||isEmpty(team_name)||isEmpty(team_name_ara)||isEmpty(short_name)||isEmpty(short_name_ara)||isEmpty(team_logo)){
        return res.status(200).send({status:false,msg:"all field required"});
      }
      let team_id_data = await team_list.findOne({team_id});
      if(isEmpty(team_id_data)){
          let obj = new team_list({competition_id,season_id,team_id,team_name,team_name_ara,short_name,short_name_ara,team_logo,type})
          let response = await obj.save()
          return res.status(200).send({status:true,msg:"team added",body:response});
      }else{
        return res.status(200).send({status:false,msg:"competition id already exist"});
      } 
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static update_league = async (req,res)=>{
    try{
      let id=req.params.id;
      let original_name_sportimo = req.body.original_name_sportimo;
      let original_name_ara_sportimo = req.body.original_name_ara_sportimo;
      let original_name_fr_sportimo = req.body.original_name_fr_sportimo;
      let league_logo_sportimo = req.files.image==''||req.files.image==undefined?'':req.files.image[0].filename;
      let whr={};
      if(!isEmpty(original_name_sportimo)){whr={...whr,original_name_sportimo}};
      if(!isEmpty(original_name_ara_sportimo)){whr={...whr,original_name_ara_sportimo}};
      if(!isEmpty(original_name_fr_sportimo)){whr={...whr,original_name_fr_sportimo}};
      if(!isEmpty(league_logo_sportimo)){whr={...whr,league_logo_sportimo}};
      let update=await league_list.findByIdAndUpdate(id,whr,{new:true});
      return res.status(200).send({status:true,msg:"league updated",body:update});
      
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static update_team = async (req,res)=>{
    try{
      let id=req.params.id;
      let short_name_sportimo = req.body.short_name_sportimo;
      let short_name_ara_sportimo = req.body.short_name_ara_sportimo;
      let short_name_fr_sportimo = req.body.short_name_fr_sportimo;
      let team_code = req.body.team_code;
      let team_logo_sportimo = req.files.image==''||req.files.image==undefined?'':req.files.image[0].filename;
      let whr={};
      if(!isEmpty(short_name_sportimo)){whr={...whr,short_name_sportimo}};
      if(!isEmpty(short_name_ara_sportimo)){whr={...whr,short_name_ara_sportimo}};
      if(!isEmpty(short_name_fr_sportimo)){whr={...whr,short_name_fr_sportimo}};
      if(!isEmpty(team_code)){whr={...whr,team_code}};
      if(!isEmpty(team_logo_sportimo)){whr={...whr,team_logo_sportimo}};
      let update=await team_list.findByIdAndUpdate(id,whr,{new:true});
      return res.status(200).send({status:true,msg:"team updated",body:update});
     
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

  static delete_custom_league = async (req,res)=>{
    try{
      let id=req.params.id;
      let data=await league_list.findById(id);
      if(data.type=="custom"){
        let d1 = await league_list.findByIdAndDelete(id);
        return res.status(200).send({status:true,msg:"league deleted",body:d1});

      }
      return res.status(200).send({status:true,msg:"something went wrong"});
     
    }catch (error){
      console.log(error);
      return res.status(200).send({status:false,msg:"server error"});
    }
  }

}

module.exports = prefrenceController;