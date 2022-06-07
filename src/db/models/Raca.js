export default (sequelize, Sequelize) => {

    return sequelize.define('Raca', {
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
        tamanho: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['PP', 'P', 'M', 'G', 'GG'],
            defaultValue: 'M'
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
        tableName: 'Raca'
    });

}
