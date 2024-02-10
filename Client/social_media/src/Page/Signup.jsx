import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
 const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3003/user/register", formData);
        console.log(response.data); 
        alert("User registered successfully");
        if(response.status == 200){
          navigate("/Login")
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register user. Please try again.");
      }
     
 
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
