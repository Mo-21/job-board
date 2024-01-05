"use client";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";

import React, { useEffect, useState } from "react";
import { Job } from "@prisma/client";

const RecruiterChart = ({ jobs }: { jobs: Job[] }) => {
  const [data, setData] = useState<{ label: string; number: number }[]>();

  useEffect(() => {
    const job = jobs
      .filter((job) => job.usersId.length > 0)
      .map((job) => ({
        label: job.title,
        number: job.usersId.length,
      }));

    setData(job);
  }, [jobs]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Bar
          dataKey="number"
          barSize={60}
          style={{ fill: "var(--accent-9)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RecruiterChart;
