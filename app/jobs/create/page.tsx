import dynamic from "next/dynamic";
import JobFormLoadingSkeleton from "../_components/JobFormLoadingSkeleton";

const JobForm = dynamic(() => import("@/app/jobs/_components/JobForm"), {
  ssr: false,
  loading: () => <JobFormLoadingSkeleton />,
});

const CreateJob = () => {
  return <JobForm />;
};

export default CreateJob;
