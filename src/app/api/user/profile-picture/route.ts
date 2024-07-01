import { auth } from "@/auth";
import User from "@/models/User";
import axios from "axios";

export const POST = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    console.log("POST", process.env.MICROSERVICE_URL);
    const body = await req.json();
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const image_name = `${getEmailPrefix(user.email)}.${getFileExtension(
      body.image
    )}`;

    const res = await axios.post(
      `${process.env.MICROSERVICE_URL}uploads/base64`,
      {
        folder: "AuthJs",
        image_name: image_name,
        image: body.image,
      }
    );

    if (!user.image || user.image !== image_name) {
      user.image = image_name;
      await user.save();
    }

    return Response.json({ error: false, message: "Profile picture updated" });
  } catch (error: any) {
    console.error(error.message);
    if (!error.message.includes("Request failed")) {
      return Response.json(
        { error: true, message: error.message },
        { status: 500 }
      );
    } else {
      console.error(error.response.data.message);
      return Response.json(
        { error: true, message: "An error occurred, please try again later." },
        { status: 500 }
      );
    }
  }
});

const getEmailPrefix = (email: string) => {
  return email.split("@")[0];
};

function getFileExtension(dataString: string): string {
  const match = dataString.match(/image\/(\w+);base64/);
  return match ? match[1] : "unknown";
}
