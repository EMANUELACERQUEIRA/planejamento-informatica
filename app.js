import express from 'express';
import session from 'express-session';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/db/index.js';
import routes from './src/routes/index.js';
import routesAdmin from './src/routes/admin.js';
import routesCliente from './src/routes/cliente.js';
import routesServ from './src/routes/services.js';
import rootDir from './src/util/path.js';

dotenv.config();

const PORT = process.env.PORT || 4100 //Se a variavel de ambiente PORT não estiver com valor, usaremos a 4100

const app = express();

//favicon
app.use(favicon(path.join(rootDir, 'public', 'assets', 'img','favicon.ico')));

// Pug
app.set('view engine', 'pug');
app.set('views', 'views');

// Midlleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

// Bootstrap
//app.use('/static/bootstrap/css', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/css')));
//app.use('/static/bootstrap/js', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/js')));
//app.use('/static/bootstrap/icon', express.static(path.join(rootDir, 'node_modules/bootstrap-icons/icons')));

// Bootstrap-Table
app.use('/static/bootstrap-table', express.static(path.join(rootDir, 'node_modules/bootstrap-table/dist')));

// JQuery
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/jquery/dist')));

// Axios 
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/axios/dist')));

// Tabulator
app.use('/static/css', express.static(path.join(rootDir, 'node_modules/tabulator-tables/dist/css')));
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/tabulator-tables/dist/js')));

// Chart.js
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/chart.js/dist')));

// Session
app.use(session({secret:'petshop'}));

// Rotas
app.use('/', routes);
app.use('/admin', routesAdmin);
app.use('/cliente', routesCliente);
app.use('/services', routesServ);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Express is running on port ${server.address().port}`);
});