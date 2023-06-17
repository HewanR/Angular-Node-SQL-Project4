const express = require("express");

const cartItemsLogic = require("../logic/cartItems-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
    let successfulOpenCart = await cartItemsLogic.getCartItems(token);
    response.json(successfulOpenCart);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let token = request.headers.authorization;
  let cart = request.body;

  try {
    let successfulOpenCart = await cartItemsLogic.addCartItem(token, cart);
    response.json(successfulOpenCart);
  } catch (error) {
    return next(error);
  }
});

router.put("/", async (request, response, next) => {
  let token = request.headers.authorization;
  let cart = request.body;

  try {
    let successfulOpenCart = await cartItemsLogic.updateCartItem(token, cart);
    response.json(successfulOpenCart);
  } catch (error) {
    return next(error);
  }
});

router.delete("/", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
     await cartItemsLogic.removeAllCartItems(token);
    response.json();
  } catch (error) {
    return next(error);
  }
});



router.delete("/:productId", async (request, response, next) => {
  let token = request.headers.authorization;
  let productId = request.params.productId;

  try {
     await cartItemsLogic.removeCartItem(token, productId);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
