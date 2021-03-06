### Desafio API Lemobs
---

Seja bem vindo ao Desafio API Lemobs!

---

### Roteiro Rápido de Configuração Local

**1)** Instalar Python 3.7.2 (versão recomendada!) - https://www.python.org/downloads/release/python-372/

**2)** Instalar Node versão 10.15.0 (versão recomendada!) - https://nodejs.org/dist/v10.15.0/

**3)** Entrar na pasta do projeto e copiar o arquivo ".env.example" e renomear a cópia para ".env" (manter a cópia na raiz do projeto);

**4)** Preencher o arquivo com as informações de banco de dados necessárias.

**5)** Executar os seguintes comandos no terminal para instalar as dependências necessárias, ainda na pasta do projeto:

```
npm install
npm install nodemon
```
**6)** Migração do banco de dados: com o arquivo .env criado e devidamente editado, basta rodar o seguinte comando para realizar a migração:

```
npx sequelize db:migrate
```

**7)** Executar o seguinte comando no terminal para iniciar a aplicação:

```
npm start
```

**8)** Acessar a aplicação no endereço e portas definidos no arquivo ".env". Exemplo: http://localhost:8001
