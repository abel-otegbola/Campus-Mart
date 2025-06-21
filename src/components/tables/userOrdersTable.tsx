import { getAllUserOrders } from "@/actions/useOrders"
import { IOrder } from "@/interface/orders"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DataTable from "./dataTable"

export default function UserOrdersTable() {
    const [loading, setLoading] = useState(false)
    const { data } = useSession()
    const [ orders, setOrders ] = useState<IOrder[]>([])

    useEffect(() => {
        setLoading(true)
        getAllUserOrders(data?.user?.email || "")
        .then((response) => {
            if(response?.error) {
                setLoading(false)                    
            }
            else {
                console.log(response)
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
        <div className="w-[90vw] overflow-hidden">
            <DataTable isLoading={loading} data={orders} headers={["Id", "Date", "Products", "Total", "Status"]} />
        </div>
    )
}