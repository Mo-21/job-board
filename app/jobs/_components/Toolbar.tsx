import { Flex } from "@radix-ui/themes";
import React from "react";
import LevelFilter from "./LevelFilter";
import OrderBy from "./OrderBy";
import { IssuesPageProps } from "../page";

const Toolbar = ({ searchParams }: IssuesPageProps) => {
  return (
    <Flex p="4" justify="between">
      <LevelFilter />
      <OrderBy searchParams={searchParams} />
    </Flex>
  );
};

export default Toolbar;
