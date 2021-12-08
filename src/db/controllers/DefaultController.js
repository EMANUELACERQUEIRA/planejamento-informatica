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
        let registro = {};
        let dados = body;
        dados.createdAt = new Date();
        dados.id = uuidv4();

        await this.Model.create(dados)
            .then(response => {
                registro = response.dataValues;
                msg = {
                    tipo: 'success',
                    msg: `O ${nomeModel} ${registro.nome || registro.usuario} cadastrado com sucesso.`
                };
            })
            .catch(() => {
                msg = {
                    tipo: 'alert',
                    msg: `Erro no cadastro do ${nomeModel} ${dados.nome}`
                };
            })
        ;
        
        return { registro, msg };
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
        return this.formartData(element.dataValues);
    }

    async update(body) {
        let dados = body;
        dados.updatedAt = new Date();

        return await this.Model.findOne({ where: { id: body.id } })
            .then(async () => {
                const set = {};

                for (let key in dados) {
                    set[key] = dados[key];
                }

                return await this.Model.update(set, { where: { id: dados.id } })
                    .then(async update => {
                        if (update[0] === 1) {
                            return await this.Model.findOne({ where: { id: dados.id } })
                                .then(novo => {
                                    return novo.dataValues;
                                })
                                .catch(() => {
                                    return {};
                                })
                            ;
                        }
                    })
                    .catch(() => {
                        return { msg: 'Erro ao atualizar o registro' };
                    })
                ;
            })
            .catch(() => {
                return { msg: `${this.nomeModel} ${dados.nome} não encontrado.` };
            })
        ;
    }

    async save(req) {
        let msg = { tipo: '', msg: '' };
        let registro = {};
        let dados = this.formartData(req.body);
        
        if (dados.id?.length > 0) {
            await this.update(dados)
                .then(response => {
                    registro = response;
                    if (response.id) {
                        msg.tipo = 'success';
                        msg.msg = `${this.nomeModel} ${response.nome || response.usuario} atualizado com sucesso.`;
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
                    registro = response.registro;
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
