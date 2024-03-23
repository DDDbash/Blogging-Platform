import { getProfileServer } from "@/apis/user";
import BlogsForm from "@/components/blogs/BlogsForm";
import AppLayout from "@/components/common/AppLayout";

type Props = {
  params: { id: string };
};

const EditBlog = async (props: Props) => {
  const {
    params: { id: postId },
  } = props;

  const profileRes = await getProfileServer();
  const profile = profileRes.data;

  return (
    <AppLayout profile={profile}>
      <div className="container pt-10">
        <h3>Edit your blog post</h3>

        <BlogsForm postId={postId} />
      </div>
    </AppLayout>
  );
};

export default EditBlog;
