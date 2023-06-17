const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");

const multer = require("multer");
const fs = require("fs");

const config = require("../server-config");
// const hostUrl = "http://localhost:3001/";
const hostUrl = config.serverUrl;

// Upload images
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

async function uploadImage(request, response) {
  return new Promise((resolve) => {
    let upload = multer({ storage: storage }).single("file");
    upload(request, response, function (error) {
      if (error) {
        // In this case multer has error
        // throw new ServerError(ErrorType.MULTER_UPLOAD_FAILED);
        return resolve(["error - uploding image", null]);
      } else if (request.file != undefined) {
        // In this case user attached file and it upload
        data = request.file.filename;
        return resolve([null, data]);
      } else {
        // In this case no file attached, only path of existing image path - no upload
        data = JSON.parse(request.body.product).image;
        data = data.slice(hostUrl.length, data.length);
        return resolve([null, data]);
      }
    });
  });
}

// Delete image
function deleteImage(imageForDelete) {
  fs.unlinkSync("./uploads/" + imageForDelete);
  console.log(`File ${imageForDelete} deleted`);
}

async function addNewProduct(product) {
  let sql = `INSERT INTO products (product_name, category_id, price, image)  values(?, ?, ?, ?)`;
  let parameters = [
    product.productName,
    product.categoryId,
    product.price,
    product.image,
  ];

  let productResult;
  try {
    productResult = await connection.executeWithParameters(sql, parameters);
    product.productId = productResult.insertId;
    product.image = hostUrl + product.image;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  return product;
}

async function editProduct(product) {
  let sql = `UPDATE products SET product_name = ?, category_id = ?, price = ?, image = ?  WHERE product_id = ?`;
  let parameters = [
    product.productName,
    product.categoryId,
    product.price,
    product.image,
    product.productId,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function getAllProducts() {
  let sql = `SELECT product_id AS productId, product_name AS productName, category_id AS categoryId, price, image
  FROM products`;

  let productsResult;
  try {
    productsResult = await connection.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (productsResult == null || productsResult.length == 0) {
    throw new ServerError(ErrorType.NO_PRODUCTS_DATA);
  }

  return productsResult;
}

async function getProductsByCategory(categoryId) {
  let sql = `SELECT product_id AS productId, product_name AS productName, category_id AS categoryId, price, image
  FROM products
  WHERE category_id = ?`;
  let parameters = [categoryId];

  let productsResult;
  try {
    productsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (productsResult == null || productsResult.length == 0) {
    throw new ServerError(ErrorType.NO_PRODUCTS_BY_CATEGORY_DATA);
  }

  return productsResult;
}

async function getProductsByNameSearch(searchValue) {
  let sql = `SELECT product_id AS productId, product_name AS productName, category_id AS categoryId, price, image
  FROM products
  WHERE product_name LIKE CONCAT('%', ?, '%');`;
  let parameters = [searchValue];

  let productsResult;
  try {
    productsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (productsResult == null || productsResult.length == 0) {
    throw new ServerError(ErrorType.NO_PRODUCTS_BY_SEARCH);
  }

  return productsResult;
}

async function getProductPrice(productId) {
  let sql = `SELECT price
  FROM products
  WHERE product_id = ?`;
  let parameters = [productId];

  let productsResult;
  try {
    productsResult = await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  if (productsResult == null || productsResult.length == 0) {
    throw new ServerError(ErrorType.PRODUCT_NOT_EXIST);
  }

  return productsResult[0];
}

async function productIsExist(productId) {
  let productResult;

  productResult = await getProductPrice(productId);

  if (productResult == null || productResult.length == 0) {
    return false;
  }

  return true;
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsByNameSearch,
  getProductPrice,
  productIsExist,
  addNewProduct,
  editProduct,
  uploadImage,
  deleteImage,
};
