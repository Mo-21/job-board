import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import JobList from "./_components/JobList";
import Toolbar from "./_components/Toolbar";
import { Level } from "@prisma/client";

interface IssuesPageProps {
  searchParams: {
    level: Level;
  };
}

const page = async ({ searchParams }: IssuesPageProps) => {
  const level = Object.values(Level).includes(searchParams.level)
    ? searchParams.level
    : undefined;

  const jobs = await prisma.job.findMany({
    where: {
      level,
    },
  });

  return (
    <Flex direction="column" gap="2">
      <Toolbar />
      <Grid
        columns={{ initial: "1", sm: "2", md: "3", lg: "4", xl: "5" }}
        rows={{ initial: "3" }}
        p="4"
        gap="4"
      >
        <JobList jobs={jobs} />
      </Grid>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default page;
