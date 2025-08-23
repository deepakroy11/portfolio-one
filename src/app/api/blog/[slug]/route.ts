import { NextRequest, NextResponse } from "next/server";
import posts from "@/data/blog_posts.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    return NextResponse.json({ status: 404, error: "Post not found" });
  }

  return NextResponse.json(post);
}
