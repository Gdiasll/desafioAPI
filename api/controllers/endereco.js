'use strict';

const { Client } = require('pg');
const urlConexao = require('../../config/pg_connection');

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
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        await client.query('INSERT INTO endereco (rua, numero, complemento, bairro, usuario_id) VALUES ($1, $2, $3, $4, $5)', 
            [rua, numero, complemento, bairro, usuario_id]);
        await client.end();

        res.status(201).json( { mensagem: 'Endereço cadastrado com sucesso!' } );
        
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// --
// Função responsável por retornar endereços
// --
async function obterEndereco(req, res) {
    const usuario_id = req.swagger.params.usuario_id.value;

    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        const enderecos = await client.query(`SELECT rua, numero, complemento, bairro FROM endereco WHERE usuario_id = ${usuario_id}`)
        await client.end();
        
        const total = enderecos.rows.length
        const saida = {
            total: total,
            enderecos: []
        }

        for(let i = 0; i < total; i++) {
            saida.enderecos.push(
                {
                    endereco: `${enderecos.rows[i].rua}, ${enderecos.rows[i].numero || 's/n'}, ${enderecos.rows[i].complemento || 's/complemento'}`,
                    bairro: `${enderecos.rows[i].bairro}`
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
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        const enderecos = await client.query('SELECT * FROM endereco')
        await client.end()

        const saida = enderecos.rows.filter((endereco) => {
            return endereco.bairro == bairro
        })

        res.status(201).json(saida)

    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}
