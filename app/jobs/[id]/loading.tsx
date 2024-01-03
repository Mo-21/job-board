import { Flex, Grid, Card } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobDetailsLoading = () => {
  return (
    <Grid gap="3" columns={{ initial: "1", sm: "4" }} p="4">
      <Flex className="col-span-3" direction="column" gap="3">
        <Skeleton width="40rem" count={5} />
        <Skeleton width="40rem" height="30rem" />
      </Flex>
      <Flex align="start" direction="column">
        <Flex justify="center" gap="3" direction="column">
          <Skeleton width="20rem" count={5} />
        </Flex>
      </Flex>
    </Grid>
  );
};

export default JobDetailsLoading;
