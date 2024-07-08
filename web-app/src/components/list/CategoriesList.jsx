// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import productService from "../../services/productService";
import Button from "../buttons/Button";
import { useProductClientContext } from "../../context/ProductClientProvider";

function CategoriesList() {


  const {
    categoriesList,
    currentCategoryPage,
    totalCategoryPages,
    selectedCategory,

    updateCurrentCategoryPage,
    updateTotalCategoryPages,
    updateCategoriesList,
    updateSelectedCategory,

    resetProducts,
    updateCurrentProductPage,
  } = useProductClientContext();

  useEffect(() => {
    getCategoryListApi(currentCategoryPage);
  }, [
    currentCategoryPage,
    selectedCategory,
    totalCategoryPages,
  ]);

  const getCategoryListApi = (page) => {
    productService
      .get(`/categories/categories-pagination-client?page=${page}`)
      .then(({ data }) => {
        if (page === 1) {
          updateCategoriesList(data.category);
        } else {
          updateCategoriesList([...categoriesList, ...data.category]);
        }
        updateTotalCategoryPages(data.totalPages);
      })
      .catch(() => {
        // Handle error
      });
  };

  const handleMoreCategoriesClick = () => {
    if (currentCategoryPage < totalCategoryPages) {
      updateCurrentCategoryPage(currentCategoryPage + 1);
      getCategoryListApi(currentCategoryPage + 1);
    }
  };

  const handleCategoryClick = (category) => {
    // resetProducts();
    updateSelectedCategory(category);
    updateCurrentProductPage(1);
    resetProducts();
    console.log("Catagory ID Selected: ", category);
  };

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <button
          role="button"
          className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
            selectedCategory === null
              ? "bg-gray-800 text-white"
              : "hover:bg-zinc-300 hover:bg-opacity-50 active:bg-zinc-400 active:bg-opacity-50"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categoriesList.length > 0 &&
          categoriesList.map((category) => (
            <button
              key={category.id}
              role="button"
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "hover:bg-zinc-300 hover:bg-opacity-50 active:bg-zinc-400 active:bg-opacity-50"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}

        {currentCategoryPage < totalCategoryPages && ( // Render "More Categories" button only if there are more pages
          <Button
            text={"More Categories"}
            color={"gray"}
            onClick={handleMoreCategoriesClick} // Add onClick event handler
          />
        )}
      </nav>
    </div>
  );
}

export default CategoriesList;
