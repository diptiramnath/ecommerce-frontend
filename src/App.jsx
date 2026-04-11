import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders"; // 🔥 Orders page
import Navbar from "./components/Navbar";
import Payment from "./pages/Payment";


// 🔥 OPTIONAL (only if you created ToastContext)
// import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    // 🔥 IF USING TOAST → uncomment below and wrap everything
    // <ToastProvider>

    <BrowserRouter>
      <Navbar /> {/* 🔥 Always visible */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />

        {/* 🔥 ORDERS ROUTE */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>

    // </ToastProvider>
  );
}

export default App;