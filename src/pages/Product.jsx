import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/productServices";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredFun, setFilterFun] = useState(()=>()=> true); 
  const [sortFun, setSortFun] = useState(() => () => true);
  useEffect(() => {
    productService.getAllProducts()
      .then((response) => {
        console.log("Products fetched successfully:", response.products);
        setProducts(response.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  if (!products) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
        <div className="text-purple-600 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-0 py-6">
        <div className="flex flex-col md:flex-row md:space-x-8">

          {/* <!-- Filters Sidebar --> */}
          <aside
            className="
              w-full md:w-72 mb-8 md:mb-0 p-4
              bg-white rounded-none md:rounded-md
              shadow-md md:shadow
              md:p-6
              border-b md:border-b-0 md:border-r border-gray-200
              md:sticky md:top-6
              md:self-start
              hidden md:block
            "
            style={{ left: 0, zIndex: 20 }}
          >
            <h2 className="text-xl font-bold mb-6 text-indigo-700">Filter Products</h2>

            <section className="mb-8 ">
              <h3 className="font-semibold text-gray-800 mb-3 ">Category</h3>
              <form
                onChange={(e) => {
                  const value = e.target.value;
                  console.log("Selected category:", value);
                  if (value){
                    setFilterFun(() => product => product?.category === value);
                  }
                  else{
                    setFilterFun(() => () => true); 
                  } 
                }}
              >
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="checkbox" name="category" value="clothing" className="mr-2 accent-indigo-500" />
                  Jeans
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="checkbox" name="category" value="tshirt" className="mr-2 accent-indigo-500" />
                  T-Shirt
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="checkbox" name="category" value="shirt" className="mr-2 accent-indigo-500" />
                  Shirt
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="checkbox" name="category" value="cargo" className="mr-2 accent-indigo-500" />
                  Cargo
                </label>
              </form>
            </section>

            <section className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
              <form
                onChange={(e) =>{
                      const priceRange = e.target.value;
                      if (priceRange === "100-1000") {
                        setFilterFun(() => product => product.variants[0].price >= 10 && product.variants[0].price <= 100);
                      } else if (priceRange === "1001-5000") {
                        setFilterFun(() => product => product.variants[0].price > 100 && product.variants[0].price <= 500);
                      } else if (priceRange === "5000-10000") {
                        setFilterFun(() => product => product.variants[0].price > 500 && product.variants[0].price <= 1000);
                      } else if (priceRange === "10000+") {
                        setFilterFun(() => product => product.variants[0].price > 1000);
                      } else {
                        setFilterFun(() => () => true); // Reset to original if no valid range
                      }
                    }}
              >
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="price" value="100-1000" className="mr-2 accent-indigo-500"
                   />₹ 10 - ₹ 100
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="price" value="1001-5000" className="mr-2 accent-indigo-500" />
                  ₹ 100 - ₹ 500
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="price" value="5000-10000" className="mr-2 accent-indigo-500" />
                  ₹ 500 - ₹ 1000
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="price" value="10000+" className="mr-2 accent-indigo-500" />
                  ₹ 1000+
                </label>
              </form>
            </section>

            {/* <section>
              <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
              <form>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="rating" value="4" className="mr-2 accent-indigo-500" />
                  4 stars & up
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="rating" value="3" className="mr-2 accent-indigo-500" />
                  3 stars & up
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="rating" value="2" className="mr-2 accent-indigo-500" />
                  2 stars & up
                </label>
                <label className="flex items-center mb-2 cursor-pointer hover:text-indigo-600">
                  <input type="radio" name="rating" value="1" className="mr-2 accent-indigo-500" />
                  1 star & up
                </label>
              </form>
            </section> */}
          </aside>

          {/* <!-- Products & Sorting --> */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 px-6">
              <p className="text-gray-700 font-semibold" id="productsCount">
                Showing {products?.filter(filteredFun).length} products
              </p>
              <div>
                <label className="sr-only">Sort By</label>
                <select
                  id="sort"
                  name="sort"
                  className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  onChange={(e)=>{
                    const values = e.target.value;
                    if (values === "default") {
                      setSortFun(() => () => true)
                      return;
                    }
                    else if (values === "price-asc") {
                      setSortFun(() =>(a, b) => a?.variants[0].price - b?.variants[0].price);
                      return;
                    }
                    else if (values === "price-desc") {
                      setSortFun(() =>(a, b) => b?.variants[0].price - a?.variants[0].price);
                      return;
                    }
                    else if (values === "popularity") {
                      setSortFun(() =>(a, b) => b?.variants.rating - a?.variants.rating);
                      return;
                    }
                    else if (values === "newest") {
                      setSortFun(() =>(a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
                      return;
                    }
                    else{
                      setSortFun(() => () => true); // Reset to original if no valid sort option
                    }
                   }}
                >
                  <option value="default" >Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* <!-- Product Grid --> */}
            <div
              id="productGrid"
              className="grid grid-cols-1 place-items-center
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4"
            >
              {products?.length > 0 && 
              products.sort(sortFun)
              .filter(filteredFun)
              .map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
              {products?.length > 0 && 
              products.sort(sortFun)
              .filter(filteredFun).length === 0 &&(
                <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500 ">
                  No products found.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Product;
