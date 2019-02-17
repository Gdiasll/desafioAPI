require('dotenv').config()

module.exports = {
  development: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: process.env.BD_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false    
    },
    operatorsAliases: false 
  },
  test: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: process.env.BD_HOST,
    dialect: "postgres",
    define: {
       timestamps: false    
    },
    operatorsAliases: false 
  },
  production: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: process.env.BD_HOST,
    dialect: "postgres",
    define: {
        timestamps: false    
    },
    operatorsAliases: false
  } 
}
