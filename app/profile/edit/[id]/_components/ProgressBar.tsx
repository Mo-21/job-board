import { Box } from "@radix-ui/themes";
import { Props } from "../page";
import styles from "@/app/styles/ProfileForm.module.css";

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

export default ProgressBar;
