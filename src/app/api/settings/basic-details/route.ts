import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const basicDetails = await client.basicDetails.findFirst();
    if (!basicDetails) {
      return NextResponse.json({ success: false, message: "No data available." });
    }
    return NextResponse.json({ success: true, basicDetails });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in GET:", error.message);
    }
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const siteName = formData.get("site-name") as string;
  const tagLine = formData.get("tag-line") as string;
  const aboutMe = formData.get("about-me") as string;
  const contactEmail = formData.get("contact-email") as string;
  const profileImage = formData.get("profileImg") as File | null;
  const aboutMeImage = formData.get("aboutMeImg") as File | null;

  const data: {
    siteName: string;
    tagLine: string;
    aboutMe: string;
    contactEmail: string;
    profileImage?: string;
    aboutMeImage?: string;
  } = {
    siteName,
    tagLine,
    aboutMe,
    contactEmail,
  };

  const uploadFile = async (file: File) => {
    console.log("Upload attempt:", { name: file?.name, size: file?.size });
    if (!file || file.size === 0) {
      console.log("No file or empty file, returning null");
      return null;
    }
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      console.log("Upload directory:", uploadDir);

      if (!fs.existsSync(uploadDir)) {
        console.log("Creating upload directory");
        fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
      }
      const file_name = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = path.join(uploadDir, file_name);
      console.log("Writing file to:", filePath);
      await writeFile(filePath, buffer, { mode: 0o644 });
      console.log("File uploaded successfully:", file_name);
      return `/uploads/${file_name}`;
    } catch (error) {
      console.error("File upload failed:", error);
      console.error("Upload directory:", path.join(process.cwd(), "public", "uploads"));
      throw new Error(`Failed to upload file: ${file?.name}`);
    }
  };

  console.log("Processing profileImage:", { name: profileImage?.name, size: profileImage?.size });
  if (profileImage && profileImage.name !== "" && profileImage.size > 0) {
    const profileImgUrl = await uploadFile(profileImage);
    if (profileImgUrl) data.profileImage = profileImgUrl;
  }

  console.log("Processing aboutMeImage:", { name: aboutMeImage?.name, size: aboutMeImage?.size });
  if (aboutMeImage && aboutMeImage.name !== "" && aboutMeImage.size > 0) {
    const aboutMeImgUrl = await uploadFile(aboutMeImage);
    if (aboutMeImgUrl) data.aboutMeImage = aboutMeImgUrl;
  }

  try {
    // Find existing data
    const existing = await client.basicDetails.findFirst();

    let result = existing;
    if (existing) {
      // update
      result = await client.basicDetails.update({
        where: { id: existing.id },
        data,
      });
    } else {
      // create
      result = await client.basicDetails.create({ data });
    }
    
    revalidatePath('/');
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
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
