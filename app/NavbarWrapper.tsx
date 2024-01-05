"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const showNavbar = !(
    pathname === "/pages/register" ||
    pathname === "/auth/signin" ||
    pathname === "/auth/signin/redirect"
  );
  return <>{showNavbar && <Navbar />}</>;
};

export default NavbarWrapper;
