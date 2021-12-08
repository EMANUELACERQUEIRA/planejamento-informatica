import db from '../index.js';
import Controller from './DefaultController.js';

class ServicoController extends Controller {

    constructor() {
        super(db.Servico, 'Serviço');
    }

}

export default new ServicoController();