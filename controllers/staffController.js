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
  const userSearchKey = req.query.search;
  console.log(userSearchKey);
  const query = userSearchKey
    ? {
        staffName: {
          $regex: userSearchKey,
          $options: "i",
        },
      }
    : {};
  try {
    const allStaffs = await staffs.find(query).sort({ workstatus: -1 });
    res.status(201).json(allStaffs);
  } catch (err) {
    console.log(err);
    res.status(401).json("something went wrong");
  }
};

exports.setWorkStatus = async (req, res) => {
  console.log("inside set work status");
  const { workstatus, workActivity } = req.body;
  console.log(workstatus, workActivity);
  const staffId = req.payload;
  try {
    const updatedStaff = await staffs.findByIdAndUpdate(
      staffId,
      { workActivity, workstatus },
      { new: true }
    );
    res.status(201).json(updatedStaff);
  } catch (error) {
    res.status(401).json(error);
  }
};
