"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ErrorCallout from "./components/ErrorCallout";
import { Link } from "@radix-ui/themes";

export default function Home() {
  const { status, data: session } = useSession();
  const [callout, setCallout] = useState(false);

  useEffect(() => {
    if (session?.user && session?.user?.accountComplete === false)
      setCallout(true);
  }, [session]);

  if (status === "unauthenticated") return null;

  return (
    <>
      {callout && (
        <div className="px-5 py-3">
          <ErrorCallout>
            {`Hello ${session?.user?.name?.split(
              " ",
              1
            )}, please update your profile to start applying for jobs. You can update it from`}{" "}
            <Link href="/profile">here</Link>
          </ErrorCallout>
        </div>
      )}
      <h1>Home</h1>
    </>
  );
}
