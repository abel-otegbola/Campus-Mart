'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { Bag, Bed, BeerBottle, Bicycle, Book, BookOpen, Briefcase, Bus, Car, Chair, Code, Coffee, File, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, Laptop, Palette, PawPrint, Pencil, ShirtFolded, Ticket, Watch, X } from "@phosphor-icons/react";
import Link from "next/link";
import { PiDiamond } from "react-icons/pi";
import { TbPerfume } from "react-icons/tb";

export default function Categories({ open, setOpen }: {open: boolean, setOpen: (aug0: boolean) => void}) {

    const categories = [
      { id: 8, title: "Clothing", icon: <ShirtFolded /> },
      { id: 14, title: "Gadgets", icon: <Watch /> },
      { id: 16, title: "Jewellery and Accessories", icon: <PiDiamond /> },
      { id: 19, title: "Perfumes and Scents", icon: <TbPerfume /> },
      { id: 22, title: "Rending Services (CAC, SCRUM registration)", icon: <File /> },
  ];

    const modalRef = useOutsideClick(setOpen, false)

    return (
        <div className={`fixed top-[0px] left-0 transition-all duration-700 bg-dark/[0.8] h-screen z-[2000] ${open ? "w-[100%]" : "w-[0%]"}`}>
            <div ref={modalRef} className={`w-[300px] h-[100%] overflow-y-auto ${open ? "transition-x-[0]" : "transition-x-[-100%]"}  relative p-4 bg-white dark:bg-black dark:text-gray shadow-md duration-700 overflow-y-auto border border-gray-500/[0.2]`}>
                <button className="p-4 bg-primary absolute top-0 right-0" onClick={() => setOpen(false)}><X /></button>
              {
                categories?.map((option) => (
                  <Link href={"/shop?query=" + option.title} tabIndex={1} key={option.id} 
                    className={`p-4 py-2 flex w-full items-center cursor-pointer gap-2 mb-[2px] hover:text-primary bg-white dark:bg-dark/[0.08]`}
                  >
                    <span className="">{option.icon}</span>
                    {option.title}
                  </Link>
                ))
              }
            </div>
        </div>
    )
}