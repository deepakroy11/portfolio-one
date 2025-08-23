"use client";

import { Divider, Pagination } from "@heroui/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import PostSkelton from "@/components/common/PostSkelton";
import Sidebar from "@/components/common/SideBar";
import Post from "@/components/common/Post";

export interface PostProps {
  slug: string;
  title: string;
  description: string;
  summary: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
}

const LIMIT = 10;

export default function BlogPage() {
  const searchParams = useSearchParams();

  const author = searchParams.get("author");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const skip = useMemo(() => (page - 1) * LIMIT, [page]);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      limit: LIMIT.toString(),
      skip: skip.toString(),
    });
    if (author) params.append("author", author);
    if (category) params.append("category", category);
    if (tag) params.append("tag", tag);
    return params.toString();
  }, [author, category, tag, skip]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blog?${query}`);
        const data = await response.json();
        setPosts(data.posts);
        setTotal(Math.ceil(data.total / LIMIT));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>

      {author && <FilterLabel label="Post by" value={author} />}
      {category && <FilterLabel label="Filter by" value={category} />}
      {tag && <FilterLabel label="Filter by" value={tag} />}

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 space-y-12">
          {isLoading ? (
            <PostSkelton />
          ) : (
            posts.map((post) => (
              <div key={post.slug}>
                <Post post={post} />
                <Divider className="mt-8" />
              </div>
            ))
          )}
          <div className="flex justify-center items-center">
            <Pagination
              initialPage={1}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-300 dark:bg-gray-700" />

        <aside className="w-full lg:w-1/4 space-y-8">
          <Sidebar />
        </aside>
      </div>
    </section>
  );
}

function FilterLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="my-5">
      <h5 className="text-lg font-semibold">
        {label}: {value}
      </h5>
    </div>
  );
}
