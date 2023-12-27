"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ErrorCallout from "./components/ErrorCallout";
import { Link } from "@radix-ui/themes";
import { Watch } from "react-loader-spinner";

export default function Home() {
  const { status, data: session } = useSession();
  const [callout, setCallout] = useState(false);

  useEffect(() => {
    if (session?.user && session?.user?.accountComplete === false)
      setCallout(true);
  }, [session]);

  if (status === "unauthenticated") {
    return null;
  } else if (status === "loading") {
    return (
      <div className="flex justify-center mt-8">
        <Watch
          color="#0090FF"
          width="100"
          height="100"
          radius="48"
          ariaLabel="watch-loading"
        />
      </div>
    );
  }

  return (
    <>
      {callout && (
        <div className="px-5 py-3">
          <ErrorCallout>
            {`Hello ${session?.user?.name?.split(
              " ",
              1
            )}, please update your profile to start applying for jobs. You can update it from`}{" "}
            <Link href={`/profile/edit/${session?.user?.id!}`}>here</Link>
          </ErrorCallout>
        </div>
      )}
      <h1>Home</h1>
    </>
  );
}
