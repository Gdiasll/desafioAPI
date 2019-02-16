'use strict';

const {endereco} = require('./../models');

module.exports = {
    cadastrar_endereco: cadastrarEndereco,
    obter_endereco: obterEndereco,
    obter_enderecos: obterEnderecos
}
// --
// Funçao responsavel por cadastrar um endereço
// --
async function cadastrarEndereco(req, res) {
    const rua = req.body.rua.trim();
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro.trim();
    const usuario_id = req.body.usuario_id;

    try {
        await endereco.create({rua, numero, complemento, bairro, usuario_id})

        res.status(201).json( { mensagem: 'Endereço cadastrado com sucesso!' } );
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// --
// Função responsável por retornar endereços de um usuario
// --
async function obterEndereco(req, res) {
    const usuario_id = req.swagger.params.usuario_id.value;

    try {
        const enderecos = await endereco.findAll({
            attributes: ['rua', 'numero', 'complemento', 'bairro'],
            where: {
                usuario_id: usuario_id
            }
        })
        
        const total = enderecos.length
        const saida = {
            total: total,
            enderecos: []
        }

        for(let i = 0; i < total; i++) {
            saida.enderecos.push(
                {
                    endereco: `${enderecos[i].rua}, ${enderecos[i].numero || 's/n'}, ${enderecos[i].complemento || 's/complemento'}`,
                    bairro: `${enderecos[i].bairro}`
                }
            )
        }
        res.status(201).json( saida );

    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }    
}

// --
// Funçao resposavel por retornar dados de todos os endereços do mesmo bairro
// --
async function obterEnderecos(req, res) {
    const bairro = req.swagger.params.bairro.value

    try {
        const enderecos = await endereco.findAll({ 
            attributes: ['rua', 'numero', 'complemento', 'bairro', 'usuario_id'] }
        )

        const saida = enderecos.filter((endereco) => {
            return endereco.bairro == bairro
        })

        res.status(201).json(saida)

    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}
