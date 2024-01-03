"use client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex, Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const ApplyButton = ({ jobId }: { jobId: string | undefined }) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/jobs/apply/${jobId}`)} color="green">
      <Flex align="center" gap="4">
        <PaperPlaneIcon />
        <Box>Apply</Box>
      </Flex>
    </Button>
  );
};

export default ApplyButton;
