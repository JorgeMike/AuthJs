import { auth } from "@/auth";
import { emailSchema, updateProfileSchema } from "@/lib/zod";
import User from "@/models/User";
import { ZodError } from "zod";

export const GET = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await emailSchema.parseAsync(res.params?.email);
    const user = await User.findOne({ email: res.params?.email });
    if (!user) {
      return Response.json(
        { error: true, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json({ error: false, user }, { status: 200 });
  } catch (error) {
    console.log("ERROR_GET_USER", error);
    return Response.json(
      { error: true, message: "Something went wrong" },
      { status: 400 }
    );
  }
});

export const PATCH = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  if (body.birthdate) {
    body.age =
      new Date().getFullYear() - new Date(body.birthdate).getFullYear();
    if (body.age < 18) {
      return Response.json(
        { error: true, message: "You must be at least 18 years old" },
        { status: 400 }
      );
    }
  }

  try {
    await updateProfileSchema.parseAsync(body);

    const user = await User.findOneAndUpdate(
      { email: res.params?.email },
      body,
      { new: true }
    );

    return Response.json(
      { error: false, message: "Profile updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR_PATCH_USER", error);
    if (error instanceof ZodError) {
      return Response.json(
        { error: true, message: error.errors[0].message },
        { status: 400 }
      );
    }
    return Response.json(
      { error: true, message: "Something went wrong" },
      { status: 400 }
    );
  }
});
