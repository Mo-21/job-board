import { Text } from "@radix-ui/themes";
import React from "react";
import { format } from "timeago.js";

const DateFormatted = ({ date }: { date: Date }) => {
  return <Text>{format(date)}</Text>;
};

export default DateFormatted;
