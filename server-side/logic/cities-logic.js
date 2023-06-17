const citiesDao = require("../dao/cities-dao");

async function getAllCities() {
  let citiesData = await citiesDao.getAllCities();
  return citiesData;
}

module.exports = {
  getAllCities,
};
