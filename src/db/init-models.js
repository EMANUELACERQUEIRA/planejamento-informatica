import Sequelize from 'sequelize';
import _Usuario from './models/Usuario.js';
import _Endereco from './models/Endereco.js';
import _Contato from './models/Contato.js';
import _Calendario from './models/Calendario.js';
import _Servico from './models/Servico.js';
import _Raca from './models/Raca.js';
import _Cliente from './models/Cliente.js';
import _Animal from './models/Animal.js';
import _Funcionario from './models/Funcionario.js';

export default (sequelize) => {

    return {
        Usuario: _Usuario(sequelize, Sequelize),
        Endereco: _Endereco(sequelize, Sequelize),
        Contato: _Contato(sequelize, Sequelize),
        Raca: _Raca(sequelize, Sequelize),
        Calendario: _Calendario(sequelize, Sequelize),
        Servico: _Servico(sequelize, Sequelize),
        Animal: _Animal(sequelize, Sequelize),
        Cliente: _Cliente(sequelize, Sequelize),
        Funcionario: _Funcionario(sequelize, Sequelize),
    }

}