import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { IProduct } from "@/interface/store";
import { Heart, ShoppingCartSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext, useRef } from "react";
import Button from "../button/button";
import Animate from "../animation/animate";

export default function ProductCard({ product, i }: { product: IProduct, i?: number }) {
    const { wishlist, addToWishlist, removeFromWishlist, cart, addToCart, removeFromCart } = useContext(storeContext)

    return (
        <div className={`flex flex-col bg-white dark:bg-[#000]/[0.1] relative break-inside-avoid md:mb-4 mb-2 pb-4 overflow-hidden `} data-aos="fade-up">
                <Animate type="slideLeft" delay={(i || 1) * 100}>
                    <Link 
                        href={`/product?id=${product._id}`} 
                        className={`block rounded sm:h-[250px] h-[250px] bg-gray-500/[0.1] bg-cover bg-center`}
                        style={{backgroundImage: `url("${product?.images[0]}")`}} 
                    >
                    </Link>
                </Animate>
                <div className="absolute top-3 right-3 cursor-pointer z-[2]">
                    {
                        wishlist.indexOf(product._id) === -1 ? 
                        <Heart className="text-[20px] text-gray-700/[0.3]" onClick={() => addToWishlist(product._id)} /> 
                        : 
                        <Heart weight="fill" className="text-[20px] text-red-500"  onClick={() => removeFromWishlist(product._id)} />
                    }
                </div>
                
                <p className="text-[10px] opacity-[0.5] uppercase font-bold px-3 py-0 my-2">{product?.store}</p>
                <a href={`/product?id=${product._id}`} className="block pb-4 px-3 leading-[130%] font-semibold">{product?.title}</a>
                <div className="flex flex-col gap-3 text-[16px] opacity-[0.7] px-3">
                    {currencyFormatter(+product?.price)} 

                    <div className="z-[2]">
                    {
                        cart.map(item => item.id).indexOf(product._id) === -1 ? 
                        <Button variant="secondary" className="text-[12px] rounded-full w-full" onClick={() => addToCart({id: product._id, quantity: 1, variation: { color: "black", size: "LG" }})} >Add to Cart</Button> 
                        : 
                        <Button variant="secondary"  className="text-[12px] rounded-full w-full"  onClick={() => removeFromCart(product._id)} >Remove</Button>
                    }
                    </div>
                </div>
        </div>
    )
}