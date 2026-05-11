import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    console.log("--- Upload API Called ---"); 
    
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("Error: No file found in request"); 
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log(`File received: ${file.name}, Size: ${file.size}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "notebook_uploads" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error); 
            reject(error);
          } else {
            console.log("Upload Success! URL:", result.secure_url); 
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}