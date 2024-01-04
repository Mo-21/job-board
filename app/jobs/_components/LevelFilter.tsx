"use client";
import { handleValueChange } from "@/app/services/handleFilterValueChange";
import { Level } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const LevelFilter = () => {
  const statuses: { label: string; value?: Level }[] = [
    { label: "All" },
    { label: "Junior", value: "JUNIOR" },
    { label: "Middle", value: "MIDDLE" },
    { label: "Senior", value: "SENIOR" },
    { label: "Manager", value: "MANAGER" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (level: string) => {
    const paramsToAppend = {
      level,
    };

    handleValueChange({
      router,
      paramsToAppend,
    });
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "all"}
      onValueChange={onValueChange}
    >
      <Select.Trigger>
        <Text>Filter by status</Text>
      </Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default LevelFilter;
