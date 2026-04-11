import { useEffect, useState } from "react";
import { getProductsByCategory, addToCart, deleteProduct, getCart } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("laptop");
  const [cartCount, setCartCount] = useState(0);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [description, setDescriptionInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const categories = ["laptop", "phone", "tablet", "accessories"];

  useEffect(() => {
    loadProducts(category);
    loadCartCount();
  }, [category]);

  const loadProducts = (cat) => {
    getProductsByCategory(cat).then(setProducts);
  };

  const loadCartCount = async () => {
    if (!userId) return;
    const cart = await getCart(userId);
    setCartCount(cart?.products?.length || 0);
  };

  const handleAddToCart = async (product) => {
    await addToCart(userId, product);
    loadCartCount();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts(category);
  };

  const handleAddProduct = async () => {
    await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        category: categoryInput.toLowerCase(),
        description,
        stock: 10,
        imageUrl
      })
    });

    setName("");
    setPrice("");
    setCategoryInput("");
    setImageUrl("");
    setDescriptionInput("");

    loadProducts(categoryInput);
  };

  const filteredProducts = products.filter(p =>
  p.name.toLowerCase().includes(search.toLowerCase()) ||
  p.description.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="home-container">

      {/* HEADER */}
      <div className="home-header">
        <h2 className="logo">🛒 Arvind's kutty kadai</h2>

        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="nav-buttons">
          {role !== "ADMIN" && (
            <button onClick={() => navigate("/cart")} className="btn">
              Cart ({cartCount})
            </button>
          )}
          <button onClick={() => navigate("/orders")} className="btn">Orders</button>
          <button onClick={() => {
            localStorage.clear();
            navigate("/login");
          }} className="btn logout">Logout</button>
        </div>
      </div>

      {/* ADMIN */}
      {role === "ADMIN" && (
        <div className="admin-box">
          <h3>Add Product</h3>

          <div className="admin-row">
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Category" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} />
            <input placeholder="Description" value={description} onChange={e => setDescriptionInput(e.target.value)} />
            <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <button onClick={handleAddProduct}>Add</button>
          </div>
        </div>
      )}

      <div className="main-content">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Categories</h3>
          {categories.map(cat => (
            <div
              key={cat}
              className={`category ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="products-section">
          <div className="product-grid">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                className="product-card"
                onClick={() => setSelectedProduct(p)}
              >
                <img src={p.imageUrl || "/images/dell.jpg"} />

                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>
                <p className="price">₹ {p.price}</p>

                {role !== "ADMIN" ? (
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 MODAL (ONLY IMPROVED UI, NO LOGIC CHANGE) */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h2>🛍 Product Details</h2>
            </div>

            <img
              src={selectedProduct.imageUrl || "/images/dell.jpg"}
              className="modal-image"
            />

            <h2 className="modal-title">{selectedProduct.name}</h2>

            <p className="modal-desc">
              {selectedProduct.description || "No description available"}
            </p>

            <h3 className="modal-price">₹ {selectedProduct.price}</h3>

            {role !== "ADMIN" && (
              <button
                className="add-btn"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            )}

            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;