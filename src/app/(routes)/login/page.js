'use client'
import InputField from "@/app/components/inputField/page"
import Button from "../../components/button/page"
import { useState } from "react"
import { PiStorefrontLight, PiUserCircleLight } from "react-icons/pi"

export default function Login() {
  const [account, setAccount] = useState("Buyer's account")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="">
      <header className="flex flex-col p-[5%] min-h-[80vh] mx-auto sm:w-[470px] w-full items-center justify-center">
        <h1 className="md:text-[38px] text-[30px] font-[700] text-blue">Welcome</h1>
        <p className="py-4">Login to continue</p>

        <InputField label={"Email Address"} action={setEmail} type={"email"} />
        <InputField label={"Password"} action={setPassword} type={"password"} />

        <a href="/forgot-password" className="py-2 text-blue">Forgot password?</a>

        <Button text={"Log in"} to={"#"} type={"long"} />

        <p>Don&apos;t have an account? <a href="/signup" className="py-2 text-blue">Signup</a></p>

      </header>
    </main>
  )
}