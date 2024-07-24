const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Store in .env file
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Store in .env file
  region: process.env.AWS_REGION, // Store in .env file
});

const s3 = new AWS.S3();

module.exports = s3;
