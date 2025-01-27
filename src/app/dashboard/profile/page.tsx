'use client'

import { AuthContext } from "@/context/useAuth";
import Button from "../../../components/button/button";
import Input from "@/components/input/input";
import { Bicycle, Book, Briefcase, Bus, Chair, Coffee, Envelope, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, Laptop, MapPin, Palette, PawPrint, Pencil, ShirtFolded, Spinner, Ticket, User, Watch } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/dropdown";
import { TbPerfume } from "react-icons/tb";

export default function Profile() {
    const { data } = useSession()
    const { getUserData, user, updateUser, loading } = useContext(AuthContext)
    const [userData, setUserData] = useState(user)

    const categories = [
        { id: 0, title: "Gadgets", icon: <Watch /> },
        { id: 1, title: "Books", icon: <Book /> },
        { id: 2, title: "Clothing", icon: <ShirtFolded /> },
        { id: 3, title: "Stationery", icon: <Pencil /> },
        { id: 4, title: "Electronics", icon: <Laptop /> },
        { id: 5, title: "Furniture", icon: <Chair /> },
        { id: 6, title: "Sports Equipment", icon: <Football /> },
        { id: 7, title: "Music Instruments", icon: <Guitar /> },
        { id: 8, title: "Bicycles", icon: <Bicycle /> },
        { id: 9, title: "Food & Beverages", icon: <Coffee /> },
        { id: 10, title: "Tutoring Services", icon: <GraduationCap /> },
        { id: 11, title: "Accommodation", icon: <House /> },
        { id: 12, title: "Event Tickets", icon: <Ticket /> },
        { id: 13, title: "Health & Wellness", icon: <Heart /> },
        { id: 14, title: "Part-time Jobs", icon: <Briefcase /> },
        { id: 15, title: "Art & Craft Supplies", icon: <Palette /> },
        { id: 16, title: "Travel Accessories", icon: <Bus /> },
        { id: 17, title: "Gaming", icon: <GameController /> },
        { id: 18, title: "Movies & Entertainment", icon: <FilmStrip /> },
        { id: 19, title: "Pet Supplies", icon: <PawPrint /> },
        { id: 20, title: "Perfumes and Scents", icon: <TbPerfume /> }
    ] 
    
    useEffect(() => {
        getUserData(data?.user?.email || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        setUserData(user)
    }, [user])

    const handleUpdate = () => {
        updateUser(data?.user?.email || userData?.email || "", userData)
        getUserData(data?.user?.email || "")
    }

    return (
        <div className="">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Profile</h2>
                <p>Manage and update your profile details</p>
            </div>
            <div className="">
                        <div className="py-2 mb-1">
                            <div className="flex gap-2 items-center">
                                <div className="h-[60px] w-[60px] rounded-full bg-slate-200 dark:bg-slate-200/[0.04]"></div>
                            </div>
                        </div>
                        <div className="py-2 mb-1">
                            <Input defaultValue={userData?.fullname || ""} label="Full name" leftIcon={<User />} onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} />
                        </div>
                        <div className="py-2 mb-4">
                            <Input defaultValue={userData?.email || ""} label="Email:" leftIcon={<Envelope />} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        </div>
                        {
                            userData?.role === "Seller" ?
                                <>
                                    <div className="py-2 mb-4">
                                        <Dropdown value={userData?.business_category || ""} placeholder={userData?.business_category || ""} options={categories} label="Business Category:" onChange={(value) => setUserData({ ...userData, business_category: value })}/>
                                    </div>
                                    <div className="py-2 mb-4">
                                        <Input defaultValue={userData?.business_location || ""} label="Business Location:" leftIcon={<MapPin />}/>
                                    </div>
                                </>
                            :
                            ""
                        }
                        <Button onClick={() => handleUpdate()}>{ loading ? <Spinner size={16} className="animate-spin" /> : "Save changes" }</Button>
                </div>
        </div>
    )
}