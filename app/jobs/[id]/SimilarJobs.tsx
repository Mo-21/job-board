import { prisma } from "@/prisma/client";
import { Job } from "@prisma/client";
import React from "react";
import JobList from "../_components/JobList";
import { Flex, Heading, Grid } from "@radix-ui/themes";

const SimilarJobs = async ({ job }: { job: Job }) => {
  const similarJobsLevel: Job[] = await prisma.job.findMany({
    where: { level: job.level, NOT: { id: job.id } },
  });

  const similarJobsSkills = await Promise.all(
    job.skills.map(async (skill) => {
      return await prisma.job.findMany({
        where: {
          skills: { has: skill },
          NOT: { id: job.id },
        },
      });
    })
  );

  const selectedJobIds = new Set();

  const uniqueJobs = similarJobsSkills.flat().filter((job) => {
    if (!selectedJobIds.has(job.id)) {
      selectedJobIds.add(job.id);
      return true;
    }
    return false;
  });

  return (
    <Grid mt="3" columns={{ initial: "1" }} rows="2" p="4" gap="7">
      <Flex direction="column" justify="center" gap="3">
        <Heading>Similar jobs based on level</Heading>
        <Flex className="overflow-x-auto" gap="3">
          <JobList jobs={similarJobsLevel} />
        </Flex>
      </Flex>

      <Flex direction="column" justify="center" gap="3">
        <Heading>Similar jobs based on Skills</Heading>
        <Flex className="overflow-x-auto" gap="3">
          <JobList jobs={uniqueJobs} />
        </Flex>
      </Flex>
    </Grid>
  );
};

export default SimilarJobs;
