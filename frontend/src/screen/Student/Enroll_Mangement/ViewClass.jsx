import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ViewClass() {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option in state
  };

  return (
    <div>
      <h2>PayNow</h2>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="">Select Payment Method</option>
        <option value="Grade6">Grade6</option>
        <option value="Grade7">Grade7</option>
        <option value="Grade8">Grade8</option>
      </select>
      {selectedOption && (
        <Link to={`/payonline`}>
          <button className="button">Pay Now</button>
        </Link>
      )}
    </div>
  );
}

export default ViewClass;
