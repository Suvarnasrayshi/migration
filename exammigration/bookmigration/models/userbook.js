'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    userbook.hasMany(models.bookborrow,{foreignKey:'member_id'});
    }
  }
  userbook.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    joinDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'userbook',
  });
  return userbook;
};