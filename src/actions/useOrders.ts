"use server"
import { IOrder } from "@/interface/orders";
import { connectDB } from "@/lib/mongodb";
import Orders from "@/models/orders";
import Products from "@/models/products";

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

export const getAllUserOrders = async (email: string) => {
    try {
        await connectDB();
        const findResult = await Orders.find({ customer_email: email })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllBusinessOrders = async (store: string) => {
    try {
        await connectDB();
        const findResult = await Orders.find({
            'seller': store,
        })
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

export const deleteOrder = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Orders.deleteOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        return {
            error: "Order deletion unsucccessful"
        }
    }
}

export const sendMessage = async (message: string, to: string) => {
    fetch(`https://api.ultramsg.com/instance114368/messages/chat?token=${process.env.ULTRMSG_TOKEN}&to=${to}&body=${message}&priority=10`)
    .then(response => {
        return response
    })
}