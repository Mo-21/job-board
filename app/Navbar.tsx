"use client";
import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPersonCheckFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
            {session.user?.image?.startsWith("https") ? (
              <Avatar
                src={session?.user?.image!}
                fallback="?"
                variant="soft"
                radius="full"
                size="4"
                alt="user-image"
                className="cursor-pointer"
              />
            ) : (
              <CldImage
                width={48}
                height={48}
                crop="fill"
                className="rounded-full cursor-pointer"
                src={session.user?.image!}
                alt="user-image"
              />
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Label>{session.user?.name}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </>
  );
};

export default Navbar;
