const products = require('../models/productSchema')

exports.addProduct = async (req,res)=>{
    console.log(req.body);
    console.log("userId:",req.payload)
    const {productName,productImage,description,category,price,discount} = req.body;
    const userId = req.payload;
    try{
        const existingProduct = await products.findOne({productName:productName,_id:userId})
        if(existingProduct){
            res.status(409).json("product already exists")
        }else{
            const newProduct = new products({
              productName,
              productImage,
              description,
              category,
              price,
              discount,
              userId
            });
            await newProduct.save();
            res.status(201).json("product added successfully")
        }
    }catch(err){
        res.status(401).json("something went wrong")
        console.log(err);
    }
}

exports.getFoodMenu = async (req, res) => {
  console.log("inside get food menu");
  const {id} = req.params
  console.log("body:", id);
  try{
    const foodItems = await products.find({userId:id});
    res.status(201).json(foodItems)
  }
  catch(err){
    console.log(err);
    res.status(401).json("something went wrong")
  }
};