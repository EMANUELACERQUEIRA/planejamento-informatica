export default (sequelize, Sequelize) => {
    
    class Funcionario extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Funcionario.belongsToMany(models.Servico, {
                through: "Funcionario_Servico",
                as: "servicos",
                foreignKey: "funcionarioId",
            });
            models.Servico.belongsToMany(Funcionario, {
                through: "Funcionario_Servico",
                as: "funcionarios",
                foreignKey: "servicoId",
            });

            Funcionario.belongsToMany(models.Calendario, {
                through: "Funcionario_Calendario",
                as: "calendarios",
                foreignKey: "funcionarioId",
            });
            models.Calendario.belongsToMany(Funcionario, {
                through: "Funcionario_Calendario",
                as: "funcionarios",
                foreignKey: "calendarioId",
            });


        }
    }

    Funcionario.init(
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
            telefone: {
                type: Sequelize.STRING(15),
                allowNull: true
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
            modalName: 'Funcionario',
            tableName: 'Funcionario',
            index: [
                {
                    unique: true,
                    fields: ["usuarioId"],
                }
            ]
        }
    );

    return Funcionario;

};