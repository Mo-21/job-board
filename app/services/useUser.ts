import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (userId: string) =>
  useQuery<User>({
    queryKey: ["users"],
    queryFn: () => axios.get(`/api/users/${userId}`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
  });
