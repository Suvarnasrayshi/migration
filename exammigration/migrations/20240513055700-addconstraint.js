'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      queryInterface.addConstraint('exams', {
        fields: ['studentid'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_student',
        references: { //Required field
          table: 'students',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    
  
    queryInterface.addConstraint('exams', {
      fields: ['subjectid'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_subject',
      references: { //Required field
        table: 'subjects',
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
