import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const client = new PrismaClient();

export async function GET() {
  try {
    const projects = await client.project.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        image: true,
        link: true,
        skills: {
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, projects }, {
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