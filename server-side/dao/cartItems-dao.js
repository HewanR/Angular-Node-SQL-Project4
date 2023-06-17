const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function getCartItems(userId, cartId) {

  let sql = `SELECT ci.cart_item_id AS id, ci.product_id AS productId, p.image,p.product_name AS productName, ci.amount, ci.total_cost AS totalCost 
  FROM cart_items ci
  LEFT JOIN products p ON ci.product_id = p.product_id
    LEFT JOIN carts c ON ci.cart_id = c.cart_id
  WHERE c.customer_id=? AND ci.cart_id=? AND c.is_active=true`;
  let parameters = [userId, cartId];

  let cartItemsResult;
  try {
    cartItemsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }


  return cartItemsResult;
}

async function addCartItem(cartId, cartItem) {
  let sql = `INSERT INTO cart_items (product_id, amount, total_cost, cart_id)  values(?, ?, ?, ?)`;
  let parameters = [
    cartItem.productId,
    cartItem.amount,
    cartItem.totalCost,
    cartId,
  ];

  try {
    let newCart = await connection.executeWithParameters(sql, parameters);
    return { id: newCart.insertId, totalCost: cartItem.totalCost };
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function updateCartItem(cartId, cartItem) {
  let sql = `UPDATE cart_items SET amount = ?, total_cost = ? WHERE cart_id = ? AND product_id = ?`;
  let parameters = [
    cartItem.amount,
    cartItem.totalCost,
    cartId,
    cartItem.productId,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
    return { id: cartItem.id, totalCost: cartItem.totalCost };
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function removeCartItem(cartId, productId) {
  let sql = `DELETE FROM cart_items WHERE cart_id=? AND product_id=?`;
  let parameters = [cartId, productId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function removeAllCartItems(cartId) {
  let sql = `DELETE FROM cart_items WHERE cart_id=?`;
  let parameters = [cartId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function productIsExist(cartId, productId) {

  let sql = `SELECT cart_item_id AS id
  FROM cart_items 
  WHERE cart_id=? AND product_id=?`;
  let parameters = [cartId, productId];

  let cartItemsResult;
  try {
    cartItemsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (cartItemsResult == null || cartItemsResult.length == 0) {
    return false;
  }

  return true;
}

async function getCartItemsTotalCost(cartId) {

  let sql = `SELECT sum(total_cost) AS totalCost
  FROM cart_items
  WHERE cart_id=?`;
  let parameters = [cartId];

  let cartItemsTotalCost;
  try {
    cartItemsTotalCost = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }


  if (cartItemsTotalCost[0].totalCost == null || cartItemsTotalCost.length == 0) {
    throw new ServerError(ErrorType.NO_ITEMS_IN_CART);
  }

  return cartItemsTotalCost[0];
}


module.exports = {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  productIsExist,
  removeAllCartItems,
  getCartItemsTotalCost
};
