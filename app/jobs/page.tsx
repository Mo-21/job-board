import { prisma } from "@/prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import LevelBadge from "../components/LevelBadge";
import DateFormatted from "../components/DateFormatted";
import Link from "next/link";
import { Job } from "@prisma/client";

const page = async () => {
  const jobs = await prisma.job.findMany();
  return (
    <Flex wrap="wrap">
      {jobs.map((job) => (
        <Card key={job.id} className="m-4 p-2 max-w-sm">
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
    </Flex>
  );
};

const SkillBadge = ({ job }: { job: Job }) => {
  return (
    <Flex gap="1" wrap="wrap">
      {job.skills.map((skill) => (
        <Badge variant="outline" key={skill}>
          {skill}
        </Badge>
      ))}
    </Flex>
  );
};

export default page;
