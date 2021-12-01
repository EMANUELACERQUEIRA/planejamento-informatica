import db from '../index.js';
import Controller from './DefaultController.js';

class UsuarioController extends Controller {

    constructor() {
        super(db.Usuario, 'Usuário');
    }

    async login(req, res) {
        const Model = this.Model;
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
                    const update = await Model.update({ lastLogin: user.lastLogin }, { where: { id: user.id } });
                    if (update[0] === 1) {
                        await Model.findOne({ where: { id: user.id } })
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
    }

    async logout(req, res) {
        await Model.findOne({ where: { id: req.body.id } })
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
    }
}

export default new UsuarioController();