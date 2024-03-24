import Image from "next/image";

import { getBlogDetails } from "@/apis/blog";
import { getProfileServer } from "@/apis/user";
import AppLayout from "@/components/common/AppLayout";

import CommentSection from "./components/CommentSection";

export const getBlogDetailsServer = async (id: number) => {
  try {
    const res = await getBlogDetails(id);

    return {
      data: res.data,
      err: null,
    };
  } catch (err) {
    return {
      data: null,
      err,
    };
  }
};

type Props = {
  params: { id: string };
};

const BlogDetails = async (props: Props) => {
  const {
    params: { id: postId },
  } = props;

  const profileRes = await getProfileServer();
  const blogDetailsRes = await getBlogDetailsServer(Number(postId));

  const profile = profileRes.data;
  const blogDetails = blogDetailsRes.data;

  if (blogDetailsRes.err) {
    return (
      <AppLayout profile={profile}>
        <div className="container px-4 pt-10">
          Something went wrong. Couldnt find the blog post. Please try again
          later.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout profile={profile}>
      <div className="container px-4 py-10">
        <span className="text-sm text-gray-500">
          Author: {blogDetails?.author.username}
        </span>

        <div className="relative h-[500px] w-full">
          <Image
            src={blogDetails?.image || ""}
            alt="image"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-2 flex flex-col gap-4">
          <h3>{blogDetails?.title}</h3>
          <p>{blogDetails?.content}</p>
        </div>

        <CommentSection blogDetails={blogDetails} profile={profile} />
      </div>
    </AppLayout>
  );
};

export default BlogDetails;
