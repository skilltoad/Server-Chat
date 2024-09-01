"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/style.css";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../public/Logo.jpg";
import axios from "axios";
import { REGISTER } from "@/utils/urlHelper";
const Register = () => {
  const router = useRouter();
  const toastOptions = {
    position: "bottom-right" as ToastPosition,
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = user;
    if (name.length < 3) {
      toast.error("name should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post(REGISTER, {
          name: user.name,
          email: user.email,
          password: user.password,
        });
        console.log(response);
        if (response && response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        }
        if (response.data.status) {
          // localStorage.setItem(
          //   "chat-app-user",
          //   JSON.stringify(response.data.user)
          // );
          toast.success("Registered Successfully, please Login", toastOptions);
          // router.push("/");
        }
      } catch (error) {
        console.log(error);
      }

    }
  };

  return (
    <form className="register" onSubmit={(event) => handleSubmit(event)}>
      <div className="flex flex-col items-center justify-center h-screen  p-5">
        <div className="flex justify-center items-center mb-4 gap-2.5">
          <Image
            src={Logo}
            alt=""
            width={50}
            style={{ borderRadius: "30px" }}
          />
          <h1 className="text-2xl font-bold">Creat new account</h1>
        </div>
        <div
          className="w-full max-w-md px-5 py-8 shadow-md rounded-lg"
          style={{ backgroundColor: "#202c33" }}
        >
          <label htmlFor="name">Username</label>
          <input
            style={{ color: "black" }}
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter Username"
            value={user.name}
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="email">Email address</label>
          <input
            style={{ color: "black" }}
            type="email"
            placeholder="Enter Email"
            value={user.email}
            name="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            style={{ color: "black" }}
            type="password"
            placeholder="Enter Password"
            value={user.password}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            style={{ color: "black" }}
            type="password"
            placeholder="Re-enter password"
            value={user.confirmPassword}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className="w-full p-2 white rounded">
            Sign Up
          </button>
          <span>
            Already have an account? <Link href="/">LOGIN</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};
export default Register;
