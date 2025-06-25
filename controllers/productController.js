const products = require("../models/productSchema");

exports.addProduct = async (req, res) => {
  console.log(req.body);
  console.log("userId:", req.payload);
  const {
    productName,
    productImage,
    description,
    category,
    price,
    discount,
    restaurentName,
  } = req.body;
  const userId = req.payload;
  try {
    const existingProduct = await products.findOne({
      productName: productName,
      _id: userId,
    });
    if (existingProduct) {
      res.status(409).json("product already exists");
    } else {
      const newProduct = new products({
        productName,
        productImage,
        description,
        category,
        price,
        discount,
        restaurentName,
        restaurentId: userId,
      });
      await newProduct.save();
      res.status(201).json("product added successfully");
    }
  } catch (err) {
    res.status(401).json("something went wrong");
    console.log(err);
  }
};

exports.getFoodMenu = async (req, res) => {
  console.log("inside get food menu");
  const { id } = req.params;
  console.log("body:", id);
  try {
    const foodItems = await products.find({ userId: id });
    if (!foodItems || foodItems.length === 0) {
      const foodItems = await products.find({ restaurentId: id });
      res.status(201).json(foodItems);
    } else {
      res.status(201).json(foodItems);
    }
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong");
  }
};

exports.deleteFoodItem = async (req, res) => {
  console.log("inside delete food Item");
  const { id } = req.params;
  console.log("productId", id);
  try {
    const deletedFoodItem = await products.findByIdAndDelete(id);
    res.status(201).json("item deleted succesfully");
  } catch (err) {
    console.log("err", err);
    res.status(401).json(err);
  }
};

exports.editFoodItem = async (req,res)=>{
  console.log("inside edit food items");
  const {id} = req.params;
  const {
    productName,
    productImage,
    description,
    category,
    price,
    discount,
  } = req.body;
  try{
    const updatedProduct = await products.findByIdAndUpdate(id, {
      productName,
      productImage,
      description,
      category,
      price,
      discount,
    },{
      new:true
    });
    res.status(201).json(updatedProduct)
    console.log(updatedProduct)
  }catch(err){
    console.log(err);
    res.status(401).json("something went wrong")
  }
}
