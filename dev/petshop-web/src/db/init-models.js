import Sequelize from 'sequelize';
import _Calendario from './models/Calendario.js';
import _Cliente from './models/Cliente.js';
import _Contato from './models/Contato.js';
import _Endereco from './models/Endereco.js';
import _Servico from './models/Servico.js';
import _Usuario from './models/Usuario.js';

export default (sequelize) => {

    return {
        Calendario: _Calendario(sequelize, Sequelize),
        Cliente: _Cliente(sequelize, Sequelize),
        Contato: _Contato(sequelize, Sequelize),
        Endereco: _Endereco(sequelize, Sequelize),
        Servico: _Servico(sequelize, Sequelize),
        Usuario: _Usuario(sequelize, Sequelize),
    }

}