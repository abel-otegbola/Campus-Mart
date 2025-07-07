'use client'

import { PiWatchLight } from "react-icons/pi";
import Avatar from "@/components/avatar/avatar";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/useAuth";
import Button from "@/components/button/button";
import SubmissionChart from "@/components/charts/overviewChart";
import BalanceCard from "@/components/cards/balanceCard";
import BusinessOrdersTable from "@/components/tables/businessOrdersTable";
import UserOrdersTable from "@/components/tables/userOrdersTable";
import { getAllBusinessOrders } from "@/actions/useOrders";
import Link from "next/link";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { getAllBusinessProducts } from "@/actions/useProducts";

function DashboardHome() {
    const { data } = useSession()
    const { user } = useContext(AuthContext)
    const [productsLength, setProductsLength] = useState(0)
    const [ordersLength, setOrdersLength] = useState(0)

    useEffect(() => {
        getAllBusinessProducts(user?.business_name || "")
        .then((response) => {
            setProductsLength(response.length)
        })
        getAllBusinessOrders(user?.business_name || "")
        .then((response) => {
            setOrdersLength(response.length)
        })
    }, [user?.business_name])

    return (
        <div>
                <div className="flex flex-col gap-4 w-full rounded min-h-[70vh] pb-4">
                    
                    {
                    data?.user?.role === "Seller" || user?.role === "Seller" ?
                    <>
                    <div className="flex gap-6 flex-wrap justify-between items-center md:border border-gray-500/[0.1] md:px-4 py-4 bg-white dark:bg-black">
                        <div className="md:w-auto w-full flex items-center gap-4">
                            <Avatar user={ data?.user || { fullname: "User" }} />
                            <div className="">
                                <h1 className="text-[20px] font-semibold capitalize">Welcome back, <span className="Capitalize">{data?.user?.fullname?.split(" ")[0] || user?.fullname?.split(" ")[0]}</span></h1>
                                <p className="leading-[180%] flex items-center text-[12px] opacity-[0.7] gap-2"> <PiWatchLight className="text-red-500 text-[14px]" />View your orders, products and discounts</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button size="small" className="dark:bg-primary/[0.7]" href="/dashboard/inventory/new">Add new product</Button>
                            <Button size="small" className="dark:bg-primary/[0.7]" href={`/store/${user?.business_name?.replaceAll(" ", "-")}`}>View my store</Button>
                        </div>
                    </div>
                    
                    <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                        <BalanceCard title="Total Balance" amount={user?.balance || 0}  />
                        <BalanceCard title="Cleared" amount={user?.cleared || 0}  />
                        <BalanceCard title="Pending" amount={(user?.balance || 0) - (user?.cleared || 0)}  />
                        <BalanceCard title="Withdrawn" amount={0.00}  />
                    </div>

                    <div className="w-full grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
                        <div className="flex flex-col gap-2 border border-gray-500/[0.2] rounded bg-white dark:bg-black">
                            <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1] p-4">
                                <h2 className="font-medium text-[16px]">Overview</h2>
                            </div>
                            <div className="p-4">
                                <SubmissionChart submissions={[ ["0", "0", "0", "0", "0", ordersLength.toString()], ["1", "2", "4", "3", "5", "6"] ]} />
                            </div>
                        </div>
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
                                        <Button size="small" className="dark:bg-primary/[0.7]" href={`/store/${user?.business_name?.replaceAll(" ", "-")}`}>View my store</Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-y border-gray-500/[0.2] py-4">
                                    <Link href="/dashboard/inventory" className="flex items-center justify-center gap-2 border-r border-gray-500/[0.2]">
                                        <h1 className="text-[18px] font-medium">{productsLength}</h1>
                                        <p>Product{productsLength === 1 ? "" : "s"}</p>
                                    </Link>
                                    <Link href="/dashboard/orders" className="flex items-center justify-center gap-2">
                                        <h1 className="text-[18px] font-medium">{ordersLength}</h1>
                                        <p>Order{ordersLength === 1 ? "" : "s"}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2 p-4 border border-gray-500/[0.1] rounded bg-white dark:bg-black">
                        <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1] p-4">
                            <h2 className="font-medium text-[16px]">Recent Orders</h2>
                        </div>
                        <div className="sm:w-auto w-[85vw] overflow-hidden">
                            <BusinessOrdersTable />
                        </div>
                        
                    </div>
                    </>
                    :
                    <>
                    <div className="flex gap-6 flex-wrap justify-between items-center border border-gray-500/[0.1] md:p-4 py-4 bg-white dark:bg-black">
                        <div className="flex items-center gap-4">
                            <Avatar user={ data?.user || { fullname: "User" }} />
                            <div className="">
                                <h1 className="text-[20px] font-semibold capitalize">Welcome back, <span className="Capitalize">{data?.user?.fullname?.split(" ")[0] || user?.fullname?.split(" ")[0]}</span></h1>
                                <p className="leading-[180%] flex items-center text-[12px] opacity-[0.7] gap-2"> <PiWatchLight className="text-red-500 text-[14px]" />View your orders and discounts</p>
                            </div>
                        </div>
                        
                        <Button size="small" href="/vendor-onboarding">Become a vendor</Button>
                    </div>
                    <div className="w-full grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 pb-4 md:gap-4 gap-2">
                        <div className="grid md:grid-cols-2 gap-4 h-fit">
                            <div className="flex flex-col gap-2 p-4 border border-gray-500/[0.1] rounded bg-white dark:bg-black">
                                <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                                    <h2 className="font-medium text-[16px]">Balance</h2>
                                </div>
                                <div className="flex items-center justify-between mt-12">
                                    <p className="text-lg font-bold">{currencyFormatter(user?.balance || 0)}</p>
                                    <p className="text-[10px]">Jun 2025</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 border border-gray-500/[0.1] rounded bg-white dark:bg-black">
                                <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                                    <h2 className="font-medium text-[16px]">Offers</h2>
                                </div>
                                <div className="flex items-center justify-between mt-12">
                                    <p className="font-bold">NEW-STU(20%)</p>
                                    <p className="text-[10px]">Expire 26 Jul 2025</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex flex-col gap-2 p-4 border border-gray-500/[0.1] rounded bg-white dark:bg-black overflow-hidden">
                            <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                                <h2 className="font-medium text-[16px]">Orders</h2>
                            </div>
                            <UserOrdersTable />
                        </div>
                    </div>
                    </>
                }
                </div>
        </div>
    )
}

export default DashboardHome;