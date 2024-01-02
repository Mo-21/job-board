"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorCallout = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Callout.Root mb="3" color="red">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorCallout;
