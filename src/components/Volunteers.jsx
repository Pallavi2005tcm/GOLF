import React, { useState } from "react";

function Volunteers() {
  const [formData, setFormData] = useState({ name: "", phone: "", area: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Data:", formData);
    alert("Volunteer Registered!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border rounded p-2"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="w-full border rounded p-2"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="area"
        placeholder="Area of Service"
        className="w-full border rounded p-2"
        value={formData.area}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

export default Volunteers;
