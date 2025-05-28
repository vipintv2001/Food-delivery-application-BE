const express = require('express');
const router = new express.Router();
const userCOntroller = require('../controllers/userController')
const restaurentController = require('../controllers/restaurentController')
const staffController = require('../controllers/staffController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')

router.post("/user/register", userCOntroller.registerUser);

router.post("/user/login",userCOntroller.loginUser)

router.post("/admin/addrestaurent",restaurentController.addRestaurent);

router.get("/user/getrestaurent",restaurentController.getRestaurent);

router.get("/user/restaurent/:id",restaurentController.getAboutRestaurent);

router.get("/admin/getCustomer",userCOntroller.getCustomerDetails);

router.post("/admin/addstaff",staffController.registerStaff);

router.get("/admin/getstaff",staffController.getAllStaffs);

router.post("/restaurent/additem",jwtMiddleware,productController.addProduct);

router.get("/user/getfoodmenu/:id",productController.getFoodMenu);

router.post("/user/cart/add",jwtMiddleware,userCOntroller.addToCart);

router.get("/user/cart/get",jwtMiddleware,userCOntroller.getCartDetails);

router.put("/user/cart/edit",jwtMiddleware,userCOntroller.editCartDetails);

router.get("/user/address/get",jwtMiddleware,userCOntroller.getUserDetails);

router.post("/user/order/confirm",jwtMiddleware,userCOntroller.setOrderConfirm);

router.get("/user/order/get",jwtMiddleware,orderController.getOrderDetails);

module.exports = router