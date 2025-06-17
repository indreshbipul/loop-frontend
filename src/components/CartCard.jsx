import { useState } from "react";

import useAuthHook from "../hooks/authHook";
import productService from "../services/productServices";

function CartCard({product, setCartItems}) {
  const{ userData, setUserData, refresh } = useAuthHook(); 
  const [loadingCart, setLoadingCart] = useState(false);
  let variant 
  let newProductQuantity =1;
  if(!product) {    
    return null;
  }
  console.log("CartCard product:", product);
  variant = product?.variant;
  
  const handelRemoveCartItem = () => {
    setLoadingCart(true);
    productService.removeCartItem(userData.user._id, product.id, variant)
    .then((data)=>{
      refresh([]);
      setLoadingCart(false);
      console.log("Cart item removed successfully", data);
    })
    .catch((error) => {
      setLoadingCart(false);
      console.error("Error removing cart item:", error);
    });    
  }

  const handleQuantityChange = () => {
    productService.cartQuantityChange(userData?.user?._id, product?.id, newProductQuantity)
    .then((data) =>{
      refresh([]);
      console.log("Cart item quantity updated successfully", data);
    })
    .catch((error) => {
      console.error("Error updating cart item quantity:", error);
    });
  }
  
  return (
    <div className="flex flex-col md:flex-row items-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 m-6 p-4 max-w-3xl mx-auto group">
      <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
        <img
          src={product.product?.variants[variant].imageUrl}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 py-4 text-left">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">{product?.product.title}</h1>
        <p className="text-gray-600 mb-2">{product?.product?.description}</p>
        <p className="text-gray-600 mb-2 flex flex-col md:flex-row gap-5 md:gap-5 sm:flex-col sm:gap-0">
            <span>{product?.product?.variants[variant].size}</span>
            <span>{product?.product?.variants[variant].color}</span>
        </p>
            
          <div>
            <span className="text-lg font-bold text-gray-800">₹{product?.product?.variants[variant].price}</span>
            <span className="text-sm text-gray-500 ml-5">
                <span className="font-semibold text-gray-800">Qty:</span>
                <input
                  type="number"
                  min="1"
                  defaultValue={product?.quantity}
                  className="w-16 border border-gray-300 rounded px-2 py-1 ml-2 focus:outline-none focus:ring focus:ring-yellow-400"
                  onChange={(e) => {
                    console.log(e.target.value);
                    newProductQuantity = e.target.value;
                    handleQuantityChange();
                  }}
                />
            </span>
          </div>
       <button 
          onClick={handelRemoveCartItem}
          disabled={loadingCart}
          className={`group text-black font-semibold py-2 px-4 rounded shadow transition-all duration-200 mt-3.5 cursor-pointer flex items-center justify-center gap-2 ${
            loadingCart ? 'bg-zinc-300 cursor-not-allowed' : 'hover:bg-zinc-200'
          }`} 
          type="button"
        >
          {loadingCart && (
            <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          Remove
      </button>


      </div>
    </div>
  )
}

export default CartCard