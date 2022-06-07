import bcrypt from 'bcrypt';

export default (sequelize, Sequelize) => {

    const Usuario = sequelize.define('Usuario', {
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
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tipo: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['admin', 'cliente', 'funcionario'],
            defaultValue: 'cliente'
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
        sequelize,
        modalName: 'Usuario',
        tableName: 'Usuario',
        instanceMethods: {
            generateHash(senha) {
                return bcrypt.hash(senha, bcrypt.genSaltSync(8));
            },
            validarSenha: function (senha) { 
                return bcrypt.compareSync(senha, this.senha);
            }
        },
        classMethods: {
            isSenha: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
        }
    });

    //Usuario.addHook('beforeSave', (usuario) => {
    //    if (usuario.senha) {
    //        usuario.senha = usuario.generatePasswordHash(usuario.senha); 
    //    }
    //});

    Usuario.prototype.generatePasswordHash = (senha) => {
        const salt = bcrypt.genSaltSync(10, 'a');
        return bcrypt.hashSync(String(senha), salt);    
    };

    Usuario.prototype.validatePassword = (senha) => {
        return bcrypt.compareSync(senha, this.senha);
    };

    return Usuario;
}