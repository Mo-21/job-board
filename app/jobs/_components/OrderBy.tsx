"use client";
import { Job } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { IssuesPageProps } from "../page";

const OrderBy = ({ searchParams }: IssuesPageProps) => {
  const columns: { label: string; value: keyof Job }[] = [
    {
      label: searchParams.orderDirection
        ? `Sort ${searchParams.orderDirection}`
        : "Sort",
      value: "createdAt",
    },
    { label: "Relevance", value: "skills" },
  ];

  return (
    <Flex gap="3" ml="3">
      {columns.map((column) => (
        <Button key={column.label} value={column.value || "all"}>
          <Link
            href={{
              query: {
                ...searchParams,
                orderBy: column.value,
                orderDirection:
                  searchParams.orderBy &&
                  column.value === searchParams.orderBy &&
                  searchParams.orderDirection === "asc"
                    ? "desc"
                    : "asc",
              },
            }}
          >
            {column.label}
          </Link>
        </Button>
      ))}
    </Flex>
  );
};

export default OrderBy;
