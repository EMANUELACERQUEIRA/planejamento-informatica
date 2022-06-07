export default (sequelize, Sequelize) => {

    return sequelize.define('Contato', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        clienteId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: {
                model: "Cliente",
                key: "id"
            }
        },
        tipo: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['P', 'M', 'R', 'C'],
            defaultValue: 'P'
        },        
        telefone: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        ramal: {
            type: Sequelize.STRING(5),
            allowNull: true,
            defaultValue: ''
        },
        nome: {
            type: Sequelize.STRING(50),
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
    }, {
        tableName: 'Contato'
    });
}