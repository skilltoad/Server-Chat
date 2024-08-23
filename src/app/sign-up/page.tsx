"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/style.css";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../public/Logo.jpg";
const SignUp = () => {
  const router = useRouter();
  const toastOptions = {
    position: "bottom-right" as ToastPosition,
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
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
      router.push("/chat");
      // const { email, username, password } = values;
      // const { data } = await axios.post(registerRoute, {
      //   username,
      //   email,
      //   password,
      // });
      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      // if (data.status === true) {
      //   localStorage.setItem(
      //     process.env.REACT_APP_LOCALHOST_KEY,
      //     JSON.stringify(data.user)
      //   );
      //   navigate("/");
      // }
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
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
        <div className="w-full max-w-md px-5 py-8 shadow-md rounded-lg" style={{backgroundColor:'#202c33'}}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter username"
            name="username"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
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
export default SignUp;
