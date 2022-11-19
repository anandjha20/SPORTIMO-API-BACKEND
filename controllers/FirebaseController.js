const admin = require('firebase-admin');
const { isEmpty } = require('../myModel/common_modal');
const serviceAccount = require("../serviceAccountKey.json");
const local_default = require("../local_default.json"); 
const user_chat_blocks_tbl = require("../models/user_chat_blocks");
 

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: local_default.FIRBASEDBURL, //   ..process.env.FIRBASEDBURL ,
  });
  
  const FirebaseDB = admin.firestore();

class FirebaseController {


  static firebase_group_chat_data = async(req,res)=>{
          try {
                let group_id = req.params.id; 
              if(isEmpty(group_id)){
                     return res.status(200).send({"status":false, "msg": "Group Id Field Required...", "body": ''}); 
              }
                 // let snaps = await FirebaseDB.collection('messages')
                  let snaps = await FirebaseDB.collection('groups')
                              //  .where('id', '=',group_id)
                                //.where('uid', '=',group_id)
                                    //.orderBy('_createTime._seconds', 'desc')
                                ///.limit(2)
                                .get();
                                    
                              let job = [];    
                              snaps.forEach(doc => {
                                job.push(doc.data());
                                 //  job.push(doc); 
                                    });
                      
                              return  res.status(200).send({"status":true, "msg": "success", "body": job}); 
                      
                        } catch (error) {  console.log("demo tesing ==  ",error);
                          return res.status(200).send({"status":false, "msg": error, "body": ''}); 
                        }

 }


 static FirebaseGroupListData = async(req,res)=>{
  try {
           let group_id = req.params.id; 
      
               // let snaps = await FirebaseDB.collection('messages')
        
                        if(isEmpty(group_id)){
                          var snaps = await FirebaseDB.collection('groups').get();    ///.doc('chats').collection('chats').get();    
                        }else{
                          var snaps = await FirebaseDB.collection('groups') .where('id', '=',group_id).get();   //collection('chats').get();   
                            }
          
                      let job = []; let i = 1;   
                      snaps.forEach( async doc => {
                            job.push(doc.data() );
                        //  job.push(doc); 
                           });
                 
          if(job){              
              return  res.status(200).send({"status":true, "msg": "success", "body": job }); 
        }else{
              return  res.status(200).send({"status":false, "msg": "No data Found1..", "body": '' }); 
        }

                    
              
                } catch (error) {  console.log("demo tesing ==  ",error);
                  return res.status(200).send({"status":false, "msg": error, "body": ''}); 
                }

    }






  static FirebaseGroupChatData = async(req,res)=>{
  try {
        let group_id = req.params.id; 
      
          // let snaps = await FirebaseDB.collection('messages')
        
                        if(isEmpty(group_id)){
                          var snaps = await FirebaseDB.collection('groups').get();    ///.doc('chats').collection('chats').get();    
                        }else{
                          var snaps = await FirebaseDB.collection('groups') .where('id', '=',group_id).get();   //collection('chats').get();   
                            }
          
                      let job = []; let i = 1;   
                      snaps.forEach( async doc => {
                            job.push(doc.data() );
                        //  job.push(doc); 
                            });
                  if(job){ let sendTOData = await Promise.all( job.map(async (item)=>{
                            
                          let snapshot = await FirebaseDB.collection('groups').doc(item.id).collection('chats').get();

                              let chatData = [] ;
                              snapshot.forEach(async (chank) =>{ 
                                    chatData.push(chank.data() );
                              }) ;
                              delete item["members"] ; 
                            item.chatData = chatData; 
                          return item;
                    }));
                        
              return  res.status(200).send({"status":true, "msg": "success", "body": sendTOData }); 
        }else{
              return  res.status(200).send({"status":false, "msg": "No data Found1..", "body": '' }); 
        }

                    
              
                } catch (error) {  console.log("demo tesing ==  ",error);
                  return res.status(200).send({"status":false, "msg": error, "body": ''}); 
                }

    }
    

