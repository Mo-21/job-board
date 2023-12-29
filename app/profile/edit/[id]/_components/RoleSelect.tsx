"use client";
import React, { SyntheticEvent, useState } from "react";
import { FormProps } from "./profileCompletionForm";
import { Box, Flex, Heading, RadioGroup, Text } from "@radix-ui/themes";
import { UseFormSetValue } from "react-hook-form";
import { ProfileCreationFormType } from "@/app/validationSchema";
import ErrorCallout from "@/app/components/ErrorCallout";

const RoleSelect = ({
  errors,
  register,
  setValue,
}: FormProps & { setValue: UseFormSetValue<ProfileCreationFormType> }) => {
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
        console.log(value);
        setValue("role", value);
      }}
    >
      <Heading mb="5">I am a ...</Heading>
      {errors.role && errors?.role && (
        <ErrorCallout>{errors?.role.message}</ErrorCallout>
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
