import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { cache } from "react";
import JobDetails from "./_components/JobDetails";
import SimilarJobs from "./_components/SimilarJobs";
import NotFoundJobPage from "./not-found";
import UserImage from "@/app/components/UserImage";
import ActionButtons from "./_components/ActionButtons";

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
      {session && (
        <Flex className="col-span-1" direction="column">
          <Heading size="5" mb="5">
            Recruiter:
          </Heading>
          <Flex direction="column" gap="3" align="center">
            <UserImage props={{ image: job.PostedBy?.image, width: 130, height: 130 }} />
            <Heading size="5">{job.PostedBy?.name}</Heading>
          </Flex>
          <ActionButtons jobId={job.id} recruiterId={job?.recruiterId} />
        </Flex>
      )}
    </Grid>
  );
};

export default JobDetailsPage;
