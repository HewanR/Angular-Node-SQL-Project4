const express = require("express");

const citiesLogic = require("../logic/cities-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
      let successfulCitiesList = await citiesLogic.getAllCities();      
      response.json(successfulCitiesList);
  }
  catch (error) {
      return next(error);
  }

})

module.exports = router;
