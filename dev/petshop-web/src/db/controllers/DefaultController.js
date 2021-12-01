import { v4 as uuidv4 } from 'uuid';

export default class Controller {

    msg = { tipo: '', msg: '' }

    constructor(model, nome = 'Registro') {
        this.Model = model;
        this.nomeModel = nome;
    }

    async create(body) {
        const nomeModel = this.nomeModel;
        let msg = {};
        let servico = {};
        let dados = body;
        dados.createdAt = new Date();
        dados.id = uuidv4();

        await this.Model.create(dados)
            .then(response => {
                servico = response.dataValues;
                msg = {
                    tipo: 'success',
                    msg: `O ${nomeModel} ${servico.nome} cadastrado com sucesso.`
                };
            })
            .catch(err => {
                msg = {
                    tipo: 'alert',
                    msg: `Erro no cadastro do ${nomeModel} ${dados.nome}`
                };
            })
        ;
        
        return { servico: servico, msg: msg };
    }

    async listAll() {
        let resultado = [];

        await this.Model.findAll()
            .then(response => {
                resultado = response.map(element => { return this.formartData(element.dataValues) });
            })
            .catch(err => {
                this.msg.tipo = 'alert';
                this.msg.msg  = err;
            })
        ;
        
        return resultado;
    }

    async read(body) {
        const result = await this.Model.findOne({ where: { id: body.id } });
        return this.formartData(element.dataValues);
    }

    async update(body) {
        let response = {};
        let dados = body;
        dados.updatedAt = new Date();

        await this.Model.findOne({ where: { id: body.id } })
            .then(old => {
                const set = {};

                for (let key in dados) {
                    set[key] = dados[key];
                }

                this.Model.update(set, { where: { id: dados.id } })
                    .then(update => {
                        if (update[0] === 1) {
                            this.Model.findOne({ where: { id: dados.id } })
                                .then(novo => {
                                    response = novo.dataValues;
                            });
                        }
                    })
                    .catch(err => {
                        response = { msg: 'Erro ao atualizar o registro' };
                    })
                ;
            })
            .catch(err => {
                response = { msg: `${this.nomeModel} ${dados.nome} não encontrado.` };
            })
        ;
        
        return response;
    }

    async save(req) {
        let msg = { tipo: '', msg: '' };
        let registro = {};
        let dados = this.formartData(req.body);
        
        if (dados.id.length > 0) {
            await this.update(dados)
                .then(response => {
                    registro = response;
                    if (response.id) {
                        msg.tipo = 'success';
                        msg.msg = `${this.nomeModel} ${response.nome} atualizado com sucesso.`;
                    } else {
                        msg.tipo = 'alert';
                        msg.msg = `Erro ao atualizar o ${this.nomeModel} ${response.nome}.`;
                    }
                })
                .catch(err => {
                    msg.tipo = 'alert';
                    msg.msg = err;
                })
            ;
        } else {
            await this.create(dados)
                .then(response => {
                    registro = response;
                    if (response.id) {
                        msg.tipo = 'success';
                        msg.msg = `${this.nomeModel} ${response.nome} cadastrado com sucesso.`;
                    } else {
                        msg.tipo = 'alert';
                        msg.msg = `Erro ao cadastrar o ${this.nomeModel} ${response.nome}.`;
                    }
                })
                .catch(err => {
                    msg.tipo = 'alert';
                    msg.msg = err;
                })
            ;
        }

        return { registro, msg };
    }

    async delete(id) {
        const Model = this.Model;

        const old = await Model.findOne({ where: { id: id } });
        await old.destroy()
            .then(del => {
                if (del) {
                    this.msg.tipo = 'success';
                    this.msg.msg  = `O ${this.nomeModel} ${body.nome} eliminado.`;    
                }
            })
            .catch(err => {
                this.msg.tipo = 'alert';
                this.msg.msg  = err;
            })
        ;

        return this.msg;
    }

    /**
     * 
     * @protected
     * @param {Object} oData 
     * @returns {Object}
     */
    formartData(oData) {
        let formatted = {};

        Object.keys(oData).forEach((key) => {
            if (oData[key] === 'on') {
                oData[key] = true;
            } else if (oData[key] === 'off') {
                oData[key] = false;
            }

            formatted[key] = oData[key];
        })

        return formatted;
    }

}
