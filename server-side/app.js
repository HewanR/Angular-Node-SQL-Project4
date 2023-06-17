const express = require("express");
const cors = require("cors");

const usersController = require("./controllers/users-controller");
const citiesController = require("./controllers/cities-controller");
const cartsController = require("./controllers/carts-controller");
const productsController = require("./controllers/products-controller");
const categoriesController = require("./controllers/categories-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const ordersController = require("./controllers/orders-controller");

const loginFilter = require("./middlewares/login-filter");
const errorHandler = require("./errors/error-handler");
const ServerError = require("./errors/server-error");
const ErrorType = require("./errors/error-type");

const config = require("./server-config")
// const angularPort = "http://localhost:4200";
const angularPort = config.angularPort

const server = express();

server.use(express.static("./uploads"));


server.use(cors({ origin: angularPort }));

server.use(express.json());

server.use(loginFilter());

server.use(function (err, req, res, next) {
  if (401 == err.status) {
    throw new ServerError(ErrorType.INVALID_TOKEN);
    
  }
});

server.use("/users", usersController);
server.use("/cities", citiesController);
server.use("/carts", cartsController);
server.use("/products", productsController);
server.use("/categories", categoriesController);
server.use("/cart-items", cartItemsController);
server.use("/orders", ordersController);

server.use(errorHandler);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Server started on port " + port));
