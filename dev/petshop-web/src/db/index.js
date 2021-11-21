import db from './db.js';
import User from './models/Usuario.js';
    
db.sync();

export default db;