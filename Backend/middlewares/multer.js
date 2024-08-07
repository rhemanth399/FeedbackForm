import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("hi")
        const uploadFilePath=path.resolve(process.cwd(), 'uploads');
        cb(null, uploadFilePath)

    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
  
    if (typeof file === "string") {
      // If it's a URL, skip the Multer upload process
      cb(null, false);
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv"
      ];
      
  
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("File type not allowed!"), false);
      }
    }
  };

const upload = multer({ storage,fileFilter });

export { upload }
