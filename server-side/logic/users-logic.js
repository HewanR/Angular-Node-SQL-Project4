const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const config = require("../config.json");
const usersDao = require("../dao/users-dao");
const cartsDao = require("../dao/carts-dao");

const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

let createHashPassword = (password) => {
  return crypto
    .createHash("md5")
    .update(saltLeft + password + saltRight)
    .digest("hex");
};

let generateToken = (userName) => {
  return jwt.sign({ sub: userName }, config.secret);
};

async function setOpenCartDetails(userData) {
  if (userData.role == "Customer") {
    let cart = await cartsDao.getOpenCart(userData.userId);
    userData.openCartId = cart.openCartId;
    userData.openCartNumOfItems = cart.openCartNumOfItems;
  }
  return userData;
}

let createSuccessfulLoginResponse = (token, userData) => {
  let successfulLoginResponse = {
    token: token,
    role: userData.role,
    userFirstName: userData.firstName,
  };

  if (userData.role == "Customer") {
    successfulLoginResponse.openCartNumOfItems = userData.openCartNumOfItems;
  }

  return successfulLoginResponse;
};

let validateInputFeilds = (user) => {
  if (
    user.userId.trim() == "" ||
    user.firstName.trim() == "" ||
    user.lastName.trim() == "" ||
    user.userName.trim() == "" ||
    user.password.trim() == "" ||
    user.cityId == +"" ||
    user.street.trim() == ""
  ) {
    ErrorType.INVALID_INPUT_FEILD.message = "All fields must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (!new RegExp(/^[0-9]{9,9}$/).test(user.userId)) {
    ErrorType.INVALID_INPUT_FEILD.message = "User id should contain 9 digits";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  validateUsernameFeildPattern(user.userName);

  if (
    !new RegExp(/^[A-Za-z _]{2,45}$/).test(user.firstName) ||
    !new RegExp(/^[A-Za-z _]{2,45}$/).test(user.lastName)
  ) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Name fields can include 2-45 letters";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
  if (!new RegExp(/^[a-zA-Z0-9 _]{2,45}$/).test(user.street)) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Street field can include 2-45 letters and numbers";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  validatePasswordFeildPattern(user.password);
};

let validatePasswordFeildPattern = (password) => {
  if (password.length > 20) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Password can include max 20 characters";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (password.length < 8) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Password must include at least 8 characters";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (
    !new RegExp(
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/
    ).test(password)
  ) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Please enter a valid password (8-20 characters: 2 letters in Upper Case + 3 letters in Lower Case + 1 Special Character (!@#$&*) + 2 numbers)";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
};

let validateUsernameFeildPattern = (userName) => {
  if (userName.length > 45) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "UserName can include  max 45 characters";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
  if (
    !new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(
      userName
    )
  ) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "User name should be valid e-mail address";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
};

async function login(user) {
  //validations
  if (user.userName.trim() == "" || user.password.trim() == "") {
    ErrorType.INVALID_INPUT_FEILD.message = "All fields must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  validateUsernameFeildPattern(user.userName);
  validatePasswordFeildPattern(user.password);

  user.password = createHashPassword(user.password);

  let userLoginData = await usersDao.login(user);
  let token = generateToken(userLoginData.userName);

  userLoginData = await setOpenCartDetails(userLoginData);

  usersDao.saveDataForCache(token, userLoginData);
  let successfulLoginResponse = createSuccessfulLoginResponse(
    token,
    userLoginData
  );
  return successfulLoginResponse;
}

async function addUser(user) {
  //validations
  validateInputFeilds(user);

  if (await usersDao.isUserExistByUserName(user.userName)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  if (await usersDao.isUserExistByUserId(user.userId)) {
    throw new ServerError(ErrorType.USER_ID_ALREADY_EXIST);
  }

  user.password = createHashPassword(user.password);
  await usersDao.addUser(user);

  let token = generateToken(user.userName);
  user.role = "Customer";
  user = await setOpenCartDetails(user);
  usersDao.saveDataForCache(token, user);

  let successfulLoginResponse = createSuccessfulLoginResponse(token, user);
  return successfulLoginResponse;
}

async function isUserExistByUserName(username) {
  if (username == "") {
    ErrorType.INVALID_INPUT_FEILD.message = "User name must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  let userCheckResult = await usersDao.isUserExistByUserName(username);

  let result = {
    isExist: userCheckResult,
  };
  return result;
}

async function isUserExistByUserId(userId) {
  if (userId == +"") {
    ErrorType.INVALID_INPUT_FEILD.message = "User Id must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  let userCheckResult = await usersDao.isUserExistByUserId(userId);

  let result = {
    isExist: userCheckResult,
  };

  return result;
}

function getUserDetails(token) {
  let pureToken = token.split(" ").pop();

  let userFilteredData = usersDao.getUserDetails(pureToken);
  delete userFilteredData.openCartId;
  return userFilteredData;
}

function deleteUserFromCache(token) {
  let pureToken = token.split(" ").pop();

  usersDao.deleteUserFromCache(pureToken);
}

module.exports = {
  login,
  addUser,
  isUserExistByUserName,
  isUserExistByUserId,
  getUserDetails,
  deleteUserFromCache,
};
