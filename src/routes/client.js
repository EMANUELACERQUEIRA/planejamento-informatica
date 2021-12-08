import express from "express";
import session from "express-session";

const routes = express.Router();

routes.get('/', (req, res, next) => {
    let ssn = req.session;
    if (ssn.tipo === 'client')
        res.render('client');
    else
        res.render('index', {data: req.body });
});

export default routes;