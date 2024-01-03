import { prisma } from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import JobList from "./_components/JobList";

const page = async () => {
  const jobs = await prisma.job.findMany();

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
      <JobList jobs={jobs} />
    </Grid>
  );
};

export default page;
