const mongoose = require("mongoose");

const SOSSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    // ✅ Location as separate lat/lng
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true } // createdAt and updatedAt automatically
);

module.exports = mongoose.model("SOS", SOSSchema);
