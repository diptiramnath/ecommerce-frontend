import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    registerUser({ username, password })
      .then(() => {
        alert("Registered successfully");
        navigate("/login");
      })
      .catch(() => alert("Error"));
  };

  return (
    <div style={authPage}>
      <div style={authCard}>
        <h2>📝 Register</h2>

        <input placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={input}
        />

        <input type="password" placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleRegister} style={primaryBtn}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
const page = {
  padding: "20px",
  background: "#f8fafc",
  minHeight: "100vh"
};

const card = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const orderCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const productRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const img = {
  width: "120px",
  borderRadius: "8px"
};

const imgSmall = {
  width: "60px",
  borderRadius: "6px"
};

const primaryBtn = {
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const authPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#0f172a"
};

const authCard = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};