const cartItemsDao = require("../dao/cartItems-dao");
const usersDao = require("../dao/users-dao");
const productsDao = require("../dao/products-dao");

const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const config = require("../server-config");
// const hostUrl = "http://localhost:3001/";
const hostUrl = config.serverUrl;

async function validateCartItemInputs(cartItem) {
  if (cartItem.productId == "" || cartItem.amount == "") {
    ErrorType.INVALID_INPUT_FEILD.message = "All fields must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (!(await productsDao.productIsExist(cartItem.productId))) {
    throw new ServerError(ErrorType.PRODUCT_NOT_EXIST);
  }

  if (!new RegExp(/^[1-9]\d*$/).test(cartItem.amount)) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Invalid amount, MUST be number greater than 0";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
}

async function getCartItems(token) {
  let pureToken = token.split(" ").pop();
  let { userId, openCartId } = usersDao.getUserDetails(pureToken);
  let cartsItemsData = await cartItemsDao.getCartItems(userId, openCartId);

  for (product of cartsItemsData) {
    product.image = hostUrl + product.image;
  }

  return cartsItemsData;
}

async function addCartItem(token, cartItem) {
  validateCartItemInputs(cartItem);
  let pureToken = token.split(" ").pop();
  let { openCartId } = usersDao.getUserDetails(pureToken);
  //get prices from DB
  let updatedCartItem = await getProductPrice(cartItem);

  let cartItemData = await addOrUpdateCartItem(openCartId, updatedCartItem);

  return cartItemData;
}

async function addOrUpdateCartItem(openCartId, updatedCartItem) {
  let cartItemData;
  if (
    !(await cartItemsDao.productIsExist(openCartId, updatedCartItem.productId))
  ) {
    cartItemData = await cartItemsDao.addCartItem(openCartId, updatedCartItem);
  } else {
    cartItemData = await cartItemsDao.updateCartItem(
      openCartId,
      updatedCartItem
    );
  }

  return cartItemData;
}

async function updateCartItem(token, cartItem) {
  validateCartItemInputs(cartItem);
  let pureToken = token.split(" ").pop();
  let { openCartId } = usersDao.getUserDetails(pureToken);
  let updatedCartItem = await getProductPrice(cartItem);

  let cartItemData = await addOrUpdateCartItem(openCartId, updatedCartItem);

  return cartItemData;
}

async function removeCartItem(token, productId) {
  let pureToken = token.split(" ").pop();
  let { openCartId } = usersDao.getUserDetails(pureToken);
  if (await cartItemsDao.productIsExist(openCartId, productId)) {
    await cartItemsDao.removeCartItem(openCartId, productId);
  } else {
    throw new ServerError(ErrorType.PRODUCT_NOT_EXIST);
  }
}

async function removeAllCartItems(token) {
  let pureToken = token.split(" ").pop();
  let { openCartId } = usersDao.getUserDetails(pureToken);

  await cartItemsDao.removeAllCartItems(openCartId);
}

async function getProductPrice(cartItem) {
  let { price } = await productsDao.getProductPrice(cartItem.productId);
  cartItem.totalCost = cartItem.amount * price;

  return cartItem;
}

module.exports = {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  removeAllCartItems,
};
