const orders = require("../models/orderSchema");
const staffs = require("../models/staffSchema");

exports.getOrderDetails = async (req, res) => {
  console.log("inside get order details");
  const userId = req.payload;
  const userOrder = await orders.find({ userId: userId });
  res.status(200).json(userOrder);
};

exports.getRestaurentOrders = async (req, res) => {
  console.log("inside get restaurent orders");
  const restaurentId = req.payload;
  try {
    const restaurentOrders = await orders
      .find({ "cartSummary.restaurentId": restaurentId })
      .sort({ createdAt: -1 });
    res.status(200).json(restaurentOrders);
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong");
  }
};

exports.getAllOrders = async (req, res) => {
  console.log("inside get all order");
  try {
    const allOrders = await orders.find().sort({ createdAt: -1 });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.cancellOrder = async (req, res) => {
  console.log("inside cancell order");
  const { deliveryStatus } = req.body;
  console.log("status", deliveryStatus);
  const { id } = req.params;
  try {
    await orders.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json("cancelled succesfully");
  } catch (err) {
    console.log("error", err);
    res.status(401).json(err);
  }
};

exports.claimOrder = async (req, res) => {
  console.log("inside claim order");
  const staffId = req.payload;
  const { id } = req.params;
  try {
    const staffDetails = await staffs.findById(staffId);
    const claimedOrder = await orders.findByIdAndUpdate(
      id,
      { deliveryBoy: staffDetails.staffName },
      { new: true }
    );
    res.status(201).json(claimedOrder);
    await staffs.findByIdAndUpdate(
      staffId,
      { workActivity: "on a delivery" },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.getMyOrder = async (req, res) => {
  console.log("inside get my order");
  const staffId = req.payload;
  try {
    const staffDetails = await staffs.findById(staffId);
    const staffName = staffDetails.staffName;
    const myOrder = await orders.find({
      deliveryBoy: staffName,
      deliveryStatus: { $ne: "cancelled" }, // Exclude cancelled
      $or: [{ deliveryStatus: { $ne: "delivered" } }, { paymentStatus: "cod" }],
    });
    res.status(200).json(myOrder);
  } catch (error) {
    console.log("error", error);
    res.status(401).json(error);
  }
};

exports.changeDeliveryStatus = async (req, res) => {
  console.log("inside change delivery status");
  const staffId = req.payload;
  const { id } = req.params;
  console.log("order id:", id);
  console.log("req.body", req.body);
  try {
    const updatedOrder = await orders.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedOrder);
    if (
      updatedOrder.deliveryStatus === "delivered" ||
      updatedOrder.deliveryStatus === "cancelled"
    ) {
      await staffs.findByIdAndUpdate(
        staffId,
        { workActivity: "available" },
        { new: true }
      );
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.changePaymentStatus = async (req, res) => {
  console.log("inside change payment status");
  const { id } = req.params;
  console.log("order id:", id);
  console.log("req.body", req.body);
  try {
    const updatedOrder = await orders.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(401).json(error);
  }
};
