import { Button, Chip } from "@heroui/react";

import Link from "next/link";
import ListPostPageClient from "./ListPostPageClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const fetchPost = async (endpoint: string) => {
  const response = await fetch(`${baseUrl}/${endpoint}`, { 
    cache: "force-cache",
    next: { revalidate: 300 } // 5 minutes
  });
  const data = await response.json();
  return data;
};

export default async function PostsPage() {
  const [posts] = await Promise.all([fetchPost("api/post")]);

  return (
    <main className="flex-1 p-4 sm:p-8 space-y-6 sm:space-y-10">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center items-center">
          All Posts{" "}
          {posts && (
            <Chip radius="full" variant="shadow" className="ms-2">
              {posts?.posts.length}
            </Chip>
          )}
        </h1>
        <Button as={Link} href="/admin/posts/add" prefetch={true} className="w-full sm:w-auto">
          Add New Post
        </Button>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">All Posts</h2>
        <ListPostPageClient data={posts} />
      </section>
    </main>
  );
}
