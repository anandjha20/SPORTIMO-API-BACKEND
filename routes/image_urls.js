const express = require('express');
const path = require('path');
const router = express.Router();

// router.get('/assets/user_image/:img?',function(req,res){
//         let img = req.params.img;
//       let full_path = path.join(__dirname+`../../assets/user_image/${img}`);
//         return   res.sendFile(full_path);
//         });

  router.get('/assets/product/:img?',function(req,res){
           let img = req.params.img;
            let full_path = path.join(__dirname+`../../assets/product_img/${img}`);
            return   res.sendFile(full_path);
   });
       
   router.get('/assets/sponsorship_image/:img?',function(req,res){
    let img = req.params.img;
      
  

   let full_path = path.join(__dirname+`../../assets/sponsorship_image/${img}`);
     return   res.sendFile(full_path);
     }); 

      router.get('/assets/:par1?/:img?',function(req,res){
        let par1 = req.params.par1;
        let img = req.params.img;
        let full_path = path.join(__dirname+`../../assets/${par1}/${img}`);
     
      return   res.sendFile(full_path);
       

     
   
        });

module.exports = router;