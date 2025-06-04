// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "4rem",
          paddingInline: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // fundal semi-transparent
          minHeight: "calc(100vh - 4rem)", // asigură acoperirea completă a ecranului sub navbar
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)"
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
