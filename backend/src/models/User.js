const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'volunteer', 'admin'], 
    default: 'user' 
  }, // ✅ role field
  volunteerRequest: { 
    type: Boolean, 
    default: false 
  } // ✅ NEW field to track request
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

