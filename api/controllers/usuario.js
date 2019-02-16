'use strict';

const { Client } = require('pg');
const {usuario, endereco} = require('./../models');

module.exports = {
    cadastrar_usuario: cadastrarUsuario,
    atualizar_usuario: atualizarUsuario,
    obter_usuario: obterUsuario,
    obter_todos: obterTodos
};

async function cadastrarUsuario(req, res) {
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;
    const cpf = req.body.cpf.replace(/\D/g, '');

    try {
        if(!validaCPF(cpf)) throw "CPF inválido"
        
        usuario.create({nome, data_nascimento, cpf});
        
        res.status(201).json( { mensagem: 'Usuário cadastrado com sucesso!' } );
    
    } catch (err) {
        console.log(err);
        if(err.code == 23505) res.status(400).json({ mensagem: 'CPF já cadastrado!' })
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Função responsavel por atualizar um usuario existente
async function atualizarUsuario(req, res) {
    const id = req.swagger.params.usuario_id.value;
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;

    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        await client.query('UPDATE usuario SET (nome, data_nascimento) = ($1, $2) WHERE id = ($3)', [nome, data_nascimento, id]);
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

        let usuario = await client.query(`SELECT nome, data_nascimento, cpf FROM usuario WHERE id =${id_usuario}`)
        await client.end();
        usuario = usuario.rows[0]
        
        res.status(201).json( { nome: usuario.nome,
            data_nascimento: usuario.data_nascimento,
            cpf: mascaraCpf(usuario.cpf)
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Funçao para obter todos usuarios
async function obterTodos(req, res) {
    try {
        const client = new Client({ connectionString: urlConexao });
        await client.connect();

        const usuarios = await client.query('SELECT * FROM usuario')
        await client.end()
        const usuario = usuarios.rows
        const saida = []
        
        for(let i = 0; i < usuario.length; i++) {
            saida.push({ nome: usuario[i].nome,
                data_nascimento: usuario[i].data_nascimento,
                cpf: mascaraCpf(usuario[i].cpf)
            })
        } 
        res.status(201).json({ saida })

    } catch (err) {
        console.log(err);
        return falçksdf
    }
}

// --
// Função para validar cpf
// --
function validaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;
     
  for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

// --
// Funçao que aplica mascara ao cpf
// --
function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}
