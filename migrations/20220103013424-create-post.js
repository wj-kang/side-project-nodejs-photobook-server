'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      photo1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      photo2: {
        type: Sequelize.STRING,
      },
      photo3: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  },
};
