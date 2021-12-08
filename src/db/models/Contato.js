export default (sequelize, Sequelize) => {

    return sequelize.define('Contato', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        tipo: {
            type: Sequelize.STRING(1),
            allowNull: false,
        },
        telefone: {
            type: Sequelize.STRING(50),
            allowNull: false,
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
    }, {
        tableName: 'Contato'
    });
}