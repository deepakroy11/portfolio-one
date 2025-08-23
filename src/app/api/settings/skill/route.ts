import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
  try {
    const skills = await client.skill.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ success: true, skills }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Something went wrong..." },
      { status: 500 }
    );
  }
}