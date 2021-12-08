'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [{
      usuario: 'admin@admin.com',
      senha: '12345',
      tipo: 'admin'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};