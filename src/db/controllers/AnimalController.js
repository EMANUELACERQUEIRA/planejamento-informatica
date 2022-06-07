import db from '../index.js';
import Controller from './DefaultController.js';

class AnimalController extends Controller {

    constructor() {
        super(db.Animal, 'Animal');
    }

}

export default new AnimalController();