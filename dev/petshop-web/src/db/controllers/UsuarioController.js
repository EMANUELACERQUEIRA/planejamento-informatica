import db from '../index.js';
import Controller from './DefaultController.js';

class UsuarioController extends Controller {

    constructor() {
        super(db.Usuario, 'Usuário');
    }

    async login(req, res) {
        const controller = this;
        const Model = controller.Model;

        return await Model.findOne({
            where: {
                usuario: req.body.usuario,
                senha: req.body.senha,
                ativo: true
            }
        })
            .then(async result => {
                const user = result.dataValues;
                user.lastLogin = new Date();

                return await controller.update(user)
                    .then((response) => {
                        return response;
                    })
                    .catch(() => {
                        return { tipo: 'alert', msg: 'Login indisponivel' };    
                    })
                ;
            })
            .catch(() => {
                return { tipo: 'alert', msg: 'Usuário e Senha inválido' };
            });
    }

    async logout(login) {
        const controller = this;
        const Model = controller.Model;
        let msg = {};

        await Model.findOne({
            where: {
                id: login.id,
                usuario: login.usuario,
                senha: login.senha,
                ativo: true
            }
        })
            .then(async result => {
                const user = result.dataValues;
                user.lastLogout = new Date();

                await controller.update(user)
                    .then(async (response) => {
                        if (response.usuario) {
                            msg = { tipo: 'success', msg: 'Usuário desconectado, volte logo!' };
                        } else {
                            msg = { tipo: 'alert', msg: 'Usuário não encontrado!' };
                        }
                    })
                    .catch((err) => {
                        msg = { tipo: 'alert', msg: 'Logout indisponivel' };
                    })
                ;
            })
            .catch(err => {
                msg = { tipo: 'alert', msg: 'Usuário e Senha inválido' };
            });
        
        return msg;
    }
}

export default new UsuarioController();