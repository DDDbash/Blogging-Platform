import { useQuery } from "@tanstack/react-query";

import { getBlogDetails, getBlogsList } from "@/apis/blog";
import { PaginationParams } from "@/types/common";

export const useBlogsListQuery = ({ page, limit }: PaginationParams) => {
  return useQuery({
    queryKey: ["blogs-list", page, limit],
    queryFn: () => getBlogsList({ page, limit }),
  });
};

export const useBlogDetailsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["blog-details", postId],
    queryFn: () => getBlogDetails(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
};
