import { auth } from "@/auth";
import { connectDB } from "@/lib/mongo";
import { emailSchema } from "@/lib/zod";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { email, name, authProvider, image } = await req.json();

    const emailValid = await emailSchema.parseAsync(email);

    const userFound = await User.findOne({ email: emailValid });

    if (!userFound) {
      const newUser = new User({
        email: emailValid,
        name,
        authProvider,
      });

      await newUser.save();
      return NextResponse.json(
        {
          error: false,
          message: "User created successfully",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        error: false,
        message: "User already exists",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR_LOGIN", error);
    return NextResponse.json(
      {
        error: true,
        message: "",
      },
      { status: 501 }
    );
  }
};
