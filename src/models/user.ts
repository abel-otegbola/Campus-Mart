import { UserData } from "@/interface/profile";
import mongoose, { model, Schema } from "mongoose";

export interface UserDocument extends UserData {
    _id: string;
    email: string;
    password: string;
    fullname: string;
    role?: string;
    phone?: string;
    business_name?: string;
    business_category?: string;
    business_location?: string;
    img?: string;
    phone_number?: string,
}

const UserSchema = new Schema<UserDocument>({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    fullname: {
      type: String,
      required: [true, "Name is required"]
    },
    role: {
      type: String,
      required: [true, "Role is required"]
    },
    business_name: {
      type: String,
      required: [false, ""]
    },
    business_category: {
      type: String,
      required: [false, ""]
    },
    business_location: {
      type: String,
      required: [false, ""]
    },
    img: {
      type: String,
      required: [false, ""]
    },
    phone_number: {
      type: String,
      required: [false, ""]
    },
    cover: {
      type: String,
      required: [false, ""]
    },
    verified: {
      type: Boolean,
      required: [false, ""]
    },
    otp: {
      type: String,
      required: [false, ""]
    },
    otpExpiry: {
      type: String,
      required: [false, ""]
    },
    socialLinks: {
      type: { whatsapp: String, instagram: String, x: String, facebook: String },
      required: [false, ""]
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;