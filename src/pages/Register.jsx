import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user = {
      username,
      password,
      role: "CUSTOMER"
    };

    registerUser(user)
      .then(() => {
        alert("✅ Registered successfully");
        window.location.href = "/login";
      })
      .catch(() => alert("❌ Error registering"));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;