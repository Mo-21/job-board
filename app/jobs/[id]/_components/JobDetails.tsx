import DateFormatted from "@/app/components/DateFormatted";
import LevelBadge from "@/app/components/LevelBadge";
import { SkillBadge } from "@/app/components/SkillBadge";
import { Job } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const JobDetails = ({ job }: { job: Job }) => {
  return (
    <Card className="md:col-span-3">
      <Flex p="2" gap="2" direction="column">
        <Heading>{job.title}</Heading>
        <Flex>
          <LevelBadge level={job.level} />
        </Flex>
        <SkillBadge job={job} />
        <Flex justify="between">
          <Text className="font-medium">
            {job.company} - {job.location}
          </Text>
          <DateFormatted date={job.createdAt} />
        </Flex>
        <Box className="prose max-w-full mt-3">
          <Heading size="4">Description:</Heading>
          <ReactMarkdown>{job.description}</ReactMarkdown>

          <Heading size="4">Qualifications:</Heading>
          <ReactMarkdown>{job.qualifications}</ReactMarkdown>
        </Box>
      </Flex>
    </Card>
  );
};

export default JobDetails;
