import AppLayout from "@/components/common/AppLayout";

import CreateBlogForm from "./components/CreateBlogForm";

const CreateBlog = () => {
  return (
    <AppLayout>
      <div className="container pt-10">
        <h3>Create a new blog post</h3>

        <CreateBlogForm />
      </div>
    </AppLayout>
  );
};

export default CreateBlog;
