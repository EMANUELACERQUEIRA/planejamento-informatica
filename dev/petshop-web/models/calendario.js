const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calendario', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    segunda: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    terca: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    quarta: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    quinta: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sexta: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sabado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    domingo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    horarioDe: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    horarioAte: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Calendario',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Calendario_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
