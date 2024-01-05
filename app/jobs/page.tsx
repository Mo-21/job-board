import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import JobList from "./_components/JobList";
import Toolbar from "./_components/Toolbar";
import { Job, Level } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export interface IssuesPageProps {
  searchParams: {
    level: Level;
    orderBy: keyof Job;
    orderDirection: "asc" | "desc";
  };
}

const page = async ({ searchParams }: IssuesPageProps) => {
  const session = await getServerSession(authOptions);

  const level = Object.values(Level).includes(searchParams.level)
    ? searchParams.level
    : undefined;

  const orderBy = columnValue.includes(searchParams.orderBy)
    ? searchParams.orderBy === "createdAt"
      ? { createdAt: searchParams.orderDirection }
      : { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

  let jobs = await prisma.job.findMany({
    where: {
      level,
    },
    orderBy,
  });

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (searchParams.orderBy === "skills")
    jobs = jobs.sort((a, b) => {
      const matchingSkillsA = a.skills.filter((skill) =>
        currentUser?.skills.includes(skill)
      ).length;
      const matchingSkillsB = b.skills.filter((skill) =>
        currentUser?.skills.includes(skill)
      ).length;

      return matchingSkillsB - matchingSkillsA;
    });

  return (
    <Flex direction="column" gap="2">
      <Toolbar searchParams={searchParams} />
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

const columns: { label: string; value: keyof Job }[] = [
  { label: "Sort", value: "createdAt" },
  { label: "Relevance", value: "skills" },
];

const columnValue = columns.map((column) => column.value);

export const dynamic = "force-dynamic";

export default page;
