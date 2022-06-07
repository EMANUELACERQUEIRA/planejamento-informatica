import db from '../index.js';
import Controller from './DefaultController.js';

class ContatoController extends Controller {

    constructor() {
        super(db.Contato, 'Contato');
    }

}

export default new ContatoController();