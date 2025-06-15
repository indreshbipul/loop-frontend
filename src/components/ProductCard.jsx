import { useNavigate } from "react-router-dom";


import useAuthHook from "../hooks/authHook";
function ProductCard({product}) {
  const navigate = useNavigate();
  const { userData, refresh } = useAuthHook(); 
  if(!product || !userData) {
    return null;
  }
  const handelProductDetail = () => {
    navigate(`/product/${product._id}`)
  }
  const uniqueColor = [...new Set(product?.variants.map(variant => variant.color))];
  const uniqueSize = [...new Set(product?.variants.map(product => product.size))];

  return (
  <div
    onClick={()=>{
      handelProductDetail();
    }}
  >
    <div className="w-56 h-96 flex flex-col rounded-xl overflow-hidden shadow-lg bg-white hover:scale-105 group transition-transform duration-300 border border-gray-100 mx-2 my-4">
    <div className="w-full h-56 flex items-center justify-center bg-gray-50">
      <img
        src={product.variants[0].imageUrl || "/fallback-image.png"}
        alt={product.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={e => { e.target.src = "/fallback-image.png"; }}
      />
    </div>
    <div className="flex-1 flex flex-col justify-between p-3">
      <div>
        <h1 className="mb-1 font-bold text-lg truncate" title={product.title}>{product.title}</h1>
        <p className="mb-1 text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]" title={product.description}>{product.description}</p>
      </div>
      <div className="group-hover:flex hidden flex-col transition-opacity duration-300">
            <div className='text-sm flex flex-row gap-3 truncate'>Size: {uniqueSize.map((Size, index) =>(
              <span key={index} className="text-gray-500 text-sm">{Size}</span>
          ))}</div>
          {/* <div className='flex flex-row items-center gap-3 '>Colors: {uniqueColor.map((Color, index) =>(
              <span key={index} className=" h-1.5 w-2.5 rounded-b-full"
                style={{ backgroundColor: Color }}
                title={Color}
              ></span>
          ))}</div> */}
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-base text-gray-800 group-hover:text-blue-600">₹ {product.variants[0].price}.00</p>
        <button
          type="button"
          id="wishlist-button"
          className="p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 7.247a5.751 5.751 0 00-9.07-1.158L12 6.63l-.682-.54a5.751 5.751 0 00-9.07 1.158 6.25 6.25 0 001.056 7.815l7.201 6.847a.75.75 0 001.05 0l7.201-6.847a6.25 6.25 0 001.056-7.815z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  </div>
);

}

export default ProductCard