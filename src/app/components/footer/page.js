import Image from "next/image";
import Search from "../search/page";
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter, TbHeadset, TbHeart, TbHome, TbListDetails, TbMoneybag, TbPhoneCall } from "react-icons/tb";
import { PiStorefront } from "react-icons/pi";

export default function Footer() {
    return (
        <footer className="border border-transparent border-t-gray-100 dark:border-t-gray-900">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 md:px-[8%] px-[3%] pt-[100px] pb-[30px]">
                <ul className="">
                    <a href='/' className="md:w-[20%] text-blue font-bold text-[18px] mb-2">
                        <Image src="/logo.svg" alt="campus-mart logo" width={40} height={30} />
                        <h2 className="font-bold text-[18px] mt-2">Campus Mart</h2>
                    </a>
                    <Search />
                    <p className="py-4">Discover, Trade, Thrive: Your Campus, Your Marketplace!</p>
                </ul>
                
                <ul className="">
                    <h3 className="font-bold mb-3">MAIN LINKS</h3>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/"><TbHome className="text-[16px] text-blue"/>Home</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/stores"><PiStorefront className="text-[16px] text-blue"/>Stores</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/wishlist"><TbHeart className="text-[16px] text-blue"/>Wishlist</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/store"><TbMoneybag className="text-[16px] text-blue"/>Become a Seller</a></li>
                </ul>

                <ul className="">
                    <h3 className="font-bold mb-3">CUSTOMER SUPPORT</h3>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/help"><TbHeadset className="text-[16px] text-blue"/>Help</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/services"><TbListDetails className="text-[16px] text-blue"/>Services</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="/contact-us"><TbPhoneCall className="text-[16px] text-blue"/>Contact Us</a></li>
                </ul>

                <ul className="">
                    <h3 className="font-bold mb-3">SOCIALS</h3>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="https://facebook.com"><TbBrandFacebook className="text-[16px] text-blue"/>Facebook</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="https://twitter.com"><TbBrandTwitter className="text-[16px] text-blue"/>Twitter</a></li>
                    <li className="py-2 hover:text-blue"><a className="flex items-center gap-2" href="https://instagram.com"><TbBrandInstagram className="text-[16px] text-blue"/>Instagram</a></li>
                </ul>
            </div>
            <div className="flex items-center justify-between md:mx-[8%] mx-[3%] py-4 text-white border border-transparent border-t-gray-300 dark:border-t-gray-800">
                <h2 className="flex items-center gap-2">Built with <TbHeart /></h2>
                <h2>Copyright &copy; {new Date().getFullYear()}</h2>
            </div>
        </footer>

    )
}