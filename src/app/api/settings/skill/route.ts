import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

const client = new PrismaClient();
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const defaulLogo = `${baseUrl}/portfolio-one/uploads/place-holder-logo.svg`;

export async function GET() {
  try {
    const skills = await client.skill.findMany();
    return NextResponse.json({ success: true, skills });
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

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("skill-title") as string;
  const summary = formData.get("skill-summary") as string;
  const image = formData.get("skillImage") as File | null;

  const data = {
    title,
    summary,
    image: defaulLogo, // default initially
  };

  const uploadFile = async (file: File) => {
    console.log("Skill upload attempt:", { name: file?.name, size: file?.size });
    if (!file || file.size === 0) {
      console.log("No skill file or empty file, returning null");
      return null;
    }
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads", "skills");
      console.log("Skill upload directory:", uploadDir);

      if (!fs.existsSync(uploadDir)) {
        console.log("Creating skill upload directory");
        fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
      }
      const file_name = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = path.join(uploadDir, file_name);
      console.log("Writing skill file to:", filePath);
      await writeFile(filePath, buffer, { mode: 0o644 });
      console.log("Skill file uploaded successfully:", file_name);
      return `/portfolio-one/uploads/skills/${file_name}`;
    } catch (error) {
      console.error("Skill file upload failed:", error);
      console.error("Upload directory:", path.join(process.cwd(), "public", "uploads", "skills"));
      throw new Error(`Failed to upload file: ${file?.name}`);
    }
  };

  console.log("Processing skill image:", { name: image?.name, size: image?.size });
  if (image && image.name !== "" && image.size > 0) {
    const imageUrl = await uploadFile(image);
    if (imageUrl) data.image = imageUrl;
  }

  try {
    const result = await client.skill.create({ data });
    revalidatePath('/');
    return NextResponse.json({
      success: true,
      skill: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong...",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const title = formData.get("skill-title") as string;
  const summary = formData.get("skill-summary") as string;
  const image = formData.get("skillImage") as File | null;

  const data: { title: string; summary: string; image?: string } = {
    title,
    summary,
  };

  const uploadFile = async (file: File) => {
    console.log("Skill update upload attempt:", { name: file?.name, size: file?.size });
    if (!file || file.size === 0) return null;

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads", "skills");
      console.log("Skill update upload directory:", uploadDir);

      if (!fs.existsSync(uploadDir)) {
        console.log("Creating skill update upload directory");
        fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
      }
      const file_name = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = path.join(uploadDir, file_name);
      console.log("Writing skill update file to:", filePath);
      await writeFile(filePath, buffer, { mode: 0o644 });
      console.log("Skill update file uploaded successfully:", file_name);
      return `/portfolio-one/uploads/skills/${file_name}`;
    } catch (error) {
      console.error("Skill update file upload failed:", error);
      console.error("Upload directory:", path.join(process.cwd(), "public", "uploads", "skills"));
      throw new Error(`Failed to upload file: ${file?.name}`);
    }
  };

  if (image && image.name !== "" && image.size > 0) {
    const imageUrl = await uploadFile(image);
    if (imageUrl) {
      data.image = imageUrl;
    }
  }

  try {
    const response = await client.skill.update({ where: { id: id }, data });
    if (!data.image) {
      data.image = response.image;
    }
    revalidatePath('/');
    return NextResponse.json({
      success: true,
      skill: data,
      message: "Skill Updated Successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return NextResponse.json(
      { success: false, message: "Unable to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    try {
      await client.skill.delete({ where: { id } });
      revalidatePath('/');
      return NextResponse.json({
        success: true,
        id: id,
        message: "Skill Deleted Successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return NextResponse.json(
        { success: false, message: "Unable to delete skill" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Unable to delete skill - Id not set." },
      { status: 500 }
    );
  }
}