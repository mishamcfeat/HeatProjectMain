const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/aws"); // Import your S3 configuration

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "your-bucket-name", // Your S3 bucket name
    acl: "public-read", // Access control
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname); // Unique file name
    },
  }),
});

module.exports = upload;
