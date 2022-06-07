import express, { response } from "express";
import session from "express-session";
import User from '../db/controllers/UsuarioController.js';
import Servico from '../db/controllers/ServicoController.js';
import Calendario from '../db/controllers/CalendarioController.js';
import Clientes from '../db/controllers/ClientesController.js';
import Funcionario from "../db/controllers/FuncionarioController.js";
import Raca from '../db/controllers/RacaController.js';

const routes = express.Router();

routes.post('/criarUsuario', async (req, res, next) => {
    const login = await User.create(req.body);
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

routes.get('/listarRacas', async (req, res, next) => {
    let servicos = await Raca.listAll(req, res);
    res.json(servicos);
});

routes.get('/listarCalendarios', async (req, res, next) => {
    let calendario = await Calendario.listarCalendario(req, res);
    res.json(calendario);
});

routes.get('/listarFuncionarios', async (req, res, next) => {
    const relatorio = await Funcionario.relatorioFuncionarios(req, res);
    res.json(relatorio);
});

routes.get('/listarServicosFuncionario', async (req, res, next) => {
    const dados = await Funcionario.listarServicos(req, res);
    res.json(dados);
});

routes.get('/listarCalendarioFuncionario', async (req, res, next) => {
    const dados = await Funcionario.listarCalendario(req, res);
    res.json(dados);
});

export default routes