import { ICart } from "@/interface/store";

export interface IOrder {
    _id?: string, 
    fullname: string,
    country: string, 
    address: string, 
    phone: string, 
    user: { displayName: string, email: string, photo: string }, 
    amount: number,
    paymentStatus: string,
    cart: ICart[],
    date?: string,
    createdAt?: string;
    updatedAt?: string;
}
export interface checkout {
    id: string, 
    fullname: string,
    country: string, 
    address: string, 
    phone: string, 
}