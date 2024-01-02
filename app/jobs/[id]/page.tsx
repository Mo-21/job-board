import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import NotFoundJobPage from "./not-found";
import LevelBadge from "@/app/components/LevelBadge";
import DateFormatted from "@/app/components/DateFormatted";
import { DownloadIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import UserImage from "@/app/components/UserImage";

interface Props {
  params: {
    id: string;
  };
}

const JobDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      PostedBy: {
        where: {
          id: session?.user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

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
          <Text>{job.qualifications}</Text>
          <Text>{job.description}</Text>
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
