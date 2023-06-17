let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: "Oops, Something went wrong, Please try again later",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false,
  },
  NO_CITIES_DATA: {
    id: 4,
    httpCode: 500,
    message: "Cities list is empty",
    isShowStackTrace: true,
  },
  NO_PRODUCTS_DATA: {
    id: 5,
    httpCode: 501,
    message: "There are no products to sell",
    isShowStackTrace: true,
  },
  INVALID_TOKEN: {
    id: 6,
    httpCode: 403,
    message: "Oops, Something went wrong, try re-logging",
    isShowStackTrace: false,
  },
  INVALID_INPUT_FEILD: {
    id: 7,
    httpCode: 400,
    message: "Invalid input",
    isShowStackTrace: false,
  },
  ACCESS_DENIED: {
    id: 8,
    httpCode: 402,
    message: "You are unauthorized to that action",
    isShowStackTrace: false,
  },
  USER_ID_ALREADY_EXIST: {
    id: 9,
    httpCode: 602,
    message: "User id already exist",
    isShowStackTrace: false,
  },
  NO_CATEGORIES_DATA: {
    id: 10,
    httpCode: 502,
    message: "Categories not found",
    isShowStackTrace: true,
  },
  NO_PRODUCTS_BY_CATEGORY_DATA: {
    id: 11,
    httpCode: 503,
    message: "There are no products on selected category",
    isShowStackTrace: false,
  },
  NO_PRODUCTS_BY_SEARCH: {
    id: 12,
    httpCode: 504,
    message: "There are no products with your search value",
    isShowStackTrace: false,
  },
  NO_ITEMS_IN_CART: {
    id: 13,
    httpCode: 505,
    message: "There are no products in your cart",
    isShowStackTrace: false,
  },
  PRODUCT_NOT_EXIST: {
    id: 14,
    httpCode: 506,
    message: "Product is not exist",
    isShowStackTrace: false,
  },
  MULTER_UPLOAD_FAILED: {
    id: 15,
    httpCode: 603,
    message: "Oops, upload image failed",
    isShowStackTrace: true,
  }
};

module.exports = ErrorType;
