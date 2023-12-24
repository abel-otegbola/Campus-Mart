'use client'
import { storeContext } from "@/app/context/storeContext";
import Image from "next/image";
import { useContext } from "react";
import { PiHeart, PiHeartFill, PiMinusCircleLight, PiShoppingCartLight, PiStar } from "react-icons/pi";
import { TbCurrencyNaira } from "react-icons/tb";

export default function ProductCard({ product }) {
    const { cart, setCart, wishlist, setWishlist } = useContext(storeContext)

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
        <div className="p-2 border border-gray-200 dark:border-gray-900">
            <div className="relative sm:h-[250px] h-[200px]">
                <Image src={product?.thumbnail} fill sizes="100%" className="rounded bg-fill" />
                <div className="absolute top-2 right-2 cursor-pointer">
                    {
                        wishlist.indexOf(product?.id) === -1 ? 
                        <PiHeartFill  className="text-[20px] text-red" onClick={() => addToWishlist(product?.id)} /> 
                        : 
                        <PiHeart className="text-[20px] text-gray-700"  onClick={() => removeFromWishlist(product?.id)} />
                    }
                </div>
            </div>
            <div className="px-2">
                <h2 className="py-2">{product?.title}</h2>

                <div className="flex items-center gap-2">
                    <PiStar className="text-orange-500" />
                    {product?.rating}/5 <span className="opacity-[0.6]">(20)</span>
                </div>
                
                <div className="flex justify-between items-center gap-4 mt-4 -ml-1">
                    <h1 className="flex items-center text-[20px] font-bold"><TbCurrencyNaira />{product?.price}</h1>
                    { 
                    cart.indexOf(product?.id) === -1 ? 
                        <PiShoppingCartLight className="text-[20px]" onClick={() => addToCart(product?.id) } />
                    : 
                        <PiMinusCircleLight className="text-[20px]" onClick={() => removeFromCart(product?.id) } />
                    }
                </div>
            
            </div>
        </div>
    )
}