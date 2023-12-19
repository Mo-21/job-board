import { Level } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import classNames from "classnames";
import React from "react";

const LevelBadge = ({ level }: { level: Level }) => {
  return (
    <Badge
      color={classNames({
        green: level === "JUNIOR",
        orange: level === "MIDDLE",
        red: level === "SENIOR",
        purple: level === "MANAGER",
      })}
    >
      {level}
    </Badge>
  );
};

export default LevelBadge;
