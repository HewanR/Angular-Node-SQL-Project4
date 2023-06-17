const express = require("express");

const usersLogic = require("../logic/users-logic");

const router = express.Router();

router.post("/login", async (request, response, next) => {
  let user = request.body;

  try {
    let successfulLoginData = await usersLogic.login(user);
    response.json(successfulLoginData);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let user = request.body;

  try {
    let successfulRegisterData = await usersLogic.addUser(user);
    response.json(successfulRegisterData);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (request, response, next) => {
  let token = request.headers.authorization;
  try {
    let successfulUserDetails = await usersLogic.getUserDetails(token);
    response.json(successfulUserDetails);
  } catch (error) {
    return next(error);
  }
});

router.delete("/logout", async (request, response, next) => {
  let token = request.headers.authorization;

  try {
    await usersLogic.deleteUserFromCache(token);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.post("/check-username", async (request, response, next) => {
  let username = request.body.username;
  try {
    let successfulCheckData = await usersLogic.isUserExistByUserName(username);
    response.json(successfulCheckData);
  } catch (error) {
    return next(error);
  }
});

router.post("/check-id", async (request, response, next) => {
  let userId = request.body.userId;
  try {
    let successfulCheckData = await usersLogic.isUserExistByUserId(userId);
    response.json(successfulCheckData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
