import Sequelize from 'sequelize';
import Model from '../models/Usuario.js';

export default {
    async create(req, res) {
        const user = await Model.create(req.body);
        return res.json(user);
    },

    async list(req, res) {
        const { page = 1 } = req.query;
        const { limit = 25 } = req.query;

        const users = await Model.findAll({
            offset: page,
            limit: limit
        });

        return res.json(users);
    },

    async read(req, res) {
        const user = await Model.findByUser(req.params.user);
        return res.json(user);
    },

    async update(req, res) {
        const user = await Model.findByIdAndUpdate(req.params.user, req.body, { new: true });
        return res.json(user);
    },

    async login(req, res) {
        let response = {};

        await Model.findOne({
            where: {
                usuario: req.body.usuario,
                senha: req.body.senha,
                ativo: true
            }
        })
            .then(async result => {
                const user = result.dataValues;
                user.lastLogin = new Date();

                try {
                    const update = await Model.update({ lastLogin: user.lastLogin }, { where: { usuario: user.usuario } });
                    if (update[0] === 1) {
                        await Model.findOne({ where: { user: user.user } })
                        .then(login => {
                            response = login.dataValues;
                        });
                    }
                } catch (err) {
                    response = { msg: 'Login indisponivel' };
                }
            })
            .catch(err => {
                response = { msg: 'Usuário e Senha inválido' };
            });
        
        return response;
    },

    async logout(req, res) {
        await Model.findOne({ where: { user: req.body.user } })
            .then(async result => {
                const user = result.dataValues;
                user.lastLogout = new Date();

                try {
                    await Model.update({ lastLogout: user.lastLogout }, { where: { user: user.user } });
                    const login = await Model.findOne({ where: { user: user.user } });
                    return res.json(login.dataValues);
                } catch (err) {
                    return { msg: 'Logout indisponivel' };
                }
            })
            .catch(err => {
                return { msg: 'Usuário e Senha inválido' };
            });
    },
}
