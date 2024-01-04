"use client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useApply from "../services/applyForJob";
import UploadResume from "./UploadResume";
import { Job } from "@prisma/client";
import { useSession } from "next-auth/react";

const ApplyButton = ({ job }: { job: Job }) => {
  const [isShown, setIsShown] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean>();
  const [data, setData] = useState<{ userId: string; resumeId: string }>();

  const { applyForJob, status: resStatus } = useApply(job.id);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (data) applyForJob(data);
    if (resStatus === 201) setIsApplied(true);
  }, [isApplied, setIsApplied, applyForJob, resStatus, data]);

  return (
    <>
      {isShown && <UploadResume setData={setData} />}
      <Button
        disabled={
          isApplied ||
          job.usersId.includes(session?.user.id!) ||
          status === "loading"
        }
        onClick={() => setIsShown(true)}
        color="green"
      >
        <Flex align="center" gap="4">
          <PaperPlaneIcon />
          <Box>
            {job.usersId.includes(session?.user.id!)
              ? "You have already applied"
              : "Apply"}
          </Box>
        </Flex>
      </Button>
    </>
  );
};

export default ApplyButton;
