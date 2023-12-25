"use client";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../styles/ProfileForm.module.css";
import ProfileCompletionForm from "./profileCompletionForm";
import Spinner from "../components/Spinner";

export interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
  session?: Session | undefined | null;
}

const ProfileCompletion = () => {
  const [page, setPage] = useState(1);
  const pageCount = 4;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: session } = useSession();

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
            pageCount={pageCount}
            page={page}
            session={session}
          />
          <Action
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
          />
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

const Action = ({
  page,
  pageCount,
  setPage,
  isSubmitted,
  setIsSubmitted,
}: Props & {
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

        {page === 4 && !isSubmitted && (
          <Button
            disabled={isSubmitted}
            color="green"
            className={styles.next_button}
            onClick={() => setIsSubmitted(true)}
          >
            {isSubmitted && <Spinner />}
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProfileCompletion;
