// src/components/Register.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", dob: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formDob" className="mt-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">Register</Button>
      </Form>
      <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
    </Container>
  );
}

export default Register;
