import { prisma } from "@/prisma/client";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import { Job } from "@prisma/client";
import DateFormatted from "@/app/components/DateFormatted";
import LevelBadge from "@/app/components/LevelBadge";

const page = async () => {
  const jobs = await prisma.job.findMany();

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "2",
        md: "3",
        lg: "4",
        xl: "5",
      }}
      p="4"
      gap="4"
    >
      {jobs.map((job) => (
        <Card key={job.id} className="p-2 max-w-sm col-span-auto">
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
    </Grid>
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
