const categoriesDao = require("../dao/categories-dao");

async function getAllCategories() {
  let categoriesData = await categoriesDao.getAllCategories();
  return categoriesData;
}

module.exports = {
  getAllCategories,
};
