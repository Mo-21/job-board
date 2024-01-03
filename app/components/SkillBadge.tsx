import { Job } from "@prisma/client";
import { Flex, Badge } from "@radix-ui/themes";

export const SkillBadge = ({ job }: { job: Job }) => {
  return (
    <Flex gap="1" wrap="wrap">
      {job.skills.map((skill) => (
        <Badge variant="outline" key={skill}>
          {skill}
        </Badge>
      ))}
    </Flex>
  );
};
