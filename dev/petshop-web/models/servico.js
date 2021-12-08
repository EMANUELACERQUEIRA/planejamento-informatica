const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servico', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cor: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    tempo: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "000000"
    },
    preco: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      defaultValue: 0.00
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Servico',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_Servico_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
