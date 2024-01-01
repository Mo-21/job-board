"use client";
import { Button, Card, Heading, Flex } from "@radix-ui/themes";
import styles from "@/app/styles/RegisterPage.module.css";
import { SubmitHandler, UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormType, registerSchema, validatePasswords } from "../../validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import ErrorCallout from "../../components/ErrorCallout";
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import defaultImage from "@/public/default.png";
import Image from "next/image";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<Boolean>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegistrationFormType> = async (data, e) => {
    setIsLoading(true);
    e?.preventDefault();
    if (validatePasswords(data) === false) {
      setPasswordMatch(false);
      return;
    } else {
      try {
        setPasswordMatch(true);
        await axios
          .post("/api/register", data)
          .catch((err) => {
            toast.error(err.response.data.error);
          })
          .finally(() => {
            setIsLoading(false);
          });
        router.push("/api/auth/signin");
      } catch (error) {
        throw new Error("Something went wrong! Please try again.");
      }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-rows-auto grid-cols-2"
        >
          <UploadPage register={register} setValue={setValue} />
          <div className="flex flex-col justify-center w-auto col-start-2">
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

            <input
              placeholder="Email"
              className={inputClass}
              type="email"
              required
              {...register("email")}
            />
            {errors.email && (
              <ErrorCallout>{errors.email.message}</ErrorCallout>
            )}

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

            {passwordMatch === false && (
              <ErrorCallout>{"Passwords do not match"}</ErrorCallout>
            )}
          </div>

          <Button
            className="col-span-2"
            disabled={isLoading}
            type="submit"
            size="4"
          >
            {isLoading && <Spinner />}
            Join
          </Button>
        </form>
      </Card>
      <Toaster />
    </Flex>
  );
};

interface CloudinaryResult {
  public_id: string;
}

interface UploadPageProps {
  register: UseFormRegister<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    image?: string | null | undefined;
  }>;
  setValue: UseFormSetValue<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    image?: string | null | undefined;
  }>;
}

const UploadPage = ({ register, setValue }: UploadPageProps) => {
  const [publicId, setPublicId] = useState("");

  return (
    <div>
      {publicId ? (
        <CldImage
          crop="fill"
          src={publicId}
          width={120}
          height={120}
          alt="image"
        />
      ) : (
        <Image width={120} src={defaultImage} alt="image" />
      )}

      <CldUploadWidget
        uploadPreset="j5wl1xz7"
        onUpload={(result, widget) => {
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          setValue("image", info.public_id);
        }}
        options={{
          sources: ["local"],
          maxFiles: 1,
          multiple: false,
          cropping: true,
          croppingAspectRatio: 1,
          showSkipCropButton: false,
        }}
      >
        {({ open }) => (
          <Button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            my="3"
            size="3"
            color="green"
          >
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default Register;
