'use server'
import { UserData } from "@/interface/profile";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export const fetchUserData = async (email: string) => {
    try {
        await connectDB();
        const findResult = await User.findOne({ email })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        console.log(e);
    }
}

export const fetchUserDataByStorename = async (business_name: string) => {
    try {
        await connectDB();
        const findResult = await User.findOne({ business_name })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        console.log(e);
    }
}

export const updateUserData = async (email: string, data: UserData) => {
    try {
        await connectDB();
        const findResult = await User.updateOne({ email }, data)
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        console.log(e);
    }
}