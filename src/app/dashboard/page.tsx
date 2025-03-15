'use client'

import { PiWatchLight } from "react-icons/pi";
// import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import Avatar from "@/components/avatar/avatar";
// import { currencyFormatter } from "@/helpers/currencyFormatter";
// import Button from "@/components/button/button";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/useAuth";
import Button from "@/components/button/button";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import SubmissionChart from "@/components/charts/overviewChart";
import BalanceCard from "@/components/cards/balanceCard";
import DataTable from "@/components/tables/dataTable";
import { OrderContext } from "@/context/useOrders";

function DashboardHome() {
    const { data } = useSession()
    const { user } = useContext(AuthContext)
    const [ loading, setLoading] = useState(false)
    const { loading: isLoading, getBusinessOrders, orders } = useContext(OrderContext)

    useEffect(() => {
        if(user?.role === "seller") {
            setLoading(true)
            getBusinessOrders(user?.business_name || "")
            setLoading(false)
        }
        else if (user?.role === "buyer") {
            setLoading(true)
            getBusinessOrders(user?.fullname || "")
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.fullname])

    return (
        <>
        
                <div className="flex flex-col gap-4 w-full rounded md:border border-gray-500/[0.1] min-h-[70vh] pb-4 md:bg-slate-100/[0.2] md:dark:bg-dark/[0.3]">
                    <div className="flex gap-6 flex-wrap justify-between items-center border border-transparent border-b-gray-500/[0.1] md:p-4 py-4">
                        <div className="flex items-center gap-4">
                            <Avatar user={ user || data?.user || { fullname: "User" }} />
                            <div className="">
                                <h1 className="text-[20px] font-semibold capitalize">Welcome back, <span className="Capitalize">{data?.user?.fullname?.split(" ")[0] || user?.fullname?.split(" ")[0]}</span></h1>
                                <p className="leading-[180%] flex items-center text-[12px] opacity-[0.7] gap-2"> <PiWatchLight className="text-red-500 text-[14px]" />View your orders, products and discounts</p>
                            </div>
                        </div>
                        
                        <Button size="small" variant="secondary" href="/dashboard/inventory/new">Add new product</Button>
                    </div>
                    
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 px-4 md:gap-4 gap-2">
                        <BalanceCard title="Total Balance" amount={0.00}  />
                        <BalanceCard title="Cleared" amount={0.00}  />
                        <BalanceCard title="Pending" amount={0.00}  />
                        <BalanceCard title="Withdrawn" amount={0.00}  />
                    </div>

                    <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 md:px-4 pb-4 md:gap-4 gap-2">
                        <div className="flex flex-col gap-2 p-4 border border-gray-500/[0.2] rounded bg-white dark:bg-black">
                            <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                                <h2 className="font-medium text-[16px]">Overview</h2>
                            </div>
                            <SubmissionChart submissions={[ ["3", "5", "2", "6", "2", "3"], ["1", "2", "4", "3", "5", "6"] ]} />
                        </div>
                        <div className="flex flex-col gap-2 p-4 border border-gray-500/[0.2] rounded bg-white dark:bg-black">
                            <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                                <h2 className="font-medium text-[16px]">Recent Orders</h2>
                            </div>
                            <DataTable headers={["Date", "Products", "Total", "Status"]} data={orders} isLoading={isLoading || loading} />
                        </div>
                    </div>
                    
                </div>
        </>
    )
}

export default DashboardHome;