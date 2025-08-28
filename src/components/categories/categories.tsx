'use client'
import { useOutsideClick } from "@/helpers/useClickOutside";
import { Plus, X } from "@phosphor-icons/react";
import Link from "next/link";

export default function Categories({ open, setOpen }: {open: boolean, setOpen: (aug0: boolean) => void}) {

    const categories = [
      { id: 8, title: "fashion"},
      { id: 14, title: "gadgets" },
      { id: 16, title: "jewellery and accessories" },
      { id: 19, title: "perfumes and scents" },
      { id: 22, title: "rending services (CAC, SCRUM registration)" },
  ];

    const modalRef = useOutsideClick(setOpen, false)

    return (
        <div className={`fixed top-[0px] left-0 transition-all duration-700 bg-dark/[0.8] h-screen z-[2000] ${open ? "w-[100%]" : "w-[0%]"}`}>
            <div ref={modalRef} className={`w-[300px] h-[100%] py-8 overflow-y-auto ${open ? "transition-x-[0]" : "transition-x-[-100%]"}  relative p-4 bg-white dark:bg-black dark:text-gray shadow-md duration-700 overflow-y-auto border border-gray-500/[0.2]`}>
              <h2 className="mb-8 py-4 border-b border-gray-500/[0.2] font-medium">Categories</h2>
                <button className={`p-4 bg-primary absolute top-0 right-0 text-white`} onClick={() => setOpen(false)}><X /></button>
              {
                categories?.map((category) => (
                  <Link key={category.id} onClick={() => setOpen(false)} className="flex items-center justify-between hover:text-primary gap-2 py-4 text-[12px] border-b border-gray-500/[0.1]" href={`/shop?query=${category.title}`}>
                    <div className="flex items-center gap-4">
                        <p className="capitalize">{category.title}</p>
                    </div>
                    <Plus className="opacity-[0.5]" />
                </Link>
                ))
              }
            </div>
        </div>
    )
}