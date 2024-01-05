"use client";
import { Flex, Card, Button, Heading, Container, Grid } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import ErrorCallout from "./components/ErrorCallout";
import Link from "next/link";
import { useJobs } from "./services/useJobs";
import JobList from "./components/JobList";

const RecruiterDashboard = () => {
  const { data: session } = useSession();

  const { data } = useJobs();

  console.log(data);

  return (
    <>
      {session?.user.accountComplete === false && (
        <div className="px-5 py-3">
          <ErrorCallout>
            {`Hello ${session?.user?.name?.split(
              " ",
              1
            )}, please update your profile to start applying for jobs. You can update it from`}{" "}
            <Link href={`/users/profile/edit/${session?.user?.id!}`}>here</Link>
          </ErrorCallout>
        </div>
      )}
      <Container>
        <Grid
          columns={{ initial: "1", sm: "3" }}
          p="4"
          gap="4"
          rows={{ initial: "1", sm: "3" }}
        >
          <Card className="md:col-span-1"></Card>
          <Card className="md:col-span-1">
            <Heading mb="3">Your Jobs</Heading>
            {data ? <JobList jobs={data} /> : "No Jobs Posted"}
          </Card>
          <Card className="md:col-span-1">
            <Heading>Actions</Heading>
            <Flex mt="3" justify="center" align="center">
              <Button color="blue">
                <Link href="/jobs/create">Create a job</Link>
              </Button>
            </Flex>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default RecruiterDashboard;
