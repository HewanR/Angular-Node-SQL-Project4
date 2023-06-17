const expressJwt = require("express-jwt");

const config = require("../config.json");

let { secret } = config;

function authenticateJwtRequestToken() {
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      {url: "/users/", methods:['POST']},
      {url: "/orders/", methods:['GET']},

      "/users/login",
      "/users/check-username",
      "/users/check-id",
      "/cities/",
    ],
  });
}

module.exports = authenticateJwtRequestToken;
