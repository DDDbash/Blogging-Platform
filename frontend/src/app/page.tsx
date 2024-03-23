import { getProfileServer } from "@/apis/user";
import BlogsList from "@/components/blogs/BlogsList";
import AppLayout from "@/components/common/AppLayout";

export default async function Home() {
  const profileRes = await getProfileServer();
  const profile = profileRes.data;

  return (
    <AppLayout profile={profile}>
      <div className="container flex flex-col gap-4 py-6">
        <h3>Latest Blog Posts</h3>

        <BlogsList profile={profile} />
      </div>
    </AppLayout>
  );
}
