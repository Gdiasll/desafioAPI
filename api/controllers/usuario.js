'use strict';

const { Client } = require('pg');
const urlConexao = require('../../config/pg_connection');

module.exports = {
    cadastrar_usuario: cadastrarUsuario,
    atualizar_usuario: atualizarUsuario,
    obter_usuario: obterUsuario,
    obter_todos: obterTodos
};

async function cadastrarUsuario(req, res) {
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;
    const cpf = req.body.cpf;

    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        await client.query('INSERT INTO usuario (nome, data_nascimento, cpf) VALUES ($1, $2, $3)', [nome, data_nascimento, cpf]);
        await client.end();

        res.status(201).json( { mensagem: 'Usuário cadastrado com sucesso!' } );
        
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Função responsavel por atualizar um usuario existente
async function atualizarUsuario(req, res) {
    const id = req.swagger.params.usuario_id;
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;
    const cpf = req.body.cpf;

    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        await client.query('UPDATE usuario SET (nome, data_nascimento, cpf) = ($1, $2, $3) WHERE id = ($4)', [nome, data_nascimento, cpf, id[0]]);
        await client.end();

        res.status(201).json( { mensagem: 'Usuario atualizado com sucesso!' } );
        
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Função responsável por obter um usuário existente
async function obterUsuario(req, res) {
    const id_usuario = req.swagger.params.usuario_id.value;

    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        const usuario = await client.query(`SELECT nome, data_nascimento, cpf FROM usuario WHERE id =${id_usuario}`);
        await client.end();

        res.status(201).send(usuario.rows[0])
        
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Funçao para obter todos usuarios
async function obterTodos(req, res) {
    // ------------//
}