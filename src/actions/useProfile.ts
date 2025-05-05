'use server'
import { UserData } from "@/interface/profile";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcryptjs from 'bcryptjs'


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

export const searchAllStore = async () => {
    try {
        await connectDB();
        const findResult = await User.find({ role: "Seller" })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        console.log(e);
    }
}

export const isUserSaved = async (email: string) => {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        
        if(!user) return false 
        else return true
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

export const verifyUserAccount = async (email: string, otp: string) => {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        const userData = JSON.parse(JSON.stringify(user))
        if(userData.otp === otp ) {
            const findResult = await User.updateOne({ email }, { verified: true })
            return true
        }
        else return false
    }
    catch(e){
        console.log(e);
    }
}