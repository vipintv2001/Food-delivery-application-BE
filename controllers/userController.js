const users = require("../models/userSchema");
const restaurents = require("../models/restaurentSchema");
const staffs = require("../models/staffSchema");
const jwt = require("jsonwebtoken");
const orders = require("../models/orderSchema");

exports.registerUser = async (req, res) => {
  console.log("inside register user");
  console.log(req.body);
  const { name, phone, email, password, role } = req.body;

  try {
    const existingUser = await users.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      res.status(409).json("email or Phone Already Exist");
    } else {
      const newUser = new users({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role,
      });

      await newUser.save();
      res.status(201).json("new user added succesfully");
    }
  } catch (err) {
    res.status(401).json("Registeration failed due to", err);
  }
};

exports.loginUser = async (req, res) => {
  console.log("inside login user");
  const { email, password } = req.body;
  try {
    let account = null;
    let role = "";

    account = await users.findOne({
      email: email,
      password: password,
    });
    if (account) role = "user";

    if (!account) {
      account = await restaurents.findOne({
        email: email,
        password: password,
      });
      if (account) role = "restaurent";
    }

    if (!account) {
      account = await staffs.findOne({
        email: email,
        password: password,
      });
      if (account) role = "staff";
    }

    if (account) {
      const token = jwt.sign({ userId: account._id }, "supersecretkey");
      console.log("token", token);
      res.status(200).json({
        userData: account,
        role: role,
        jwt_token: token,
      });
    } else {
      res.status(406).json("Login failed due to invalid email or password");
    }
  } catch (err) {
    res.status(401).json("something went wrong");
  }
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const customerDetails = await users.find();
    res.status(200).json(customerDetails);
  } catch (err) {
    res.status(401).json("something went wrong");
    console.log(err);
  }
};

exports.addToCart = async (req, res) => {
  console.log("inside add to cart");
  console.log("restaurent ID:", req.body);
  const product = req.body;
  const userId = req.payload;
  console.log("id:", userId);
  try {
    const currentUser = await users.findById(userId);
    console.log("user", currentUser);
    const existing = await currentUser.cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      currentUser.cart.push({
        ...product,
        quantity: 1,
        restaurentId: product.userId ?? product.restaurentId,
      });
    }

    await currentUser.save();
    res.status(201).json(currentUser.cart);
  } catch (err) {
    console.log(err);
    res.status(401).json("somethig went wrong");
  }
};

exports.getCartDetails = async (req, res) => {
  console.log("inside get cart");
  const userId = req.payload;
  try {
    const userDetails = await users.findById(userId);
    const cart = userDetails.cart;
    console.log("cart", cart);
    res.status(201).json(cart);
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong in get cart details");
  }
};

exports.editCartDetails = async (req, res) => {
  console.log("inside edit cart details");
  const userId = req.payload;
  const updatedCart = req.body[0];
  const cartSummaryDetails = req.body[1];
  console.log("body", req.body[0]);
  console.log("summary", req.body[1]);
  try {
    const result = await users.findByIdAndUpdate(
      userId,
      { $set: { cart: updatedCart, cartSummary: cartSummaryDetails } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json("something went wrong");
  }
};

exports.deleteCartItem = async (req, res) => {
  console.log("inside delete cart item");
  const userId = req.payload;
  const { id } = req.params;
  console.log("productId=", id);
  try {
    const result = await users.updateOne(
      { _id: userId },
      { $pull: { cart: { _id: id } } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json("deleted item succesfully");
    }else{
      res.status(400).json("cart item not found")
    }
  } catch (err) {
    console.log("error",err)
    res.status(401).json("something went wrong")
  }
};

exports.deleteCart = async (req,res)=>{
  console.log("inside delete cart item");
  const userId = req.payload;
  try {
    const result = await users.updateOne(
      { _id: userId },
      {
        $set: {
          cart: [],
          cartSummary: [],
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Cart cleared successfully" });
    } else {
      res.status(401).json({ message: "No changes made or user not found" });
    }
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getUserDetails = async (req, res) => {
  console.log("inside get user Details Api");
  const userId = req.payload;
  const userDetails = await users.findById(userId);
  console.log(userDetails);
  res.status(200).json(userDetails);
};

exports.setOrderConfirm = async (req, res) => {
  console.log("inside set order confirm");
  const userId = req.payload;
  console.log("reqbody", req.body);
  const {
    house,
    street,
    postOffice,
    pincode,
    city,
    landmark,
    deliCharge,
    totalPrice,
    paymentStatus,
  } = req.body;
  const userDetails = await users.findById(userId);
  console.log("cart Details", userDetails.cart);
  console.log("cartSummary Details", userDetails.cartSummary);

  const address = {
    name: userDetails.name,
    phone: userDetails.phone,
    HouseName: house,
    street: street,
    postOffice: postOffice,
    pinCode: pincode,
    landMark: landmark,
    city: city,
  };

  try {
    const newOrder = new orders({
      userId,
      cart: userDetails.cart,
      cartSummary: userDetails.cartSummary,
      deliveryCharge: deliCharge,
      totalPrice: totalPrice,
      address: address,
      paymentStatus: paymentStatus,
      deliveryStatus: "processing",
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong");
  }
};
