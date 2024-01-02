import authOptions from "@/app/auth/authOptions";
import {
  PaperPlaneIcon,
  DownloadIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth/next";
import React from "react";
import NotFoundJobPage from "./not-found";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface Props {
  recruiterId: string | undefined;
  jobId: string | undefined;
}

const ActionButtons = async ({ recruiterId, jobId }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return <NotFoundJobPage />;

  return (
    <Flex direction="column" gap="2" mt="3">
      {session.user.role === "JOB_SEEKER" ? (
        <>
          <Button color="green">
            <Flex align="center" gap="4">
              <PaperPlaneIcon />
              <Box>Apply</Box>
            </Flex>
          </Button>
          <Button color="purple">
            <Flex align="center" gap="2">
              <DownloadIcon />
              <Box>Save</Box>
            </Flex>
          </Button>
        </>
      ) : session.user.role === "RECRUITER" ? (
        <>
          <EditButton
            jobId={jobId}
            recruiterId={recruiterId}
            session={session}
          />
          <DeleteButton
            jobId={jobId}
            recruiterId={recruiterId}
            session={session}
          />
        </>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default ActionButtons;
