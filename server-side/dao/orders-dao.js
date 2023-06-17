const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function setNewOrder(orderDetails) {
  let sql = `INSERT INTO orders (customer_id, cart_id, total_cost, shipping_city, shipping_street, shipping_date, created_time, credit_card)  values(?, ?, ?, ?, ?, ?, ?, ?);
  UPDATE carts SET is_active = 0 WHERE cart_id = ? AND customer_id = ?`;
  let parameters = [
    orderDetails.userId,
    orderDetails.openCartId,
    orderDetails.totalCost,
    orderDetails.city,
    orderDetails.street,
    new Date(orderDetails.shippingDate),
    orderDetails.createdTime,
    orderDetails.creditCard,
    orderDetails.openCartId,
    orderDetails.userId,
  ];

  try {
    let order = await connection.executeWithParameters(sql, parameters);
    orderDetails.id = order[0].insertId;
    delete orderDetails.openCartId;

    return orderDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function getOccupiedDates() {
  let sql = `SELECT DISTINCT shipping_date AS shippingDate , COUNT(*) AS numOfOrders
  FROM orders
     GROUP BY shippingDate
HAVING  numOfOrders>3 `;

  let occupiedDates;
  try {
    occupiedDates = await connection.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  return occupiedDates;
}

async function getTotalOrdersAndProducts() {
  let sql = ` SELECT (SELECT COUNT(*)
  FROM products)  AS numOfProduct,
  (SELECT COUNT(*) 
  FROM orders) AS numOfOrders `;

  let totalOrdersAndProducts;
  try {
    totalOrdersAndProducts = await connection.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  return totalOrdersAndProducts[0];
}

async function getsLastOrderDate(userId) {
  let sql = `SELECT DATE_FORMAT( max(created_time), '%d/%m/%Y') AS lastOrderDate 
  FROM orders
  WHERE customer_id=?`;
  let parameters = [userId];

  let cartItemsResult;
  try {
    cartItemsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  return cartItemsResult[0];
}

module.exports = {
  getOccupiedDates,
  setNewOrder,
  getTotalOrdersAndProducts,
  getsLastOrderDate,
};
