const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contato', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Contato',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Contato_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
