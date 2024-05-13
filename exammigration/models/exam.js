'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log("exam",models);
      exam.belongsTo(models.subject, {
        foreignKey: 'subjectid',
      });

      exam.belongsTo(models.student, {
        foreignKey: 'studentid',
      });
    }
  }
  exam.init({
    studentid: DataTypes.INTEGER,
    subjectid: DataTypes.INTEGER,
    marks: DataTypes.INTEGER
  },
   {
    sequelize,
    modelName: 'exam',
  });
  return exam;
};