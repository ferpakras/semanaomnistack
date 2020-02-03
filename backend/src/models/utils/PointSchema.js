const mongoose = require("mongoose");

/**
 * PointSchema apenas por ser um "ponto no mapa" - nome amigável
 * A forma como está armazenado aqui está na documentação do mongoDB
 * https://docs.mongodb.com/manual/geospatial-queries/
 */
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    //Não esquecer de passar um array pois estamos falando de lat e long
    //Mongo por padrão recebe a longitude primeiro
    type: [Number],
    required: true
  }
});

module.exports = PointSchema;
