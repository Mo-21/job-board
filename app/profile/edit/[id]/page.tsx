"use client";
import styles from "@/app/styles/ProfileForm.module.css";
import { Box, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Action from "./_components/ActionToolbar";
import ProgressBar from "./_components/ProgressBar";
import ProfileCompletionForm from "./_components/profileCompletionForm";

export interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
  session?: Session | undefined | null;
}

const ProfileCompletion = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);
  const pageCount = 5;

  const { data: session } = useSession();

  if (!session || params.id !== session?.user?.id) return "Not Authorized";

  return (
    <Box className={styles.profile_container}>
      <Box className={styles.components_wrapper}>
        <Box className={styles.wrapper}>
          <ProgressBar page={page} pageCount={pageCount} />
          <Heading size="8" mb="4" hidden={page > 1}>
            Welcome
            {session?.user?.name
              ? ` ${session?.user?.name?.split(" ", 1)}!`
              : ""}
            👋
          </Heading>
          <ProfileCompletionForm
            params={params}
            page={page}
            session={session}
          />
          <Action page={page} pageCount={pageCount} setPage={setPage} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCompletion;
