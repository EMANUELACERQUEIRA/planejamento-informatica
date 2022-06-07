import db from '../index.js';
import Controller from './DefaultController.js';

class RacaController extends Controller {

    constructor() {
        super(db.Raca, 'Raca');
    }

}

export default new RacaController();