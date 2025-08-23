import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET() {
  try {
    const basicDetails = await client.basicDetail.findFirst();
    return NextResponse.json({ success: true, basicDetails });
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