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
                    <h2 className="font-semibold md:text-[16px] text-[14px]">Company Info</h2>
                    <li className=""><a href="/about" className="py-[5px] w-full">About Campuxmart</a></li>
                    <li className=""><a href="/our-story" className="py-[5px] w-full">Our Story</a></li>
                    <li className=""><a href="/careers" className="py-[5px] w-full">Careers</a></li>
                    <li className=""><a href="/press" className="py-[5px] w-full">Press & Media</a></li>
                    <li className=""><a href="/contact" className="py-[5px] w-full">Contact Us</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold md:text-[16px] text-[14px]">For users</h2>
                    <li className=""><a href="/how-it-works" className="py-[5px] w-full">How It Works</a></li>
                    <li className=""><a href="/become-a-vendor" className="py-[5px] w-full">Become a Vendor</a></li>
                    <li className=""><a href="/vendor-guidelines" className="py-[5px] w-full">Vendor Guidelines</a></li>
                    <li className=""><a href="/buyer-faqs" className="py-[5px] w-full">Buyer FAQs</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold md:text-[16px] text-[14px]">Legal & Policies</h2>
                    <li className=""><a href="/privacy-policy" className="py-[5px] w-full">Privacy Policy</a></li>
                    <li className=""><a href="/terms&conditions" className="py-[5px] w-full">Terms & Conditions</a></li>
                    <li className=""><a href="/refund" className="py-[5px] w-full">Refund & Returns Policy</a></li>
                </ul>
                <div className="flex flex-col gap-4">
                    <Link href="/" className="w-[70px] h-[30px] text-[#FF9100] rounded flex items-center md:text-[16px] text-[14px] font-bold">
                        CAMPUX <span className="text-[#16AF89]"> MART</span>
                    </Link>
                    <p>Your campus, your marketplace.</p>
                    <ul className="">
                        <div className="flex flex-wrap gap-4 py-2 mb-4">
                            <a href="https://www.facebook.com/people/Campux-Mart/61571552696858/?mibextid=ZbWKwL" className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></a>
                            <a href="https://x.com/campuxmart" className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></a>
                            <a href="https://instagram.com/campuxmart" className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></a>
                        </div>
                    </ul>
                    <p>Secured by Swervepay, SSL Secured</p>
                </div>
            </div>
            <div className="border-t border-gray-500/[0.2] text-center">
                <p className="px-[3%] py-10 flex items-center gap-2 justify-center">Campuxmart &copy; Copyright  {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;