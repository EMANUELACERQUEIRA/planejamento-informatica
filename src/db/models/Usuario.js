export default (sequelize, Sequelize) => {

    return sequelize.define('Usuario', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        usuario: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            unique: true
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
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        lastLogin: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        lastLogout: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'Usuario'
    });
}