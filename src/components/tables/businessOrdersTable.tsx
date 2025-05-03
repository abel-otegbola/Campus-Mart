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
    <div className="w-auto">
        <table className="table-auto text-left md:text-[12px] text-[10px] w-full min-w-[350px]">
            <thead>
                <tr className="font-bold uppercase border border-transparent border-b-gray-400/[0.2]">
                    {/* <th className="p-3">Id</th> */}
                    <th className="p-3">Date</th>
                    <th className="p-3">Products</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                </tr>
            </thead>
            <tbody>
                    <tr className="p-3">
                        {/* <td className="p-3"><Skeleton type="text" /></td> */}
                        <td className="p-3"><Skeleton type="text" /></td>
                        <td className="p-3"><Skeleton type="text" /></td>
                        <td className="p-3"><Skeleton type="text" /></td>
                        <td className="p-3"><Skeleton type="text" /></td>
                    </tr>                        
            </tbody>
        </table>
    </div>
    )
}