const { Router } = require("express");
const axios = require("axios");
const Dev = require("./models/Dev");

const routes = Router();

/**
 * Métodos HTTP disponíveis (mais utilizados):
 * * GET: utilizado para buscar informações (requisições diretamente via browser)
 * * POST: utilizado para enviar informações (precisamos de uma ferramenta pra tetar o POST - Insomnia / Postman)
 * * PUT: utilizado para atualizar/editar informações
 * * DELETE: utilizado para deletar informações
 *
 * Tipos de parâmetros:
 * * QUERY PARAMS: 90% das vezes utilizado com GET
 * * * request.query(utilizado para filtros, ordenação, paginação, ...)
 * * * debugging QUERY PARAMS: console.log(request.query);
 * *
 * * ROUTE PARAMS: geralmente utilizado nos métodos PUT ou DELETE
 * * * request.params(Identificar um recurso para alteração ou remoção)
 * * * ex: app.delete('/users/:id', (request, response) => { - o :id é o parâmetro que utilizamos para informar o que deve ser deletado
 * * * debuggin ROUTE PARAMS: console.log(request.params);
 * *
 * * BODY: é o mais utilizado, responsável por todo corpo dos registros
 * * * request.body(Dados para criação ou alteração de um registro)
 * * * ex: app.post('/users', (request, response) => {
 * * * devemos informar ao express que estamos lidando com JSON, caso contrário o retorno será undefined. Vide linha 5
 * * * debbugin body: console.log(request.body);
 */

routes.post("/devs", async (request, response) => {
  /**
   * Neste momento criamos uma nova request através do Insomnia
   * fazendo um POST no /devs, com as infos do usuário.
   *
   * Para este cenários, enviamos apenas o github_username visto que as outras
   * informações pessoas já estarão disponíveis na API do GitHub.
   */
  console.log(request.body);

  /**
   * Desestruturando o request.body. Neste momento estou resgatando apenas a propriedade
   * github_username do retorno de request.body.
   */
  const { github_username, techs } = request.body;

  /**
   * Consumindo API do Github utilizando o AXIOS
   * Utilizamos o await para evitar que o código continue rodando mesmo sem ter
   * devidamente concluído a chamada da API. O await nada mais é do que um break na execução
   * até que ele termine o que precisa ser feito.
   */
  const apiResponse = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  /**
   * Para visualizar a resposta da API, basta fazer a request através
   * do Insomnia e o .data aparecerá no console.
   */
  console.log(apiResponse.data);

  /**
   * Desestruturando o retorno da API do Github
   * Passamos o valor do login para o name pois este campo não é required no GitHub.
   * Então se o usuário não preencheu o name, pegará por default o login, que é
   * obrigatório.
   */
  const { name = login, avatar_url, bio } = apiResponse.data;
  console.log(name, avatar_url, bio, github_username);

  /**
   * Exibindo as Techs
   * Como estamos esperando um array de opções, precisamos fazer a conversão do que
   * vem da requisição (Insomnia).
   * O split quebra em um item do array a cada vírgula encontrada.
   * O .map percorre os itens remove os espaços em branco (.trim) antes e depois de
   * cada item do array.
   */
  const techsArray = techs.split(",").map(tech => tech.trim());

  /**
   * Criando o DEV dentro da nossa estrutura do banco
   * A propriedade techs é a única que recebe alguma coisa (techsArray) devido
   * o tratamento que foi feito com as informações recebidas do endpoint.
   * Quando deixamos apenas a propriedade, o JS já entende que a propriedade recebe
   * ela mesma. É o mesmo que name: name, por exemplo.
   */
  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  });

  /**
   * Utilizamos o return response.send('Hello World'); apenas para testar o funcionamento da aplicação
   * Mas devemos considerar o .json, pois este é o retorno esperado por APIs Restful
   * return response.json({ message: "Hello Ferpa!" });
   *
   * Passamos a const dev para o response para gravar essas informações na base
   */
  return response.json(dev);
});

module.exports = routes;
