"use client";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPersonCheckFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserImage from "./components/UserImage";

const Navbar = () => {
  return (
    <nav className="border-b p-5 bg-white shadow-md">
      <Flex justify="between" align="center">
        <Flex gap="4">
          <NavbarLinks />
        </Flex>
        <UserAvatar />
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

const UserAvatar = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="2rem" />;

  return (
    <>
      {session && status === "authenticated" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div>
              <UserImage
                props={{
                  image: session.user?.image,
                  size: "4",
                  width: 48,
                  height: 48,
                }}
              />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Label>{session.user?.name}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link
                href={`/profile/${
                  session?.user.role === "RECRUITER" ? "recruiters" : "users"
                }/${session?.user?.id}`}
              >
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              style={{ cursor: "pointer" }}
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link href="/auth/signin">Login</Link>
      )}
    </>
  );
};

export default Navbar;
