"use client";
import { Button, Card, Heading, Flex } from "@radix-ui/themes";
import styles from "../styles/RegisterPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormType, registerSchema } from "../validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";
import ErrorCallout from "../components/ErrorCallout";
import { useState } from "react";
import { set } from "zod";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const handleFormSubmission: SubmitHandler<RegistrationFormType> = async (
    data,
    e
  ) => {
    e?.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .post("/api/register", data)
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
      toast.success("Account created successfully");
      router.push("/api/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3";

  return (
    <Flex
      style={{ height: "80vh" }}
      direction="column"
      justify="center"
      align="center"
    >
      <Card variant="surface" color="indigo" className={styles.card}>
        <Heading mb="3">Register</Heading>
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <div className="flex gap-3 w-auto">
            <input
              placeholder="First Name"
              className={inputClass}
              type="text"
              required
              {...register("firstName")}
            />
            {errors.firstName && (
              <ErrorCallout>{errors.firstName.message}</ErrorCallout>
            )}

            <input
              placeholder="Last Name"
              className={inputClass}
              type="text"
              required
              {...register("lastName")}
            />
            {errors.lastName && (
              <ErrorCallout>{errors.lastName.message}</ErrorCallout>
            )}
          </div>
          <input
            placeholder="Email"
            className={inputClass}
            type="email"
            required
            {...register("email")}
          />
          {errors.email && <ErrorCallout>{errors.email.message}</ErrorCallout>}

          <input
            placeholder="Password"
            className={inputClass}
            type="password"
            required
            {...register("password")}
          />
          {errors.password && (
            <ErrorCallout>{errors.password.message}</ErrorCallout>
          )}

          <input
            placeholder="Repeat Password"
            className={inputClass}
            type="password"
            required
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <ErrorCallout>{errors.passwordConfirmation.message}</ErrorCallout>
          )}

          <Button disabled={isLoading} size="3">
            {isLoading && <Spinner />}
            Join
          </Button>
        </form>
      </Card>
      <Toaster />
    </Flex>
  );
};

export default Register;
