import DateFormatted from "@/app/components/DateFormatted";
import LevelBadge from "@/app/components/LevelBadge";
import { SkillBadge } from "@/app/components/SkillBadge";
import { Job } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const JobDetails = ({ job }: { job: Job }) => {
  return (
    <Card className="md:col-span-3">
      <Flex p="2" gap="2" align="center" direction="column">
        <Heading>{job.title}</Heading>
        <LevelBadge level={job.level} />
        <SkillBadge job={job} />
        <Text>
          {job.company} - {job.location}
        </Text>
        <DateFormatted date={job.createdAt} />
        <ReactMarkdown>{job.description}</ReactMarkdown>
        <ReactMarkdown>{job.qualifications}</ReactMarkdown>
      </Flex>
    </Card>
  );
};

export default JobDetails;
