'use client'
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import FlutterwavePayment from "@/components/payments/flutterwave";
import Textarea from "@/components/textarea/textarea";
import TotalPrice from "@/components/totalPrice/totalPrice";
import { AuthContext } from "@/context/useAuth";
import { OrderContext } from "@/context/useOrders";
import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { sendEmail } from "@/helpers/sendEmail";
import { ICart, IProduct } from "@/interface/store";
import { checkoutSchema } from "@/schema/checkout";
import { Globe, MapPin, NotePencil } from "@phosphor-icons/react";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { searchAllStore } from "@/actions/useProfile";
import { makeOrder, makeOrderProps } from "@/helpers/makeOrder";

export default function CheckoutPage() {
    const { cart, products } = useContext(storeContext)
    const { loading, addOrder } = useContext(OrderContext)
    const { data } = useSession()
    const { getUserData, user } = useContext(AuthContext)
    const [sellers, setSellers] = useState<{ name: string, email: string }[]>([])
    const [isPaid, setisPaid] = useState(false)

    const orderProducts = products.filter((item: IProduct) => cart.map((item: ICart) => item.id).indexOf(item._id) !== -1 )
    
    useEffect(() => {
        getUserData(data?.user?.email || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    
    useEffect(() => {
        emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || "");
    }, []);

    useEffect(() => {
        searchAllStore()
        .then((response) => {
            if(response?.error) {                 
            }
            else {
                setSellers(response.map((seller: { business_name: string, email: string }) => {
                    return { name: seller.business_name, email: seller.email }
                }))
            }
        })
        .catch((error: { message: string }) => {
        });
    }, [])

    const handleOrderPlacement = ({
        orderProducts, 
        addOrder,
        values,
        user,
        cart,
        products,
        sellers,
    }: makeOrderProps
    ) => {
        makeOrder({ orderProducts, addOrder, values, user, cart, products, sellers }
        )
    }
    

    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-col items-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Checkout</h2>
                <p>Buy ({cart.length} { cart.length === 1 ? "item" : "items" }) now</p>
            </div>

            <div className="flex flex-wrap items-start gap-6 md:px-[9%] px-6 py-4">
                <div className="lg:w-[60%] w-full flex flex-col gap-2 md:p-6 md:border border-gray-500/[0.2] rounded-[8px]">
                    <Formik
                        initialValues={{ phone_number: '', country: '', address: '', note: '' }}
                        validationSchema={checkoutSchema}
                            onSubmit={( values, { setSubmitting }) => {
                            handleOrderPlacement({orderProducts, addOrder, values, user: { email: data?.user.email || user?.email || "", fullname: data?.user.fullname || "" }, cart, products, sellers})
                            setSubmitting(false);
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                                <div className="flex flex-col gap-4">
                                    <p className="text-[18px] font-medium">Delivery Information</p>
                                    {
                                        !data?.user ?
                                        <div className="flex flex-col gap-4 p-4 rounded bg-gray-100/[0.3] dark:bg-dark border border-gray-500/[0.1]">
                                            <p>Please login to place an order</p>
                                            <Button href="/login" size="small" variant="secondary">Signin</Button>
                                        </div>
                                        :
                                        data?.user.role === "Seller" ?
                                        <div className="flex flex-col gap-4 p-4 rounded bg-gray-100/[0.3] dark:bg-dark border border-gray-500/[0.1]">
                                            <p>To place an order, please log in to your buyer account</p>
                                            <Button href="/login" size="small" variant="secondary">Signin as buyer</Button>
                                        </div>
                                        :
                                        <>
                                            <Input name="fullname" label="Fullname" disabled={true} onChange={handleChange} value={data?.user.fullname || user?.fullname || ""} placeholder="Enter your fullname" />
                                            <Input name="email" label="Email Address" disabled={true} onChange={handleChange} value={user?.email || data?.user.email || ""} placeholder="Enter your Email address" />
                                        </>
                                    }
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="text-[18px] font-medium">Shipping Address</p>
                                    <Input name="country" label="Country" value={values.country} onChange={handleChange} type="text" error={touched.country ? errors.country : ""} placeholder="Country" leftIcon={<Globe size={16}/>}/>
                                    <Input name="address" label="Address (Street, City and State)" value={values.address} onChange={handleChange} type="text" error={touched.address ? errors.address : ""} placeholder="Address" leftIcon={<MapPin size={16}/>}/>
                                    <Textarea name="note" label="Order notes" value={values.note} onChange={handleChange} error={touched.note ? errors.note : ""} placeholder="Write short note to include in your order" leftIcon={<NotePencil size={16}/>}/>
                                </div>
                                    {
                                        isPaid ?
                                        <Button className="w-full" disabled={isSubmitting || !data?.user || data?.user?.role === "Seller"} >{ isSubmitting || loading ? <LoaderIcon/> : "Complete Checkout" }</Button>
                                        :
                                        <FlutterwavePayment amount={products?.filter((item: IProduct) => cart.map((item: ICart) => item.id).indexOf(item._id) !== -1 )
                                            .map((product: IProduct) => {return {price: +product?.price * cart.filter((item: ICart) => item.id === product?._id)[0]?.quantity}})
                                            .reduce((a: number,v: { price: number }) => a = a + v.price, 0) - 1000
                                        } customer={{ email: data?.user?.email || "", phone_number: values.phone_number, name: data?.user.fullname || "" }} setIsPaid={setisPaid} />
                                            
                                    }
                            </form>
                        )}
                        </Formik>
                </div>
                
                <div className="sm:sticky top-[90px] gap-2 md:w-[30%] w-[100%] rounded-[8px] p-6 bg-gray-300/[0.08] dark:bg-dark border border-gray-500/[0.1]">
                    <h2 className="text-[16px] uppercase font-bold">Summary</h2>
                    <div className="flex flex-col gap-2 py-6">
                        <div className="flex justify-between items-center">
                            <p>Items</p>
                            <p>{cart.length}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Subtotal</p>
                            <p><TotalPrice /></p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Discount</p>
                            <p>{currencyFormatter(0)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Total</p>
                            <p className="text-lg font-bold"><TotalPrice discount={0} /></p>
                        </div>
                    </div>
                    <Button href="/shop" variant="secondary" className="mb-4 w-full">Back to shop</Button>
                </div>
            </div>

        </div>
    )
}