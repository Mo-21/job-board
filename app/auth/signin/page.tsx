"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleClick = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/auth/signin/redirect",
    });
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
