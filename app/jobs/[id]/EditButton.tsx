"use client";
import Spinner from "@/app/components/Spinner";
import { TrashIcon } from "@radix-ui/react-icons";
import { Heading, Button, Flex, Box } from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  session: Session;
  recruiterId: string | undefined;
  jobId: string | undefined;
}

const EditButton = ({ session, recruiterId, jobId }: Props) => {
  if (session.user.id !== recruiterId) return <Heading>Not Authorized</Heading>;

  return (
    <Button color="blue">
      <Link href={`/jobs/create/${jobId}`}>
        <Flex align="center" gap="2">
          <TrashIcon />
          <Box>Edit</Box>
        </Flex>
      </Link>
    </Button>
  );
};

export default EditButton;
