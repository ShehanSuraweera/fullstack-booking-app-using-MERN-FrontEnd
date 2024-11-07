import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login Successfull");
      setRedirect(true);
    } catch (error) {
      alert("Login failed try again...!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-around mt-4 mb-64 grow">
      <div>
        <h1 className="mb-4 text-4xl text-center ">Login</h1>
        <form
          action="submit"
          className="max-w-md mx-auto "
          onSubmit={handleLoginSubmit}
        >
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
          <button className="primary">Login</button>
        </form>
        <div className="py-2 text-center text-gray-500 ">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-black underline ">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
