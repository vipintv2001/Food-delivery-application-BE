const orders = require('../models/orderSchema');

exports.getOrderDetails = async (req,res)=>{
    console.log("inside get order details")
    const userId = req.payload;
    const userOrder = await orders.find({userId:userId})
    res.status(200).json(userOrder)
}