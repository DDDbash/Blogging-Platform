import { getProfileServer } from "@/apis/user";
import BlogsForm from "@/components/blogs/BlogsForm";
import AppLayout from "@/components/common/AppLayout";

const CreateBlog = async () => {
  const profileRes = await getProfileServer();
  const profile = profileRes.data;

  return (
    <AppLayout profile={profile}>
      <div className="container pt-10">
        <h3>Create a new blog post</h3>

        <BlogsForm />
      </div>
    </AppLayout>
  );
};

export default CreateBlog;
