const express = require("express");

const categoriesLogic = require("../logic/categories-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
      let successfulCategoriesList = await categoriesLogic.getAllCategories();      
      response.json(successfulCategoriesList);
  }
  catch (error) {
      return next(error);
  }

})

module.exports = router;
