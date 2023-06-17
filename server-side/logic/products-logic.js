const productsDao = require("../dao/products-dao");
const usersDao = require("../dao/users-dao");
const categoriesDao = require("../dao/categories-dao");

const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const config = require("../server-config");
// const hostUrl = "http://localhost:3001/";
const hostUrl = config.serverUrl;

async function uploadImage(request, response, token) {
  let pureToken = token.split(" ").pop();
  let { role } = usersDao.getUserDetails(pureToken);

  if (role !== "Admin") {
    throw new ServerError(ErrorType.ACCESS_DENIED);
  }

  let [error, data] = await productsDao.uploadImage(request, response);

  if (error != null || data == undefined) {
    throw new ServerError(ErrorType.MULTER_UPLOAD_FAILED);
  }

  return data;
}

async function validateInputFeilds(product) {
  if (
    product.productName.trim() === "" ||
    product.categoryId === +"" ||
    product.price === +"" ||
    product.image.trim() === "" ||
    product.image == "no-image.jpg"
  ) {
    ErrorType.INVALID_INPUT_FEILD.message = "All fields must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (product.productName < 2 || product.image.length < 2) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "some of the text fields you entered are too short!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (product.productName.length > 45 || product.image.length > 1000) {
    ErrorType.INVALID_INPUT_FEILD.message =
      "some of the text fields you entered are too long!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }

  if (!(await categoriesDao.categoryIsExist(product.categoryId))) {
    ErrorType.INVALID_INPUT_FEILD.message = "The category you picked not exist";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
}

async function addNewProduct(product, token) {
  let pureToken = token.split(" ").pop();
  let { role } = usersDao.getUserDetails(pureToken);

  if (role !== "Admin") {
    throw new ServerError(ErrorType.ACCESS_DENIED);
  }

  //Validate product inputs
  await validateInputFeilds(product);

  let productsData = await productsDao.addNewProduct(product);
  return productsData;
}

async function editProduct(product, token, fileToDelete) {
  let pureToken = token.split(" ").pop();
  let { role } = usersDao.getUserDetails(pureToken);

  if (role !== "Admin") {
    throw new ServerError(ErrorType.ACCESS_DENIED);
  }

  //Validate product inputs
  await validateInputFeilds(product);

  if (!(await productsDao.productIsExist(product.productId))) {
    throw new ServerError(ErrorType.PRODUCT_NOT_EXIST);
  }

  if (fileToDelete !== undefined) {
    fileToDelete = fileToDelete.slice(hostUrl.length, fileToDelete.length);
    productsDao.deleteImage(fileToDelete);
  }

  await productsDao.editProduct(product);
}

function fixImageUrl(productsArray) {
  for (product of productsArray) {
    product.image = hostUrl + product.image;
  }
  return productsArray;
}

async function getAllProducts() {
  let productsData = await productsDao.getAllProducts();
  let fixedProductsData = fixImageUrl(productsData);
  return fixedProductsData;
}

async function getProductsByCategory(categoryId) {
  //validation
  if (categoryId == +"") {
    ErrorType.INVALID_INPUT_FEILD.message = "Category must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
  let productsData = await productsDao.getProductsByCategory(categoryId);
  let fixedProductsData = fixImageUrl(productsData);
  return fixedProductsData;
}

async function getProductsByNameSearch(searchValue) {
  //validation
  if (searchValue.trim() == "") {
    ErrorType.INVALID_INPUT_FEILD.message = "Search value must be filled!";
    throw new ServerError(ErrorType.INVALID_INPUT_FEILD);
  }
  let productsData = await productsDao.getProductsByNameSearch(searchValue);
  let fixedProductsData = fixImageUrl(productsData);
  return fixedProductsData;
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsByNameSearch,
  editProduct,
  addNewProduct,
  uploadImage,
};
