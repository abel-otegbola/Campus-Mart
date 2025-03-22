'use client'

import { useSession } from "next-auth/react";
import BusinessOrdersTable from "@/components/tables/businessOrdersTable";
import UserOrdersTable from "@/components/tables/userOrdersTable";

export default function UserOrders() {
    const { data } = useSession()

    return (
        <>
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Orders</h2>
                <p>Manage your orders</p>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
            {
                data?.user?.role === "Seller" ?
                    <BusinessOrdersTable />
                :
                    <UserOrdersTable />
                }
            </div>
        </>
    )
}
