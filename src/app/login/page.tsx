"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import Logo from "../../../public/Logo.jpg";
import "@/app/style.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LOGIN } from "@/utils/urlHelper";

const LogIn = () => {
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
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      router.push("/chat");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    if (user.name.length < 3) {
      toast.error("Enter a valid email", toastOptions);
      return false;
    }
    if (user.password.length < 8) {
      toast.error("Enter a valid password", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const response = await axios.post(LOGIN, user);
        if (response && response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        }
        if (response && response.data.status) {
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(response.data.user)
          );
          router.push("/chat");
        }
      } catch (error) {
        console.log(error);
      }

      // router.push("/chat");
      // const { email, email, password } = user;
      // const { data } = await axios.post(registerRoute, {
      //   email,
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
    <form className="login" onSubmit={(event) => handleSubmit(event)}>
      <div className="flex flex-col items-center justify-center h-screen p-5">
        <div className="flex justify-center items-center mb-4 gap-2.5">
          <Image
            src={Logo}
            alt=""
            width={50}
            style={{ borderRadius: "30px" }}
          />
          <h1 className="text-2xl font-bold ">User Login</h1>
        </div>
        <div
          className="w-full max-w-md px-5 py-8 shadow-md rounded-lg"
          style={{ backgroundColor: "#202c33" }}
        >
          <label htmlFor="email">Username</label>
          <input
            style={{ color: "black" }}
            type="text"
            placeholder="Username"
            name="name"
            value={user.name}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            style={{ color: "black" }}
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className="w-full p-2 white rounded">
            Login
          </button>
          <span>
            Don&apos;t have an account? <Link href="/register">REGISTER</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};
export default LogIn;
