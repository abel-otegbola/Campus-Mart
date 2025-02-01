'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { Bag, Bed, BeerBottle, Bicycle, Book, BookOpen, Briefcase, Bus, Car, Chair, Code, Coffee, File, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, Laptop, Palette, PawPrint, Pencil, ShirtFolded, Ticket, Watch, X } from "@phosphor-icons/react";
import Link from "next/link";
import { PiDiamond } from "react-icons/pi";
import { TbPerfume } from "react-icons/tb";

export default function Categories({ open, setOpen }: {open: boolean, setOpen: (aug0: boolean) => void}) {

    const categories = [
      { id: 1, title: "Accommodation", icon: <House /> },
      { id: 2, title: "Art & Craft Supplies", icon: <Palette /> },
      { id: 3, title: "Bags & Backpacks", icon: <Bag /> },
      { id: 4, title: "Bicycles", icon: <Bicycle /> },
      { id: 5, title: "Books", icon: <Book /> },
      { id: 6, title: "Bedding & Home Essentials", icon: <Bed /> },
      { id: 7, title: "Bike & Car Accessories", icon: <Car /> },
      { id: 8, title: "Clothing", icon: <ShirtFolded /> },
      { id: 9, title: "Cosmetics & Skincare", icon: <BeerBottle /> },
      { id: 10, title: "Food & Beverages", icon: <Coffee /> },
      { id: 11, title: "Electronics", icon: <Laptop /> },
      { id: 12, title: "Event Tickets", icon: <Ticket /> },
      { id: 13, title: "Gaming", icon: <GameController /> },
      { id: 14, title: "Gadgets", icon: <Watch /> },
      { id: 15, title: "Health & Wellness", icon: <Heart /> },
      { id: 16, title: "Jewellery and Accessories", icon: <PiDiamond /> },
      { id: 17, title: "Part-time Jobs", icon: <Briefcase /> },
      { id: 18, title: "Pet Supplies", icon: <PawPrint /> },
      { id: 19, title: "Perfumes and Scents", icon: <TbPerfume /> },
      { id: 20, title: "Sports Equipment", icon: <Football /> },
      { id: 21, title: "Second-hand Textbooks", icon: <BookOpen /> },
      { id: 22, title: "Rending Services (CAC, SCRUM registration)", icon: <File /> },
      { id: 23, title: "Music Instruments", icon: <Guitar /> },
      { id: 24, title: "Movies & Entertainment", icon: <FilmStrip /> },
      { id: 25, title: "Software & Digital Tools", icon: <Code /> },
      { id: 26, title: "Stationery", icon: <Pencil /> },
      { id: 27, title: "Tutoring Services", icon: <GraduationCap /> },
      { id: 28, title: "Travel Accessories", icon: <Bus /> },
      { id: 29, title: "Furniture", icon: <Chair /> },
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