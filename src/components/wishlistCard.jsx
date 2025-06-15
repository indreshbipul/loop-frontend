import productService from "../services/productServices";

import useAuthHook from "../hooks/authHook";

function wishlistCard({item}) {
  console.log("wcard",item)
  const { userData,refresh } = useAuthHook();
  
  const handelRemoveFromWishlist = () => {
    const payload = {
      userId: userData?.user?._id,
      productId: item?.id,
    };
    productService.removeWishlistItem(payload)
      .then(() => {
        console.log("Product removed from wishlist successfully");
        refresh([]);
        // Optionally, you can update the UI or state here
      })
      .catch((error) => {
        console.error("Error removing product from wishlist:", error);
      });
  }

  const handleAddToCart = () => {
    const productId = item?.product._id;
    const userId = userData?.user?._id;
    const selectedVariant = item?.variant
    const payload = {
      productId,
      userId,
      selectedVariant: selectedVariant,
    };

    productService.addProductToCart(payload)
      .then((response) => {
        refresh([]);
        console.log("Product added to cart successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                      src={item?.product?.variants[item.variant].imageUrl}
                      alt="Red T-Shirt in medium size"
                      className="object-cover w-full h-full"
                      loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate" title= {item?.product?.title}>
                    {item?.product?.title}
                </h2>
                <p className="text-indigo-700 font-bold text-xl mb-4">₹ {item?.product?.variants[item.variant].price}</p>
                <div className="mt-auto flex gap-3">
                  {/* Add to Cart button */}
                    <button
                    type="button"
                    className={`flex-grow text-white py-2 px-3 focus:outline-none focus-visible:ring-2 ${item?.product?.variants[item.variant].stock ? ' bg-indigo-600  hover:bg-indigo-700 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ' : ' bg-red-600  hover:bg-red-700 focus-visible:ring-red-500 focus-visible:ring-offset-2 ' } rounded-lg}`}
                    aria-label="Add Red T-Shirt to cart"
                    disabled={!item?.product?.variants[item.variant].stock}
                    onClick={()=>{
                      handleAddToCart()
                      handelRemoveFromWishlist();
                    }}
                    >
                    <span className="material-symbols-outlined align-middle mr-1 text-base">{item?.product?.variants[item.variant].stock ? 'Add to Cart' : 'Out of Stock' }</span> 
                    </button>
                    {/* delete button */}
                    <button 
                      type="button"
                      aria-label="Remove from wishlist"                    
                      className="p-2 rounded hover:bg-red-100 text-gray-800 transition-colors flex-shrink-0 border border-indigo-600 py-2 px-3 "
                      onClick={() =>{
                          handelRemoveFromWishlist();
                        }}
                      >
                         <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M6 7h12v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7zm3 2v9h2V9H9zm4 0v9h2V9h-2z" />
                          <path d="M15.5 4l1 1H20v2H4V5h3.5l1-1h7z" />
                        </svg>
                    </button>
                </div>
                </div>
        </article>
  )
}

export default wishlistCard