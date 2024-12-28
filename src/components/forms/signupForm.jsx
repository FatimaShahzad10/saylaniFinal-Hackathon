import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import InputField from "../ui/inputField";
import { auth, db } from "../../config/config.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (username.length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }

    // Validate password
    if (password.length < 5) {
      alert("Password must be at least 5 characters long");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email.trim(),
        username: username.trim(),
       password : password.trim()
        
      });

      console.log("User registered successfully:", user.uid);
      alert("User registered successfully!");

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error creating user:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
    
    <div className="absolute bg-gradient-to-b from-primary to-transparent w-full h-2/3 opacity-40 top-0" />

    <div className="z-30 flex flex-col items-center justify-center space-y-6 max-w-5xl">
      
      <div className="flex flex-col gap-6 items-center">
  
    <div className="w-96 p-6 bg-gradient-to-b from-primary to-secondary rounded-3xl shadow-md text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-3"
      >
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-28 font-bold bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Register;
