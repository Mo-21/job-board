"use client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useApply from "../services/applyForJob";
import UploadResume from "./UploadResume";

const ApplyButton = ({ jobId }: { jobId: string | undefined }) => {
  const [isShown, setIsShown] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean>();
  const [data, setData] = useState<{ userId: string; resumeId: string }>();

  const { applyForJob, status: resStatus } = useApply(jobId);

  useEffect(() => {
    if (data) applyForJob(data);
    console.log(resStatus);
    if (resStatus === 201) setIsApplied(true);
  }, [isApplied, setIsApplied, applyForJob, resStatus, data]);

  return (
    <>
      {isShown && <UploadResume setData={setData} />}
      <Button
        disabled={isApplied}
        onClick={() => setIsShown(true)}
        color="green"
      >
        <Flex align="center" gap="4">
          <PaperPlaneIcon />
          <Box>Apply</Box>
        </Flex>
      </Button>
    </>
  );
};

export default ApplyButton;
