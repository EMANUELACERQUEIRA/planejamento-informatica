import express from 'express';
import Usuario from '../db/controllers/UsuarioController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {data: req.body });
});

router.get('/login', (req, res, next) => {
    res.render('login', {data: req.body });
});

router.post('/login', async (req, res, next) => {
    let ssn = req.session;
    await Usuario.login(req, res)
        .then(login => {
            if (login.id) {
                ssn.login = login;
                res.redirect(`/${login.tipo}`);
            } else {
                res.render('login', { msg: login } );
            }
        })
        .catch(err => {
            res.render( 'login', { msg: login } )
        });
});

router.get('/logout', async (req, res, next) => {
    let ssn = req.session;
    if (ssn.login) {
        const logout = await Usuario.logout(ssn.login);

        if (logout.tipo === 'success') {
            req.session?.destroy((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('login', { tipo: 'alert', msg: logout })
                }
            });
        } else {
            res.render(ssn.login || 'index', { tipo: 'alert', msg: logout })
        }
    } else {
        res.render('index');
    }
});

export default router;