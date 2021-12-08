import express, { response } from "express";
import session from "express-session";
import User from '../db/controllers/UsuarioController.js';
import Servico from '../db/controllers/ServicoController.js';
import Calendario from '../db/controllers/CalendarioController.js';

const routes = express.Router();

routes.post('/criarUsuario', (req, res, next) => {
    const login = User.create(req.body);
    res.json(login);
});

routes.post('/criarServico', (req, res, next) => {
    let msg = { tipo: '', msg: '' }
    const servico = Servico.create(req, res);

    if (servico.id) {
        this.msg.tipo = 'success';
        this.msg.msg = `Serviço ${servico.nome} cadastrado com sucesso.`;
    } else {
        this.msg.tipo = 'alert';
        this.msg.msg = `Erro ao cadastrar o serviço ${servico.nome}.`;
    }

    res.json({ servico, msg });
});

routes.get('/listarServicos', async (req, res, next) => {
    let servicos = await Servico.listAll(req, res);
    res.json(servicos);
});

routes.get('/listarCalendarios', async (req, res, next) => {
    let calendario = await Calendario.listarCalendario(req, res);
    res.json(calendario);
});

export default routes