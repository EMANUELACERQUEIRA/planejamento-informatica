import express from "express";
import session from "express-session";
import Cliente from '../db/controllers/ClientesController.js';

const routes = express.Router();

routes.get('/', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente')
        res.render('cliente');
    else
        res.render('index', {data: req.body });
});

routes.post('/meusDados', async (req, res) => {
    let ssn = req.session;
    if (ssn.login) {
        
    }
});

routes.get('/meusDados', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente') {
        let dados = await Cliente.buscarDadosPorLogin(ssn.login);
        res.render('meus_dados', { "dados": dados });
    }
    else
        res.redirect('/', {data: req.body });
});

routes.get('/meusPets', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente')
        res.render('meus_pets');
    else
        res.render('index', {data: req.body });
});

export default routes;