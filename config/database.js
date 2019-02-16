'use strict';

module.exports = {
  development: {
    username: 'geone',
    password: 'geonedias',
    database: 'desafio',
    host:     'localhost',
    dialect: "postgres",
    define: {
        timestamps: false    
    },
    operatorsAliases: false 
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
       timestamps: false    
    },
    operatorsAliases: false 
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
        timestamps: false    
    },
    operatorsAliases: false 
  }
}
