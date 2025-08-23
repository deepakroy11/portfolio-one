import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  try {
    const post = await client.post.findUnique({
      where: { slug },
      include: {
        user: {
          select: { name: true },
        },
        postTaxonomies: {
          include: {
            taxonomyMeta: {
              include: {
                taxonomy: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Transform post to match frontend interface
    const categories = post.postTaxonomies
      .filter(pt => pt.taxonomyMeta?.taxonomy?.slug === 'category')
      .map(pt => pt.taxonomyMeta?.name)
      .filter(Boolean);
    
    const tags = post.postTaxonomies
      .filter(pt => pt.taxonomyMeta?.taxonomy?.slug === 'tags')
      .map(pt => pt.taxonomyMeta?.name)
      .filter(Boolean);

    const transformedPost = {
      slug: post.slug,
      title: post.title,
      description: post.summary,
      summary: post.summary,
      content: post.content,
      date: post.date?.toISOString() || post.createdAt.toISOString(),
      image: post.image,
      category: categories[0] || 'Uncategorized',
      tags: tags,
      author: post.user?.name || 'Unknown',
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error('Blog post API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
