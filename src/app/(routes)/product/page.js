'use client'
import Button from "@/app/components/button/page"
import { storeContext } from "@/app/context/storeContext"
import { data } from "@/app/data/projects"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useContext, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { PiHeart, PiStar, PiTrash } from "react-icons/pi"
import { TbCurrencyNaira } from "react-icons/tb"

export default function Product() {
    const query = useSearchParams().get("title")
    const { cart, setCart, wishlist, setWishlist } = useContext(storeContext)
    const [color, setColor] = useState(0)

    const addToCart = (id) => {
        setCart([ id, ...cart ])
    }

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item !== id))
    }

    const addToWishlist = (id) => {
        setWishlist([ id, ...wishlist ])
    }

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item !== id))
    }


    return (
        <div className="md:p-[8%] p-[3%]">
            {
                data.products.filter(item => item.title === query).map(product => (
                    <div key={product?.id} className="relative flex flex-wrap my-2 rounded">
                        <div className="relative md:h-[400px] h-[399px] md:w-[40%] w-full">
                            <Image src={product?.thumbnail} fill sizes="100%" alt={query} className="rounded bg-cover" />
                        </div>
                        <div className="md:px-[3%] md:py-0 py-6 md:w-[60%] w-full">
                            <h2 className="py-2 text-[20px] font-bold">{product?.title}</h2>

                            <div className="flex items-center gap-2">
                                <PiStar className="text-red" />
                                {product?.rating}/5 <span className="opacity-[0.6]">(20)</span>
                            </div>
                            
                            <div className="mt-4">
                                <p className="w-full">{product?.description}</p>
                                <h1 className="flex items-center text-[20px] font-bold py-4"><TbCurrencyNaira />{product?.price}</h1>
                            </div>

                            <div className="mt-6">
                                <h3 className="w-full py-2 text-green border border-transparent border-b-gray-200 dark:border-b-gray-900">Customize</h3>
                                <div className="my-2">
                                    <p>Colors</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <button className={`w-[25px] h-[25px] bg-red rounded-full border ${color === 0 ? "border-blue outline outline-offset-1 outline-blue" : "border-gray-500"}`} onClick={() => setColor(0)}></button>
                                        <button className={`w-[25px] h-[25px] bg-green rounded-full border ${color === 1 ? "border-blue outline outline-offset-1 outline-blue" : "border-gray-500"}`} onClick={() => setColor(1)}></button>
                                        <button className={`w-[25px] h-[25px] bg-orange-500 rounded-full border ${color === 2 ? "border-blue outline outline-offset-1 outline-blue" : "border-gray-500"}`} onClick={() => setColor(2)}></button>
                                        <button className={`w-[25px] h-[25px] bg-black rounded-full border ${color === 3 ? "border-blue outline outline-offset-1 outline-blue" : "border-gray-500"}`} onClick={() => setColor(3)}></button>
                                        <button className={`w-[25px] h-[25px] bg-gray-600 rounded-full border ${color === 4 ? "border-blue outline outline-offset-1 outline-blue" : "border-gray-500"}`} onClick={() => setColor(4)}></button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-4 py-4 border border-transparent border-t-gray-200 dark:border-t-gray-900">
                                <div>
                                {
                                    wishlist.indexOf(product?.id) === -1 ? 
                                    <button className="p-[12px] px-4 rounded border border-gray-200 dark:border-gray-800" onClick={() => addToWishlist(product?.id) }>Add to wishlist</button> 
                                    : 
                                    <button className="p-[12px] px-4 rounded border border-gray-200 dark:border-gray-800" onClick={() => removeFromWishlist(product?.id)}>Remove from wishlist</button> 
                                    
                                }
                                </div>
                                <div>
                                {
                                    cart.indexOf(product?.id) === -1 ? 
                                    <button className="p-[12px] px-4 rounded bg-blue text-white" onClick={() => addToCart(product?.id) }>Add to cart</button> 
                                    : 
                                    <button className="p-[12px] px-4 rounded bg-blue text-white" onClick={() => removeFromCart(product?.id)}>Remove from cart</button> 
                                    
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}