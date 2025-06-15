import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistCard from "../components/wishlistCard.jsx";

import productService from "../services/productServices.jsx";
import useAuthHook from "../hooks/authHook.jsx";

function Wishlist() {
  const { userData } = useAuthHook();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && !userData.isLoggedIn) {
      navigate("/signin");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (userData?.user?._id) {
      productService
        .getWishlistitems(userData.user._id)
        .then((data) => {
          console.log("Wishlist items fetched successfully:", data.wishlist);
          setWishlistItems(data.wishlist);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          navigate("/error");
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

  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-12 select-none text-gray-900">
        Your Wishlist
      </h1>
      <section
        aria-label="Wishlist items"
        className="grid gap-8
                sm:grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
            "
      >
        {/* <!-- Wishlist Item Start --> */}
        {wishlistItems?.map((item, index) => (
          <WishlistCard key={index} item={item} />
        ))}
        {wishlistItems.length === 0 && (
          <div className="col-span-full text-center text-gray-500 flex flex-col items-center justify-center">
            Your wishlist is empty. Start adding items!
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => navigate("/product")}
            >
              Shop Now
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Wishlist;
