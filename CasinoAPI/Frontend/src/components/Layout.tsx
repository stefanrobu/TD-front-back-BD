// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {" "}
        {/* Padding pentru a nu suprapune navbar-ul */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
// Adaugă asta la sfârșitul fișierului
export {};
