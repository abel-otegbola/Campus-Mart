"use server"
import { IProduct } from "@/interface/store";
import { connectDB } from "@/lib/mongodb";
import Products from "@/models/products";

export const createProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const product = new Products(values);
        const savedProduct = await product.save();
    }
    catch(e){
        return {
            error: "Product creation unsucccessful"
        }
    }
}

export const updateSingleProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const savedProduct = await Products.updateOne({ _id: values._id }, values)
        return JSON.parse(JSON.stringify(savedProduct));
    }
    catch(e){
        return {
            error: "Product update unsucccessful"
        }
    }
}

export const getAllProducts = async () => {
    try {
        await connectDB();
        const findResult = await Products.find()
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllBusinessProducts = async (store: string) => {
    try {
        await connectDB();
        const findResult = await Products.find({ store })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getSingleProduct = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Products.findOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const deleteProduct = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Products.deleteOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        return {
            error: "Product deletion unsucccessful"
        }
    }
}