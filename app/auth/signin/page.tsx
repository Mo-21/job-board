"use client";
import Spinner from "@/app/components/Spinner";
import { GlobeIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginSkeleton from "./loading";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const handleGoogle = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/auth/signin/redirect",
    });
  };

  const handleCredentials = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/auth/signin/redirect",
      email,
      password,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const { data: session, status } = useSession();
  if (status === "loading") return <LoginSkeleton />;
  if (session || status === "unauthenticated") return null;

  return (
    <Flex justify="center" align="center" className="h-screen">
      <Card variant="classic">
        <Flex direction="column" mb="4">
          <form
            onSubmit={handleCredentials}
            className="flex flex-col gap-2 h-40 w-60"
          >
            <TextField.Root>
              <TextField.Slot>
                <GlobeIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                ref={emailRef}
                placeholder="Email"
                type="email"
                required
              />
            </TextField.Root>

            <TextField.Root>
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                ref={passwordRef}
                placeholder="Password"
                type="password"
                required
              />
            </TextField.Root>

            <Button size="3" disabled={isSubmitting} type="submit">
              {isSubmitting && <Spinner />}
              Sign in
            </Button>
          </form>
        </Flex>

        <Flex gap="2" justify="center" align="center">
          <Button
            size="3"
            color="green"
            variant="surface"
            onClick={handleGoogle}
          >
            <FcGoogle />
            Sign in with Google
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
