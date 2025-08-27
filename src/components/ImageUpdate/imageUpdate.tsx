'use client'

import { useContext, useEffect, useState } from "react"
import ImageToBase64 from "../imageConverter/imageConverter"
import { useSession } from "next-auth/react"
import { AuthContext } from "@/context/useAuth"
import { UserData } from "@/interface/profile"

export default function ImageUpdate({ userData, setUserData }: { userData: UserData, setUserData: (aug0: UserData) => void }) {
    const { data } = useSession()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setUserData(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    
    return (
        <div className="relative flex items-center justify-center h-[150px]  border border-gray-500/[0.1] bg-slate-100 dark:bg-dark bg-cover bg-center" style={{ backgroundImage: `url("${userData?.cover}")` }}>
            <label htmlFor="update_cover" className="absolute w-full h-full opacity-[0] hover:opacity-[1] bg-black/[0.8] flex flex-col justify-center items-center gap-2 flex-1">
                Change cover image
            </label>
            <ImageToBase64 id="update_cover" fullname={data?.user?.email + "-cover"} img={userData?.cover || ""} setImg={(img) => setUserData({...userData, cover: img })} />
        </div>
    )
}