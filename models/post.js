'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /* Associations */
    static associate({ Post, Album }) {
      // Album:Post 1:N Association
      Post.belongsTo(Album, {
        foreignKey: 'albumId',
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init(
    {
      thumbnail: DataTypes.STRING,
      photo1: DataTypes.STRING,
      photo2: DataTypes.STRING,
      photo3: DataTypes.STRING,
      text: DataTypes.STRING,
      albumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Post;
};
