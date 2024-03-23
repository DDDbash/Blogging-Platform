import BlogsList from "@/components/BlogsList";
import AppLayout from "@/components/common/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="container flex flex-col gap-4 py-6">
        <h3>Latest Blog Posts</h3>

        <BlogsList />
      </div>
    </AppLayout>
  );
}
