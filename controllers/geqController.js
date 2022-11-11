let  express_2 = require('express');
  
const { rows_count,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
const { geqWin , geqLose } = require('../myModel/helper_fun');
   
  
 const geq_tbl= require('../models/geq_tbl');
 const geq_answers= require('../models/geq_answers');
 const transactions_tbl = require('../models/transactions');


class geqController { 

 

  static add_geq = async (req,res)=>{
    try {
         let match_id = req.body.match_id;
         let match_name = req.body.match_name;
         let event = req.body.event;
         let appearance_time = req.body.appearance_time;
         let duration = req.body.duration;
         
         let qus = req.body.qus;      let qus_ara = req.body.qus_ara;
         let opt_1 = req.body.opt_1;  let opt_1_ara = req.body.opt_1_ara;
         let opt_2 = req.body.opt_2;  let opt_2_ara = req.body.opt_2_ara;
         let opt_3 = req.body.opt_3;  let opt_3_ara = req.body.opt_3_ara;
         let opt_4 = req.body.opt_4;  let opt_4_ara = req.body.opt_4_ara;
         let opt_5 = req.body.opt_5;  let opt_5_ara = req.body.opt_5_ara;
         
         let reward_type    = req.body.reward_type;
         let reward_quantity = req.body.reward_quantity;
         let reward_condition = req.body.reward_condition;

         let targeted_country = req.body.targeted_country;
         let targeted_sport = req.body.targeted_sport;
         let targeted_player = req.body.targeted_player;
         let targeted_team = req.body.targeted_team;
         let targeted_league = req.body.targeted_league;

         const details={match_id,match_name,event,appearance_time,duration,qus,qus_ara,opt_1,opt_1_ara,opt_2,opt_2_ara,opt_3,opt_3_ara,opt_4,opt_4_ara,opt_5,opt_5_ara,reward_type,reward_quantity,reward_condition,targeted_country,targeted_sport,targeted_player,targeted_team,targeted_league};

         if(!isEmpty(match_id) || !isEmpty(event) || !isEmpty(qus) || !isEmpty(qus_ara) || !isEmpty(opt_1) || !isEmpty(opt_1_ara) || !isEmpty(opt_2) || !isEmpty(opt_2_ara) ||!isEmpty(opt_3) || !isEmpty(opt_3_ara)){
             let obj=new geq_tbl(details);
             let response=await obj.save()
             if(!isEmpty(response)){
                 res.status(200).send({'status':true,'msg':'geq added successfully','body':response});
             }else{
                 res.status(200).send({'status':false,'msg':'something went wrong','body':''});
             }

         }else{
            res.status(200).send({'status':false,'msg':'all field required'});
         }
        
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':'server error','body':''});
    }
            
} 
static update_geq = async (req,res)=>{
    try {
    
            let _id=req.body._id
            let match_id = req.body.match_id;
            let match_name = req.body.match_name;
            let event = req.body.event;
            let appearance_time = req.body.appearance_time;
            let duration = req.body.duration;
            
            let qus = req.body.qus;      let qus_ara = req.body.qus_ara;
            let opt_1 = req.body.opt_1;  let opt_1_ara = req.body.opt_1_ara;
            let opt_2 = req.body.opt_2;  let opt_2_ara = req.body.opt_2_ara;
            let opt_3 = req.body.opt_3;  let opt_3_ara = req.body.opt_3_ara;
            let opt_4 = req.body.opt_4;  let opt_4_ara = req.body.opt_4_ara;
            let opt_5 = req.body.opt_5;  let opt_5_ara = req.body.opt_5_ara;
            
            let reward_type    = req.body.reward_type;
            let reward_quantity = req.body.reward_quantity;
            let reward_condition = req.body.reward_condition;

            let targeted_country = req.body.targeted_country;
            let targeted_sport = req.body.targeted_sport;
            let targeted_player = req.body.targeted_player;
            let targeted_team = req.body.targeted_team;
            let targeted_league = req.body.targeted_league;

            let details={};
            if(!isEmpty(match_id)){details={...details,match_id}};
            if(!isEmpty(match_name)){details={...details,match_name}};
            if(!isEmpty(event)){details={...details,event}};
            if(!isEmpty(appearance_time)){details={...details,appearance_time}};
            if(!isEmpty(duration)){details={...details,duration}};
            if(!isEmpty(qus)){details={...details,qus}};
            if(!isEmpty(qus_ara)){details={...details,qus_ara}};
            if(!isEmpty(opt_1)){details={...details,opt_1}};
            if(!isEmpty(opt_2)){details={...details,opt_2}};
            if(!isEmpty(opt_3)){details={...details,opt_3}};
            if(!isEmpty(opt_4)){details={...details,opt_4}};
            if(!isEmpty(opt_5)){details={...details,opt_5}};
            if(!isEmpty(opt_1_ara)){details={...details,opt_1_ara}};
            if(!isEmpty(opt_2_ara)){details={...details,opt_2_ara}};
            if(!isEmpty(opt_3_ara)){details={...details,opt_3_ara}};
            if(!isEmpty(opt_4_ara)){details={...details,opt_4_ara}};
            if(!isEmpty(opt_5_ara)){details={...details,opt_5_ara}};
            if(!isEmpty(reward_type)){details={...details,reward_type}};
            if(!isEmpty(reward_quantity)){details={...details,reward_quantity}};
            if(!isEmpty(reward_condition)){details={...details,reward_condition}};
            if(!isEmpty(targeted_country)){details={...details,targeted_country}};
            if(!isEmpty(targeted_sport)){details={...details,targeted_sport}};
            if(!isEmpty(targeted_player)){details={...details,targeted_player}};
            if(!isEmpty(targeted_team)){details={...details,targeted_team}};
            if(!isEmpty(targeted_league)){details={...details,targeted_league}};


                if(!isEmpty(_id) ){
                    
                    let response=await geq_tbl.findOneAndUpdate({_id},details,{new:true})
                    if(!isEmpty(response)){
                        res.status(200).send({'status':true,'msg':'geq updated successfully','body':response});
                    }else{
                        res.status(200).send({'status':false,'msg':'something went wrong','body':''});
                    }
    
                }else{
                res.status(200).send({'status':false,'msg':'all field required'});
                }
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }

static geq_list = async (req,res)=>{
    try {
        let page=req.body.page;
        let match_id=req.body.match_id;
        let event=req.body.event;
        let reward_type=req.body.reward_type;

        let condition_obj={};
        if(!isEmpty(match_id)){condition_obj={...condition_obj,match_id}};
        if(!isEmpty(event)){condition_obj={...condition_obj,event}};
        if(!isEmpty(reward_type)){condition_obj={...condition_obj,reward_type}};

        let query =  geq_tbl.find(condition_obj) ;
                    const query2 =  query.clone();
                const counts = await query.countDocuments();
        
        
                
                let offest = (page -1 ) * 10 ; 
                const records = await query2.skip(offest).limit(10).sort({date:-1});
                //let paths =MyBasePath(req,res); 
                  
        
            res.status(200).send({'status':true,'msg':"geq list fetched", "page":page, "rows":counts, 'body':records });
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }

  static geq_list_user = async (req,res)=>{
    try {
        let match_id=req.body.match_id;
        
        if(isEmpty(match_id)){
          res.status(200).send({'status':false,'msg':"match id required" });
        }else{

          let records =await  geq_tbl.find({match_id}) ;
                    
          
              res.status(200).send({'status':true,'msg':"geq list fetched", 'body':records });
              
        }
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }
          
    static delete_geq = async (req,res)=>{
    try {
    
            let _id=req.params.id
            
                if(!isEmpty(_id) ){
                    
                    let response=await geq_tbl.findOneAndDelete({_id})
                    if(!isEmpty(response)){
                        res.status(200).send({'status':true,'msg':'geq deleted','body':response});
                    }else{
                        res.status(200).send({'status':false,'msg':'something went wrong','body':''});
                    }
    
                }else{
                res.status(200).send({'status':false,'msg':'all field required'});
                }
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
  }

  static geq_answer_add = async (req,res)=>{
    try {
         let geq_id = req.body.geq_id;
         let user_id = req.body.user_id;
         let user_ans = req.body.user_ans;

         const details={geq_id,user_id,user_ans};

         if(!isEmpty(geq_id) || !isEmpty(user_id) || !isEmpty(user_ans) ){
          let data= await geq_answers.findOne({geq_id,user_id});
          if(isEmpty(data)){
             let obj=new geq_answers(details);
             let response=await obj.save()
             if(!isEmpty(response)){
                 res.status(200).send({'status':true,'msg':'geq added successfully','body':response});
             }else{
                 res.status(200).send({'status':false,'msg':'something went wrong','body':''});
             }
          }else{
            res.status(200).send({'status':false,'msg':'already played'});
          }
         }else{
            res.status(200).send({'status':false,'msg':'all field required'});
         }
        
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':'server error','body':''});
    }
            
  } 
                                     
  static geq_result = async (req,res)=>{
    try {
         let geq_id = req.body.geq_id;
         
         if(!isEmpty(geq_id) ){
            let total=await geq_answers.find({"geq_id":geq_id}).countDocuments();
            let opt_1=await geq_answers.find({"geq_id":geq_id,"user_ans":"opt_1"}).countDocuments();
            let opt_2=await geq_answers.find({"geq_id":geq_id,"user_ans":"opt_2"}).countDocuments();
            let opt_3=await geq_answers.find({"geq_id":geq_id,"user_ans":"opt_3"}).countDocuments();
            let opt_4=await geq_answers.find({"geq_id":geq_id,"user_ans":"opt_4"}).countDocuments();
            let opt_1_percent=((opt_1/total)*100).toFixed(2); 
            let opt_2_percent=((opt_2/total)*100).toFixed(2); 
            let opt_3_percent=((opt_3/total)*100).toFixed(2); 
            let opt_4_percent=((opt_4/total)*100).toFixed(2); 
            let response={
              opt_1_percent,
              opt_2_percent,
              opt_3_percent,
              opt_4_percent
            }
            if(!isEmpty(response)){
                 res.status(200).send({'status':true,'msg':'geq added successfully','body':response});
             }else{
                 res.status(200).send({'status':false,'msg':'something went wrong','body':''});
             }

         }else{
            res.status(200).send({'status':false,'msg':'all field required'});
         }
        
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':'server error','body':''});
    }
            
  } 

  static geq_ans_update = async (req,res)=>{
    try {
         let _id = req.body.geq_id;
         let correct_ans = req.body.correct_ans;
         
         if(!isEmpty(_id) ){
            let geq_data=await geq_tbl.findOneAndUpdate({_id},{correct_ans,result_disclosed:1},{new:true})
            let response=await geq_answers.find({"geq_id":_id,active:1});
            response.map(async (item)=>{
                if(item.user_ans==correct_ans){
                  console.log("=============")  
                  let win = await geqWin({_id:item._id,geq_id:_id,user_id:item.user_id,points:geq_data.reward_quantity,match_id:geq_data.match_id})
                }else{
                  console.log("---------")
                    let lose = await geqLose({_id:item._id})
                }
            })
            
            if(!isEmpty(geq_data)){
                 res.status(200).send({'status':true,'msg':'success','body':geq_data});
             }else{
                 res.status(200).send({'status':false,'msg':'something went wrong','body':''});
             }

         }else{
            res.status(200).send({'status':false,'msg':'all field required'});
         }
        
    } catch (error) { console.log(error);
        res.status(200).send({'status':false,'msg':'server error','body':''});
    }
            
  } 




}
   
module.exports = geqController ;      