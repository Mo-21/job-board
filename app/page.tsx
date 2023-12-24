"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();

  // if (status === "unauthenticated") return null;

  // if(session?.user)
  console.log(session);

  return <h1>Home</h1>;
}
