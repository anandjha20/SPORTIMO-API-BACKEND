const admin = require('firebase-admin');
const { isEmpty } = require('../myModel/common_modal');
const serviceAccount = require("../serviceAccountKey.json");
const local_default = require("../local_default.json"); 

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


 static firebase_group_list = async(req,res)=>{
  try {
        let group_id = req.params.id; 
      
         // let snaps = await FirebaseDB.collection('messages')
        
                        if(isEmpty(group_id)){
                          var snaps = await FirebaseDB.collection('groups').get();    ///.doc('chats').collection('chats').get();    
                        }else{
                          var snaps = await FirebaseDB.collection('groups') .where('id', '=',group_id).get();   //collection('chats').get();   
                     
                     //   snaps = await FirebaseDB.collection("groups") .where('id', '=',group_id).get().then((querySnapshot) => {
                             // querySnapshot.map((doc) => { console.log(`${doc.chats} => ${doc.data()}`);})
                      //          console.log(" fgggfgf ==== ",querySnapshot);
                     //   });
                     
                      //  const snaps = await FirebaseDB.collection("groups").doc("635cc5d0f1943a31ef50c4f2").collection('chats').doc('B6pMAPPULNxJI7c0qEPX').get();

                      ///  console.log(snaps.data());          


                      }
              // console.log("firebase call === ",snaps);          
   
          //  .where('id', '=',group_id)
                        //.where('uid', '=',group_id)
                            //.orderBy('_createTime._seconds', 'desc')
                        ///.limit(2)
                       // .get();
                            
                      let job = [];    
                      snaps.forEach( async doc => {
                        
                     
                        // let m_res = await FirebaseDB.collection('chats').doc(doc.id).get();
                        //      //  let m_res = await FirebaseDB.collection('chats').where("id").get();  
                     
                     
                        //      let snapshot = await FirebaseDB.firestore()
                        //      .collection('groups')
                        //      .doc('0bayKbCiAchc0Vy9XuxT')
                        //      .collection('qa')
                        //      .get()
                             
                        //      snapshot.forEach(doc =>{ 
                        //        console.log('hello', doc.data())
                        //      })   
                     
                     
                     
                             job.push(doc.data() );
                        //  job.push(doc); 
                           });
              
                      return  res.status(200).send({"status":true, "msg": "success", "body": job }); 
              
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
}

module.exports = FirebaseController ;     