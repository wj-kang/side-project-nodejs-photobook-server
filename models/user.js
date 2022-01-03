'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /* Associations */
    static associate({ Album }) {
      // User:Album 1:N
      User.hasMany(Album);
    }
  }
  User.init(
    {
      type: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return User;
};
