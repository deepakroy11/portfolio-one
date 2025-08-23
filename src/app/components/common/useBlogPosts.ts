"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PostProps } from "@/app/blog/BlogPage";

export function useBlogPosts(limit = 10) {
  const searchParams = useSearchParams();
  const author = searchParams.get("author") || null;
  const category = searchParams.get("category") || null;
  const tag = searchParams.get("tag") || null;

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let query = `limit=${limit}&skip=${skip}`;

      if (author) query += `&author=${author}`;
      if (category) query += `&category=${category}`;
      if (tag) query += `&tag=${tag}`;

      const response = await fetch(`/api/blog?${query}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(Math.ceil(data.total / limit));
      setIsLoading(false);
    };

    getData();
  }, [page, skip, limit, author, category, tag]);

  return {
    posts,
    isLoading,
    total,
    page,
    setPage,
    setSkip,
  };
}
