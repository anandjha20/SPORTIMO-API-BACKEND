let  express_2 = require('express');
  
const { rows_count,gen_str,getcurntDate,getTime,send_mobile_otp,isEmpty } = require('../myModel/common_modal');
   
  
 const geq_tbl= require('../models/geq_tbl');
    
class geqController { 

  static add_geq = async (req,res)=>{
    try {
         let match_id = req.body.match_id;
         let match_name = req.body.match_name;
         let event = req.body.event;
         let appearance_time = req.body.appearance_time;
         let duration = req.body.duration;
         
         let qus = req.body.qus;      let qus_ara = req.body.qus_ara;
         let ops_1 = req.body.ops_1;  let ops_1_ara = req.body.ops_1_ara;
         let ops_2 = req.body.ops_2;  let ops_2_ara = req.body.ops_2_ara;
         let ops_3 = req.body.ops_3;  let ops_3_ara = req.body.ops_3_ara;
         let ops_4 = req.body.ops_4;  let ops_4_ara = req.body.ops_4_ara;
         let ops_5 = req.body.ops_5;  let ops_5_ara = req.body.ops_5_ara;
         
         let reward_type    = req.body.reward_type;
         let reward_quantity = req.body.reward_quantity;
         let reward_condition = req.body.reward_condition;

         let targeted_country = req.body.targeted_country;
         let targeted_sport = req.body.targeted_sport;
         let targeted_player = req.body.targeted_player;
         let targeted_team = req.body.targeted_team;
         let targeted_league = req.body.targeted_league;

         const details={match_id,match_name,event,appearance_time,duration,qus,qus_ara,ops_1,ops_1_ara,ops_2,ops_2_ara,ops_3,ops_3_ara,ops_4,ops_4_ara,ops_5,ops_5_ara,reward_type,reward_quantity,reward_condition,targeted_country,targeted_sport,targeted_player,targeted_team,targeted_league};

         if(!isEmpty(match_id) || !isEmpty(event) || !isEmpty(qus) || !isEmpty(qus_ara) || !isEmpty(ops_1) || !isEmpty(ops_1_ara) || !isEmpty(ops_2) || !isEmpty(ops_2_ara) ||!isEmpty(ops_3) || !isEmpty(ops_3_ara)){
             let obj=new geq_tbl(details);
             let response=await obj.save()
             if(!isEmpty(response)){
                 res.status(200).send({'status':true,'msg':'geq added successfully','body':response});
             }else{
                 res.status(200).send({'status':false,'msg':'something went wrong','body':''});
             }

         }else{
            res.status(200).send({'status':true,'msg':'all field required'});
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
            let ops_1 = req.body.ops_1;  let ops_1_ara = req.body.ops_1_ara;
            let ops_2 = req.body.ops_2;  let ops_2_ara = req.body.ops_2_ara;
            let ops_3 = req.body.ops_3;  let ops_3_ara = req.body.ops_3_ara;
            let ops_4 = req.body.ops_4;  let ops_4_ara = req.body.ops_4_ara;
            let ops_5 = req.body.ops_5;  let ops_5_ara = req.body.ops_5_ara;
            
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
            if(!isEmpty(ops_1)){details={...details,ops_1}};
            if(!isEmpty(ops_2)){details={...details,ops_2}};
            if(!isEmpty(ops_3)){details={...details,ops_3}};
            if(!isEmpty(ops_4)){details={...details,ops_4}};
            if(!isEmpty(ops_5)){details={...details,ops_5}};
            if(!isEmpty(ops_1_ara)){details={...details,ops_1_ara}};
            if(!isEmpty(ops_2_ara)){details={...details,ops_2_ara}};
            if(!isEmpty(ops_3_ara)){details={...details,ops_3_ara}};
            if(!isEmpty(ops_4_ara)){details={...details,ops_4_ara}};
            if(!isEmpty(ops_5_ara)){details={...details,ops_5_ara}};
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
                res.status(200).send({'status':true,'msg':'all field required'});
                }
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }

static geq_list = async (req,res)=>{
    try {
        let page=req.body.page;
        let match_name=req.body.match_name;
        let event=req.body.event;
        let reward_type=req.body.reward_type;

        let condition_obj={};
        if(!isEmpty(match_name)){condition_obj={...condition_obj,match_name}};
        if(!isEmpty(event)){condition_obj={...condition_obj,event}};
        if(!isEmpty(reward_type)){condition_obj={...condition_obj,reward_type}};

        let query =  geq_tbl.find(condition_obj) ;
                    const query2 =  query.clone();
                const counts = await query.countDocuments();
        
        
                
                let offest = (page -1 ) * 10 ; 
                const records = await query2.skip(offest).limit(10);
                //let paths =MyBasePath(req,res); 
                  
        
            res.status(200).send({'status':true,'msg':"geq list fetched", "page":page, "rows":counts, 'body':records });
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }
static delete_geq = async (req,res)=>{
    try {
    
            let _id=req.body._id
            
                if(!isEmpty(_id) ){
                    
                    let response=await geq_tbl.findOneAndDelete({_id})
                    if(!isEmpty(response)){
                        res.status(200).send({'status':true,'msg':'geq deleted','body':response});
                    }else{
                        res.status(200).send({'status':false,'msg':'something went wrong','body':''});
                    }
    
                }else{
                res.status(200).send({'status':true,'msg':'all field required'});
                }
            
        } catch (error) { console.log(error);
            res.status(200).send({'status':false,'msg':'server error','body':''});
        }
                
            }
                                     
}
   
module.exports = geqController ;      