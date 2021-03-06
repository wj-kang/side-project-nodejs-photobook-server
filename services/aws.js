const AWS = require('aws-sdk');

const AWS_S3 = new AWS.S3({
  accessKeyId: process.env.PHOTOBOOK_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.PHOTOBOOK_AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.PHOTOBOOK_AWS_S3_REGION,
});

module.exports = AWS_S3;
