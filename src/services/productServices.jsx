const API_URL = import.meta.env.VITE_API_URL;

const getAllproducts = async() =>{
    const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
};
const getProductById = async (productId) => {
    const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    const product = await response.json();
    return product;
};

const addProductCart = async (payload) =>{
    const response = await fetch(`${API_URL}/addCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({payload }),
    });
    if (!response.ok) {
        throw new Error('Failed to add product to cart');
    }
    const cartItem = await response.json();
    return cartItem;
};

const getCartitems = async (userId) =>{
    const response = await fetch(`${API_URL}/cartItems`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch cart products');
    }
    const cartProducts = await response.json();
    return cartProducts;
};

const removeCartItem = async (userId, productId, variant) => {
    console.log("Removing cart item:", { userId, productId, variant });
    const response = await fetch(`${API_URL}/removeCartItem`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, variant }),
    });
    if (!response.ok) {
        throw new Error('Failed to delete cart item');
    }
    const result = await response.json();
    return result;
}

const cartQuantityChange = async (userId, productId, quantity) => {
    const response = await fetch(`${API_URL}/updateCartItem`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }
    const updatedCartItem = await response.json();
    return updatedCartItem;
}
const addProductWishlist = async (payload) =>{
    const response = await fetch(`${API_URL}/addWishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({payload }),
    });
    if (!response.ok) {
        throw new Error('Failed to add product to cart');
    }
    const cartItem = await response.json();
    return cartItem;
};

const removeWishlistItem = async (payload) => {
    const response = await fetch(`${API_URL}/removeWishlistItem`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload}),
    });
}

const getWishlistitems = async (userId) =>{
    const response = await fetch(`${API_URL}/wishlistItems/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch cart products');
    }
    const cartProducts = await response.json();
    return cartProducts;
};



const productService = {
    getAllProducts: getAllproducts,
    getProductById: getProductById,
    addProductToCart: addProductCart,
    getCartitems: getCartitems,
    removeCartItem: removeCartItem,
    cartQuantityChange: cartQuantityChange,
    addProductWishlist:addProductWishlist,
    getWishlistitems: getWishlistitems,
    removeWishlistItem :removeWishlistItem 
    
};


export default productService;