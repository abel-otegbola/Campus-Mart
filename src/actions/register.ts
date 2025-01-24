"use server"
import { signupData } from "@/interface/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcryptjs from 'bcryptjs'

export const register = async (values: signupData) => {
    const { email, password, fullname, role } = values;
    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
          ...values,
          password: hashedPassword
        });
        const savedUser = await user.save();
        console.log(savedUser, " saved succesfully")
    }
    catch(e){
        console.log(e);
    }
}