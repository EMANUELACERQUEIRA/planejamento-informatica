import db from '../index.js';
import Controller from './DefaultController.js';

class EnderecoController extends Controller {

    constructor() {
        super(db.Endereco, 'Endereço');
    }

}

export default new EnderecoController();