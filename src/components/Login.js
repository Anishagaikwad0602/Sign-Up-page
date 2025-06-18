import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/login", formData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  } catch (err) {
    alert("Login failed");
  }
};


  return (
    <div className="form-bg">
      <div className="login-box">
        <div className="banner">SIGN IN</div>
        <div className="profile-icon"></div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="fa fa-user"></i>
            <input type="email" name="email" placeholder="username" onChange={handleChange} required />
          </div>
          <div className="input-box">
            <i className="fa fa-lock"></i>
            <input type="password" name="password" placeholder="password" onChange={handleChange} required />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
              Remember me
            </label>
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className="login-btn">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
