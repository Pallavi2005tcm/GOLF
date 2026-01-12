import React, { useState } from "react";

function Donations() {
  const [formData, setFormData] = useState({ donor: "", foodType: "", quantity: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Data:", formData);
    alert("Donation Submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="donor"
        placeholder="Donor Name"
        className="w-full border rounded p-2"
        value={formData.donor}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="foodType"
        placeholder="Type of Food"
        className="w-full border rounded p-2"
        value={formData.foodType}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity (in kg)"
        className="w-full border rounded p-2"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Donate
      </button>
    </form>
  );
}

export default Donations;
