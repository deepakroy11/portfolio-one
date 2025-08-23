import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const client = new PrismaClient();
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const defaultProjectImage = `${baseUrl}/uploads/place-holder-logo.svg`;

type ProjectUpdateData = {
  title?: string;
  summary?: string;
  link?: string;
  image?: string | null;
};

// ---------- GET all projects ----------
export async function GET() {
  try {
    const projects = await client.project.findMany({
      include: { skills: true },
    });

    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong...",
      },
      { status: 500 }
    );
  }
}

// ---------- File Upload Helper ----------
async function uploadFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return `/uploads/projects/${fileName}`; // relative path (public/)
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error(`Failed to upload file: ${file?.name}`);
  }
}

// ---------- CREATE project ----------
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("project-title") as string;
  const summary = formData.get("project-summary") as string;
  const link = formData.get("project-link") as string;
  const skillSet = formData.get("skillSet") as string;
  const image = formData.get("projectImage") as File | null;

  const skillIds = (skillSet || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!Array.isArray(skillIds)) {
    return NextResponse.json(
      { success: false, message: "Invalid skill set" },
      { status: 400 }
    );
  }

  let imageUrl = await uploadFile(image);
  if (!imageUrl) imageUrl = defaultProjectImage;

  try {
    const project = await client.project.create({
      data: {
        title,
        summary,
        link,
        image: imageUrl,
        skills: { connect: skillIds.map((id) => ({ id })) },
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong...",
      },
      { status: 500 }
    );
  }
}

// ---------- UPDATE project ----------
export async function PUT(req: NextRequest) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Project ID is required" },
      { status: 400 }
    );
  }

  const title = formData.get("project-title") as string;
  const summary = formData.get("project-summary") as string;
  const link = formData.get("project-link") as string;
  const skillSet = formData.get("skillSet") as string;
  const image = formData.get("projectImage") as File | null;

  const data: ProjectUpdateData = { title, summary, link };

  if (image && image.size > 0) {
    const uploadedImage = await uploadFile(image);
    if (uploadedImage) {
      data.image = uploadedImage;
    }
  }

  let skillIds: string[] = [];
  if (skillSet) {
    try {
      skillIds = JSON.parse(skillSet) as string[];
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid skill set format" },
        { status: 400 }
      );
    }
  }

  try {
    const updateData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== null && value !== undefined
      )
    );

    const project = await client.project.update({
      where: { id },
      data: {
        ...updateData,
        skills: {
          set: [], // clear old relations
          connect: skillIds.map((skillId) => ({ id: skillId })), // re-connect new ones
        },
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong...",
      },
      { status: 500 }
    );
  }
}

// ---------- DELETE project ----------
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    await client.project.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong...",
      },
      { status: 500 }
    );
  }
}
