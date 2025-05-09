import { storeContext } from "@/context/useStore";
import { IProduct } from "@/interface/store";
import { Heart } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";
import Animate from "../animation/animate";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import Image from "next/image";

export default function ProductCard({ product, i }: { product: IProduct, i?: number }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(storeContext)

    return (
        <div className={`flex flex-col relative break-inside-avoid md:mb-4 mb-2 pb-4 overflow-hidden `} data-aos="fade-up">
                <Animate type="slideLeft" delay={(i || 1) * 100}>
                    <Link 
                        href={`/product?id=${product._id}`} 
                        className={`block rounded sm:h-[200px] h-[200px] bg-gray-500/[0.1] overflow-hidden bg-cover bg-center`}
                        style={{backgroundImage: `url("${product?.images[0] || "/preview.png"}")`}} 
                    >
                    </Link>
                </Animate>
                
                <div className="flex justify-between items-center gap-6 ">
                    <p className="text-[10px] opacity-[0.5] uppercase font-bold py-0 my-2">{product?.store}</p>
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
                <div className="flex flex-col gap-3 text-[16px] opacity-[0.7]">
                    {currencyFormatter(+product?.price)} 

                    {/* <div className="z-[2]">
                    {
                        cart.map(item => item.id).indexOf(product._id) === -1 ? 
                        <Button variant="secondary" className="text-[12px] rounded-full w-full" onClick={() => addToCart({id: product._id, quantity: 1, variation: { color: "black", size: "LG" }})} >Add to Cart</Button> 
                        : 
                        <Button variant="secondary"  className="text-[12px] rounded-full w-full"  onClick={() => removeFromCart(product._id)} >Remove</Button>
                    }
                    </div> */}
                </div>
        </div>
    )
}