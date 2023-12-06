'use client'
import InputField from "@/app/components/inputField/page"
import Button from "../../components/button/page"
import { useState } from "react"
import { PiStorefrontLight, PiUserCircleLight } from "react-icons/pi"

export default function Signup() {
  const [account, setAccount] = useState("Buyer's account")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="">
      <header className="flex flex-col p-[5%] min-h-[80vh] mx-auto sm:w-[470px] w-full items-center justify-center">
        <h1 className="md:text-[38px] text-[30px] font-[700] text-[#5938DD]">Welcome</h1>
        <p className="py-4">Create account now</p>

        <div className="flex items-center justify-between bg-gray-100 p-2 my-6 rounded text-[12px] w-full">
          <button className={`flex items-center gap-2 border border-gray-200 p-2 px-4 rounded w-[49%] ${account === "Buyer's account" ? "bg-[#5938DD] text-white" : "bg-white"}`} onClick={() => setAccount("Buyer's account")}><PiUserCircleLight className="text-[18px]"/> Buyer's account</button>
          <button className={`flex items-center gap-2 border border-gray-200 p-2 px-4 rounded w-[49%] ${account === "Seller's account" ? "bg-[#5938DD] text-white" : "bg-white"}`} onClick={() => setAccount("Seller's account")}><PiStorefrontLight className="text-[18px]" /> Seller's account</button>
        </div>

        <InputField label={account === "Buyer's account" ? "Full name" : "Business name"} action={setFullname} type={"text"} />
        <InputField label={"Email Address"} action={setEmail} type={"email"} />
        <InputField label={"Password"} action={setPassword} type={"password"} />

        <Button text={"Continue"} to={"#"} type={"long"} />

        <p>Already have an account? <a href="/login" className="py-2 text-[#5938DD]">Login</a></p>

      </header>
    </main>
  )
}