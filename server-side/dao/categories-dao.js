const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function getAllCategories() {
  let sql = `SELECT category_id AS categoryId, category_name AS categoryName
  FROM categories`;

  let categoriesResult;
  try {
    categoriesResult = await connection.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (categoriesResult == null || categoriesResult.length == 0) {
    throw new ServerError(ErrorType.NO_CATEGORIES_DATA);
  }

  return categoriesResult;
}

async function categoryIsExist(categoryId) {
  let sql = `SELECT category_name AS categoryName
  FROM categories
  WHERE category_id=?`;
  let parameters = [categoryId];
  let categoriesResult;
  try {
    categoriesResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (categoriesResult == null || categoriesResult.length == 0) {
    return false;
  }

  return true;
}

module.exports = {
  getAllCategories,
  categoryIsExist,
};
