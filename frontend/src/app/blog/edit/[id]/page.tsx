import AppLayout from "@/components/common/AppLayout";

import EditBlogForm from "./components/EditBlogForm";

type Props = {
  params: { id: string };
};

const CreateBlog = (props: Props) => {
  const {
    params: { id: postId },
  } = props;

  return (
    <AppLayout>
      <div className="container pt-10">
        <h3>Edit your blog post</h3>

        <EditBlogForm postId={postId} />
      </div>
    </AppLayout>
  );
};

export default CreateBlog;
