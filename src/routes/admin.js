import express from "express";
import Servicos from '../db/controllers/ServicoController.js';
import Calendarios from '../db/controllers/CalendarioController.js';
import Clientes from "../db/controllers/ClientesController.js";

const routes = express.Router();
var msg = { tipo: '', msg: ''};

routes.get('/', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'admin')
        res.render('admin');
    else
        res.render('index', {data: req.body });
});

routes.get('/agenda', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login)
        res.render('agenda', { ssn: ssn.login });
    else
        res.render('index', { data: req.body });
});

routes.get('/clientes', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login)
        res.render('lista_clientes', { ssn: ssn.login });
    else
        res.render('index', { data: req.body });
});

routes.post('/clientes', async (req, res, next) => {
    // let ssn = req.login;
    // if (ssn.login) {
        await Clientes.gravarCliente(req)
            .then(response => {
                msg = response;
            })
            .catch(err => {
                msg.tipo = 'alert';
                msg.msg = err;
            })
        ;
        
    //    res.render('lista_clientes', { ssn: ssn.login, msg: msg });
    //} else {
    //    res.render('index', { data: req.body });
    //}
});

routes.get('/funcionarios', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login)
        res.render('lista_funcionarios', { ssn: ssn.login });
    else
        res.render('index', { data: req.body });
});

routes.get('/servicos', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login)
        res.render('lista_servicos', { ssn: ssn.login });
    else
        res.render('index', { data: req.body });
});

routes.post('/servicos', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login) {
        await Servicos.save(req)
            .then(response => {
                msg = response.msg;
            })
            .catch(err => {
                msg.tipo = 'alert';
                msg.msg = err;
            })
        ;

        res.render('lista_servicos', { ssn: ssn.login, msg: msg });
    } else {
        res.render('index', { data: req.body });
    }
});

routes.delete('/excluirServico', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login) {
        await Servicos.delete(req.query.ID || '')
            .then(response => {
                msg = response.msg;
            })
            .catch(err => {
                msg.tipo = 'alert';
                msg.msg = err;
            })
        ;
        res.render('lista_servicos', { ssn: ssn.login, msg: msg });
    } else {
        res.render('index', { data: req.body });        
    }
});

routes.get('/calendarios', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login)
        res.render('lista_calendarios', { ssn: ssn.login });
    else
        res.render('index', { data: req.body });
});

routes.post('/calendarios', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login) {
        msg = await Calendarios.save(req);
        res.render('lista_calendarios', { ssn: ssn.login, msg: msg });
    } else {
        res.render('index', { data: req.body });
    }
});

routes.delete('/excluirCalendario', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login) {
        msg = await Calendarios.delete(req.query.ID || '');
        res.render('lista_calendarios', { ssn: ssn.login, msg: msg });
    } else {
        res.render('index', { data: req.body });        
    }
});

export default routes;