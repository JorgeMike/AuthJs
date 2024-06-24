import mongoose, { Schema, Document, models } from "mongoose";

// Definir la interfaz del usuario
interface IUser {
  email: string;
  password: string;
}

// Definir el esquema del usuario
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [100, "Password must be at most 100 characters"],
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;
