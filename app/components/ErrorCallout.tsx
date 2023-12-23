"use client";
import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorCallout = ({ children }: PropsWithChildren) => {
  return (
    <Callout.Root mb="3" color="red">
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorCallout;
