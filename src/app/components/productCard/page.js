
import Image from "next/image";
import { PiHeart, PiHeartBold, PiShoppingCartLight, PiStar } from "react-icons/pi";
import { TbCurrencyNaira } from "react-icons/tb";

export default function ProductCard({ product }) {
    const addToCart = (id) => {
        let store = { cart: [], wishlist: [] }

        if(store.cart.indexOf(id) !== -1) {
            store = { 
                wishlist: store.wishlist, 
                cart: store.cart.filter(item => item === id) 
            }
        }
        else {
            store = { 
                wishlist: store.wishlist, 
                cart: store.cart.map(item => ( item.indexOf(id) !== -1 ? id : item )) 
            }
        }
        

        console.log(store)
    }

    return (
        <div className="p-2 border border-gray-200 dark:border-gray-900">
            <div className="relative sm:h-[250px] h-[200px]">
                <Image src={product?.thumbnail} fill sizes="100%" className="rounded bg-fill" />
                <div className="absolute top-2 right-2 cursor-pointer">
                    {
                        product?.id%2 === 0 ? <PiHeartBold  className="text-[20px] text-red-500" /> : <PiHeart className="text-[20px] text-gray-400" />
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
                    <PiShoppingCartLight className="text-[20px]" />
                </div>
            
            </div>
        </div>
    )
}