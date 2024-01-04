import { Flex } from "@radix-ui/themes";
import React from "react";
import LevelFilter from "./LevelFilter";
import OrderBy from "./OrderBy";

const Toolbar = () => {
  return (
    <Flex p="4" justify="between">
      <Flex>
        <LevelFilter />
        <OrderBy />
      </Flex>
    </Flex>
  );
};

export default Toolbar;
