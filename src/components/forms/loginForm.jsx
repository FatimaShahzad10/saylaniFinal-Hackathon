import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/config.js";
//  Adjust the path if necessary
import InputField from "../ui/inputField";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(  auth, email, password);
      console.log(data)
            // await setDoc(doc(db, "users", user.uid), {
            //   email: email.trim(),
            //   username: username.trim(),
            //  password : password.trim()
              
            // });
      console.log("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="w-96 p-6 bg-gradient-to-b from-primary to-secondary rounded-3xl shadow-md text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-8"
      >
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
