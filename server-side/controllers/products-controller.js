const express = require("express");

const productsLogic = require("../logic/products-logic");

const config = require("../server-config");
// const hostUrl = "http://localhost:3001/";
const hostUrl = config.serverUrl;

const router = express.Router();

router.post("/", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
    let data = await productsLogic.uploadImage(
      request,
      response,
      token
    );
    
    let product = JSON.parse(request.body.product);
    product.image = data;

    let successfulProduct = await productsLogic.addNewProduct(product, token);
    response.json(successfulProduct);
  } catch (error) {
    return next(error);
  }
});

router.put("/", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
    let data = await productsLogic.uploadImage(
      request,
      response,
      token
    );
   
    let product = JSON.parse(request.body.product);
    product.image = data;

    let fileToDelete = request.body.fileToDelete;

    await productsLogic.editProduct(product, token, fileToDelete);
    product.image = hostUrl + product.image;

    response.json(product);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    let successfulProductsList = await productsLogic.getAllProducts();
    response.json(successfulProductsList);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  let categoryId = request.params.id;

  try {
    let successfulProductsList = await productsLogic.getProductsByCategory(
      categoryId
    );
    response.json(successfulProductsList);
  } catch (error) {
    return next(error);
  }
});

router.post("/search", async (request, response, next) => {
  let searchValue = request.body.searchValue;

  try {
    let successfulProductsList = await productsLogic.getProductsByNameSearch(
      searchValue
    );
    response.json(successfulProductsList);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
