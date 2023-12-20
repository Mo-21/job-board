import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import LevelBadge from "../components/LevelBadge";
import DateFormatted from "../components/DateFormatted";
import Link from "next/link";

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
            <Text>{job.qualifications}</Text>
            <DateFormatted date={job.createdAt} />
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default page;
