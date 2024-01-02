import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React, { cache } from "react";
import NotFoundJobPage from "./not-found";
import LevelBadge from "@/app/components/LevelBadge";
import DateFormatted from "@/app/components/DateFormatted";
import { DownloadIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import UserImage from "@/app/components/UserImage";
import ReactMarkdown from "react-markdown";
import authOptions from "@/app/auth/authOptions";

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
    <Grid
      columns={{
        initial: "1",
        sm: "4",
      }}
      p="4"
      gap="4"
    >
      <Card className="md:col-span-3">
        <Flex p="2" gap="2" align="center" direction="column">
          <Heading>{job.title}</Heading>
          <LevelBadge level={job.level} />
          <Text>
            {job.company} - {job.location}
          </Text>
          <DateFormatted date={job.createdAt} />
          <ReactMarkdown>{job.description}</ReactMarkdown>
          <ReactMarkdown>{job.qualifications}</ReactMarkdown>
        </Flex>
      </Card>
      <Flex justify="center" gap="3" direction="column">
        <Card>
          <Heading size="5" mb="5">
            Recruiter:
          </Heading>
          <Flex direction="column" gap="3" align="center">
            <UserImage
              props={{ image: job.PostedBy?.image, width: 130, height: 130 }}
            />
            <Heading size="5">{job.PostedBy?.name}</Heading>
          </Flex>
        </Card>
        <Button>
          <Flex align="center" gap="4">
            <PaperPlaneIcon />
            <Box>Apply</Box>
          </Flex>
        </Button>
        <Button color="purple">
          <Flex align="center" gap="2">
            <DownloadIcon />
            <Box>Save</Box>
          </Flex>
        </Button>
      </Flex>
    </Grid>
  );
};

export default JobDetailsPage;
