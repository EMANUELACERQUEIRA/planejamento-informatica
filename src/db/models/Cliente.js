export default (sequelize, Sequelize) => {
    
    class Cliente extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            /*
            Cliente.belongsTo(models.Usuario, {
                foreignKey: "id",  // column name
                sourceKey: "usuarioId", // referenced column
                uniqueKey: "cliente_usuario_fk", // foreign key constraint name
                onDelete: "RESTRICT", // ON DELETE config
                onUpdate: "RESTRICT", // ON UPDATE config
                constraints: true, // remove ON DELETE and ON UPDATE constraints
            });
            Cliente.belongsTo(models.Endereco, {
                foreignKey: "id",  // column name
                sourceKey: "enderecoId", // referenced column
                uniqueKey: "cliente_endereco_fk", // foreign key constraint name
                onDelete: "RESTRICT", // ON DELETE config
                onUpdate: "RESTRICT", // ON UPDATE config
                constraints: true, // remove ON DELETE and ON UPDATE constraints
            });
            */
        }
    }

    Cliente.init(
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            usuarioId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: "Usuario",
                    key: "id"
                }
            },
            enderecoId: {
                type: Sequelize.UUID,
                allowNull: true,
                //references: {
                //    model: "Endereco",
                //    key: "id"
                //}
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        },
        {
            sequelize,
            modalName: 'Cliente',
            tableName: 'Cliente',
            index: [
                {
                    unique: true,
                    fields: ["usuarioId"],
                }
            ]
        }
    );

    return Cliente;

};