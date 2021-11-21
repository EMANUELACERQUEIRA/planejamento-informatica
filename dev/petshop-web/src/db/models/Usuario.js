import Sequelize from 'sequelize';
import db from '../db.js'

const Usuario = db.define('usuario', {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    lastLogout: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

export default Usuario;
