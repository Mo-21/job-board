"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";

interface Props {
  session: Session;
  recruiterId: string | null;
  jobId: string | undefined;
}

const EditButton = ({ session, recruiterId, jobId }: Props) => {
  if (session.user.id !== recruiterId) return <Heading>Not Authorized</Heading>;

  return (
    <Button color="blue">
      <Link href={`/jobs/edit/${jobId}`}>
        <Flex align="center" gap="2">
          <TrashIcon />
          <Box>Edit</Box>
        </Flex>
      </Link>
    </Button>
  );
};

export default EditButton;
