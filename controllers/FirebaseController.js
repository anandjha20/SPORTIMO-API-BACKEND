const admin = require('firebase-admin');
const { isEmpty } = require('../myModel/common_modal');
const serviceAccount = require("../serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chattron-7ac2c.firebaseio.com",
  });

  const FirebaseDB = admin.firestore();

class FirebaseController {


  static firebase_group_chat_data = async(req,res)=>{
          try {
                let group_id = req.params.id; 
              if(isEmpty(group_id)){
                     return res.status(200).send({"status":false, "msg": "Group Id Field Required...", "body": ''}); 
              }
                  let snaps = await FirebaseDB.collection('messages')
                                .where('conversationId', '=',group_id)
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

 static getFirebaseChatData = async(req,res)=>{
  try {
   
  let snaps = await admin.firestore().collection('messages').get();
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


  static getFirebaseUser  = async(req,res)=>{
    try {
      let snaps = await admin.auth().getUser("8lCERQgFzVP8I2NAxygCIEKEJ3N2");
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