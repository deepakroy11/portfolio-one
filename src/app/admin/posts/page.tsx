"use client";

import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListPostPageClient from "./ListPostPageClient";

export default function PostsPage() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 p-4 sm:p-8 space-y-6 sm:space-y-10">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-8 space-y-6 sm:space-y-10">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center items-center">
          All Posts{" "}
          {posts && (
            <Chip radius="full" variant="shadow" className="ms-2">
              {posts?.posts?.length || 0}
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
