import { auth } from "@/auth";
import { promises, readFile } from "fs";
import path from "path";

export const GET = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const image_name = res.params?.image_name as string;

    const uploadDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadDir, image_name);

    const imageBuffer = await promises.readFile(filePath);

    const ext = path.extname(image_name).toLowerCase();
    let mimeType;
    switch (ext) {
      case ".jpg":
      case ".jpeg":
        mimeType = "image/jpeg";
        break;
      case ".png":
        mimeType = "image/png";
        break;
      case ".gif":
        mimeType = "image/gif";
        break;
      default:
        throw new Error("Unsupported image format");
    }

    const imageBase64 = `data:${mimeType};base64,${imageBuffer.toString(
      "base64"
    )}`;

    return Response.json({ error: false, image: imageBase64 });
  } catch (error: any) {
    console.error(error.message);
    return Response.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }
});
