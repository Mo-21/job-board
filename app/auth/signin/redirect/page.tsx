"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";

const SignInRedirection = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session.user.accountComplete === false) {
        router.push(`/profile/edit/${session.user.id}`);
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);

  return (
    <div>
      {status === "loading" && (
        <FidgetSpinner
          visible={true}
          backgroundColor="#0090FF"
          ballColors={["#15C757", "#00ff00", "#0000ff"]}
          height="200"
          width="200"
          ariaLabel="fidget-spinner-loading"
        />
      )}
    </div>
  );
};

export default SignInRedirection;
