'use client'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/useAuth";
import Skeleton from "@/components/skeleton/skeleton";
import Link from "next/link";
import Image from "next/image";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { getAllBusinessOrders } from "@/actions/useOrders";
import { IOrder } from "@/interface/orders";
import { storeContext } from "@/context/useStore";
import Button from "@/components/button/button";
import { OrderContext } from "@/context/useOrders";
import { LoaderIcon } from "react-hot-toast";

export default function UserOrders() {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const { products } = useContext(storeContext)
    const { removeOrder, loading: isDeleting, getOrders, orders } = useContext(OrderContext)

    useEffect(() => {
        if(user?.fullname) {
            setLoading(true)
            getOrders(user?.fullname)
            setLoading(false)
        }
    }, [user?.fullname])



    return (
        
        <>
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Orders</h2>
                <p>Manage your orders</p>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <table className="table-auto text-left md:text-[12px] text-[10px] w-full min-w-[600px]">
                    <thead>
                        <tr className="font-bold uppercase border border-transparent border-b-gray-400/[0.2]">
                            <th className="p-2">Id</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Products</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            loading || isDeleting ? 
                            <tr className="p-2">
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                            </tr> :
                            orders?.filter((item: IOrder) => item?.user?.email === user?.email)
                            .map((order: IOrder, i: number) => (
                                <tr key={order?._id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>
                                    
                                    <td className="p-2 max-w-[100px] truncate"><Link href={`/dashboard/order?id=${order?._id}`}>{order?._id}</Link></td>
                                    <td>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    <td className="p-2 text-[10px]">
                                        <Link href={`/dashboard/order?id=${order?._id}`}>
                                        <ol className="">
                                        {
                                            order?.cart.map(item => products.filter(product => product._id === item?.id)[0]).map(order => (
                                                <li key={order?._id} className="flex items-center gap-2 my-1"><Image alt={order?.images[0]} width={30} height={40} src={order?.images[0]} className="w-[30px] bg-gray-600 rounded" />{order?.title}</li>
                                            ))
                                        }
                                        </ol>
                                        </Link>
                                    </td>
                                    <td className="p-2">
                                        {currencyFormatter(order?.amount)}
                                    </td>
                                    <td className={`${order.paymentStatus === "completed" ? "text-emerald-600" : order?.paymentStatus === "cancelled" ? "text-red-500" : "text-orange-400"} p-2 text-[11px]`}>
                                        <Link href={`/dashboard/order?id=${order?._id}`}>{order?.paymentStatus}</Link>
                                    </td>
                                    <td>
                                        <Button size="small" variant="secondary" onClick={() => removeOrder(order?._id || "", user?.fullname || "")}>{isDeleting ? <LoaderIcon /> : "Delete"}</Button>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
