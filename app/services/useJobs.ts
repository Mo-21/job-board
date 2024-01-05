import { Job, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useJobs = () =>
  useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () => axios.get("/api/jobs/").then((res) => res.data),
    staleTime: 1000 * 60 * 30,
  });
