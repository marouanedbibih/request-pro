import React from "react";

function Select({ value, onChange, options, placeholder }) {
  const handleInputChange = (ev) => {
    onChange(ev.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleInputChange}
      className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
    >
      <option value="Select Category" disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
