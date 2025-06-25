const restaurents = require("../models/restaurentSchema");

exports.addRestaurent = async (req, res) => {
  console.log("inside add restaurent function");
  console.log(req.body);
  const {
    name,
    resImage,
    description,
    categories,
    foodTypes,
    openingHours,
    location,
    lattitude,
    longitude,
    password,
    cardDescription,
  } = req.body;

  try {
    const existingRestaurent = await restaurents.findOne({
      restaurentName: name,
      location: location,
    });
    if (existingRestaurent) {
      res.status(409).json("restaurent already exists");
    } else {
      const newRestaurent = new restaurents({
        restaurentName: name,
        restaurentImage: resImage,
        description: description,
        categories: categories,
        foodTypes: foodTypes,
        openingHours: openingHours,
        location: location,
        lattitude: lattitude,
        longitude: longitude,
        password: password,
        cardDescription: cardDescription,
      });
      await newRestaurent.save();
      res.status(201).json("new Restaurent added succesfully");
    }
  } catch (err) {
    res.status(401).json("somrthing went wrong");
    console.log("error", err);
  }
};


exports.getRestaurent = async (req,res)=>{
    console.log("inside get restaurent");
    try{
        const result = await restaurents.find({})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json("something went wrong")
    }
    
}

exports.getAboutRestaurent = async (req,res)=>{
    console.log("inside get about restaurent");
    const id = req.params.id;
    console.log(id);
    try{
        const restaurentDetails = await restaurents.findOne({_id:id});
        res.status(200).json(restaurentDetails);
    }
    catch(err){
        res.status(401).json("somethin went wrong")
    }
}

exports.deleteRestaurent = async (req,res)=>{
  console.log("inside delete restaurent")
  const {id} = req.params;
  try{
    const deletedRestaurent = await restaurents.findByIdAndDelete(id);
    res.status(201).json(deletedRestaurent);
  }
  catch(err){
    res.status(401).json(err)
  }
}


