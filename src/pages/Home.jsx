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
    getProductsByCategory(cat)
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  const loadCartCount = async () => {
    if (!userId) return;
    try {
      const cart = await getCart(userId);
      setCartCount(cart?.products?.length || 0);
    } catch {}
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(userId, product);
      alert("Added to cart");
      loadCartCount();
    } catch {
      alert("Error adding to cart");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts(category);
  };

  // 🔥 FIXED IMAGE LOGIC (NO RANDOM OVERRIDE)
  const handleAddProduct = async () => {
    const cat = categoryInput.toLowerCase();
    const productName = name.toLowerCase();

    let imagePath = imageUrl;

    // ONLY auto-assign if user didn't give image
    if (!imageUrl || imageUrl.trim() === "") {

      if (cat === "laptop") {
        if (productName.includes("hp")) imagePath = "/images/hp.jpg";
        else if (productName.includes("dell")) imagePath = "/images/dell.jpg";
        else if (productName.includes("vivo")) imagePath = "/images/vivobook.jpg";
        else if (productName.includes("mac")) imagePath = "/images/macbook.jpg";
        else imagePath = "/images/dell.jpg";
      }

      if (cat === "phone") {
        if (productName.includes("iphone")) imagePath = "/images/iphone.jpg";
        else if (productName.includes("samsung")) imagePath = "/images/samsung.jpg";
        else if (productName.includes("redmi")) imagePath = "/images/redmi.jpg";
        else if (productName.includes("pixel")) imagePath = "/images/pixel.jpg";
        else imagePath = "/images/iphone.jpg";
      }

      if (cat === "tablet") {
        if (productName.includes("ipad")) imagePath = "/images/ipad.jpg";
        else if (productName.includes("samsung")) imagePath = "/images/samsungtab.jpg";
        else imagePath = "/images/ipad.jpg";
      }

      if (cat === "accessories") {
        if (productName.includes("airpods")) imagePath = "/images/airpods.jpg";
        else if (productName.includes("sony")) imagePath = "/images/sony.jpg";
        else imagePath = "/images/airpods.jpg";
      }
    }

    await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        category: cat,
        description: description,
        stock: 10,
        imageUrl: imagePath
      })
    });

    setName("");
    setPrice("");
    setCategoryInput("");
    setImageUrl("");
    setDescriptionInput("");
    setCategory(cat);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getLaptopImage = (name) => {
    const n = name.toLowerCase();
    if (n.includes("hp")) return "/images/hp.jpg";
    if (n.includes("dell")) return "/images/dell.jpg";
    if (n.includes("vivo")) return "/images/vivobook.jpg";
    if (n.includes("mac")) return "/images/macbook.jpg";
    return "/images/dell.jpg";
  };

  const getPhoneImage = (name) => {
    const n = name.toLowerCase();
    if (n.includes("iphone")) return "/images/iphone.jpg";
    if (n.includes("samsung")) return "/images/samsung.jpg";
    if (n.includes("redmi")) return "/images/redmi.jpg";
    if (n.includes("pixel")) return "/images/pixel.jpg";
    return "/images/iphone.jpg";
  };

  const getTabletImage = (name) => {
    const n = name.toLowerCase();
    if (n.includes("ipad")) return "/images/ipad.jpg";
    if (n.includes("samsung")) return "/images/samsungtab.jpg";
    return "/images/ipad.jpg";
  };

  const getAccessoriesImage = (name) => {
    const n = name.toLowerCase();
    if (n.includes("airpods")) return "/images/airpods.jpg";
    if (n.includes("sony")) return "/images/sony.jpg";
    return "/images/airpods.jpg";
  };

  return (
    <div style={pageStyle}>

      <div style={headerStyle}>
        <h2>🛒 Arvind's kutti kadai</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/")} style={navBtn}>Home</button>

          {role !== "ADMIN" && (
            <div style={{ position: "relative" }}>
              <button onClick={() => navigate("/cart")} style={navBtn}>
                🛒 Cart
              </button>
              <span style={badgeStyle}>{cartCount}</span>
            </div>
          )}

          <button onClick={() => {
            localStorage.clear();
            navigate("/login");
          }} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {role !== "ADMIN" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "6px",
              border: "none"
            }}
          />
        </div>
      )}

      {role === "ADMIN" && (
        <div style={formBox}>
          <h3>➕ Add Product</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle}/>
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle}/>
            <input placeholder="Category" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} style={inputStyle}/>
            <input placeholder="Description" value={description} onChange={e => setDescriptionInput(e.target.value)} style={inputStyle}/>
            <input placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={inputStyle}/>
          </div>

          <button onClick={handleAddProduct} style={addBtn}>Add</button>
        </div>
      )}

      <div style={categoryStyle}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            ...categoryBtn,
            background: category === cat ? "#22c55e" : "#334155"
          }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={gridStyle}>
        {filteredProducts.map(p => (
          <div key={p.id} style={cardStyle}>

            <img
              src={p.imageUrl || (
                p.category === "laptop"
                  ? getLaptopImage(p.name)
                  : p.category === "phone"
                    ? getPhoneImage(p.name)
                    : p.category === "tablet"
                      ? getTabletImage(p.name)
                      : getAccessoriesImage(p.name)
              )}
              alt={p.name}
              style={imageStyle}
              onError={(e) => {
                e.target.src = "/images/dell.jpg";
              }}
            />

            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹ {p.price}</p>

            {role !== "ADMIN" && (
              <button onClick={() => handleAddToCart(p)} style={addBtn}>
                Add to Cart
              </button>
            )}

            {role === "ADMIN" && (
              <button onClick={() => handleDelete(p.id)} style={deleteBtn}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

/* STYLES (unchanged) */

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "20px"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const navBtn = {
  padding: "8px 15px",
  background: "#334155",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const logoutBtn = {
  padding: "8px 15px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const badgeStyle = {
  position: "absolute",
  top: "-5px",
  right: "-8px",
  background: "red",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "12px"
};

const formBox = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#334155",
  color: "white"
};

const addBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const deleteBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const categoryStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const categoryBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px"
};

const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};