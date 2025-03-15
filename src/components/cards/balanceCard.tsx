import { currencyFormatter } from "@/helpers/currencyFormatter";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

export default function BalanceCard({ title, amount }: { title: string, amount: number }) {
    const [show, setShow] = useState(true)

    return (
        <div className={`flex flex-col gap-6 p-4 border border-gray-500/[0.2] rounded bg-white dark:bg-black`}>
            <h2 className="text-[12px] justify-between gap-4 flex items-center">{title} 
                <button onClick={() => setShow(!show)}>{ show ? <Eye size={16}/> : <EyeSlash size={16}/> }</button>
            </h2>
            <p className="font-bold text-[18px]">{ show ? "₦" + currencyFormatter(amount) : "****" }</p>
        </div>
    )
}