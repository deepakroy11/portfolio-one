import rawMetaData from "@/data/extracted_data.json";
import posts from "@/data/blog_posts.json";
import { NextResponse } from "next/server";

const getPostCountByCategory = (category: string) =>
  posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    .length;

const getPostCountByTag = (tag: string) =>
  posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  ).length;

const getPostCountByAuthor = (author: string) =>
  posts.filter((post) => post.author?.toLowerCase() === author.toLowerCase())
    .length;

export async function GET() {
  const metaData = JSON.parse(JSON.stringify(rawMetaData));

  metaData.categories = metaData.categories.map((category: string) => ({
    name: category,
    count: getPostCountByCategory(category),
  }));

  metaData.tags = metaData.tags.map((tag: string) => ({
    name: tag,
    count: getPostCountByTag(tag),
  }));

  metaData.authors = metaData.authors.map((author: string) => ({
    name: author,
    count: getPostCountByAuthor(author),
  }));

  return NextResponse.json({ meta_data: metaData });
}
