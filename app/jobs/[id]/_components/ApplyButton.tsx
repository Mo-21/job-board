"use client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import UploadResume from "./UploadResume";

const ApplyButton = ({ jobId }: { jobId: string | undefined }) => {
  const [isShown, setIsShown] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean>();

  return (
    <>
      {isShown && <UploadResume jobId={jobId} setIsApplied={setIsApplied} />}
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
