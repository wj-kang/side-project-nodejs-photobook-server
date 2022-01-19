require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PHOTOBOOK_DB_USERNAME,
    password: process.env.PHOTOBOOK_DB_PASSWORD,
    database: 'TestPhotobook',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.PHOTOBOOK_DB_USERNAME,
    password: process.env.PHOTOBOOK_DB_PASSWORD,
    database: process.env.PHOTOBOOK_DB_NAME,
    host: process.env.PHOTOBOOK_DB_HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PHOTOBOOK_DB_PRODUCTION_USERNAME,
    password: process.env.PHOTOBOOK_DB_PRODUCTION_PASSWORD,
    database: process.env.PHOTOBOOK_DB_PRODUCTION_NAME,
    host: process.env.PHOTOBOOK_DB_PRODUCTION_HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
};
