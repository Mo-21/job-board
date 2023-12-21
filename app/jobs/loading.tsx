import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobsPageLoading = () => {
  const jobs = [1, 2, 3, 4, 5, 6];
  return (
    <Grid
      columns={{
        initial: "1",
        sm: "2",
        md: "3",
        lg: "4",
        xl: "5",
      }}
      p="4"
      gap="4"
    >
      {jobs.map((job) => (
        <Card key={job} className="p-2 max-w-sm">
          <Flex direction="column" gap="3" align="start">
            <Heading>
              <Skeleton width="20rem" />
            </Heading>
            <Skeleton width="10rem" />
            <Skeleton width="10rem" />
            <Text>
              <Skeleton count={3} width="20rem" />
            </Text>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};

export default JobsPageLoading;
