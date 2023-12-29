"use client";

import { Box, Button, Text } from "@radix-ui/themes";
import styles from "@/app/styles/ProfileForm.module.css";
import { Props } from "../page";

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

export default Action;
