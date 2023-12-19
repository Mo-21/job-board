"use client";
import { Flex } from "@radix-ui/themes";
import { BsPersonCheckFill } from "react-icons/bs";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Navbar = () => {
  return (
    <nav className="border-b p-5 bg-white shadow-md">
      <Flex justify="between" align="center">
        <Flex gap="4">
          <NavbarLinks />
        </Flex>
        <div>User Image</div>
      </Flex>
    </nav>
  );
};

const NavbarLinks = () => {
  const currentPath = usePathname();
  const links: {
    label: string;
    href: string;
  }[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Jobs",
      href: "/jobs",
    },
  ];
  return (
    <>
      <Link className="mr-3" href="/">
        <BsPersonCheckFill className="w-8 h-8 text-gray-800" />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "nav-link": true,
                "text-blue-700": currentPath === link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
