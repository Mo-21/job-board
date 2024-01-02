import dynamic from "next/dynamic";
import React from "react";
import JobFormLoadingSkeleton from "../../_components/JobFormLoadingSkeleton";
import { prisma } from "@/prisma/client";

const JobForm = dynamic(() => import("@/app/jobs/_components/JobForm"), {
  ssr: false,
  loading: () => <JobFormLoadingSkeleton />,
});

const EditJob = async ({ params }: { params: { id: string } }) => {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  return <JobForm job={job} />;
};

export default EditJob;
