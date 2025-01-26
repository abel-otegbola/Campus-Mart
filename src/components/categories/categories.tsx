'use client'
import { Bicycle, Book, Briefcase, Bus, Chair, Coffee, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, Laptop, Palette, PawPrint, Pencil, ShirtFolded, Ticket, Watch, X } from "@phosphor-icons/react";
import Link from "next/link";
import { TbPerfume } from "react-icons/tb";

export default function Categories({ open, setOpen }: {open: boolean, setOpen: (aug0: boolean) => void}) {

    const categories = [
        { id: 0, title: "Gadgets", icon: <Watch /> },
        { id: 1, title: "Books", icon: <Book /> },
        { id: 2, title: "Clothing", icon: <ShirtFolded /> },
        { id: 3, title: "Stationery", icon: <Pencil /> },
        { id: 4, title: "Electronics", icon: <Laptop /> },
        { id: 5, title: "Furniture", icon: <Chair /> },
        { id: 6, title: "Sports Equipment", icon: <Football /> },
        { id: 7, title: "Music Instruments", icon: <Guitar /> },
        { id: 8, title: "Bicycles", icon: <Bicycle /> },
        { id: 9, title: "Food & Beverages", icon: <Coffee /> },
        { id: 10, title: "Tutoring Services", icon: <GraduationCap /> },
        { id: 11, title: "Accommodation", icon: <House /> },
        { id: 12, title: "Event Tickets", icon: <Ticket /> },
        { id: 13, title: "Health & Wellness", icon: <Heart /> },
        { id: 14, title: "Part-time Jobs", icon: <Briefcase /> },
        { id: 15, title: "Art & Craft Supplies", icon: <Palette /> },
        { id: 16, title: "Travel Accessories", icon: <Bus /> },
        { id: 17, title: "Gaming", icon: <GameController /> },
        { id: 18, title: "Movies & Entertainment", icon: <FilmStrip /> },
        { id: 19, title: "Pet Supplies", icon: <PawPrint /> },
        { id: 20, title: "Perfumes and Scents", icon: <TbPerfume /> }
    ] 


    return (
        <div className={`fixed top-[0px] left-0 transition-all duration-700 bg-dark/[0.8] h-screen z-[2000] ${open ? "w-[100%]" : "w-[0%]"}`}>
            <div className={`w-[300px] ${open ? "transition-x-[0]" : "transition-x-[-100%]"}  relative p-4 bg-white dark:bg-black dark:text-gray shadow-md duration-700 overflow-y-auto border border-gray-500/[0.2]`}>
                <button className="p-4 bg-primary absolute top-0 right-0" onClick={() => setOpen(false)}><X /></button>
              {
                categories?.map((option) => (
                  <Link href={"/shop?query=" + option.title} tabIndex={1} key={option.id} 
                    className={`p-4 flex w-full items-center cursor-pointer gap-2 mb-[2px] hover:text-primary bg-white dark:bg-dark/[0.08]`}
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