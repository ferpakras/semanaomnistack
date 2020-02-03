const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

/**
 * Definimos os models de acordo com as entidades disponíveis dentro do projeto
 * Neste caso, uma das nossas entidades são os Dev.
 *
 * Schema é uma estruturação da entidade dentro do Banco de dados.
 * * Estruturação nada mais são dos que as infos que guardaremos:
 * * * nome, email, techs, latitude, longitude, etc...
 *
 * O parâmetro passado ao lado das propriedades é o tipo que esse dado
 * será armazenado no banco.
 */

const DevSchema = new mongoose.Schema({
  nome: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],

  //Como o location precisa de alguns tratamentos, separamos em um arquivo utils para que possa ser reaproveitado
  //Podemos reaproveitar esse cara em outros schemas que utilizarão latitude/longituded
  //Precisamos obrigatoriamente utilizar um index quando trabalhamos com location
  location: {
    type: PointSchema,
    //É utilizado apenas para facilitar a busca no banco
    index: "2dsphere"
  }
});

/**
 * O parâmetro 'Dev' é o nome escolhido para salvar esses dados
 * dentro do banco de dados
 */
module.exports = mongoose.model("Dev", DevSchema);
