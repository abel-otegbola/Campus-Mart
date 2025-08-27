'use client'
import { getAllBusinessOrders } from "@/actions/useOrders"
import { getAllBusinessProducts } from "@/actions/useProducts"
import Button from "@/components/button/button"
import { AuthContext } from "@/context/useAuth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

export default function Store() {
    const { data } = useSession()
    const { user, getUserData } = useContext(AuthContext)

    const [productsLength, setProductsLength] = useState(0)
    const [ordersLength, setOrdersLength] = useState(0)

    useEffect(() => {
        getUserData(data?.user?.email || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        getAllBusinessProducts(user?.business_name || "")
        .then((response) => {
            setProductsLength(response?.length)
        })
        getAllBusinessOrders(user?.business_name || "")
        .then((response) => {
            setOrdersLength(response?.length)
        })
    }, [user?.business_name])

    return (
        <div className="">
            <div className="flex flex-col gap-2 border border-gray-500/[0.2] rounded bg-white dark:bg-black">
                <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1] p-4">
                    <h2 className="font-medium text-[16px]">My Store</h2>
                </div>
                <div className="p-4 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`h-[88px] w-[88px] rounded-full z-[2] border border-gray-500/[0.1] bg-slate-100 dark:bg-dark bg-cover bg-center`} style={{ backgroundImage: `url("${user?.img}")` }}></div>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-[20px] mt-4">{user?.business_name}</h2>
                            <p>{user?.business_category}</p>
                            {
                                user?.business_name ?
                                <Button size="small" className="dark:bg-primary/[0.7]" href={`/store/${user?.business_name?.replaceAll(" ", "_")}`}>View my store</Button>
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-y border-gray-500/[0.2] py-4">
                        <Link href="/account/inventory" className="flex items-center justify-center gap-2 border-r border-gray-500/[0.2]">
                            <h1 className="text-[18px] font-medium">{productsLength}</h1>
                            <p>Product{productsLength === 1 ? "" : "s"}</p>
                        </Link>
                        <Link href="/account/orders" className="flex items-center justify-center gap-2">
                            <h1 className="text-[18px] font-medium">{ordersLength}</h1>
                            <p>Order{ordersLength === 1 ? "" : "s"}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}