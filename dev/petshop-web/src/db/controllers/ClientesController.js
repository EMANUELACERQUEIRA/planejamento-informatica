import db from '../index.js';
import Controller from './DefaultController.js';
import Usuario from './UsuarioController.js';

class ClientesController extends Controller {

    constructor() {
        super(db.Cliente, 'Cliente');
    }

    async gravarCliente(req) {
        const controller = this;
        const Model = controller.Model;

        // Cadastra o usuario
        let user = {
            id: req.body.userId,
            usuario: req.body.email,
            senha: '12345',
            tipo: 'cliente',
            ativo: req.body.ativo
        }
        let cliente = req.body;

        return await Usuario.save({ body: user })
            .then(async resUsuario => {
                if (resUsuario.registro.id) {
                    cliente.userId = resUsuario.registro.id;
                    return await Model.save({ body: cliente });
                } else {
                    return resUsuario.msg;
                }
            })
            .catch(err => {
                return { tipo: 'alert', msg: err }
            })
        ;
    }

}

export default new ClientesController();