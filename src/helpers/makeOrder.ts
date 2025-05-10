import { ICart, IProduct } from "@/interface/store"
import { sendEmail } from "./sendEmail"

export interface makeOrderProps {
    orderProducts: IProduct[], 
    addOrder: (aug0: any) => void,
    values: { country: string, address: string, note: string, phone_number: string,  },
    user: { email: string, fullname: string },
    cart: ICart[],
    products: IProduct[],
    sellers: { name: string, email: string }[]
}

export const makeOrder = ({
    orderProducts, 
    addOrder,
    values,
    user,
    cart,
    products,
    sellers,
}: makeOrderProps
) => {

     orderProducts.map(item => ( 
        addOrder({ 
            shipping_address: {country: values.country, address: values.address, zip: ""}, 
            customer_email: user?.email || "",  
            order_status: "pending", 
            order_notes: values.note,
            shipping_charges: 2000,
            seller: item.store,
            order_items: {
                product_id: item._id,
                product_title: item.title,
                quantity: cart.filter((item: ICart) => item.id === item?.id).map((item: ICart) => item.quantity)[0],
                price: +item.price,
                total_price: +item.price * cart.filter((item: ICart) => item.id === item?.id).map((item: ICart) => item.quantity)[0],
                shipping_status: "pending",
                shipping_tracking_number: "",
            },
            amount: +item.price * cart.filter((item: ICart) => item.id === item?.id).map((item: ICart) => item.quantity)[0]                                       
        })
    ))
    sendEmail({ phoneNumber: values.phone_number || "", address: values.address, fullname: user?.fullname  || "",  cart, email: user?.email || "" }, user?.email || "", products)
    const sellerInfo = orderProducts.map(product => (
        { seller: sellers.find(seller => seller.name === product.store), cart: cart.filter(item => item.id === product._id)}
    ))

    for(var i=0; i<sellerInfo.length; i++) {
        sendEmail(
            {
                phoneNumber: values.phone_number || "", 
                address: values.address, 
                fullname: user?.fullname || "", 
                cart: sellerInfo[i]?.cart, 
                email: user?.email || "" 
            }, 
            sellerInfo[i].seller?.email || "", products)
    }
}