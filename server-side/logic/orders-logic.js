const moment = require("moment-timezone");

const ordersDao = require("../dao/orders-dao");
const usersDao = require("../dao/users-dao");
const cartItemsDao = require("../dao/cartItems-dao");
const cartsLogic = require("../logic/carts-logic");
const citiesDao = require("../dao/cities-dao");

const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function orderDetailsValidations(orderDetails) {
  if (
    orderDetails.city == "" ||
    orderDetails.street.trim() == "" ||
    orderDetails.shippingDate.trim() == "" ||
    orderDetails.creditCard == ""
  ) {
    ErrorType.INVALID_INPUT_FEILD.message = "All fields must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (!(await citiesDao.isCityExist(orderDetails.city))) {
    ErrorType.INVALID_INPUT_FEILD.message = "City is not exist";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (!new RegExp(/^[a-zA-Z0-9 _]{2,45}$/).test(orderDetails.street)) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Please enter a valid street (2-45 letters and numbers)";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  let formatedCurrentTime = moment().tz("Asia/Jerusalem").format();

  let orderDetailsFormatedShippingDate = fixTimeZone(orderDetails.shippingDate);

  if (orderDetailsFormatedShippingDate < formatedCurrentTime) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Shipping date MUST be greater than today";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  let occupiedDates = await getOccupiedDates();
  let isOccupied = occupiedDates.some(
    (date) =>
      moment
        .tz(new Date(date.shippingDate), "DD/MM/YYYY", "Asia/Jerusalem")
        .format() == orderDetailsFormatedShippingDate
  );
  if (isOccupied) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "Sorry, Shipments are not available for this date";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (moment(orderDetailsFormatedShippingDate).day() == 6) {
    ErrorType.INVALID_INPUT_FEILD.message = "Sorry, SHABAT Hayom !";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (
    !new RegExp(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$/
    ).test(orderDetails.creditCard)
  ) {
    ErrorType.INVALID_INPUT_FEILD.message = `Please enter a valid credit card number ( Visa, MasterCard, American Express, Diners Club, Discover, or JCB )`;
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
}

function fixTimeZone(shippingDate) {
  let orderDetailsFormatedShippingDate = moment
    .tz(new Date(shippingDate), "DD/MM/YYYY", "Asia/Jerusalem")
    .format();

  if (!moment(new Date(orderDetailsFormatedShippingDate)).isValid()) {
    orderDetailsFormatedShippingDate = moment
      .tz(shippingDate, "DD/MM/YYYY", "Asia/Jerusalem")
      .format();
  }

  return orderDetailsFormatedShippingDate;
}

async function setNewOrder(token, orderDetails) {
  await orderDetailsValidations(orderDetails);

  let pureToken = token.split(" ").pop();
  let { userId, openCartId } = usersDao.getUserDetails(pureToken);

  let cartItemsTotalCost = await cartItemsDao.getCartItemsTotalCost(openCartId);

  let orderDetailsFormatedShippingDate = fixTimeZone(orderDetails.shippingDate);

  orderDetails.shippingDate = orderDetailsFormatedShippingDate;

  orderDetails.userId = userId;
  orderDetails.openCartId = openCartId;
  orderDetails.totalCost = cartItemsTotalCost.totalCost;
  orderDetails.createdTime = moment().tz("Asia/Jerusalem").format();

  let orderData = await ordersDao.setNewOrder(orderDetails);

  let successfulOpenCart = await cartsLogic.getOpenCart(token);
  orderData.openCartNumOfItems = successfulOpenCart.openCartNumOfItems;
  return orderData;
}

async function getOccupiedDates() {
  let occupiedDates = await ordersDao.getOccupiedDates();

  return occupiedDates;
}

async function getTotalOrdersAndProducts() {
  let totalOrdersAndProducts = await ordersDao.getTotalOrdersAndProducts();

  return totalOrdersAndProducts;
}

module.exports = {
  getOccupiedDates,
  setNewOrder,
  getTotalOrdersAndProducts,
};
