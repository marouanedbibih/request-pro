import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import Button from "../buttons/Button"; // Ensure Button component is imported correctly

function ProductCard({ product }) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
        <img
          src={product.image}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {product.name}            
            </p>
            <p className="block font-sans text-sm antialiased font-semibold leading-normal text-gray-700 opacity-75">
              {product.categoryName}
            </p>
          </div>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {product.price}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {product.description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Button
          color="gray" // Assuming green is a predefined color or you can use any valid color string like "green"
          onClick={() => console.log("Add to Cart")}
          text="Add to Cart"
          disabled={false}
        />
      </div>
    </div>
  );
}


export default ProductCard;
