import { prisma } from "@/prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import LevelBadge from "../components/LevelBadge";
import { format } from "timeago.js";

const page = async () => {
  const jobs = await prisma.job.findMany();
  return (
    <Flex wrap="wrap">
      {jobs.map((job) => (
        <Card key={job.id} className="m-4 p-2 max-w-sm">
          <Flex direction="column" gap="3" align="start">
            <Heading>{job.title}</Heading>
            <LevelBadge level={job.level} />
            <Text>{job.description}</Text>
            <Text>{format(job.createdAt)}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default page;
