'use client'

import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Footer() {
    const pathname  = usePathname()

    const noheader = ["dashboard", "admin", "agent", "login", "register"]

    return (
        <footer className={`bg-black text-white dark:bg-dark md:mt-[100px] mt-8 md:m-4 md:rounded-[20px] ${noheader.includes(pathname.split("/")[1]) ? "hidden": ""}`}>
            <div className="grid md:grid-cols-4 grid-cols-2 items-start md:gap-[30px] gap-[60px] md:px-[8%] p-8 py-[60px]">
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold md:text-[16px] text-[14px]">NAVIGATIONS</h2>
                    <li className=""><a href="/" className="py-[5px] w-full">Home</a></li>
                    <li className=""><a href="/about" className="py-[5px] w-full">About</a></li>
                    <li className=""><a href="/shop" className="py-[5px] w-full">Shop</a></li>
                    <li className=""><a href="/contact" className="py-[5px] w-full">Contact Us</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold md:text-[16px] text-[14px]">SUPPORTS</h2>
                    <li className=""><a href="/" className="py-[5px] w-full">Customer Support</a></li>
                    <li className=""><a href="/faqs" className="py-[5px] w-full">FAQs</a></li>
                    <li className=""><a href="/privacy-policy" className="py-[5px] w-full">Privacy Policy</a></li>
                    <li className=""><a href="/terms&conditions" className="py-[5px] w-full">T&C</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold md:text-[16px] text-[14px]">OFFERS</h2>
                    <li className=""><a href="/offers" className="py-[5px] w-full">New Buyer Code</a></li>
                    <li className=""><a href="/promo" className="py-[5px] w-full">Promo codes</a></li>
                </ul>
                <div className="flex flex-col gap-4">
                    <Link href="/" className="w-[70px] h-[30px] text-[#FF9100] rounded flex items-center md:text-[16px] text-[14px] font-bold">
                        CAMPUS <span className="text-[#16AF89]"> MART</span>
                    </Link>
                    <a href="mailto:support@Support@campus-mart.com" className="block py-1">Support@campus-mart.com</a>
                    <ul className="">
                        <div className="flex flex-wrap gap-4 py-2 mb-4">
                            <a href="https://facebook.com/campusmart_" className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></a>
                            <a href="https://x.com/campusmart_" className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></a>
                            <a href="https://instagram.com/campusmart_" className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></a>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-500/[0.2] text-center">
                <p className="px-[3%] py-10 flex items-center gap-2 justify-center">Campus-Mart &copy; Copyright  {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;