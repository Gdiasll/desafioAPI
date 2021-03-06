'use strict';

const {usuario} = require('./../models');

module.exports = {
    cadastrar_usuario: cadastrarUsuario,
    atualizar_usuario: atualizarUsuario,
    obter_usuario: obterUsuario,
    obter_todos: obterTodos
};

// Função responsavel por cadastrar usuario
async function cadastrarUsuario(req, res) {
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;
    const cpf = req.body.cpf.replace(/\D/g, '');

    try {
        if(!validaCPF(cpf)) throw "CPF inválido"
        
        await usuario.create({nome, data_nascimento, cpf});
        
        res.status(201).json( { mensagem: 'Usuário cadastrado com sucesso!' } );
    
    } catch (err) {
        console.log(err);
        if(err.parent.code == 23505) res.status(400).json({ mensagem: 'CPF já cadastrado!' })
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Função responsavel por atualizar um usuario existente
async function atualizarUsuario(req, res) {
    const id = req.swagger.params.usuario_id.value;
    const nome = req.body.nome.trim();
    const data_nascimento = req.body.data_nascimento;

    try {
        await usuario.update({ nome, data_nascimento }, {where: { id: id }})

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
        let pesquisa = await usuario.findOne({
            where: {
                id: id_usuario
            }
        })

        res.status(201).json( { nome: pesquisa.nome,
            data_nascimento: pesquisa.data_nascimento,
            cpf: mascaraCpf(pesquisa.cpf)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json( { mensagem: err.toString() } );
    }
}

// Funçao para obter todos usuarios
async function obterTodos(req, res) {
    try {
        const pesquisa = await usuario.findAll()

        const usuarios = []
        
        for(let i = 0; i < pesquisa.length; i++) {
            usuarios.push({ id: pesquisa[i].id,
                nome: pesquisa[i].nome,
                data_nascimento: pesquisa[i].data_nascimento,
                cpf: mascaraCpf(pesquisa[i].cpf)
            })
        } 
        res.status(201).json({ usuarios })

    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: err.toString() })
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
