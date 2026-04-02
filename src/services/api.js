const BASE_URL = "http://localhost:8080";


// =======================
// 🔐 AUTH APIs
// =======================

export const registerUser = async (user) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const loginUser = async (user) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};


// =======================
// 🛒 PRODUCT APIs
// =======================

export const getProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const deleteProduct = async (id) => {
  return fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  });
};


// =======================
// 🛍 CART APIs
// =======================

export const addToCart = async (userId, product) => {
  console.log("🔥 PRODUCT SENT:", product);

  const payload = {
    userId,
    products: [
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl
      }
    ]
  };

  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Cart error:", err);
    throw new Error("Failed to add to cart");
  }

  return res.json();
};

export const removeFromCart = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/cart/${userId}/${productId}`, {
    method: "DELETE"
  });
  return res.json();
};

export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/cart/${userId}`);
  return res.json();
};


// =======================
// 📦 ORDER APIs
// =======================

export const placeOrder = async (userId) => {
  const res = await fetch(`${BASE_URL}/orders/${userId}`, {
    method: "POST"
  });

  if (!res.ok) throw new Error("Order failed");
  return res.json();
};

export const getOrders = async (userId) => {
  const res = await fetch(`${BASE_URL}/orders/${userId}`);
  return res.json();
};

// 🔥 DELETE ORDER (NEW)
export const deleteOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE"
  });

  return res.text();
};