import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { IProduct } from "@/interface/store";
import { } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";
import Button from "../button/button";
import { AuthContext } from "@/context/useAuth";
import { LoaderIcon } from "react-hot-toast";

export default function InventoryCard({ product }: { product: IProduct }) {
    const { user } = useContext(AuthContext)
    const { removeProduct, loading: isDeleting } = useContext(storeContext)

    return (
        <div className={`flex flex-col bg-white dark:bg-[#000]/[0.1] border border-gray-500/[0.2] relative break-inside-avoid md:mb-4 mb-2 pb-4 `} data-aos="fade-up">
                <Link href={`/account/inventory/edit?id=${product?._id}`} className="block rounded sm:h-[250px] h-[250px] bg-gray-500/[0.1] bg-cover bg-center" style={{backgroundImage: `url("${product?.images[0]}")`}} >
                </Link>
                
                <p className="text-[10px] opacity-[0.5] uppercase font-bold px-3 py-0 my-2">{product?.category}</p>
                <a  href={`/account/inventory/edit?id=${product?._id}`} className="block pb-4 px-3 leading-[130%] text-[12px] font-semibold">{product?.title}</a>
                <div className="flex flex-col gap-3 text-[16px] opacity-[0.7] px-3">
                    {currencyFormatter(+product?.price)} 
                    
                    <td className="py-2 flex gap-2">
                        <Button size="small" variant="secondary" href={`/account/inventory/edit?id=${product?._id}`}>Edit</Button>
                        <Button size="small" variant="secondary" className="border-red-500 text-red-500" onClick={() => removeProduct(product?._id || "", user?.fullname || "")}>{isDeleting ? <LoaderIcon /> : "Delete"}</Button>
                    </td>
                </div>
        </div>
    )
}