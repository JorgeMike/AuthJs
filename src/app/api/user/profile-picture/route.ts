import { auth } from "@/auth";
import User from "@/models/User";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

export const POST = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const base64Header = body.image.split(",")[0];
    const base64Image = body.image.split(",")[1];

    const fileExtension = getFileExtension(base64Header);

    console.log(fileExtension);

    const fileName = `${getEmailPrefix(user.email)}.${fileExtension}`;

    const filePath = path.join(uploadDir, fileName);

    const imageBuffer = Buffer.from(base64Image, "base64");

    writeFileSync(filePath, imageBuffer);

    user.image = fileName;
    await user.save();

    return Response.json({ error: false, message: "Profile picture updated" });
  } catch (error: any) {
    console.error(error.message);
    return Response.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }
});

const getEmailPrefix = (email: string) => {
  return email.split("@")[0];
};

function getFileExtension(dataString: string): string {
  const match = dataString.match(/image\/(\w+);base64/);
  return match ? match[1] : "unknown";
}
