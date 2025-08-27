'use client'
import { TbListDetails, TbTrash } from "react-icons/tb"
import { PiCheckCircle, PiCurrencyNgn } from "react-icons/pi"
import { useContext, useEffect, useState } from "react"
import { database } from "../../../firebase/firebase"
import Button from "../../../components/button/button"
import { useSearchParams } from "next/navigation"
import { storeContext } from "@/context/useStore"
import Image from "next/image"
import { ICart, IProduct } from "@/interface/store"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import { getSingleOrder } from "@/actions/useOrders"
import { OrderContext } from "@/context/useOrders"
import { IOrder } from "@/interface/orders"
import { useSession } from "next-auth/react"
import Input from "@/components/input/input"
import Dropdown from "@/components/dropdown/dropdown"
import { AuthContext } from "@/context/useAuth"
import Link from "next/link"

export default function OrderSummary() {
    const searchParams = useSearchParams()
    const { products } = useContext(storeContext)
    const { updateOrder } = useContext(OrderContext)
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({} as IOrder)
    const { user } = useContext(AuthContext)
    const [status, setStatus] = useState(order?.order_status)

    const id = searchParams.get("id")

    const cancelOrder = () => {
        updateOrder({ ...order, order_status: "cancelled" })
        setLoading(true)
    }

    const handleStatus = (value: string) => {
        updateOrder({ ...order, order_status: value })
    }
    
    useEffect(() => {
        if(id) {
            setLoading(true)
            getSingleOrder(id)
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setOrder(response)
                    setStatus(response?.order_status)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [id])

    return (
        <div className="gap-[5%] min-h-[100vh]">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Order</h2>
            </div>

            <div className="flex flex-wrap items-start gap-6">
                <div className="md:w-[55%] w-full ">                    
                    <div className="py-4 mb-4 border border-gray-200 dark:border-slate-100/[0.09]">
                        <div className="grid grid-cols-4 text-center text-md text-[12px] leading-[120%]">
                            {
                                ["pending", "processing", "delivered", "completed"].map((status: string, i: number) => (
                                    <div key={i} className={`relative flex flex-col gap-2 items-center ${status ===  order?.order_status ? "text-emerald-600" : "text-gray-500/[0.4]"}`}>
                                        <span className={`absolute h-[3px] ${status ===  order?.order_status ? "bg-emerald-600" : "bg-gray-500/[0.2]"} top-[11px] left-0 ${i === 0 ? "w-[50%] left-[50%]" : i === 3 ? "w-[50%]" : "w-[100%] "}`}></span>
                                        <PiCheckCircle className="relative text-[25px] rounded-full bg-white dark:bg-black z-[2]" /> 
                                        <span>{status}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black flex items-center gap-2 p-2 rounded border border-gray-500/[0.1] dark:border-slate-100/[0.05]">
                        <a href={`/product?id=${order?._id}`}>
                            <Link 
                                href={`/product?id=${order._id}`} 
                                className={`block rounded sm:h-[120px] h-[120px] w-[120px] bg-gray-500/[0.1] bg-cover bg-center`}
                                style={{backgroundImage: `url("${products.find(item => item._id === order?.order_items?.product_id)?.images[0] || "/preview.png"}")`}} 
                            >
                            </Link>
                        </a>
                        <div className="p-4 w-full flex flex-col gap-2 justify-between">
                            <a href={`/product?id=${order?._id}`} className="mr-8 uppercase text-[12px] leading-[140%] font-bold">{order?.order_items?.product_title}</a>
                            
                            <div className="flex items-center w-full">
                                <p className="flex items-center text-[18px] font-bold">{currencyFormatter(order?.order_items?.price)}</p>
                            </div>

                            <p>Quantity: {order?.order_items?.quantity}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 py-4 border-b border-gray-500/[0.1]">
                        <h1 className="font-medium text-[16px] mb-4">Personal Information</h1>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Fullname:</span> {user?.fullname}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Email:</span> {order?.customer_email}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Total Price:</span> {currencyFormatter(order?.amount)}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 py-4 border-b border-gray-500/[0.1]">
                        <h1 className="font-medium text-[16px] mb-4">Shipping Information</h1>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">ID:</span> {id}
                        </h2>
                        <h2 className="flex items-center justify-between gap-1">
                            <span className="font-medium">Status:</span> 
                            {
                                user?.role === "Seller" ?
                                <Dropdown placeholder="Update order status" value={status} onChange={handleStatus} options={[
                                    { id: 0, title: "pending" },
                                    { id: 1, title: "processing" },
                                    { id: 2, title: "delivered" },
                                    { id: 3, title: "completed" },
                                ]}/>
                                :
                                <p className="text-orange-600">{loading ? "" : order?.order_status}</p>
                            }
                        </h2>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium">Delivery: </h3>
                            <p>9:00am || 23<sup>rd</sup> March, 2024 </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium">Shipping Address: </h3>
                            <p>{order?.shipping_address?.address}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium">Country: </h3>
                            <p>{order?.shipping_address?.country}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium">Shipping Fee: </h3>
                            <p>{currencyFormatter(order?.shipping_charges)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 py-4 border-b border-gray-500/[0.1]">
                        <h1 className="font-medium text-[16px] mb-4">Actions</h1>
                        <Button 
                            size="small"
                            className="border-red-400/[0.5] text-red-500 hover:bg-red-500 hover:text-white" 
                            variant="tetiary" 
                            disabled={order.order_status === "cancelled" || order?.order_status === "delivered" || order?.order_status === "completed"} 
                            onClick={() => cancelOrder()}>
                                <TbTrash />
                                <span>Cancel Order</span>
                        </Button>
                    </div>
            

                </div>

                <div className="md:w-[40%] w-full p-4 bg-gray-300/[0.08] dark:bg-dark border border-gray-500/[0.2]">
                    <h2 className="font-medium uppercase flex items-center gap-1 mb-4">Order details</h2>
                    <div className="w-full py-2 overflow-x-auto text-[12px]">
                        <table className="table-auto text-left border-collapse w-full min-w-[400px]">
                            <thead>
                                <tr className="text-primary text-[11px]">
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr className="border border-gray-500/[0.2] border-x-transparent">
                                    <td  className="py-2 gap-2">
                                        {/* <Image src={product?.images[0]} width={30} height={40} alt={product.title} className="w-[30px] bg-gray-600 rounded" />  */}
                                        {order?.order_items?.product_title}
                                    </td>
                                    <td  className="py-2"><PiCurrencyNgn className="inline" /> {order.order_items?.price}.00</td>
                                    <td className="py-2">{order?.order_items?.quantity}</td>
                                </tr>                                
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between py-4">
                        <p>Total</p>
                        {currencyFormatter(order?.amount)}
                    </div>
                </div>
            </div>
        </div>
    )
}