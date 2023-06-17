const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const usersCache = new Map();

function getUserDetails(token) {
  if (usersCache.has(token)) {
    let userDetails = usersCache.get(token);
    return userDetails;
  } else {
    throw new ServerError(ErrorType.INVALID_TOKEN);
  }
}

function deleteUserFromCache(token) {
  if (usersCache.has(token)) {
    usersCache.delete(token);
  } else {
    throw new ServerError(ErrorType.INVALID_TOKEN);
  }
}

let saveDataForCache = (token, userData) => {
  usersCache.set(token, userData);
};

function updateUserOpenCart(token, openCart) {
  if (usersCache.has(token)) {
    let userDetails = usersCache.get(token);
    userDetails.openCartId = openCart.openCartId;
    userDetails.openCartNumOfItems = openCart.openCartNumOfItems;
    usersCache.set(token, userDetails);
    
  } else {
    throw new ServerError(ErrorType.INVALID_TOKEN);
  }
}

module.exports = {
  usersCache,
  getUserDetails,
  deleteUserFromCache,
  saveDataForCache,
  updateUserOpenCart,
};
