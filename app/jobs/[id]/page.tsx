import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { cache } from "react";
import JobDetails from "./_components/JobDetails";
import SimilarJobs from "./_components/SimilarJobs";
import NotFoundJobPage from "./not-found";
import UserImage from "@/app/components/UserImage";
import ActionButtons from "./_components/ActionButtons";
import ApplicationsReceived from "./_components/ApplicationsReceived";

interface Props {
  params: {
    id: string;
  };
}

const fetchJob = cache((jobId: string) =>
  prisma.job.findUnique({
    where: { id: jobId },
  })
);

const JobDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const job = await fetchJob(params.id);

  if (!job) return <NotFoundJobPage />;

  if (!job.recruiterId) return <div>Sorry</div>;

  const recruiter = await prisma.user.findUnique({
    where: {
      id: job.recruiterId,
    },
  });

  return (
    <Grid gap="3" columns={{ initial: "1", sm: "4" }} p="4">
      <Flex className="col-span-3" direction="column">
        <JobDetails job={job} />
        {session?.user.role === "JOB_SEEKER" ? (
          <SimilarJobs job={job} />
        ) : session?.user.role === "RECRUITER" ? (
          <ApplicationsReceived job={job} />
        ) : (
          ""
        )}
      </Flex>

      <Flex className="col-span-1" direction="column">
        <Flex direction="column" gap="3" align="center">
          <UserImage
            props={{ image: recruiter?.image, width: 130, height: 130 }}
          />
          <Heading size="5">{recruiter?.name}</Heading>
        </Flex>
        {session ? (
          <ActionButtons job={job} recruiterId={job?.recruiterId} />
        ) : (
          <Box className="flex justify-center align-middle mt-5">
            <Text weight="bold">Login to apply</Text>
          </Box>
        )}
      </Flex>
    </Grid>
  );
};

export default JobDetailsPage;
