import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      {
        status: 400,
      }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      {
        status: 400,
      }
    );
  }

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { error: "Email already exists" },
        {
          status: 409,
        }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: passwordHashed });
    const userSaved = await user.save();

    return NextResponse.json({ user: userSaved });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
};
