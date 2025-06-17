import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useState as useLocalState } from "react"; // Add useLocalState for local loading
import { useMemo } from "react";

import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";

function ProductDetail() {
  const { id } = useParams();
  const { userData, refresh } = useAuthHook();
  const [product, setProduct] = useState({});
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState([]);
  const [inStock, setInstock] = useState(false);
  const [loadingCart, setLoadingCart] = useLocalState(false); 
  const [loadingWishlish, setLoadingWishlist] = useLocalState(false); 

  useEffect(() => {
    productService.getProductById(id)
      .then((data) => {
        if (data) {
          console.log("Product data:", data);
          setProduct(data.product);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });

  }, [id]);

  // Get unique colors and sizes from variants
  const uniqueColors = useMemo(() => {
    const seen = new Set();
    return product?.variants?.filter(v => {
      if (!seen.has(v.color)) {
        seen.add(v.color);
        return true;
      }
      return false;
    }) || [];
  }, [product]);

  const uniqueSizes = useMemo(() => {
    const seen = new Set();
    return product?.variants
      ?.filter(v => v.color === uniqueColors[activeColor]?.color)
      ?.filter(v => {
        if (!seen.has(v.size)) {
          seen.add(v.size);
          return true;
        }
        return false;
      }) || [];
  }, [product, uniqueColors, activeColor]);

  // Find the selected variant based on color and size
  const selectedVariant = useMemo(() => {
    return product?.variants?.find(
      v =>
        v.color === uniqueColors[activeColor]?.color &&
        v.size === activeSize
    );
  }, [product, uniqueColors, activeColor, activeSize]);

  // Update main image when color or size changes
  useEffect(() => {
    if (selectedVariant) {
      setMainImage(selectedVariant.imageUrl);
    } else if (uniqueColors[activeColor]) {
      // fallback: show first variant of selected color
      const fallback = product?.variants?.find(
        v => v.color === uniqueColors[activeColor]?.color
      );
      setMainImage(fallback?.imageUrl || "");
    }
  }, [selectedVariant, uniqueColors, activeColor, product]);

  // Update inStock when color or size changes
  useEffect(() => {
    if (selectedVariant) {
      setInstock(selectedVariant.stock);
    } else {
      setInstock(false);
    }
  }, [selectedVariant]);

  // When color changes, reset size to first available for that color
  useEffect(() => {
    if (uniqueSizes.length > 0) {
      setActiveSize(uniqueSizes[0].size);
    } else {
      setActiveSize("");
    }
    // eslint-disable-next-line
  }, [activeColor, product]);

  const images = product?.variants?.map((variant) => variant.imageUrl);

  if (!product || !product.variants || product.variants.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
      <div className="text-purple-600 text-center">Loading...</div>
    </div>
  );
}

  const handleSizeChange = (e) => {
    setActiveSize(e.target.value);
  };

  const handleColorChange = (index) => {
    setActiveColor(index);
  };

  const handleQuantity = (type) => {
    setQuantity((prev) =>
      type === "inc"
        ? Math.min(prev + 1, 10)
        : Math.max(prev - 1, 1)
    );
  };
  const handleAddToCart = () => {
    setLoadingCart(true);
    const productId = product?._id;
    const userId = userData?.user?._id;

    const selectedVariant = product?.variants?.findIndex(
      (variant) =>
        variant.color === product.variants[activeColor].color &&
        variant.size === activeSize
    );
    const payload = {
      productId,
      userId,
      selectedVariant: selectedVariant,
      quantity,
    };

    productService.addProductToCart(payload)
      .then((response) => {
        refresh([]);
        setLoadingCart(false);
        console.log("Product added to cart successfully:", response);
      })
      .catch((error) => {
        setLoadingCart(false);
        console.error("Error adding product to cart:", error);
      });
  };

  const handelAddProductWishlist = () => {
    setLoadingWishlist(true);
    const productId = product?._id;
    const userId = userData?.user?._id;

    const selectedVariant = product?.variants?.findIndex(
      (variant) =>
        variant.color === product.variants[activeColor].color &&
        variant.size === activeSize
    );
    const payload = {
      productId,
      userId,
      selectedVariant: selectedVariant,
    };

    productService.addProductWishlist(payload)
      .then((response) => {
        refresh([]);
        setLoadingWishlist(false);
        console.log("Product added to cart successfully:", response);
      })
      .catch((error) => {
        setLoadingWishlist(false);
        console.error("Error adding product to cart:", error);
      });
  };


  return (
    <div className="font-sans min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-2xl bg-white p-4 md:p-12">
        <div className="flex flex-col md:flex-row md:space-x-12 gap-16">
          {/* Left: Product Images */}
          <section className="md:w-1/3">
            <div className="relative">
              <img
                id="mainImage"
                src={mainImage}
                alt="Product"
                className="rounded-xl shadow-xl w-full object-cover aspect-square border border-gray-200 transition-transform duration-300 hover:scale-105"
              />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex space-x-3 mt-4 overflow-x-auto overflow-hidden ">
              {/* Show all images for selected color */}
              {product?.variants
                ?.filter(v => v.color === uniqueColors[activeColor]?.color)
                ?.map((variant, idx) => (
                  <img
                    key={idx}
                    src={variant.imageUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200 ${
                      mainImage === variant.imageUrl
                        ? "border-indigo-600 ring-2 ring-indigo-300 "
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                    onClick={() => setMainImage(variant.imageUrl)}
                    tabIndex={0}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
            </div>
          </section>

          {/* Right: Product Details */}
          <section className="md:w-1/2 mt-8 md:mt-0 flex flex-col ">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {product?.title || "Product Title"}
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
                ₹ {selectedVariant?.price || uniqueColors[activeColor]?.price || product?.variants[0]?.price}.00
              </p>

              <div className="flex items-center mb-4 space-x-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <svg className="w-6 h-6 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  4.0 <span className="text-gray-400">|</span> (87 reviews)
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product?.description ||
                  "This is a placeholder description for the product. It provides details about the product's features, materials, and care instructions."}
              </p>

              <div className="mb-6">
                <label
                  htmlFor="size"
                  className="block font-semibold text-gray-800 mb-2"
                >
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={activeSize}
                  onChange={handleSizeChange}
                  className="w-36 rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  {uniqueSizes.length === 0 && (
                    <option value="">No sizes</option>
                  )}
                  {uniqueSizes.map((variant, index) => (
                    <option key={index} value={variant.size}>
                      {variant.size}
                    </option>
                  ))}
                </select>
                <a
                  href="#"
                  className="text-indigo-600 ml-4 text-sm font-medium hover:underline"
                >
                  Size guide
                </a>
              </div>
              <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-2">Color</p>
                <div className="flex space-x-3">
                  {uniqueColors.map((variant, index) => (
                    <button
                      key={index}
                      aria-label={`Select ${variant.color} color`}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-150 focus:outline-none shadow-sm ${
                        activeColor === index
                          ? "border-indigo-600 ring-2 ring-indigo-400 scale-110"
                          : "border-gray-300 hover:border-indigo-400"
                      }`}
                      style={{ backgroundColor: variant.color, position: "relative" }}
                      onClick={() => handleColorChange(index)}
                      type="button"
                    >
                      {activeColor === index && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-row items-center space-x-3 mb-4 sm:mb-0">
                <label htmlFor="quantity" className="font-semibold text-gray-800">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => handleQuantity("dec")}
                    disabled={quantity === 1}
                  >-</button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="w-14 text-center border-l border-r border-gray-300 focus:outline-none"
                    value={quantity}
                    min={1}
                    max={10}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(10, Number(e.target.value) || 1)))
                    }
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => handleQuantity("inc")}
                    disabled={quantity === 10}
                  >+</button>
                </div>
              </div>
              <div id="buttons" className={`${!activeSize ?'hidden': 'flex'} flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 gap-4`}>
                <button
                  type="button"
                  className={`w-full sm:w-auto text-white font-semibold px-16 py-3 rounded-md transition shadow-lg flex items-center justify-center gap-2 ${
                    inStock
                      ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
                      : "bg-red-600 hover:bg-red-700"
                  } ${loadingCart ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={!inStock || loadingCart}
                  onClick={handleAddToCart}
                >
                  {loadingCart ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : null}
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>      
                <button
                  type="button"
                  className={`w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-3 rounded-md transition shadow-md flex items-center justify-center gap-2 ${loadingWishlish ? "opacity-70 cursor-not-allowed" : ""}`}
                  onClick={(e) =>{ 
                    e.preventDefault
                    handelAddProductWishlist()
                  }}
                >
                  {loadingWishlish ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : null}
                  Add to Wishlist
                </button>          
              </div>

              
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
