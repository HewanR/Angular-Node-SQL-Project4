const cartsDao = require("../dao/carts-dao");
const usersDao = require("../dao/users-dao");
const ordersDao = require("../dao/orders-dao");

async function getOpenCart(token) {
  let pureToken = token.split(" ").pop();
  let { userId, openCartId, openCartNumOfItems } =
    usersDao.getUserDetails(pureToken);
  let cartsData = await cartsDao.getOpenCart(userId);

  if (
    openCartId != cartsData.openCartId ||
    openCartNumOfItems != cartsData.openCartNumOfItems
  ) {
    usersDao.updateUserOpenCart(pureToken, cartsData);
  }
  return { openCartNumOfItems: cartsData.openCartNumOfItems };
}

async function getsStartDetails(token) {
  let pureToken = token.split(" ").pop();
  let { userId ,  role} = usersDao.getUserDetails(pureToken);

  let startDetails = await cartsDao.getOpenCartDetails(userId);
  
  if(role == 'Admin'){
    return startDetails = {isAdmin: true}
  }
  if(startDetails.numOfItems == 0){
    startDetails = await ordersDao.getsLastOrderDate(userId)

    if(startDetails.lastOrderDate == null){
      startDetails = {firstOrder: true}
    }
  }


  return startDetails;
}

module.exports = {
  getOpenCart,
  getsStartDetails
};
