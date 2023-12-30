"use client";
import styles from "@/app/styles/ProfileForm.module.css";
import { Box, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Action from "./_components/ActionToolbar";
import ProgressBar from "./_components/ProgressBar";
import ProfileCompletionForm from "./_components/profileCompletionForm";
import { MagnifyingGlass } from "react-loader-spinner";
import { notFound, useSearchParams } from "next/navigation";

export interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
  session?: Session | undefined | null;
}

const ProfileCompletion = ({ params }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  const queryParams = useSearchParams();

  const pageCount = parseInt(queryParams.get("pageCount")!);
  if (pageCount !== 6 && pageCount !== 2) return notFound();

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