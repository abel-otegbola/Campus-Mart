import { ICart, IProduct } from "@/interface/store";
import { totalPrice } from "./totlaPrice";
import emailjs from '@emailjs/browser'

interface dataProps {
    fullname: string,
    cart: ICart[],
    email: string,
    phoneNumber: string,
    address: string,
}

export const sendEmail = (data: dataProps, recipient: string, products: IProduct[], type: string) => {

    emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",     // Email.js Service ID
        type === "seller" ? (process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "") : (process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID_BUYER || ""),    // Email.js Template ID
    {
        fullname: data.fullname,
        useremail: recipient,
        email: data.email,
        order_date: new Date().toLocaleDateString(),
        orders: data?.cart.map(item => {
            return { 
                name: products.find(element => element._id === item.id)?.title, 
                price: products.find(element => element._id === item.id)?.price, 
                image_url: products.find(element => element._id === item.id)?.images[0], 
                quantity: item.quantity, 
                size: item.variation.size, 
            }
        }),
        phoneNumber: data.phoneNumber,
        cost: {shipping: 5000, tax: 0, total: totalPrice(data.cart, products)},
        address: data.address
    }
    );
}