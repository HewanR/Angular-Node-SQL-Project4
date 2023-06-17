const express = require("express");

const ordersLogic = require("../logic/orders-logic");

const router = express.Router();

router.post("/", async (request, response, next) => {
  let token = request.headers.authorization;
  let orderDetails = request.body;

  try {
    let successfulOpenCart = await ordersLogic.setNewOrder(token, orderDetails);
    response.json(successfulOpenCart);
  } catch (error) {
    return next(error);
  }
});

router.get("/occupied-dates", async (request, response, next) => {
  try {
      let successfulOccupiedDates = await ordersLogic.getOccupiedDates();      
      response.json(successfulOccupiedDates);
  }
  catch (error) {
      return next(error);
  }

})

router.get("/", async (request, response, next) => {
  try {
      let TotalOrdersAndProducts = await ordersLogic.getTotalOrdersAndProducts();      
      response.json(TotalOrdersAndProducts);
  }
  catch (error) {
      return next(error);
  }

})

module.exports = router;
