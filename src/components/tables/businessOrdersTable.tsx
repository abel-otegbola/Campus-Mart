import { getAllBusinessOrders } from "@/actions/useOrders"
import { AuthContext } from "@/context/useAuth"
import { IOrder } from "@/interface/orders"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import Button from "../button/button"
import { LoaderIcon } from "react-hot-toast"
import { OrderContext } from "@/context/useOrders"
import Skeleton from "../skeleton/skeleton"

export default function BusinessOrdersTable() {
    const [loading, setLoading] = useState(false)
    const { data } = useSession()
    const { user } = useContext(AuthContext)
    const [ orders, setOrders ] = useState<IOrder[]>([])
    const { removeOrder, loading: isDeleting } = useContext(OrderContext)

    useEffect(() => {
        setLoading(true)
        getAllBusinessOrders(user?.business_name || "")
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setLoading(false)                    
            }
            else {
                setOrders(response)
                setLoading(false)
            }
        })
        .catch((error: { message: string }) => {
            setLoading(false)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.user])

    return (
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
                            
            orders.flatMap(order => {
            return order.order_items
              .filter(item => item.seller === user?.business_name)
              .map(item => ({
                ...item,
                _id: order._id,
                customer_email: order.customer_email,
                shipping_address: order.shipping_address,
                updatedAt: order.updatedAt,
              }));
            }).map((order, i) => (
                <tr key={order?._id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>
                
                    <td className="p-2 max-w-[100px] truncate"><Link href={`/dashboard/order?id=${order?._id}`}>{order?._id}</Link></td>
                    <td>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                    <td className="p-2 text-[10px]">
                        <Link href={`/dashboard/order?id=${order?._id}`}>
                        <ol className="">{order?.product_title}</ol>
                        </Link>
                    </td>
                    <td className="p-2">
                        {currencyFormatter(order?.total_price)}
                    </td>
                    <td className={`${order.shipping_status === "completed" ? "text-emerald-600" : order?.shipping_status === "cancelled" ? "text-red-500" : "text-orange-400"} p-2 text-[11px]`}>
                        <Link href={`/dashboard/order?id=${order?._id}`}>{order?.shipping_status}</Link>
                    </td>
                    <td>
                        <Button size="small" variant="secondary" onClick={() => removeOrder(order?._id || "", user?.fullname || "")}>{isDeleting ? <LoaderIcon /> : "Delete"}</Button>
                    </td>
                </tr>
        ))

    }
                        
    </tbody>
    </table>
    )
}