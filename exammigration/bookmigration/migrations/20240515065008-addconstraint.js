'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    
    queryInterface.addConstraint('bookborrows', {
      fields: ['book_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_book',
      references: { //Required field
        table: 'books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  
    queryInterface.addConstraint('bookborrows', {
      fields: ['member_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_bookuser',
      references: { //Required field
        table: 'userbooks',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
