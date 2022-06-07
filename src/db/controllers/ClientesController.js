import db from '../index.js';
import Controller from './DefaultController.js';
import Usuario from './UsuarioController.js';
import Endereco from './EnderecoController.js';
import Animal from './AnimalController.js';

class ClientesController extends Controller {

    dadosCliente = {
        usuario: {},
        endereco: {},
        pets: [],
        telefone: [],
    }

    constructor() {
        super(db.Cliente, 'Cliente');
    }

    async buscarDadosPorLogin(login) {
        const controller = this;
        
        return await this.read({ usuarioId: login.id })
            .then(async (response) => {
                return await controller.buscarDadosCliente(response);
            })
            .catch(() => {
                return { tipo: 'alert', msg: 'O cliente não está cadastrado' }
            })
        ;
    }

    async buscarDadosCliente(cliente) {
        const dados = JSON.parse(JSON.stringify(this.dadosCliente));
        
        for (let key in this.Model.fieldRawAttributesMap) {
            dados[key] = cliente[key];
        }
        
        dados.endereco = await Endereco.read({ "id": cliente.enderecoId })
            .then(resEndereco => {
                return resEndereco;
            });
        
        return dados;
    }

    async gravarCliente(req) {
        const controller = this;

        // Cadastra o usuario
        let usuarioNovo = {
            usuario: req.body.email,
            senha: req.body.senha || '12345',
            nome: req.body.nome,
            tipo: 'cliente'
        }
        let clienteNovo = JSON.parse(JSON.stringify(this.dadosCliente));

        // Cadastra o Endereço do Cliente
        if (req.body.cep) {
            await Endereco.save({ body: req.body })
                .then(resEndereco => {
                    clienteNovo.endereco = resEndereco.registro;
                })
                .catch(err => {
                    return { tipo: 'alert', msg: err };
                })
                ;
        }

        // Cadastrar o Cliente
        await Usuario.save({ body: usuarioNovo })
            .then(async resUsuario => {
                if (resUsuario.registro.id) {
                    clienteNovo.usuario = resUsuario.registro;

                    let cliente = {
                        "nome": resUsuario.registro.nome,
                        "email": resUsuario.registro.usuario,
                        "usuarioId": resUsuario.registro.id,
                        "enderecoId": clienteNovo.endereco.id || null
                    }

                    await controller.save({ body: cliente })
                        .then(resCliente => {
                            for (let key in resCliente.registro) {
                                clienteNovo[key] = resCliente.registro[key];
                            }

                            // Cadastrar os Animais
                        })
                        .catch(err => {
                            this.msg = { tipo: 'alert', msg: err };
                        });
                } else {
                    this.msg = { tipo: 'alert', msg: resUsuario.msg };
                }
            })
            .catch(err => {
                this.msg = { tipo: 'alert', msg: err };
            })
        ;
        
        return { registro: clienteNovo, msg: this.msg };
    }



}

export default new ClientesController();