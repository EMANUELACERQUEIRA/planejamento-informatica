export default (sequelize, Sequelize) => {

    return sequelize.define('Servico', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cor: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        tempo: {
            type: Sequelize.STRING(6),
            defaultValue: '000000',
            allowNull: false,
        },
        preco: {
            type: Sequelize.DECIMAL(5, 2),
            defaultValue: '0.00',
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
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'Servico'
    });

}
