'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { CheckCircle } from "@phosphor-icons/react";

interface Theme {
    id: string | number, img: string, title: string
}

type Themes = Array<Theme>


function Settings() {
    const [theme, setTheme] = useState("")
    const [fontSize, setFontSize] = useLocalStorage("size", "14px")

    const themes: Themes = [
        { id: 0, img: "/system.png", title: "System" },
        { id: 1, img: "/light.png", title: "light" },
        { id: 2, img: "/dark.png", title: "dark" },
    ]

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setTheme("dark")
        } else {
            document.documentElement.classList.remove('dark')
            setTheme("light")
        }
        if(!localStorage.theme) {
            setTheme("System")
        }
    }, [theme])

    const themeChange = (value: string) => {
        setTheme(value)
        if(value === 'light') {
            localStorage.theme = 'light'
        }
        else if(value === 'dark') {
            localStorage.theme = 'dark'
        }  
        else {
            localStorage.removeItem('theme')
        } 
    }

    return (
        <>
        <div className="flex flex-col items-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
            <h2 className="font-bold text-[28px] uppercase">Settings</h2>
        </div>
        <div className="md:flex items-start min-h-[80vh] md:px-[7.5%] px-6">
            
            <div className="md:m-2 flex-1 pt-[60px]">
                <div className=" mb-6">
                    <div className="mb-4 pb-2 border-b border-gray-500/[0.2]">
                        <h3 id="appearance" className="py-2 text-[20px] font-semibold">Appearance</h3>
                        <p className="">Select or customize your ui theme</p>
                    </div>
                    <div className="md:w-[40%] grid grid-cols-3 gap-4 py-2">
                        {
                            themes.map(item => {
                                return (
                                    <div key={item.id} className={`${item.title === theme ? "text-primary" : "hover:text-primary"}`} aria-label={"Theme setting changed to "+ theme} onClick={() => themeChange(item.title)}>
                                        <div className={`relative w-full bg-gray-200 dark:bg-slate-200/[0.08] cursor-pointer rounded-lg border ${theme === item.title ? "border-primary/[0.5] outline outline-primary/[0.2] outline-offset-2" : "border-transparent hover:border-primary/[0.5]"}`}>
                                            { theme === item.title ? <CheckCircle className="absolute bottom-1 left-1 text-lg text-primary" /> : "" }
                                            <Image src={item.img} alt="theme" width={300} height={300} className="w-full rounded" />
                                        </div>
                                        <h2 className="p-2 capitalize">{item.title}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>

        </div>
        </>
    )
}

export default Settings;