const AWS_S3 = require('../services/aws');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sharpUtility = require('./sharp');
const { nanoid } = require('nanoid');

const upload = multer({
  storage: multerS3({
    s3: AWS_S3,
    bucket: process.env.AWS_S3_BUTKET_NAME,
    cacheControl: 'max-age=600000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: 'standard',
        key(req, file, callback) {
          callback(null, `standard/standard_${Date.now()}${nanoid(3)}${path.extname(file.originalname)}`);
        },
        transform: function (req, file, callback) {
          callback(null, sharpUtility.standard());
        },
      },
      {
        id: 'thumbnail',
        key(req, file, callback) {
          callback(null, `thumbnail/thumbnail_${Date.now()}${nanoid(3)}${path.extname(file.originalname)}`);
        },
        transform: function (req, file, callback) {
          callback(null, sharpUtility.thumbnail());
        },
      },
    ],
  }),
  limits: { fileSize: 50 * 1024 * 1024, parts: 10 },
  fileFilter: (req, file, callback) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|webp/;
    // Check ext & mime
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      return callback('Error. Check your file type', false);
    }
  },
});

const multerMiddleware = upload.fields([
  { name: 'photo1', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
  { name: 'photo3', maxCount: 1 },
]);

module.exports = multerMiddleware;
