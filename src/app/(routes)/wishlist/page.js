'use client'
import ProductCard from "@/app/components/productCard/page"
import { storeContext } from "@/app/context/storeContext"
import { data } from "@/app/data/projects"
import Image from "next/image"
import { useContext } from "react"
import { PiStar, PiTrash } from "react-icons/pi"
import { TbCurrencyNaira } from "react-icons/tb"

export default function Waitlist() {
    const { wishlist, setWishlist } = useContext(storeContext)

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item !== id))
    }

    return (
        <div className="md:px-[8%] px-[3%] md:border border-transparent border-r-gray-200 dark:border-r-gray-900 pb-10">
            <div className="flex justify-between items-center h-[80px] border border-transparent border-b-gray-200 dark:border-b-gray-900 ">
                <h1 className="font-bold text-[18px] px-2">Wishlist</h1>
                <p>{wishlist.length} Items</p>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 py-8">
                {
                    data.products.filter(item => wishlist.indexOf(item.id) !== -1 ).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}