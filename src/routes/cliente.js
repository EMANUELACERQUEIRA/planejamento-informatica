import express from "express";
import session from "express-session";

const routes = express.Router();

routes.get('/', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente')
        res.render('cliente');
    else
        res.render('index', {data: req.body });
});

routes.get('/meusDados', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente')
        res.render('meus_dados');
    else
        res.render('index', {data: req.body });
});

routes.get('/meusPets', (req, res, next) => {
    let ssn = req.session;
    if (ssn.login && ssn.login.tipo === 'cliente')
        res.render('meus_pets');
    else
        res.render('index', {data: req.body });
});

export default routes;