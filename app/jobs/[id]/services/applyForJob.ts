import axios from "axios";
import { useState } from "react";

const useApply = (JobId: string | undefined) => {
  const [status, setStatus] = useState<number | null>(null);

  const applyForJob = async (data: { userId: string; resumeId: string }) => {
    try {
      const res = await axios.patch(`/api/jobs/apply/${JobId}`, data);
      setStatus(res.status);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return { applyForJob, status };
};

export default useApply;
