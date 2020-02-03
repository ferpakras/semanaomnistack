const express = require("express");

//Mongoose é responsável por fazer a conexão da noss aplicação com o MongoDB
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://ferpa:ferpa@cluster0-pno1h.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

/**
 * Express.json precisa ser carregado antes, caso contrário as rotas não funcionarão
 */
app.use(express.json());

/**
 *  Carrega as rotas do arquivo externo
 */

app.use(routes);

/**
 * Configura a porta da aplicação
 */
app.listen("3333");
