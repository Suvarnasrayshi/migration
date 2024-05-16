'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      book.hasMany(models.bookborrow,{foreignKey:'book_id'});
    }
  }
  book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    published_year: DataTypes.INTEGER,
    available_copies: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};