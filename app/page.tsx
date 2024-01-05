"use client";
import { useSession } from "next-auth/react";
import { Watch } from "react-loader-spinner";
import RecruiterDashboard from "./RecruiterDashboard";
import UserDashboard from "./UserDashboard";

export default function Home() {
  const { status, data: session } = useSession();

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
      {session ? (
        session?.user.role === "RECRUITER" ? (
          <RecruiterDashboard />
        ) : (
          <UserDashboard />
        )
      ) : (
        ""
      )}
    </>
  );
}
