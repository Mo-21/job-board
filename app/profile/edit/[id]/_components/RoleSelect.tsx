"use client";
import ErrorCallout from "@/app/components/ErrorCallout";
import { Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";
import { UseFormSetValue, FieldErrors } from "react-hook-form";
import { Role } from "./ProfileCompletionForm";

interface RoleProps {
  setRoleValue: UseFormSetValue<{
    role: Role;
  }>;
  roleErrors: FieldErrors<{
    role: Role;
  }>;
}

const RoleSelect = ({ roleErrors, setRoleValue }: RoleProps) => {
  const roles: {
    label: string;
    emoji: string;
    value: "RECRUITER" | "JOB_SEEKER";
  }[] = [
    { label: "Recruiter", emoji: "👩‍💻", value: "RECRUITER" },
    { label: "Job Seeker", emoji: "👨‍🎓", value: "JOB_SEEKER" },
  ];

  return (
    <RadioGroup.Root
      onValueChange={(value: "RECRUITER" | "JOB_SEEKER") => {
        setRoleValue("role", value);
      }}
    >
      <Heading mb="5">I am a ...</Heading>
      {roleErrors.role && roleErrors?.role && (
        <ErrorCallout>{roleErrors?.role.message}</ErrorCallout>
      )}
      <Flex gap="2" direction="column">
        {roles.map((role) => (
          <Text as="label" size="2" key={role.label}>
            <Flex align="center" gap="2">
              <RadioGroup.Item value={role.value} />
              <Text style={{ fontWeight: "500" }}>{role.label}</Text>
              <Heading size="7">{role.emoji}</Heading>
            </Flex>
          </Text>
        ))}
      </Flex>
    </RadioGroup.Root>
  );
};

export default RoleSelect;
