const express = require("express");

const cartsLogic = require("../logic/carts-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
  let token = request.headers.authorization;
  try {
      let successfulOpenCart = await cartsLogic.getOpenCart(token);      
      response.json(successfulOpenCart);
  }
  catch (error) {
      return next(error);
  }

})

router.get("/startDetails", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
    let startDetails = await cartsLogic.getsStartDetails(token);
    response.json(startDetails);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
