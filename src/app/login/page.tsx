"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import Logo from "../../../public/Logo.jpg";
import "@/app/style.css";
import "react-toastify/dist/ReactToastify.css";
const LogIn = () => {
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
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, username } = values;
    if (username.length < 3) {
      toast.error("Enter a valid username", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Enter a valid password", toastOptions);
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
      <div className="flex flex-col items-center justify-center h-screen p-5">
        <div className="flex justify-center items-center mb-4 gap-2.5">
          <Image src={Logo} alt="" width={50} style={{borderRadius:'30px'}}/>
          <h1 className="text-2xl font-bold ">User Login</h1>
        </div>
        <div className="w-full max-w-md px-5 py-8 shadow-md rounded-lg" style={{backgroundColor:'#202c33'}}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className="w-full p-2 white rounded">
            Login
          </button>
          <span>
            Don&apos;t have an account? <Link href="/sign-up">REGISTER</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};
export default LogIn;
