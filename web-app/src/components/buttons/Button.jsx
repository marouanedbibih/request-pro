import React from "react";

function Button({ onClick, disabled, color, text }) {
  let buttonColorClass = "bg-gray-800";
  let hoverColorClass = "hover:bg-gray-700";
  let focusColorClass = "focus:bg-gray-900";
  let textColorClass = "text-white";
  let shadowClass = "shadow-gray-900/10";

  if (color === "red") {
    buttonColorClass = "bg-red-500";
    hoverColorClass = "hover:bg-red-600";
    focusColorClass = "focus:bg-red-700";
    textColorClass = "text-white";
    shadowClass = "shadow-red-500";
  } else if (color === "green") {
    buttonColorClass = "bg-green-500";
    hoverColorClass = "hover:bg-green-600";
    focusColorClass = "focus:bg-green-700";
    textColorClass = "text-white";
    shadowClass = "shadow-green-500";
  } else if (color === "blue") {
    buttonColorClass = "bg-blue-500";
    hoverColorClass = "hover:bg-blue-600";
    focusColorClass = "focus:bg-blue-700";
    textColorClass = "text-white";
    shadowClass = "shadow-blue-500";
  } // Add more color configurations as needed

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`align-middle select-none ${buttonColorClass} ${hoverColorClass} ${focusColorClass} ${textColorClass} font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg ${shadowClass} hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}
      type="button"
    >
      {text}
    </button>
  );
}

export default Button;
