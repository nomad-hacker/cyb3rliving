import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { uploadToCloudinary } from "@/app/libs/cloudinary";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { imageData } = body;

  if (!imageData || typeof imageData !== "string") {
    throw new Error("Invalid image data");
  }

  const image = await uploadToCloudinary(imageData);
  if (!image) {
    return NextResponse.error();
  }

  return NextResponse.json({ url: image.secure_url });
}
