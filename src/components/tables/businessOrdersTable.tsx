import { getAllBusinessOrders } from "@/actions/useOrders"
import { AuthContext } from "@/context/useAuth"
import { IOrder } from "@/interface/orders"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"
import DataTable from "./dataTable"

export default function BusinessOrdersTable() {
    const [loading, setLoading] = useState(false)
    const { data } = useSession()
    const { user } = useContext(AuthContext)
    const [ orders, setOrders ] = useState<IOrder[]>([])

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
        <div>
            <DataTable isLoading={loading} data={orders} headers={["Id", "Date", "Products", "Customer Email", "Total", "Status"]} />
        </div>
    </div>
    )
}