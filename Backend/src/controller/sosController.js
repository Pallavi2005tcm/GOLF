const SOS = require("../models/SOS");

// ✅ Send a new SOS request
const sendSOS = async (req, res) => {
  try {
    const { userId, location } = req.body;

    if (!userId || !location || location.lat === undefined || location.lng === undefined) {
      return res.status(400).json({ success: false, error: "Missing userId or location" });
    }

    // ✅ Create and save SOS request
    const sos = new SOS({ userId, location });
    await sos.save();

    // ✅ Emit SOS event to all connected clients via Socket.IO (if available)
    const io = req.app.get("io");
    if (io) {
      io.emit("newSOS", sos);
    }

    return res.status(201).json({ success: true, sos });
  } catch (error) {
    console.error("Error sending SOS:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ✅ Get latest SOS requests (latest 20)
const getSOS = async (req, res) => {
  try {
    const sosList = await SOS.find().sort({ createdAt: -1 }).limit(20);
    return res.status(200).json({ success: true, sosList });
  } catch (error) {
    console.error("Error fetching SOS:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { sendSOS, getSOS };
