export default (sequelize, Sequelize) => {

    return sequelize.define('Endereco', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        cep: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },
        logradouro: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        numero: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        complemento: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        bairro: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        localidade: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        uf: {
            type: Sequelize.STRING(2),
            allowNull: false
        },
        ibge: {
            type: Sequelize.STRING(7),
            allowNull: true
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
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
        tableName: 'Endereco'
    });
}
