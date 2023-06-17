const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

async function getAllCities() {
  let sql = `SELECT * FROM cities`;

  let citiesResult;
  try {
    citiesResult = await connection.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (citiesResult == null || citiesResult.length == 0) {
    throw new ServerError(ErrorType.NO_CITIES_DATA);
  }

  return citiesResult;
}

async function isCityExist(cityId) {
  let sql = `SELECT * FROM cities WHERE id=?`;
  let parameters = [cityId];

  let cityResult;
  try {
    cityResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (cityResult == null || cityResult.length == 0) {
    return false;
  }

  return true;
}

module.exports = {
  getAllCities,
  isCityExist
};
