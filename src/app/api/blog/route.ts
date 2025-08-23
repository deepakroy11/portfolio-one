import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const category = searchParams.get("category") || null;
  const author = searchParams.get("author") || null;
  const tag = searchParams.get("tag") || null;

  try {
    const where: any = {};
    const include = {
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
    } as const;

    // Add filters
    if (category || tag) {
      where.postTaxonomies = {
        some: {
          taxonomyMeta: {
            ...(category && { slug: category }),
            ...(tag && { slug: tag }),
          },
        },
      };
    }

    if (author) {
      where.user = {
        name: {
          contains: author,
          mode: 'insensitive',
        },
      };
    }

    const [posts, total] = await Promise.all([
      client.post.findMany({
        where,
        include,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      client.post.count({ where }),
    ]);

    // Transform posts to match frontend interface
    const transformedPosts = posts.map((post: any) => {
      const categories = post.postTaxonomies
        .filter((pt: any) => pt.taxonomyMeta?.taxonomy?.slug === 'category')
        .map((pt: any) => pt.taxonomyMeta?.name)
        .filter(Boolean);
      
      const tags = post.postTaxonomies
        .filter((pt: any) => pt.taxonomyMeta?.taxonomy?.slug === 'tags')
        .map((pt: any) => pt.taxonomyMeta?.name)
        .filter(Boolean);

      return {
        slug: post.slug,
        title: post.title,
        description: post.summary,
        summary: post.summary,
        date: post.date?.toISOString() || post.createdAt.toISOString(),
        image: post.image,
        category: categories[0] || 'Uncategorized',
        tags: tags,
        author: post.user?.name || 'Unknown',
      };
    });

    return NextResponse.json({
      total,
      limit,
      skip,
      posts: transformedPosts,
    });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
