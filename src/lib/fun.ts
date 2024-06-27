import User from "@/models/User";
import { connectDB } from "./mongo";
import bcrypt from "bcryptjs";

const login = async (email: string, password: string) => {
  try {
    await connectDB();

    const userFound = await User.findOne({
      email,
    });

    if (!userFound) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return null;
    }

    return userFound;
  } catch (error) {
    console.log(error);
    return null;
  }
};
