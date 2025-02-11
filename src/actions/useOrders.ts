"use server"
import { IOrder } from "@/interface/orders";
import { connectDB } from "@/lib/mongodb";
import Orders from "@/models/orders";

export const createOrder = async (values: IOrder) => {
    try {
        await connectDB();
        const order = new Orders(values);
        const savedOrder = await order.save();
    }
    catch(e){
        return {
            error: "Order placement unsucccessful"
        }
    }
}

export const updateSingleOrder = async (values: IOrder) => {
    try {
        await connectDB();
        const savedOrder = await Orders.updateOne({ _id: values._id }, values)
        return JSON.parse(JSON.stringify(savedOrder));
    }
    catch(e){
        return {
            error: "Order update unsucccessful"
        }
    }
}

export const getAllOrders = async () => {
    try {
        await connectDB();
        const findResult = await Orders.find()
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllBusinessOrders = async (fullname: string) => {
    try {
        await connectDB();
        const findResult = await Orders.find({ fullname })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getSingleOrder = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Orders.findOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}