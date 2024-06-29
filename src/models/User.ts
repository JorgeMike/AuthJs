import { Schema, model, models } from "mongoose";

// Definir la interfaz del usuario
export interface IUser {
  name: string;
  email: string;
  password: string;
  birthdate?: string;
  age?: number;
  phone?: string;
  authProvider: string;
  image?: string;
}

// Definir el esquema del usuario
const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [100, "Password must be at most 100 characters"],
    },
    birthdate: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "You must be at least 18 years old"],
      max: [100, "You must be at most 100 years old"],
    },
    phone: {
      type: String,
    },
    authProvider: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
