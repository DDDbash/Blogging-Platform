import { getProfile } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = (token?: string) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};
