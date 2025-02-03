'use client'
import { useContext, useEffect, useState } from "react";
import Skeleton from "@/components/skeleton/skeleton";
import Link from "next/link";
import { IProduct } from "@/interface/store";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import Button from "@/components/button/button";
import { getAllBusinessProducts } from "@/actions/useProducts";
import { AuthContext } from "@/context/useAuth";

export default function Userproducts() {
    const [ products, setproducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if(user?.business_name) {
            setLoading(true)
            getAllBusinessProducts(user?.business_name)
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setproducts(response)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [user?.business_name])

    return (
        
        <>
            <div className="pb-6 flex flex-col gap-2">
                <h2 className="font-bold text-[28px] uppercase">products</h2>
                <p className="mb-2">Manage your products</p>
                <Button size="small" variant="secondary" href="/dashboard/inventory/new">New product</Button>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <table className="table-auto text-left md:text-[12px] text-[10px] w-full">
                    <thead>
                        <tr className="font-bold uppercase border border-transparent border-b-gray-400/[0.2]">
                            <th className="p-2">Id</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Category</th>
                        </tr>
                    </thead>
                    <tbody className=""> 
                        {
                             loading ?
                            <tr className="p-2">
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                                <td className="p-2"><Skeleton type="text" /></td>
                            </tr>
                             :
                            products
                            .map((product: IProduct, i: number) => (
                                <tr key={product?._id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>
                                    <td className="p-2"><Link href={`/dashboard/product?id=${product?._id}`}>{product?._id}</Link></td>
                                    <td className="p-2">{product?.title}</td>
                                    <td className="p-2">
                                        {currencyFormatter(product?.price)}
                                    </td>
                                    <td className="p-2">{product?.category}</td>
                                    <td className="p-2">
                                        <Button size="small" variant="secondary" href={`/dashboard/inventory/edit?id=${product?._id}`}>Edit</Button>
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
