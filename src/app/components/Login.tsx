"use client";
import "./css/Login.css";
import { useState } from "react";
import { login, signup } from "./actions";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await login(formData);
    if (response) {
      alert(response);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    const response = await signup(formData);
    if (response) {
      alert(response);
    }
  };

  return (
    <div className="form">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold text-center mb-6">
=======
      <h2 className="headd">
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        {!isLogin && (
<<<<<<< HEAD
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
=======
          <div className="mmmb">
            <label className="texthold">Name</label>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
<<<<<<< HEAD
              className="w-full p-2 border border-gray-300 rounded"
=======
              className="inptext"
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
            />
          </div>
        )}
        <div className="mb-4">
<<<<<<< HEAD
          <label className="block text-gray-700">Email</label>
=======
          <label className="texthold">Email</label>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
<<<<<<< HEAD
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
=======
            className="inptext"
          />
        </div>
        <div className="mb-4">
          <label className="texthold">Password</label>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
<<<<<<< HEAD
            className="w-full p-2 border border-gray-300 rounded"
=======
            className="inptext"
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          />
        </div>
        {!isLogin && (
          <div className="mb-4">
<<<<<<< HEAD
            <label className="block text-gray-700">Confirm Password</label>
=======
            <label className="texthold">Confirm Password</label>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
<<<<<<< HEAD
              className="w-full p-2 border border-gray-300 rounded"
=======
              className="inptext"
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
            />
          </div>
        )}
        <button
          type="submit"
<<<<<<< HEAD
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
=======
        
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
<<<<<<< HEAD
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
=======
      <p className="helptext">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
        
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Login;
