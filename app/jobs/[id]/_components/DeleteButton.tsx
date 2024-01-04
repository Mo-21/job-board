"use client";
import Spinner from "@/app/components/Spinner";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex, Box, Heading } from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  session: Session;
  recruiterId: string | null;
  jobId: string | undefined;
}

const DeleteButton = ({ session, recruiterId, jobId }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>();
  const router = useRouter();

  if (session.user.id !== recruiterId) return <Heading>Not Authorized</Heading>;

  const handleJobDeletion = async () => {
    setIsSubmitted(true);
    axios
      .delete(`/api/jobs/${jobId}`)
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsSubmitted(false);
        router.push("/jobs");
        router.refresh();
      });
  };

  return (
    <Button onClick={handleJobDeletion} disabled={isSubmitted} color="red">
      <Flex align="center" gap="2">
        {isSubmitted && <Spinner />}
        <TrashIcon />
        <Box>Delete</Box>
      </Flex>
    </Button>
  );
};

export default DeleteButton;
