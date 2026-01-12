const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // users collection se link
    required: true
  },
  category: {
    type: String,
    enum: ["Food", "Medical", "Shelter"],
    required: true
  },
  details: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Rejected"],
    default: "Pending"
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
console.log("Request model")
module.exports = mongoose.model("Request", requestSchema);

