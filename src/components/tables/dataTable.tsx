import { currencyFormatter } from "@/helpers/currencyFormatter";
import Skeleton from "../skeleton/skeleton";
import Link from "next/link";
import Button from "../button/button";
import { IOrder } from "@/interface/orders";
import { storeContext } from "@/context/useStore";
import { useContext } from "react";
import Image from "next/image";

interface sellerOrder extends IOrder {
    id?: string,
    customer_email: string,
    shipping_address: { address: string; zip: string; country: string },
    updatedAt?: string,
}

export default function DataTable({ headers, data, isLoading }: { headers: string[], data: sellerOrder[], isLoading: boolean }) {
    const { products } = useContext(storeContext)

    return (
        <table className="table-auto text-left md:text-[12px] text-[10px] w-full">
            <thead>
                <tr className="font-medium text-[10px] uppercase border border-transparent border-b-gray-400/[0.2]">
                    {
                        headers.map((header, i) => (
                            <th key={i} className="p-2">{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="">
                {
                    isLoading ? 
                    <tr className="p-2">
                        {
                            headers.map((header, i) => (
                                <td key={i} id={header} className="p-2"><Skeleton type="text" /></td>
                            ))
                        }
                    </tr> :
                    data?.map((order: IOrder, i: number) => (
                        <tr key={order?._id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>

                            {
                                headers.map((header, i) => (
                                    header === "Id" ?
                                    <td key={i} className="p-2 max-w-[100px] truncate"><Link href={`/dashboard/order?id=${order?._id}`}>{order?._id}</Link></td>
                                    :
                                    header === "Date" ?
                                    <td>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    :
                                    header === "Products" ?
                                    <td className="p-2 text-[10px]">
                                        <Link href={`/dashboard/order?id=${order?._id}`}>
                                        <ol className="">
                                        {
                                            order?.order_items.map(item => products.filter(product => product._id === item?.product_id)[0]).map(order => (
                                                <li key={order?._id} className="flex items-center gap-2 my-1">
                                                    {order?.title}
                                                </li>
                                            ))
                                        }
                                        </ol>
                                        </Link>
                                    </td>
                                    :
                                    header === "Total" ?
                                    <td className="p-2">
                                        {currencyFormatter(order?.amount)}
                                    </td>
                                    :
                                    header === "Status" ?
                                    <td className={`${order.order_status === "completed" ? "text-emerald-600" : order?.order_status === "cancelled" ? "text-red-500" : "text-orange-400"} p-2 text-[11px]`}>
                                        <Link href={`/dashboard/order?id=${order?._id}`}>{order?.order_status}</Link>
                                    </td>
                                    : ""
                                ))
                            }
                            
                            
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    )
}