    static FirebaseChatData = async(req,res)=>{
      try {
            let chats_id = req.params.id; 
                if(isEmpty(chats_id)){
                    var snaps = await FirebaseDB.collection('chatroom').get();    ///.doc('chats').collection('chats').get();    
                    }else{
                    var snaps = await FirebaseDB.collection('chatroom') .where('id', '=',chats_id).get();   //collection('chats').get();   
                      }
              
                          let job = []; let i = 1;   
                          snaps.forEach( async doc => {
                                job.push(doc.data() );
                           });

                     if(job){ let sendTOData = await Promise.all( job.map(async (item)=>{
                               
                             let snapshot = await FirebaseDB.collection('chatroom').doc(item.id).collection('chats').get();
    
                                 let chatData = [] ;
                                 snapshot.forEach(async (chank) =>{ 
                                  chatData.push(chank.data() );
                                  }) ;
                               item.chatData = chatData; 
                              return item;
                       }));
                            
                  return  res.status(200).send({"status":true, "msg": "success", "body": sendTOData }); 
            }else{
                  return  res.status(200).send({"status":false, "msg": "No data Found1..", "body": '' }); 
            }
    
                        
                  
                    } catch (error) {  console.log("demo tesing ==  ",error);
                      return res.status(200).send({"status":false, "msg": error, "body": ''}); 
                    }
    
        }
    

 static getFirebaseChatData = async(req,res)=>{
  try {
   
  let snaps = await admin.firestore().collection('chats').get();
  //   let snaps = await admin.firestore().collection('users').get()
        let job = []; 
        snaps.forEach(doc => {
          job.push(doc.data());
             //  job.push(doc); 
               });

    return  res.status(200).send({"status":true, "msg": "success", "body": job}); 

  } catch (error) {  console.log("demo tesing ==  ",error);
    return res.status(200).send({"status":false, "msg": error, "body": ''}); 
  }
}


static getFirebaseChatData_new = async(req,res)=>{
  try {
              const sfRef = await admin.firestore().collection('groups').doc('28277767').collection('chats').orderBy('time').get();
             // const collections = await sfRef.listCollections();
               

  let snaps = await admin.firestore().collection('chats').get();
  //   let snaps = await admin.firestore().collection('users').get()
        let job = []; 
        sfRef.forEach(doc => {
          job.push(doc.data());
             //  job.push(doc); 
               });

    return  res.status(200).send({"status":true, "msg": "success", "body": sfRef}); 

  } catch (error) {  console.log("demo tesing ==  ",error);
    return res.status(200).send({"status":false, "msg": error, "body": ''}); 
  }
}




  static getFirebaseUser  = async(req,res)=>{
    try {
      let snaps = await admin.auth().getUser("To7ZMyCx8neykUBKyajX8UlgDbD3");
      return  res.status(200).send({"status":true, "msg": "success", "body": snaps}); 

    } catch (error) {  console.log("demo tesing ==  ",error);
      return res.status(200).send({"status":false, "msg": error, "body": ''}); 
    }
 }



    static getFirebaseUser_list = async(req,res)=>{
        try {
          let snaps = await admin.auth().listUsers();
          return  res.status(200).send({"status":true, "msg": "success", "body": snaps}); 

        } catch (error) {  console.log("demo tesing ==  ",error);
          return res.status(200).send({"status":false, "msg": error, "body": ''}); 
        }
     }

    static firebaseAddUsers  = async(req,res)=>{
      admin.auth().createUser({
        email: 'user123@example.com',
        emailVerified: false,
        phoneNumber: '+919826526479',
        password: '123456',
        displayName: 'Raj kumar',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false
      }).then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch(function(error) {
          console.log('Error creating new user:', error);
          return  res.status(200).send({"status":false, "msg": error, "body": ''}); 
        });
    }

    static chat_analytics = async (req,res)=>{
      try {
        let total_user=[];
        let total_suspended_player=await user_chat_blocks_tbl.find({block_type:"admin"}).countDocuments()
   
        let publicRoomData=await (await FirebaseDB.collection('groups').get()).docs;        
        publicRoomData.map((item)=>{
          let data=item._fieldsProto.members.arrayValue.values;
          data.map((i)=>{
            if(!total_user.includes(i.mapValue.fields.uid.stringValue)){
              total_user.push(i.mapValue.fields.uid.stringValue)
            }
          })
        });

            let analytics={
              total_public_room_playes:total_user.length,
              total_playes_having_aceess_commenting:total_user.length,
              total_suspended_player:total_suspended_player
            };
          return  res.status(200).send({'status':true,'msg':"success",'body':analytics});
        } catch (error) {
          console.log(error)
          return  res.status(200).send({'status':false,'msg':"server error",'body':''});
        }
  
  
    }

}

module.exports = FirebaseController ;     