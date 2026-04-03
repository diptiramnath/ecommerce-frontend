import { useEffect, useState } from "react";
import { getProductsByCategory, addToCart, deleteProduct, getCart } from "../services/api";
import { useNavigate } from "react-router-dom";

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
    alert("Added to cart");
    loadCartCount();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts(category);
  };

  const handleAddProduct = async () => {
    const cat = categoryInput.toLowerCase();
    let imagePath = imageUrl;

    if (!imageUrl) {
      if (cat === "laptop") imagePath = "/images/dell.jpg";
      if (cat === "phone") imagePath = "/images/iphone.jpg";
      if (cat === "tablet") imagePath = "/images/ipad.jpg";
      if (cat === "accessories") imagePath = "/images/airpods.jpg";
    }

    await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        category: cat,
        description,
        stock: 10,
        imageUrl: imagePath
      })
    });

    setName(""); setPrice(""); setCategoryInput(""); setImageUrl(""); setDescriptionInput("");
    setCategory(cat);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pageStyle}>

      {/* HEADER */}
      <div style={header}>
        <h1 style={{ fontWeight: "bold" }}>🛒 ShopSphere</h1>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBar}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/cart")} style={btn}>Cart ({cartCount})</button>
          <button onClick={() => navigate("/orders")} style={btn}>Orders</button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} style={logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={mainContainer}>

        {/* SIDEBAR */}
        <div style={sidebar}>
          <h3>Categories</h3>
          {categories.map(cat => (
            <div key={cat} style={{
              padding: "8px",
              cursor: "pointer",
              background: category === cat ? "#e2e8f0" : "transparent",
              borderRadius: "6px"
            }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={content}>

          {/* ADMIN FORM */}
          {role === "ADMIN" && (
            <div style={formBox}>
              <h3>Add Product</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={input}/>
                <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={input}/>
                <input placeholder="Category" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} style={input}/>
                <input placeholder="Description" value={description} onChange={e => setDescriptionInput(e.target.value)} style={input}/>
                <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={input}/>
              </div>
              <button onClick={handleAddProduct} style={addBtn}>Add</button>
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div style={grid}>
            {filteredProducts.map(p => (
              <div key={p.id} style={card}>
                <img src={p.imageUrl || "/images/dell.jpg"} style={img} />
                <h3>{p.name}</h3>
                <p style={{ color: "#64748b" }}>{p.description}</p>
                <h2>₹ {p.price}</h2>

                {role !== "ADMIN" ? (
                  <button onClick={() => handleAddToCart(p)} style={addBtn}>
                    Add to Cart
                  </button>
                ) : (
                  <button onClick={() => handleDelete(p.id)} style={deleteBtn}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

/* 🎨 STYLES */

const pageStyle = {
  fontFamily: "Arial",
  background: "#f8fafc",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "white",
  borderBottom: "1px solid #ddd"
};

const searchBar = {
  padding: "8px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const mainContainer = {
  display: "flex"
};

const sidebar = {
  width: "200px",
  background: "white",
  padding: "20px",
  borderRight: "1px solid #ddd"
};

const content = {
  flex: 1,
  padding: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "8px"
};

const btn = {
  padding: "8px 12px",
  border: "none",
  background: "#334155",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const logoutBtn = {
  ...btn,
  background: "#ef4444"
};

const addBtn = {
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "10px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const input = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const formBox = {
  marginBottom: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px"
};