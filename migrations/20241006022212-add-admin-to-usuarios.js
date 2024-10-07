'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'admin', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false // Por defecto es false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'admin');
  }
};
