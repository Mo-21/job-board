import DateFormatted from "@/app/components/DateFormatted";
import LevelBadge from "@/app/components/LevelBadge";
import { SkillBadge } from "@/app/components/SkillBadge";
import { Job } from "@prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <>
      {jobs.map((job) => (
        <Card key={job.id} className="p-2 max-w-sm min-w-full col-span-auto">
          <Flex direction="column" gap="3" align="start">
            <Link href={`/jobs/${job.id}`}>
              <Heading>{job.title}</Heading>
            </Link>
            <LevelBadge level={job.level} />
            <SkillBadge job={job} />
            <Text>{job.qualifications}</Text>
            <DateFormatted date={job.createdAt} />
          </Flex>
        </Card>
      ))}
    </>
  );
};

export default JobList;
