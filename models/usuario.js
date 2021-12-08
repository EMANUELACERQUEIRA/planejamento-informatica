const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLogout: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Usuario_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sqlite_autoindex_Usuario_2",
        unique: true,
        fields: [
          { name: "usuario" },
        ]
      },
    ]
  });
};
