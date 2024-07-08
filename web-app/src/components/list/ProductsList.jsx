import React, { useEffect,useRef } from "react";
import productService from "../../services/productService";
import ProductCard from "../cards/ProductCard";
import { useProductClientContext } from "../../context/ProductClientProvider";

function ProductsList() {
  // const {
  //   products,
  //   updateProducts,
  //   selectedCategory,
  //   _setSelectedCategory,
  //   resetProducts
    
  // } = useHomeContext();
  const {
    productsList,
    currentProductPage,
    totalProductPages,
    selectedCategory,

    updateProductsList,
    updateTotalProductPages,
    updateCurrentProductPage,
    resetProducts,
    isLoading,
    updateIsLoading,
  } = useProductClientContext();

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight
      ) {
        if (currentProductPage < totalProductPages && !isLoading) {
          updateIsLoading(true); // Set loading state to true before fetching
          updateCurrentProductPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentProductPage, isLoading, totalProductPages, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === null) {
      fetchAllProducts(currentProductPage);
    } else {
      fetchProductsByCategory(selectedCategory, currentProductPage);
    }
  }, [currentProductPage, selectedCategory]);

  const fetchAllProducts = (page) => {
    productService
      .get(`/products/client-side-pagination?page=${page}`)
      .then(({ data }) => {
        handleFetchSuccess(data, page);
      })
      .catch((err) => {
        console.log(err);
        updateIsLoading(false); // Set loading state to false if there's an error
      });
  };

  const fetchProductsByCategory = (categoryId, page) => {
    productService
      .get(`/products/categoryId/${categoryId}?page=${page}`)
      .then(({ data }) => {
        handleFetchSuccess(data, page);
      })
      .catch((err) => {
        console.log(err);
        updateIsLoading(false); // Set loading state to false if there's an error
      });
  };

  const handleFetchSuccess = (data, page) => {
    console.log(data);
    if (page === 1) {
      updateProductsList(data.products);
    } else {
      updateProductsList((prevProducts) => [...prevProducts, ...data.products]);
    }
    updateCurrentProductPage(data.currentPage);
    updateCurrentProductPage(data.totalPages);
    updateIsLoading(false); // Set loading state to false after fetching
  };

  return (
    <div
      className="grid grid-cols-3 gap-4 justify-items-center content-center"
      ref={containerRef}
    >
      {productsList.length === 0 ? (
        <p>No products found.</p>
      ) : (
        productsList.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default ProductsList;
