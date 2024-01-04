import authOptions from "@/app/auth/authOptions";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth/next";
import ApplyButton from "./ApplyButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import NotFoundJobPage from "../not-found";

interface Props {
  recruiterId: string | null;
  jobId: string | undefined;
}

const ActionButtons = async ({ recruiterId, jobId }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return <NotFoundJobPage />;

  return (
    <Flex direction="column" gap="2" mt="3">
      {session.user.role === "JOB_SEEKER" ? (
        <>
          <ApplyButton jobId={jobId} />
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
