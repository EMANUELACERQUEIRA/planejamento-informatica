const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Cliente',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Cliente_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
