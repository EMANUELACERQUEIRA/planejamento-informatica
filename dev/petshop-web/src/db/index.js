'use strict';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import SequelizeAuto from 'sequelize-auto';
import initModels from './init-models.js';

const env = process.env.CLIENT || 'development';

const sequelize = _openConnection(env);
const db = initModels(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ alter: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

/**
 * Le o arquivo de configuracao do banco de dados
 * 
 * @private
 * @param {String} client  nome do ambiente ( development, test, production )
 * @returns {Object}  configuracao do banco de dados
 */
function _readConfig (client) {
  const sFile = path.resolve('src/db/config/config.json');
  const config = JSON.parse(fs.readFileSync(sFile, 'utf-8'));
  return config[client];
}

/**
 * Cria a conexao com o banco de dados
 * 
 * @private
 * @param {String} client  nome do ambiente ( development, test, production )
 * @returns {Object}  conexao com o banco de dados
 */
function _openConnection(client) {
  const config = _readConfig(client);

  let connection = {};
  if (config.storage) {
    connection = new Sequelize(config);
  }

  return connection;
}