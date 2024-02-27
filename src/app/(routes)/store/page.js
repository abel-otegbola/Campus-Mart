'use client'
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { PiChat } from "react-icons/pi"
import { TbBadge, TbBottleFilled, TbBox, TbChevronRight, TbCurrencyNaira, TbDashboard, TbEdit, TbHome, TbMenu2, TbPalette, TbUsers } from "react-icons/tb"
import Dashboard from "./routes/dashboard"
import Products from "./routes/products"

export default function Store() {
    const [active, setActive] = useState("Dashboard")
    const [open, setOpen] = useState(false)
    
    const links = [
        { id: 0, title: "Dashboard", icon: <TbDashboard />, suffix: "" },
        { id: 1, title: "Products", icon: <TbBox />, suffix: <span className="p-1 px-2 text-[7px] rounded-full bg-blue/[0.3]">1</span> },
        { id: 2, title: "Appearance", icon: <TbPalette />, suffix: <a href="store/edit-store" className="p-1 text-[10px] rounded-full text-red"><TbEdit /></a> },
        { id: 3, title: "Customers", icon: <TbUsers />, suffix: <span className="p-1  text-[10px] rounded-full text-red">20</span> },
        { id: 4, title: "Orders", icon: <TbBadge />, suffix: <span className="p-1 text-[10px] rounded-full text-red">100</span> },
        { id: 5, title: "Reviews", icon: <PiChat />, suffix: <span className="p-1 text-[10px] rounded-full text-green">New</span> },
    ]

    return (
        <div>
            <div className="sticky top-[53px] left-0 text-[12px] flex gap-2 items-center md:px-[8%] px-[3%] py-4 bg-white dark:bg-black border border-transparent border-y-gray-100 dark:border-y-gray-900 z-[4]">
                <button className="md:hidden block border-none pr-4 mr-2" onClick={() => setOpen(!open)}>
                    {
                        open ? <FaTimes className="text-[16px]" /> :
                    <TbMenu2 className="text-[16px]"/>
                    }
                </button>
                <a href="/" className="hover:text-blue text-[16px] opacity-[0.7]"><TbHome /></a> 
                <TbChevronRight /> 
                <a href="/settings" className="hover:text-blue opacity-[0.7]">STORE</a> 
                <TbChevronRight /> 
                <a href={"#" + active} className="hover:text-blue">{active.toUpperCase()}</a>
            </div>
            <div className="relative flex md:px-[8%] py-[30px] items-stretch min-h-[100vh]">
                <div className={`h-full rounded md:sticky md:top-[120px] md:pr-6 text-[12px] absolute top-0 left-0 bg-white dark:bg-black md:border-none border border-transparent border-x-gray-100 dark:border-x-gray-900 overflow-hidden transition-all duration-700 z-[3]
                                ${open ? "w-[250px] md:px-0 px-2" : "md:w-[250px] w-0"}`}>

                    {
                        links.map(link => (
                            <a
                                key={link.id}
                                href={"#" + link.title} 
                                className={`flex py-3 px-4 justify-between rounded items-center my-1 transition-all ${active === link.title ? "bg bg-blue text-white" : "hover:bg-blue/[0.1] hover:text-blue"}`}
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

                <div className="flex-1 md:px-[5%] px-[3%] md:border border-transparent border-l-gray-100 dark:border-l-gray-900">
                    
                    <div className="flex items-center justify-between pb-6 border border-transparent border-b-gray-100 dark:border-b-gray-900">
                        <div className="flex items-center gap-4">
                            <div className="w-[30px] h-[30px] outline outline-red/[0.2] outline-offset-1 rounded-full bg-gray-400/[0.1]"></div>
                            <div>
                                <h2 className="text-[20px] font-bold">Oluwanifemi&apos;s Store</h2>
                                <p className="flex items-center gap-2 opacity-[0.6]"><TbBottleFilled className="text-red"/> Scents and Perfumes</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-[12px] text-red">Total Balance</h4>
                            <p className="flex items-center"><TbCurrencyNaira /> 170,000</p>
                        </div>
                    </div>

                    {
                        active === "Products" ?
                        <Products setActive={setActive} />
                        : 
                        <Dashboard setActive={setActive}/>
                    }
                    
                </div>
            </div>
        </div>
    )
}