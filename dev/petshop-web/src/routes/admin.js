import express from "express";
import session from "express-session";
import User from '../db/controllers/UsuarioController.js';

const routes = express.Router();

routes.get('/', (req, res, next) => {
    let ssn = req.session;
    if (ssn.tipo === 'admin')
        res.render('admin');
    else
        res.render('index', {data: req.body });
});

routes.post('/newuser', (req, res, next) => {
    const login = User.create(req, res);
    console.log(login);
});

export default routes;