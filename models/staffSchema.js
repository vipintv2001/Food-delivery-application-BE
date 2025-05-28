const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workstatus: {
    type: Boolean,
    required: true,
  },
  workActivity: {
    type: String
  },
});

const staffs = mongoose.model('staffs',staffSchema);
module.exports=staffs