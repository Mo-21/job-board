"use client";
import styles from "@/app/styles/ProfileForm.module.css";
import { roleSelection } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "react-loader-spinner";
import Action from "./_components/ActionToolbar";
import ProfileCompletionForm from "./_components/ProfileCompletionForm";
import ProgressBar from "./_components/ProgressBar";

export interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
  session?: Session | undefined | null;
}

const ProfileCompletion = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>();
  const { data: session, status } = useSession();

  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ role: "RECRUITER" | "JOB_SEEKER" }>({
    resolver: zodResolver(roleSelection),
    mode: "onChange",
  });

  const value = watch("role");

  useEffect(() => {
    setPageCount(value === "JOB_SEEKER" ? 7 : value === "RECRUITER" ? 3 : 1);
  }, [value]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center mt-10">
        <MagnifyingGlass
          visible={true}
          height="150"
          width="150"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  } else if (params.id !== session?.user.id) {
    return "Not Authorized";
  }

  return (
    <Box className={styles.profile_container}>
      <Box className={styles.components_wrapper}>
        <Box className={styles.wrapper}>
          <ProgressBar page={page} pageCount={pageCount!} />
          <Heading size="8" mb="4">
            Welcome
            {session?.user?.name
              ? ` ${session?.user?.name?.split(" ", 1)}!`
              : ""}
            👋
          </Heading>
          <ProfileCompletionForm
            page={page}
            value={value}
            setRoleValue={setValue}
            roleErrors={errors}
          />
          <Action page={page} pageCount={pageCount!} setPage={setPage} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCompletion;
