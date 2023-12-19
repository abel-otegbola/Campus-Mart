'use client'
import { useState } from "react";
import { PiStorefront } from "react-icons/pi";
import { TbBell, TbChevronRight, TbDashboard, TbHome, TbLock, TbMenu, TbMenu2, TbPassword, TbUserCircle } from "react-icons/tb";

export default function Settings() {
    const [active, setActive] = useState("General")
    const [open, setOpen] = useState(false)

    const links = [
        { id: 0, title: "General", icon: <TbDashboard />, suffix: "" },
        { id: 1, title: "Profile", icon: <TbUserCircle />, suffix: <span className="p-1 px-2 text-[10px] rounded-full bg-blue/[0.1]">1</span> },
        { id: 2, title: "Password", icon: <TbLock />, suffix: <span className="p-1 px-2 text-[8px] rounded-full bg-purple-500/[0.1]">Change</span> },
        { id: 3, title: "Notifications", icon: <TbBell />, suffix: <span className="p-1 px-2 text-[10px] rounded-full bg-red-500/[0.1]">10</span> },
        { id: 4, title: "Store", icon: <PiStorefront />, suffix: <span className="p-1 px-2 text-[8px] rounded-full bg-green-500/[0.1]">NEW</span> },
    ]

    return (
        <div>
            <div className="sticky top-[60px] left-0 flex gap-2 items-center md:px-[8%] px-[3%] py-4 bg-white dark:bg-black border border-transparent border-y-gray-100 dark:border-y-gray-900 z-4">
                <button className="md:hidden block border-none pr-4 mr-2" onClick={() => setOpen(!open)}><TbMenu2 className="text-[16px]"/></button>
                <a href="/" className="hover:text-blue text-[16px] opacity-[0.7]"><TbHome /></a> 
                <TbChevronRight /> 
                <a href="/settings" className="hover:text-blue opacity-[0.7]">SETTINGS</a> 
                <TbChevronRight /> 
                <a href={"#" + active} className="hover:text-blue">{active.toUpperCase()}</a>
            </div>
            <div className="relative flex md:px-[8%] px-[3%] min-h-[100vh]">
                <div className={`h-full rounded md:sticky md:top-[120px] absolute top-0 left-0 bg-white dark:bg-black border border-transparent border-x-gray-100 dark:border-x-gray-900 overflow-hidden transition-all duration-700
                                ${open ? "w-[250px]" : "md:w-[250px] w-0"}`}>

                    {
                        links.map(link => (
                            <a
                                key={link.id}
                                href={"#" + link.title} 
                                className={`flex py-3 px-4 justify-between rounded items-center my-1 ${active === link.title ? "bg-gray-100 dark:bg-gray-900 text-blue" : "hover:bg-gray-100 hover:dark:bg-gray-900 hover:text-blue"}`}
                                onClick={() => setActive(link.title)}
                            >
                                <div className="flex gap-2 items-center">
                                    <div className="text-[20px]">{link.icon}</div>
                                    <p className='hover:text-blue'>{link.title}</p> 
                                </div>
                                {link.suffix}

                            </a>
                        ))
                    }
                    
                    
                </div>

                <div className="flex-1 px-[3%] py-[30px]">
                    <h2>Settings</h2>
                </div>
            </div>
        </div>
    )
}