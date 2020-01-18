const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

/**
 * Conexão com banco de dados
 */
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
