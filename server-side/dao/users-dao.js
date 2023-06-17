const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");
const usersCache = require("./usersCache");

async function login(user) {
  let sql = `SELECT user_id as userId, first_name as firstName, last_name as lastName, user_name as userName, password, city_id as cityId, street, role
    FROM users 
    WHERE user_name =? AND password =?`;

  let parameters = [user.userName, user.password];

  let userLoginResult;
  try {
    userLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  // A functional (!) issue which means - the userName + password do not match
  if (userLoginResult == null || userLoginResult.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  console.log(
    `All good ! UserId ${userLoginResult[0].userId} loggedIn - Type: ${userLoginResult[0].role}`
  );
  return userLoginResult[0];
}

async function getUserByUserName(userName) {
  let sql =
    "SELECT user_id as userId, first_name as firstName, last_name as lastName, user_name as userName, password, city_id as cityId, street, role FROM users where user_name =?";
  let parameters = [userName];
  let userLoginResult;

  try {
    userLoginResult = await connection.executeWithParameters(sql, parameters);
    return userLoginResult;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function isUserExistByUserName(userName) {
  let userLoginResult = await getUserByUserName(userName);

  if (userLoginResult == null || userLoginResult.length == 0) {
    return false;
  }
  return true;
}

async function getUserByUserId(userId) {
  let sql =
    "SELECT user_id as userId, first_name as firstName, last_name as lastName, user_name as userName, password, city_id as cityId, street, role FROM users where user_id =?";
  let parameters = [userId];
  let userLoginResult;

  try {
    userLoginResult = await connection.executeWithParameters(sql, parameters);
    return userLoginResult;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function isUserExistByUserId(userId) {
  let userLoginResult = await getUserByUserId(userId);

  if (userLoginResult == null || userLoginResult.length == 0) {
    return false;
  }
  return true;
}

async function addUser(user) {
  let sql = `INSERT INTO users (user_id, first_name, last_name, user_name, password, city_id, street)  values(?, ?, ?, ?, ?, ?, ?)`;
  let parameters = [
    user.userId,
    user.firstName,
    user.lastName,
    user.userName,
    user.password,
    user.cityId,
    user.street,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  console.log(`All good ! UserId ${user.userId} registered - Type: Customer`);
}

let saveDataForCache = (token, userData) => {
  usersCache.saveDataForCache(token, userData);
};

function getUserDetails(token) {
  let userDetails = usersCache.getUserDetails(token);
  let userFilteredData = {
    userId: userDetails.userId,
    role: userDetails.role,
    userFirstName: userDetails.firstName,
    openCartId: userDetails.openCartId,
    openCartNumOfItems: userDetails.openCartNumOfItems,
    cityId: userDetails.cityId,
    street:userDetails.street
  };
  return userFilteredData;
}

function deleteUserFromCache(token) {
  usersCache.deleteUserFromCache(token);
}

let updateUserOpenCart = (token, openCartId) => {
  usersCache.updateUserOpenCart(token, openCartId);
};

module.exports = {
  login,
  addUser,
  isUserExistByUserName,
  isUserExistByUserId,
  saveDataForCache,
  getUserDetails,
  deleteUserFromCache,
  updateUserOpenCart,
};
