'use client'
import { ReactElement, useEffect, useState } from "react";
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";

interface Theme {
    id: string | number, img: ReactElement, title: string
}

type Themes = Array<Theme>


function ThemeSelector() {
    const [theme, setTheme] = useState("")
    const [fontSize, setFontSize] = useLocalStorage("size", "14px")

    const themes: Themes = [
        { id: 0, img: <Desktop />, title: "System" },
        { id: 1, img: <Sun />, title: "light" },
        { id: 2, img: <Moon />, title: "dark" },
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
        <button >                      
            {
            themes.map(item => {
                return (
                    <span key={item.id} className={`relative text-[20px] ${item.title === theme ? "block" : "hidden"}`} aria-label={"Theme setting changed to "+ theme} onClick={() => themeChange(item.title === "System" ? "light" : item.title === "light" ? "dark" : "System" )} >{item.img}</span>
                )
            })}
        </button>
    )
}

export default ThemeSelector;