'use client'
import { useContext, useEffect, useState } from "react";
import { IProduct } from "@/interface/store";
import Button from "@/components/button/button";
import { getAllBusinessProducts } from "@/actions/useProducts";
import { AuthContext } from "@/context/useAuth";
import InventoryCard from "@/components/cards/inventoryCard";
import Skeleton from "@/components/skeleton/skeleton";

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
            <div className="w-full pb-6 flex flex-col gap-2">
                <h2 className="font-bold text-[28px] uppercase">products</h2>
                <p className="mb-2">Manage your products</p>
                <Button size="small" variant="secondary" href="/account/inventory/new">New product</Button>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full overflow-x-auto min-h-[400px] gap-4">
                {
                    loading ? 
                    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                        {
                        [0, 1, 2, 3, 4, 5].map(index => (
                            <div key={index} className="flex flex-col gap-2">
                                <Skeleton type="rectangle"/>
                                <Skeleton type="paragraph"/>
                            </div>
                        ))
                        }
                    </div>
                    :
                    products
                    .map((product: IProduct, i: number) => (
                        <InventoryCard key={product?._id} product={product} />
                    ))
                }
            </div>
        </>
    )
}
