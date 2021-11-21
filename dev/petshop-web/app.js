import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import routesAdmin from './src/routes/admin.js';
import rootDir from './src/util/path.js';
import dbConfig from './src/db/index.js';

dotenv.config();

const PORT = process.env.PORT || 4100 //Se a variavel de ambiente PORT não estiver com valor, usaremos a 4100

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

// Midlleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

// Bootstrap
app.use('/static/css', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/css')));
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/js')));
app.use('/static/icon', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/')));

// JQuery
app.use('/static/js', express.static(path.join(rootDir, 'node_modules/jquery/dist')));

// Session
app.use(session({secret:'petshop'}));

// Rotas
app.use('/', routes);
app.use('/admin', routesAdmin);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Express is running on port ${server.address().port}`);
});