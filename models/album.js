'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /* Associations */
    static associate({ Album, User, Post }) {
      // User:Album 1:N
      Album.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // Album:Post 1:N
      Album.hasMany(Post);
    }
  }
  Album.init(
    {
      thumbnail: DataTypes.STRING,
      count: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Album',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Album;
};
