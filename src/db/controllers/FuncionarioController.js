import db from '../index.js';
import Controller from './DefaultController.js';
import Servicos from './ServicoController.js'
import Calendario from './CalendarioController.js';

class FuncionarioController extends Controller {

    constructor() {
        super(db.Funcionario, 'Funcionário');
    }

    async relatorioFuncionarios(req, res) {
        const relatorio = [];
        const funcionarios = await this.Model.findAll({
            include: [
                { model: db.Servico, as: "servicos" }
            ]
        });

        funcionarios.forEach((f) => {
            let registro = {
                id: f.id,
                nome: f.nome,
                telefone: f.telefone,
                ferias: f.ferias,
            };
            f.servicos.forEach((s) => {
                registro.servicoId = s.id;
                registro.servico = s.nome;
                registro.ativo = s.ativo;
                relatorio.push(registro);
            });
        });

        return relatorio;
    }

    async buscarFuncionario(req, res) {
        const servicos = await Servicos.listAll();
        const calendario = await Calendario.listAll();

        if (req.body.id) {
            const funcionario = this.Model.findByPk(req.body.id, {
                include: [
                    { model: db.Servico, as: "servicos" },
                    { model: db.Calendario, as: "calendarios" },
                ]
            });
        }
    }

    async listarServicos(req, res) {
        const servicos = await Servicos.listAll();

        if (req) {
            const funcionario = await this.Model.findByPk(req.body.id, {
                include: [{
                    model: db.Servico,
                    as: "servicos"
                }]
            });
        }

        return servicos;
    }

    async listarCalendario(req, res) {
        const calendario = await Calendario.listarCalendario(req, res);

        if (req) {
            const funcionario = await this.Model.findByPk(req.body.id, {
                include: [{
                    model: db.Calendario,
                    as: "calendarios"
                }]
            });
        }

        return calendario;
    }

}

export default new FuncionarioController();