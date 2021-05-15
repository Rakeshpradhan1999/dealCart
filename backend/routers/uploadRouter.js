import express from "express";
import multer from "multer";
import path from "path";
// const cloudinary = require("cloudinary").v2
import cloudinary from "cloudinary";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// router.post("/", upload.single("image"), (req, res) => {
//   const file = req.file;
//   res.send(`/${file.destination}/${file.filename}`);
// });

router.get("/", async (req, res) => {
  //Get the time stamp in second
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using Node.js sdk method api_sign_request

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );

  res.status(200).json({ signature, timestamp });
});

export default router;
