const multer  = require('multer');


const img_upload = (path,img_name) =>{

    const storage = multer.diskStorage({ destination: function (req, file, cb) { cb(null, path);}, 
        filename: function (req, file, cb){ const uniqueSuffix = Date.now(); cb(null, uniqueSuffix+'-' + file.originalname ) }
      });
       
      const uComplaintImg = multer({ storage: storage });
         
      const uComplaintImgUpload = uComplaintImg.fields([{ name: img_name , maxCount: 1 }]);
      return   uComplaintImgUpload ; 
}

       

module.exports = { img_upload}