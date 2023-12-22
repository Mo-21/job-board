"use client";
import { useEffect, useState } from "react";
import styles from "../styles/ProfileForm.module.css";
import classNames from "classnames";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  TextField,
  Text,
} from "@radix-ui/themes";

interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
}

const ProfileCreation = () => {
  const [page, setPage] = useState(1);
  const pageCount = 3;

  return (
    <Box className={styles.profile_container}>
      <Box className={styles.components_wrapper}>
        <Box className={styles.wrapper}>
          <ProgressBar page={page} pageCount={pageCount} />
          <ProfileFormPages
            page={page}
            pageCount={pageCount}
            setPage={setPage}
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

const ProfileFormPages = ({ page }: Props) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Card
      className={classNames({
        [styles.page_container]: true,
        [styles.active]: currentPage === page,
      })}
    >
      <form className={styles.form_group}>
        <Box className={styles.input_container}>
          {currentPage === 1 && (
            <>
              <Heading>Personal Information</Heading>
              <TextField.Root>
                <TextField.Input
                  type="text"
                  placeholder="Name"
                  className={styles.input}
                />
                <TextField.Input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                />
              </TextField.Root>
            </>
          )}

          {currentPage === 2 && (
            <>
              <Heading>Academic History</Heading>
              <TextField.Root>
                <TextField.Input
                  type="text"
                  placeholder="Uni"
                  className="input"
                />
                <TextField.Input
                  type="text"
                  placeholder="Degree"
                  className={styles.input}
                />
              </TextField.Root>
            </>
          )}

          {currentPage === 3 && (
            <Flex gap="3">
              <Heading>Links</Heading>
              <TextField.Root>
                <TextField.Input
                  color="blue"
                  type="text"
                  placeholder="LinkedIn"
                />
              </TextField.Root>
              <TextField.Root>
                <TextField.Input
                  color="blue"
                  type="text"
                  placeholder="LinkedIn"
                />
              </TextField.Root>
            </Flex>
          )}
        </Box>
      </form>
    </Card>
  );
};

const Action = ({ page, pageCount, setPage }: Props) => {
  return (
    <>
      <Box className={styles.buttons}>
        {page < pageCount && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page + 1);
            }}
            variant="solid"
            className={styles.next_button}
          >
            Next
          </Button>
        )}
        <Box className={styles.page_counter}>
          <Text className={styles.pages}>
            {page} of {pageCount}
          </Text>
        </Box>
        {page <= pageCount && page > 1 && (
          <Button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page - 1);
            }}
            variant="solid"
            className={styles.previous_button}
          >
            Previous
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProfileCreation;
