const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../config/aws");

const uploadItem = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_ITEM,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = uploadItem;
