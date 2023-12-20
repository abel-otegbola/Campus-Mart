'use client'
import Button from "@/app/components/button/page";
import InputField from "@/app/components/inputField/page";
import { useEffect, useState } from "react";
import { PiDesktop, PiMoon, PiStorefront, PiSun } from "react-icons/pi";
import { TbBell, TbChevronRight, TbDashboard, TbHome, TbLock, TbMenu2, TbUserCircle } from "react-icons/tb";
import { FaTimes } from "react-icons/fa"

export default function Settings() {
    const [active, setActive] = useState("General")
    const [open, setOpen] = useState(false)
    const [theme, setTheme] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const [password, setPassword] = useState("")
    const [notifications, setNotifications] = useState(true)

    const links = [
        { id: 0, title: "General", icon: <TbDashboard />, suffix: "" },
        { id: 1, title: "Profile", icon: <TbUserCircle />, suffix: <span className="p-1 px-2 text-[10px] rounded-full bg-blue/[0.1]">1</span> },
        { id: 2, title: "Password", icon: <TbLock />, suffix: <span className="p-1 px-2 text-[8px] rounded-full bg-purple-500/[0.1]">Change</span> },
        { id: 3, title: "Notifications", icon: <TbBell />, suffix: <span className="p-1 px-2 text-[10px] rounded-full bg-red-500/[0.1]">10</span> },
        { id: 4, title: "Store", icon: <PiStorefront />, suffix: <span className="p-1 px-2 text-[8px] rounded-full bg-green-500/[0.1]">NEW</span> },
    ]

    const handleDarkmode = (mode) => {
        if(mode === "theme") {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem('theme')
            setTheme("system")
            document.documentElement.classList.remove('dark')
        }
        else {
            localStorage.theme = mode
            setTheme(mode)
            if(mode === "dark") {
                docuemnt.documentElement.classList.add("dark")
            }
        }
    }

    useEffect(() => {
        setTheme(!localStorage.theme || localStorage.theme === null ? "system" : localStorage.theme)
    }, [theme])

    return (
        <div>
            <div className="sticky top-[53px] left-0 flex gap-2 items-center md:px-[8%] px-[3%] py-4 bg-white dark:bg-black border border-transparent border-y-gray-100 dark:border-y-gray-900 z-[4]">
                <button className="md:hidden block border-none pr-4 mr-2" onClick={() => setOpen(!open)}>
                    {
                        open ? <FaTimes className="text-[16px]" /> :
                    <TbMenu2 className="text-[16px]"/>
                    }
                </button>
                <a href="/" className="hover:text-blue text-[16px] opacity-[0.7]"><TbHome /></a> 
                <TbChevronRight /> 
                <a href="/settings" className="hover:text-blue opacity-[0.7]">SETTINGS</a> 
                <TbChevronRight /> 
                <a href={"#" + active} className="hover:text-blue">{active.toUpperCase()}</a>
            </div>
            <div className="relative flex md:px-[8%] py-[30px] items-stretch min-h-[100vh]">
                <div className={`h-full rounded md:sticky md:top-[120px] absolute top-0 left-0 bg-white dark:bg-black md:border-none border border-transparent border-x-gray-100 dark:border-x-gray-900 overflow-hidden transition-all duration-700 z-[3]
                                ${open ? "w-[250px] md:px-0 px-2" : "md:w-[250px] w-0"}`}>

                    {
                        links.map(link => (
                            <a
                                key={link.id}
                                href={"#" + link.title} 
                                className={`flex py-3 px-4 justify-between rounded-full items-center my-1 border transition-all ${active === link.title ? "border border-blue text-blue" : "hover:bg-blue/[0.1] border-transparent hover:text-blue"}`}
                                onClick={() => setActive(link.title)}
                            >
                                <div className="flex gap-2 items-center">
                                    <div className="text-[20px] opacity-[0.5]">{link.icon}</div>
                                    <p className='hover:text-blue'>{link.title}</p> 
                                </div>
                                {link.suffix}
                            </a>
                        ))
                    }
                    
                </div>

                <div className="flex-1 md:px-[5%] px-[3%]">
                    {
                        active === "General" ?
                        <div>
                            <h2 className="text-[25px] font-bold border border-transparent border-b-gray-100 dark:border-b-gray-900 mb-4">General</h2>
                            <p className="py-2">Appearance</p>
                            <p>Choose between dark mode, light mode and default system settings</p>
                            <div className="flex items-center justify-between dark:bg-gray-900 bg-gray-100 gap-2 p-2 my-6 rounded text-[12px] md:w-[75%] w-full">
                                <button className={`flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-900 p-3 px-4 rounded w-[49%] ${theme === "system" ? "bg-blue text-white" : "dark:bg-black bg-white"}`} onClick={() => handleDarkmode("theme")}><PiDesktop className="text-[18px]"/> System</button>
                                <button className={`flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-900 p-3 px-4 rounded w-[49%] ${theme === "light" ? "bg-blue text-white" : "dark:bg-black bg-white"}`} onClick={() => handleDarkmode("light")}><PiSun className="text-[18px]" /> Light</button>
                                <button className={`flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-900 p-3 px-4 rounded w-[49%] ${theme === "dark" ? "bg-blue text-white" : "dark:bg-black bg-white"}`} onClick={() => handleDarkmode("dark")}><PiMoon className="text-[18px]" /> Dark</button>
                            </div>
                        </div>

                        : active === "Profile" ?
                        <div>
                        <h2 className="text-[25px] font-bold border border-transparent border-b-gray-100 dark:border-b-gray-900 mb-4">Profile</h2>
                            <p>Avatar</p>
                            <div className="flex items-center gap-3 my-6 rounded text-[12px] w-full">
                                <div className="w-[100px] h-[100px] dark:bg-gray-800 bg-gray-200 rounded-full"></div>
                                <div>
                                    <button className={`flex items-center justify-center mb-4 gap-2 border border-gray-200 dark:border-gray-900 p-3 px-4 rounded w-[49%]`} >Upload new image</button>
                                    <p>At least 800x800 px recommended. JGP or PNG and GIF is allowed</p>
                                </div>
                            </div>
                            <InputField label={"Name"} action={setName} type={"text"} />
                            <InputField label={"Email Address"} action={setEmail} type={"email"} />
                            <InputField label={"Location"} action={setLocation} type={"text"} />
                            <Button text={"Save changes"} to={"#"} type={"long"} />
                        </div>

                        : active === "Password" ?
                        <div>
                            <h2 className="text-[25px] font-bold border border-transparent border-b-gray-100 dark:border-b-gray-900 mb-4">Password</h2>
                            <InputField label={"Old password"} action={setPassword} type={"text"} />
                            <InputField label={"New password"} action={setPassword} type={"password"} />
                            <InputField label={"Confirm new password"} action={setPassword} type={"password"} />
                            
                            <Button text={"Change password"} to={"#"} type={"long"} />
                        </div>

                        : active === "Notifications" ?
                        <div>
                            <div className="flex justify-between items-center border border-transparent border-b-gray-100 dark:border-b-gray-900">
                                <h2 className="text-[25px] font-bold mb-4">Notifications</h2>
                                <div className={`w-[35px] gap-3 p-[2px] rounded-full ${notifications ? "bg-blue" : "dark:bg-gray-700 bg-gray-200"}`}>
                                    <button className={`w-[5px] flex items-center justify-center gap-2 p-2 rounded-full ${notifications ? "bg-white translate-x-[15px]" : "dark:bg-black bg-white"}`} onClick={() => setNotifications(!notifications)}></button>
                                </div>
                            </div>
                            
                        </div>
                        : 
                        <div>
                            <h2 className="text-[25px] font-bold border border-transparent border-b-gray-100 dark:border-b-gray-900 mb-4">Store</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}