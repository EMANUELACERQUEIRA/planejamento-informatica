import { response } from 'express';
import db from '../index.js';
import Controller from './DefaultController.js';

class CalendarioController extends Controller {

    constructor() {
        super(db.Calendario, 'Calendario');
    }

    async listarCalendario() {
        let calendario = await this.listAll();
        
        return calendario.map((item) => {
            let dados = this.formartData(item);
            dados.horario = `${dados.horarioDe} até ${dados.horarioAte}`;
            return dados;
        });
    }

}

export default new CalendarioController();