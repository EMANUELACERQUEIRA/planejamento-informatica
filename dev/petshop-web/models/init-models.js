var DataTypes = require("sequelize").DataTypes;
var _calendario = require("./calendario");
var _cliente = require("./cliente");
var _contato = require("./contato");
var _endereco = require("./endereco");
var _sequelizeMetum = require("./sequelizeMetum");
var _servico = require("./servico");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var calendario = _calendario(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var contato = _contato(sequelize, DataTypes);
  var endereco = _endereco(sequelize, DataTypes);
  var sequelizeMetum = _sequelizeMetum(sequelize, DataTypes);
  var servico = _servico(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);


  return {
    calendario,
    cliente,
    contato,
    endereco,
    sequelizeMetum,
    servico,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
