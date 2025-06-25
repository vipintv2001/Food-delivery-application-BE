const express = require("express");
const router = new express.Router();
const userCOntroller = require("../controllers/userController");
const restaurentController = require("../controllers/restaurentController");
const staffController = require("../controllers/staffController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

router.post("/user/register", userCOntroller.registerUser);

router.post("/user/login", userCOntroller.loginUser);

router.post("/admin/addrestaurent", restaurentController.addRestaurent);

router.get("/user/getrestaurent", restaurentController.getRestaurent);

router.get("/user/restaurent/:id", restaurentController.getAboutRestaurent);

router.get("/admin/getCustomer", userCOntroller.getCustomerDetails);

router.post("/admin/addstaff", staffController.registerStaff);

router.get("/admin/getstaff", staffController.getAllStaffs);

router.post("/restaurent/additem", jwtMiddleware, productController.addProduct);

router.get("/user/getfoodmenu/:id", productController.getFoodMenu);

router.post("/user/cart/add", jwtMiddleware, userCOntroller.addToCart);

router.get("/user/cart/get", jwtMiddleware, userCOntroller.getCartDetails);

router.put("/user/cart/edit", jwtMiddleware, userCOntroller.editCartDetails);

router.get("/user/address/get", jwtMiddleware, userCOntroller.getUserDetails);

router.post(
  "/user/order/confirm",
  jwtMiddleware,
  userCOntroller.setOrderConfirm
);

router.get("/user/order/get", jwtMiddleware, orderController.getOrderDetails);

router.delete(
  "/user/cart/item/delete/:id",
  jwtMiddleware,
  userCOntroller.deleteCartItem
);

router.delete("/user/cart/delete", jwtMiddleware, userCOntroller.deleteCart);

router.get(
  "/restaurent/order/get",
  jwtMiddleware,
  orderController.getRestaurentOrders
);

router.delete(
  "/restaurent/delete/:id",
  jwtMiddleware,
  productController.deleteFoodItem
);

router.put(
  "/restaurent/edit/:id",
  jwtMiddleware,
  productController.editFoodItem
);

router.put(
  "/user/order/cancel/:id",
  jwtMiddleware,
  orderController.cancellOrder
);

router.delete(
  "/admin/restaurent/delete/:id",
  jwtMiddleware,
  restaurentController.deleteRestaurent
);

router.get("/admin/order/get", jwtMiddleware, orderController.getAllOrders);

router.put("/staff/work/edit", jwtMiddleware, staffController.setWorkStatus);

router.put("/staff/order/claim/:id", jwtMiddleware, orderController.claimOrder);

module.exports = router;
