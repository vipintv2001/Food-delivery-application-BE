const staffs = require("../models/staffSchema");

exports.registerStaff = async (req, res) => {
  console.log("inside register staffs");
  const { name, email, phone, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await staffs.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existingUser) {
      res.status(409).json("account Already Exist");
    } else {
      const newstaff = new staffs({
        staffName: name,
        email: email,
        phone: phone,
        password: password,
        workstatus: false,
      });
      await newstaff.save();
      res.status(201).json("staff added succesfully");
    }
  } catch (err) {
    res.status(401).json("something went wrong");
    console.log(err);
  }
};

exports.getAllStaffs = async (req, res) => {
  console.log("inside get all staffs");
  try {
    const allStaffs = await staffs.find();
    res.status(201).json(allStaffs);
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong")
  }
};
