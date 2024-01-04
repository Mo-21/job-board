import { prisma } from "@/prisma/client";
import { Job, User } from "@prisma/client";
import { Flex, Heading, Card, Text, Grid, Link } from "@radix-ui/themes";
import NextLink from "next/link";

const ApplicationsReceived = async ({ job }: { job: Job }) => {
  const applicationsReceived = await prisma.user.findMany({
    where: { id: { in: job.usersId } },
  });

  return (
    <Grid mt="3" columns={{ initial: "1" }} rows="2" p="4" gap="7">
      <Flex direction="column" justify="center" gap="3">
        <Heading>Applications Received</Heading>
        <Flex className="overflow-x-auto" gap="3">
          <CandidatesList users={applicationsReceived} />
        </Flex>
      </Flex>
    </Grid>
  );
};

const CandidatesList = ({ users }: { users: User[] }) => {
  return (
    <>
      {users.map((user) => (
        <Card key={user.id} className="p-2 max-w-sm min-w-full col-span-auto">
          <Flex direction="column" gap="3" align="start">
            <NextLink href={`/profile/users/${user.id}`}>
              <Heading>{user.name}</Heading>
            </NextLink>
            <Text>Bio: {user.bio}</Text>
            <Link href={`https://ucarecdn.com/${user.resume}/`}>Resume</Link>
          </Flex>
        </Card>
      ))}
    </>
  );
};

export default ApplicationsReceived;
