const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function getOpenCart(userId) {
  let sql = `SELECT cart_id AS openCartId , 
  (SELECT COUNT(*) FROM cart_items 
      WHERE carts.cart_id = cart_items.cart_id) AS openCartNumOfItems
  FROM carts 
  WHERE customer_id=? AND is_active=true`;
  let parameters = [userId];

  let cartsResult;
  try {
    cartsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (cartsResult == null || cartsResult.length == 0) {
    cartsResult = await addNewCart(userId);
    return cartsResult;
  }

  return cartsResult[0];
}

async function addNewCart(userId) {
  let sql = `INSERT INTO carts (customer_id, created_date)  values(?, ?)`;
  let parameters = [userId, new Date(Date.now())];

  try {
    let newCart = await connection.executeWithParameters(sql, parameters);
    return { openCartId: newCart.insertId, openCartNumOfItems: 0 };
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function getOpenCartDetails(userId) {
  let sql = `SELECT COUNT(ci.cart_id) AS numOfItems, SUM(ci.total_cost) AS cartTotalCost, DATE_FORMAT(c.created_date, '%d/%m/%Y') AS createdDate
  FROM carts c LEFT JOIN cart_items ci
  ON c.cart_id = ci.cart_id
  WHERE c.customer_id=? AND c.is_active=true
  GROUP BY c.cart_id`;
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
  getOpenCart,
  getOpenCartDetails,
};
