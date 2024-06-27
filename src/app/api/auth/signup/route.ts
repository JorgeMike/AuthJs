import User from "../../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import { error } from "console";
import { signInSchema } from "@/lib/zod";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();

  const { email, password } = await signInSchema.parseAsync(body);

  console.log(email, password);

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { error: true, message: "User already exists" },
        {
          status: 409,
        }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: body.name,
      email,
      password: passwordHashed,
      authProvider: "credentials",
    });

    const userSaved = await user.save();

    return NextResponse.json({
      error: false,
      user: userSaved,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("ERROR_SIGNUP", error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
};
