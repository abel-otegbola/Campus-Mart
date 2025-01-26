'use client'
import { categories } from "@/app/register/page";
import { X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react"

export default function Categories({ open, setOpen }: {open: boolean, setOpen: (aug0: boolean) => void}) {

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