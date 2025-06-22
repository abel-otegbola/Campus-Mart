'use client'
import { useContext, useEffect, useState } from "react"
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa"
import Button from "../../components/button/button"
import { storeContext } from "@/context/useStore"
import { useSearchParams } from "next/navigation"
import { ICart, IProduct } from "@/interface/store"
import Skeleton from "@/components/skeleton/skeleton"
import ProductCard from "@/components/cards/productCard"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import Link from "next/link"
import ProductSlider from "@/components/productSlider/productSlider"
import { AuthContext } from "@/context/useAuth"
import Slider from "react-slick"
import Image from "next/image"

export default function Product() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id") || "0"
    const { cart, addToCart, removeFromCart, changeQuantity, wishlist, addToWishlist, removeFromWishlist, products } = useContext(storeContext)
    const [color] = useState("Black")
    // const [design, setDesign] = useState(1)
    const [size] = useState("S")
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState("reviews")
    const { user } = useContext(AuthContext)

    // useEffect(() => {
    //     setColor(cart.filter((item: ICart) => item.id === id).map((item: ICart) => item?.variation.color)[0])
    //     setSize(cart.filter((item: ICart) => item.id === id).map((item: ICart) => item?.variation.size)[0])
    // }, [cart, id])

    useEffect(() => {
        setLoading(true)
        setProduct(products.filter(item => item._id === id)[0])
        setLoading(false)
    }, [id, products])


    // const changeColor = (id: number | string | null, color: string) => {
    //     let newList = cart.map((item: any) => {
    //         if(item.id === id) {
    //             return {...item, color }
    //         }
    //         else return item;
    //     })
    //     setCart(newList)
    // }

    // const changeSize = (id: number | string | null, size: string) => {
    //     let newList = cart.map((item: any) => {
    //         if(item.id === id) {
    //             return {...item, size }
    //         }
    //         else return item;
    //     })
    //     setCart(newList)
    // }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="md:px-[8%] px-6 md:py-[50px] py-[20px]">
            {
                loading ? <Skeleton type="rectangle" /> :
                    <div key={id}>
                        <div className="relative flex flex-wrap my-2 rounded mb-12">
                            <div className="relative h-[440px] md:w-[40%] w-full">
                                <Slider {...settings} className="w-full h-full overflow-hidden">
                                      {
                                        product?.images?.map((img, index) => (
                                              <div
                                                  key={index}
                                                  className={`relative flex flex-col gap-4 justify-center md:px-[8%] px-4 pb-[3%] top-0 h-[440px]`}
                                              >
                                                <Image alt={img} key={index} fill={true} className={`absolute top-0 left-0 w-full h-full bg-cover bg-center object-cover`} 
                                                    src={img}
                                                />
                                                </div>
                                          ))     
                                      }
                                </Slider>
                            </div>
                            <div className="md:px-[3%] md:py-0 py-6 md:w-[60%] w-full">
                                <h2 className="py-2 md:text-[28px] text-[18px] font-medium">{product?.title}</h2>
                                <div className="flex justify-between items-center gap-6">
                                    <p className="flex items-center text-[24px] font-bold py-4">{currencyFormatter(+(product?.price || 0))}</p>
                                    <div>
                                        {
                                            wishlist.indexOf(id || "") === -1 ? 
                                            <button className="flex items-center gap-2 animate-zoom-in text-tetiary h-[40px] px-4" onClick={() => addToWishlist(id || "") }><FaHeart size={20}/></button> 
                                            : 
                                            <button className="flex items-center gap-2 animate-zoom-in h-[40px] px-4 text-red-500" onClick={() => removeFromWishlist(id || "")}><FaHeart size={20}/></button> 
                                        }
                                    </div>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                    TAGS: {product?.tags?.map(tag => <span className="px-3 py-1 text-[10px] border border-gray-500/[0.08] rounded-[20px]" key={tag}>{tag}</span>) }
                                </div> */}
                                <p className="py-4">CATEGORY: {product?.category}</p>

                                <Link href={`/store/${product?.store?.replaceAll(" ", "-")}`} className="h-full">STORE: {product?.store}</Link>

                                <div dangerouslySetInnerHTML={{ __html: product?.description || ""}} className="py-4"></div>

                                {
                                    user?.email === product?.store ?
                                    <Button size="small" variant="secondary" href={`/dashboard/inventory/edit?id=${product?._id}`}>Edit</Button>
                                    :
                                    ""
                                }
                                

                                <div className="mt-4 flex flex-wrap gap-4 justify-between items-center py-4 border border-transparent border-y-gray-500/[0.09]">
                                    {
                                    product?.variations?.colors ? 
                                    <div className="">
                                        <p>Colors</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            {
                                                product?.variations.colors?.map((item: { name: string, img: string }, i: number) => (
                                                    <button 
                                                        key={i} 
                                                        style={{ backgroundColor: item.name }} 
                                                        className={`w-[25px] h-[25px] rounded-full border ${color === item.name ? "border-primary outline outline-offset-1 outline-primary" : "border-gray-500/[0.4]"}`} 
                                                        // onClick={() => {setColor(item); changeColor(id, item)}}
                                                    >
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    ""
                                    }
                                    {
                                    product?.variations?.colors ? 
                                    <div className="">
                                        <p>Size</p>
                                        <div className="grid grid-cols-5 items-center gap-4 mt-4">
                                            {
                                                product?.variations.size?.map((item, i) => (
                                                    <button 
                                                        key={i} 
                                                        className={`p-[1px] w-full px-2 rounded ${size === item.name ? "bg-primary" : "border border-gray-500/[0.4]"}`} 
                                                        // onClick={() => {setSize(item); changeSize(id, item)}}
                                                    >{item.name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    ""
                                    }
                                </div>

                                


                                <div className="mt-6 flex items-center gap-4 md:py-4">
                                    
                                    <div className="text-[14px] sm:px-0 py-4 bg-white dark:bg-black w-full">
                                    {
                                        cart.map((item: ICart) => item.id).indexOf(id || "") === -1 ? 
                                        <Button className="min-w-[280px] rounded-full" onClick={() => addToCart({id: id ||  "0", quantity: 1, variation: { color: "black", size: "LG" }}) }>Add to Cart</Button> 
                                        : 
                                        <div className="flex flex-wrap gap-6">
                                            <div className="flex items-center gap-1 animate-zoom-in border border-gray-500/[0.1] rounded-lg">
                                                <button className="h-[40px] p-[12px]" onClick={() => changeQuantity(id || "", "MINUS")}><FaMinus /></button>
                                                <input className="p-[4px] py-0 text-center rounded bg-transparent w-[40px] text-[10px] py-2 text-center border border-gray-500/[0.2]" type="number" value={cart.filter((item: ICart) => item.id === id).map((item: ICart) => item.quantity).toString()} onChange={(e) => changeQuantity(id, +e.target.value)} />
                                                <button className="h-[40px] p-[12px]" onClick={() => changeQuantity(id || "", "ADD")}><FaPlus /></button>
                                            </div> 
                                            <Button size="small" variant="secondary" className="min-w-[280px] rounded-full" onClick={() => removeFromCart(id || "")}>Remove from Cart</Button>
                                        </div>
                                        
                                    }
                                    </div>

                                   
                                </div>
                            </div>
                        </div> 
                        <div className="mt-4">
                            <div className="flex gap-6 items-center border border-transparent border-b-gray-500/[0.2] mb-4">
                                <button className={`py-2 ${active === "reviews" ? "border border-transparent border-b-primary text-primary": ""}`} onClick={() => setActive("reviews")}>Product Reviews</button>
                                <button className={`py-2 ${active === "seller" ? "border border-transparent border-b-primary text-primary": ""}`} onClick={() => setActive("seller")}>Seller Information</button>
                            </div>
                            <div className="w-full overflow-hidden">
                                <div className="flex w-[200%]">
                                    <div className={`${active === "reviews" ? "translate-x-0" : "translate-x-[-100%]"} w-[100%] transform-all duration-700`}>
                                        <h2 className="font-semibold uppercase">Product Reviews:</h2>
                                        <div className="h-full">No reviews posted yet</div>
                                    </div>     
                                    <div className={`${active === "seller" ? "translate-x-[-100%]" : "translate-x-[100%]"} w-[100%] transform-all duration-700`}>
                                        <h2 className="font-semibold uppercase">Seller&apos;s Information</h2>
                                        <Link href={`/store/${product?.store?.replaceAll(" ", "-")}`} className="h-full">{product?.store}</Link>
                                    </div>     
                                </div>                           
                            </div>
                        </div>
                        <h2 className="border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] mt-20 text-primary text-semibold uppercase">Related Products</h2>
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 py-[40px] ">
                            {
                                products.filter((item: IProduct) => (item.category === product?.category) && item._id !== id).slice(0,5).map((product: IProduct) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                            }
                        </div>
                    </div>
                    
            }

        </div>
    )
}