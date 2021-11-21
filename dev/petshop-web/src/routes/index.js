import express from 'express';
import session from "express-session";
import User from '../db/controllers/UsuarioController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {data: req.body });
});

router.get('/login', (req, res, next) => {
    res.render('login', {data: req.body });
});

router.post('/login', async (req, res, next) => {
    let ssn = req.session;
    await User.login(req, res)
        .then(login => {
            if (login.tipo) {
                ssn = login;
                res.redirect(`/${login.tipo}`);
            } else {
                res.render('login', { msg: login.msg });
            }
        })
        .catch(err => {
            res.render( 'login', { msg: 'Erro de login' } )
        });
});

router.post('/logout', (req, res, next) => {
    const logout = User.logout(req, res);

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

export default router;