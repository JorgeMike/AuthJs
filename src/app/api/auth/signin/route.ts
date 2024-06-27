import User from "../../../../models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const { email, password } = await req.json();

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Las credenciales son incorrectas. Por favor, inténtalo de nuevo.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: true,
          message:
            "Las credenciales son incorrectas. Por favor, inténtalo de nuevo.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      error: false,
      user: userFound,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("ERROR_SIGNIN",error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
};
