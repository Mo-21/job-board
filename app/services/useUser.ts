import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (userId: string) =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get(`/api/users/${userId}`),
    staleTime: 1000 * 60 * 30,
  });
