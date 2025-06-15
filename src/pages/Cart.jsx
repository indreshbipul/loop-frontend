import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard.jsx"; 

import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";

function Cart() {
  const { userData } = useAuthHook(); 
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && !userData.isLoggedIn) {
      navigate('/signin');
    }
  }, [userData, navigate]);
  
  useEffect(() => {
    if (userData?.user?._id) {
      productService.getCartitems(userData.user._id)
        .then((data) => {
          setCartItems(data.cart);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          navigate('/error');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userData, navigate]);

  

  // Show loading spinner if user or cart is not ready
  if (!userData || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
        <div className="text-purple-600 text-center">Loading...</div>
      </div>
    );
  }

  //total price calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.variants[item.variant].price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 font-sans min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row lg:space-x-10"> 

          <section className="flex-1">
            {cartItems.length === 0 ? (
              <div className="text-gray-500 text-center">Your cart is empty.</div>
            ) : (
              cartItems.map((item, index) => (
                <CartCard key={index} product={item} setCartItems={setCartItems} />
              ))
            )}
          </section>

          <aside className="mt-8 lg:mt-0 lg:w-80 bg-gray-100 rounded-md p-6 h-fit shadow-inner">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-gray-900">₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Estimated Tax</span>
              <span className="font-semibold text-gray-900">₹ {(subtotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>₹ {(subtotal * 1.05).toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate('/ordercheckout');
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
              }}
              disabled={cartItems.length < 1}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition mb-4">
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full border border-indigo-600 text-indigo-600 font-semibold py-3 rounded-md hover:bg-indigo-50 transition">
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Cart;
