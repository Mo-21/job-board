import UserImage from "@/app/components/UserImage";
import { Job, User } from "@prisma/client";
import { PaperPlaneIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Flex, Card, Heading, Button, Box } from "@radix-ui/themes";
import React from "react";
import ActionButtons from "./ActionButtons";

interface JobWithRecruiter extends Job {
  PostedBy: {
    image: string | null;
    id: string;
    name: string;
    email: string;
  } | null;
}

const JobActions = ({ job }: { job: JobWithRecruiter }) => {
  return (
    <Flex justify="center" gap="3" direction="column">
      <Card>
        <Heading size="5" mb="5">
          Recruiter:
        </Heading>
        <Flex direction="column" gap="3" align="center">
          <UserImage
            props={{ image: job.PostedBy?.image, width: 130, height: 130 }}
          />
          <Heading size="5">{job.PostedBy?.name}</Heading>
        </Flex>
        <ActionButtons jobId={job.id} recruiterId={job.PostedBy?.id} />
      </Card>
    </Flex>
  );
};

export default JobActions;
