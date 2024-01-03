import UserImage from "@/app/components/UserImage";
import { Job } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
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
