export default (sequelize, Sequelize) => {
    
    return sequelize.define('Calendario', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        segunda: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        terca: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        quarta: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        quinta: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        sexta: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        sabado: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        domingo: {
            type: Sequelize.BOOLEAN,
            defaultValue: 'off',
            allowNull: true,
        },
        horarioDe: {
            type: Sequelize.STRING(6),
            allowNull: true,
        },
        horarioAte: {
            type: Sequelize.STRING(6),
            allowNull: true,
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'Calendario'
    });

}