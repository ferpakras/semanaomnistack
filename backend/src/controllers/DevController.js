const axios = require("axios");
const Dev = require("../models/Dev");

/**
 * O Controller é responsável por fazer todos os tratamentos dos dados antes
 * de devolver para as Models. É uma boa prática criarmos um controle por entidade
 * para manter a organização do código.
 *
 * Todo tratamento que antes estávamos fazendo diretamente no arquivo de routes, agora estão sendo
 * tratados e exportados aqui no controller.
 */

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

/**
 * Os controllers possuem 5 funções disponíveis:
 * * Index: quando quiser mostrar uma lista desse recurso (nesse caso o nosso Dev)
 * * Show: quando quiser mostrar um único item (nesse caso um único dev)
 * * Store: quando quiser armazenar os dados
 * * Update: quando quiser atualizar os dados
 * * Destroy: quando quiser deletar os dados
 */

module.exports = {
  /**
   * Controller responsável por mostrar a lista de devs cadastrados
   * no banco de dados
   */
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  //Quanto utilizamos Controllers, precisamos armazenar essas infos em uma variavel
  async store(request, response) {
    // debugging QUERY PARAMS
    // console.log(request.query);

    // debugging ROUTE PARAMS
    // console.log(request.params);

    // debugging BODY
    // console.log(request.body);

    /**
     * Resgatando os dados do usuários do banco
     */
    console.log(request.body); // exibe os dados cadastrados pelo insomnia

    //Desestruturando as informações que queremos do banco
    const { github_username, techs, latitude, longitude } = request.body;

    /**
     * Verifica se o usuário já existe no banco de dados para evitar salvar duplicado.
     * Neste caso ele está verificando dentro da model Dev que é a responsável pelo
     * nosso schema do banco.
     * Se o usuário não existir, completa a operação.
     */
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      //Fazendo a conexão com a API do GitHub através do Axios
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      //Desestruturando as informações que queremos da API do GitHub
      //Caso a API não retorne o name, usaremos o login do usuário como default
      const { name = login, avatar_url, bio } = apiResponse.data;
      console.log(name, avatar_url, bio, github_username);

      //A lista de tecnologias no banco é uma string, precisamos converter para array
      //Em seguida fazemos um map nessa lista, removendo os espaços em branco antes e depois de cada string
      const techsArray = techs.split(",").map(tech => tech.trim());

      //O nome location é devido ser o nome que estamos gravando no banco de dados (devSchema)
      //Precisamos passar type e coordinates que é o que está sendo esperado no PointSchema
      //Lembrando na necessidade do Mongo em receber a longitude primeiro
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      /**
       * Criando os dados do usuário, conforme schema criado no /models/Dev.
       * Utilizamo awai pois essa requisição pode demorar
       * techs é o único que recebe uma propriedade pois precisamos tratar as informações
       * que vieram da API, que por sua vez foram armazenadas no techsArray.
       *
       * Não esquecer de trocar o response para retornar agora o Dev, ao invés
       * de uma simples mensagem de texto. Por este motivo armazenamos o create()
       * em uma variável
       */
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    /**
     * Utilizamos o return response.send('Hello World'); apenas para testar o funcionamento da aplicação
     * Mas devemos considerar o .json, pois este é o retorno esperado por APIs Restful
     */
    return response.json(dev);
  }
};
