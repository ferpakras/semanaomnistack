const express = require('express');

const app = express();

app.use(express.json());

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
 * *
 * * ROUTE PARAMS: geralmente utilizado nos métodos PUT ou DELETE
 * * * request.params(Identificar um recurso para alteração ou remoção)
 * * * ex: app.delete('/users/:id', (request, response) => { - o :id é o parâmetro que utilizamos para informar o que deve ser deletado
 * *
 * * BODY: é o mais utilizado, responsável por todo corpo dos registros
 * * * request.body(Dados para criação ou alteração de um registro)
 * * * ex: app.post('/users', (request, response) => { 
 * * * devemos informar ao express que estamos lidando com JSON, caso contrário o retorno será undefined. Vide linha 5
 */
app.post('/users', (request, response) => { 
  
  // debugging QUERY PARAMS
  console.log(request.query);

  // debugging ROUTE PARAMS 
  console.log(request.params);

  // debugging BODY
  console.log(request.body);

  /**
   * Utilizamos o return response.send('Hello World'); apenas para testar o funcionamento da aplicação
   * Mas devemos considerar o .json, pois este é o retorno esperado por APIs Restful
   * 
   */
  return response.json({ message: 'Hello Ferpa!' });
});

app.listen(3333);