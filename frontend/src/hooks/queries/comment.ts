import { useQuery } from "@tanstack/react-query";

import { getCommentsOfBlog } from "@/apis/comment";

export const useCommentsOfBlogQuery = (blogId: number) => {
  return useQuery({
    queryKey: ["comments-of-blog", blogId],
    queryFn: () => getCommentsOfBlog(blogId),
  });
};
