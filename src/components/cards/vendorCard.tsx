import { UserData } from "@/interface/profile";
import Link from "next/link";

export default function VendorCard({vendor }: { vendor: UserData }) {

    return (
        <div className={`flex flex-col bg-white dark:bg-[#000]/[0.1] relative break-inside-avoid md:mb-4 mb-2 pb-4 `} data-aos="fade-up">
                <Link href={`/store?seller=${vendor.business_name}`} className="block rounded sm:h-[250px] h-[250px] bg-gray-500/[0.1] bg-cover bg-center" style={{backgroundImage: `url("${vendor?.img}")`}} >
                </Link>
                
                <p className="text-[10px] opacity-[0.5] uppercase font-bold px-3 py-0 my-2">{vendor?.business_category}</p>
                <a href={`store?seller=${vendor.business_name}`} className="block pb-4 px-3 leading-[130%] text-[16px] font-semibold">{vendor?.business_name}</a>
                <div className="flex flex-col gap-3 text-[16px] opacity-[0.7] px-3">

                    <div className="z-[2]">
                    </div>
                </div>
        </div>
    )
}