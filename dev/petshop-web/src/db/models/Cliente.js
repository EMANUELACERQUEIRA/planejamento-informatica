export default (sequelize, Sequelize) => {

    return sequelize.define('Cliente', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: '',
        },
        enderecoId: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: '',
        },
    }, {
        tableName: 'Cliente'
    });

};