"use client";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "@/app/styles/ProfileForm.module.css";
import ProfileCompletionForm from "./_components/profileCompletionForm";
import { notFound } from "next/navigation";

interface Props {
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
              : ""}{" "}
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

const ProgressBar = ({ page, pageCount }: Props) => {
  return (
    <Box className={styles.progress_bar}>
      <Box
        className={styles.progress}
        style={{
          width: `${(page / pageCount) * 100}%`,
          borderRadius: page === pageCount ? "5px" : "5px 0 0 5px",
        }}
      />
    </Box>
  );
};

const Action = ({ page, pageCount, setPage }: Props) => {
  return (
    <>
      <Box className={styles.buttons}>
        {page <= pageCount && page > 1 && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page - 1);
            }}
            variant="solid"
            color="blue"
            className={styles.previous_button}
          >
            Previous
          </Button>
        )}

        <Box className={styles.page_counter}>
          <Text className={styles.pages}>
            {page} of {pageCount}
          </Text>
        </Box>

        {page < pageCount && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page + 1);
            }}
            variant="solid"
            color="blue"
            className={styles.next_button}
          >
            Next
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProfileCompletion;
