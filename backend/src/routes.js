const { Router } = require("express");
const DevController = require("./controllers/DevController");
const routes = Router();

/**
 * Buscar uma informação no banco de dados (GET)
 * Neste caso, a lista de dados
 */
routes.get("/devs", DevController.index);

/**
 * Na rota, chamamos o controller informando o método que criamos lá dentro.
 * Neste caso é o store
 */
routes.post("/devs", DevController.store);

module.exports = routes;
