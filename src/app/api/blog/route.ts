import posts from "@/data/blog_posts.json";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const category = searchParams.get("category") || null;
  const author = searchParams.get("author") || null;
  const tag = searchParams.get("tag") || null;
  let filteredPosts = posts;

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (author) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.author && post.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (tag) {
    filteredPosts = filteredPosts.filter(
      (post) => post.tags && post.tags.includes(tag)
    );
  }

  const paginatedPosts = filteredPosts.slice(skip, skip + limit);

  return NextResponse.json({
    total: filteredPosts.length,
    limit,
    skip,
    posts: paginatedPosts,
  });
}
