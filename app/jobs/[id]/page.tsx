import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { cache } from "react";
import JobActions from "./JobActions";
import JobDetails from "./JobDetails";
import SimilarJobs from "./SimilarJobs";
import NotFoundJobPage from "./not-found";

interface Props {
  params: {
    id: string;
  };
}

const fetchJob = cache((jobId: string, recruiterId: string | undefined) =>
  prisma.job.findUnique({
    where: { id: jobId },
    include: {
      PostedBy: {
        where: {
          id: recruiterId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
);

const JobDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const job = await fetchJob(params.id, session?.user.id);

  if (!job) return <NotFoundJobPage />;

  return (
    <Grid gap="3" columns={{ initial: "1", sm: "4" }} p="4">
      <Flex className="col-span-3" direction="column">
        <JobDetails job={job} />
        {session?.user.role === "JOB_SEEKER" ? (
          <SimilarJobs job={job} />
        ) : (
          <div>Hello Recruiter</div>
        )}
      </Flex>
      <Flex className="col-span-1" direction="column">
        <JobActions job={job} />
      </Flex>
    </Grid>
  );
};

export default JobDetailsPage;
