"use client";
import { useRouter } from "next/navigation";
import React from "react";
const Logout = () => {
  const router = useRouter();
  const handleClick = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;
