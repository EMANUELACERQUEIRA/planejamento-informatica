'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('usuario', {
    usuario: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      trim: true,
      unique: true,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    ativo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    lastLogout: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('usuario');
}