'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookborrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     bookborrow.belongsTo(models.book,{foreignKey:'book_id'});
     bookborrow.belongsTo(models.userbook,{foreignKey:'member_id'});
    }
  }
  bookborrow.init({
    book_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'bookborrow',
  });
  return bookborrow;
};