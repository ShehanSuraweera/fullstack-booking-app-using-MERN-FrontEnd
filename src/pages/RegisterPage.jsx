import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in ");
    } catch (error) {
      alert("Registration failed! Try again...");
    }
  }

  return (
    <div className="flex items-center justify-around mt-4 mb-64 grow">
      <div>
        <h1 className="mb-4 text-4xl text-center ">Register</h1>
        <form
          action="submit"
          className="max-w-md mx-auto "
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="shehan suraweera"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary">Register</button>
        </form>
        <div className="py-2 text-center text-gray-500 ">
          already have an account?{" "}
          <Link to={"/login"} className="text-black underline ">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
