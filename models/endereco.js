const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('endereco', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    localidade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    ibge: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Endereco',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Endereco_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
