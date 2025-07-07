import { storeContext } from "@/context/useStore";
import { IProduct } from "@/interface/store";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";
import Animate from "../animation/animate";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import Image from "next/image";

export default function ProductCard({ product, i }: { product: IProduct, i?: number }) {
    const { cart, addToCart, removeFromCart, wishlist, addToWishlist, removeFromWishlist } = useContext(storeContext)

    return (
        <div className={`flex flex-col relative break-inside-avoid rounded-lg pb-2 p-2 overflow-hidden border border-gray-500/[0.1] `} data-aos="fade-up">
                <Animate type="slideLeft" delay={(i || 1) * 100}>
                    <Link 
                        href={`/product?id=${product._id}`} 
                        className={`block rounded sm:h-[200px] h-[200px] bg-gray-500/[0.1] overflow-hidden bg-cover bg-center`}
                    >
                        <Image
                            fill
                            alt={product?.title}
                            src={product?.images[0] || "/preview.png"}
                            sizes="(max-width: 768px) 250px, (max-width: 1200px) 200px, 200px"
                            className="object-cover bg-cover rounded"
                        />
                    </Link>
                </Animate>
                
                <div className="flex justify-between items-center gap-6 ">
                    <Link href={`/store/${product?.store?.replaceAll(" ", "-")}`} className="text-[10px] opacity-[0.5] uppercase font-bold py-0 my-2">{product?.store}</Link>
                    <div className=" cursor-pointer z-[2]">
                        {
                            wishlist.indexOf(product._id) === -1 ? 
                            <Heart className="text-[20px] text-gray-700/[0.5] dark:text-white/[0.4]" onClick={() => addToWishlist(product._id)} /> 
                            : 
                            <Heart weight="fill" className="text-[20px] text-red-500"  onClick={() => removeFromWishlist(product._id)} />
                        }
                    </div>
                </div>
                <a href={`/product?id=${product._id}`} className="block pb-4 leading-[130%] font-semibold">{product?.title}</a>
                <div className="flex justify-between gap-3 text-[16px] opacity-[0.7]">
                    {currencyFormatter(+product?.price)} 

                    <div className="z-[2] ">
                    {
                        cart.map(item => item.id).indexOf(product._id) === -1 ? 
                        <button className="text-[20px] rounded-full w-full" onClick={() => addToCart({id: product._id, quantity: 1, variation: { color: "black", size: "LG" }})} ><ShoppingCart/></button> 
                        : 
                        <button className="text-[20px] rounded-full w-full"  onClick={() => removeFromCart(product._id)} ><ShoppingCart  weight="fill" className="text-primary"/></button>
                    }
                    </div>
                </div>
        </div>
    )
}