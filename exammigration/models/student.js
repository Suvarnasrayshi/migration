'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log("student",models);
      student.hasOne(
        models.exam, {
        foreignKey: 'studentid',
      });
    }
  }
  student.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    city:{
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};
