'use client'

import { AuthContext } from "@/context/useAuth";
import Button from "../../../components/button/button";
import Input from "@/components/input/input";
import { Bag, Bed, BeerBottle, Bicycle, Book, BookOpen, Briefcase, Bus, Car, Chair, Code, Coffee, Envelope, FacebookLogo, File, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, ImageBroken, InstagramLogo, Laptop, MapPin, Palette, PawPrint, Pencil, ShirtFolded, Spinner, Ticket, Trash, User, UserFocus, Watch, WhatsappLogo, XLogo } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/dropdown";
import { TbPerfume } from "react-icons/tb";
import ImageToBase64 from "@/components/imageConverter/imageConverter";
import Image from "next/image";
import { PiDiamond, PiWhatsappLogo } from "react-icons/pi";
import { isUserSaved } from "@/actions/useProfile";
import { useRouter } from "next/navigation";
import ImageUpdate from "@/components/ImageUpdate/imageUpdate";

export default function Profile() {
    const { data } = useSession()
    const { getUserData, user, updateUser, loading } = useContext(AuthContext)
    const [userData, setUserData] = useState(user)
    const router = useRouter()
    
    const categories = [
        { id: 1, title: "Accommodation", icon: <House /> },
        { id: 2, title: "Art & Craft Supplies", icon: <Palette /> },
        { id: 3, title: "Bags & Backpacks", icon: <Bag /> },
        { id: 4, title: "Bicycles", icon: <Bicycle /> },
        { id: 5, title: "Books", icon: <Book /> },
        { id: 6, title: "Bedding & Home Essentials", icon: <Bed /> },
        { id: 7, title: "Bike & Car Accessories", icon: <Car /> },
        { id: 8, title: "Clothing", icon: <ShirtFolded /> },
        { id: 9, title: "Cosmetics & Skincare", icon: <BeerBottle /> },
        { id: 10, title: "Food & Beverages", icon: <Coffee /> },
        { id: 11, title: "Electronics", icon: <Laptop /> },
        { id: 12, title: "Event Tickets", icon: <Ticket /> },
        { id: 13, title: "Gaming", icon: <GameController /> },
        { id: 14, title: "Gadgets", icon: <Watch /> },
        { id: 15, title: "Health & Wellness", icon: <Heart /> },
        { id: 16, title: "Jewellery and Accessories", icon: <PiDiamond /> },
        { id: 17, title: "Part-time Jobs", icon: <Briefcase /> },
        { id: 18, title: "Pet Supplies", icon: <PawPrint /> },
        { id: 19, title: "Perfumes and Scents", icon: <TbPerfume /> },
        { id: 20, title: "Sports Equipment", icon: <Football /> },
        { id: 21, title: "Second-hand Textbooks", icon: <BookOpen /> },
        { id: 22, title: "Rending Services (CAC, SCRUM registration)", icon: <File /> },
        { id: 23, title: "Music Instruments", icon: <Guitar /> },
        { id: 24, title: "Movies & Entertainment", icon: <FilmStrip /> },
        { id: 25, title: "Software & Digital Tools", icon: <Code /> },
        { id: 26, title: "Stationery", icon: <Pencil /> },
        { id: 27, title: "Tutoring Services", icon: <GraduationCap /> },
        { id: 28, title: "Travel Accessories", icon: <Bus /> },
        { id: 29, title: "Furniture", icon: <Chair /> },
    ];

    useEffect(() => {
        setUserData(user)
    }, [user])

    const handleUpdate = async () => {
        if(await isUserSaved(data?.user?.email || "")) {
            updateUser(data?.user?.email || "", userData)
        }
        else {
            router.push(`/register?fullname=${data?.user?.fullname || ""}&email=${data?.user?.email || ""}`)
        }
    }

    return (
        <div className="">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Profile</h2>
                <p>Manage and update your profile details</p>
            </div>
            <div className="flex md:flex-nowrap flex-wrap gap-4">
                <div className="md:w-[60%] w-full">
                    {
                        data?.user?.role === "Seller" || user?.role === "Seller" ?
                        <ImageUpdate userData={userData} setUserData={setUserData} />
                        : ""
                    }
                    <div className={`relative flex gap-6 items-center h-[88px] w-[88px] rounded-full ${data?.user?.role === "Seller" ? "-mt-12 ml-4" : ""} z-[2] border border-gray-500/[0.1] bg-slate-100 dark:bg-dark bg-cover bg-center`} style={{ backgroundImage: `url("${userData?.img}")` }}>
                        <label htmlFor="add_img" className="absolute w-full h-full rounded-full bg-black/[0.7] opacity-[0] hover:opacity-[1] flex flex-col justify-center items-center gap-2 flex-1">
                            <span>Change</span>
                        </label>
                        <ImageToBase64 id="add_img" fullname={data?.user?.email || "/user"} img={userData?.img || ""} setImg={(img) => setUserData({...userData, img })} />
                        
                    </div>

                    <div className="py-2 mb-1">
                        <Input defaultValue={userData?.fullname || data?.user.fullname || ""} label="Full name" leftIcon={<User />} onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} />
                    </div>
                    <div className="py-2 mb-4">
                        <Input disabled={true} defaultValue={userData?.email || data?.user.email || ""} label="Email (Contact support to change your email address):" leftIcon={<Envelope />} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    {
                        data?.user?.role === "Seller" || user?.role === "Seller" ?
                            <>
                                <div className="py-2 mb-1">
                                    <Input disabled={true} defaultValue={userData?.business_name || ""} label="Business name (Contact support to change your business name):" leftIcon={<UserFocus />} onChange={(e) => setUserData({ ...userData, business_name: e.target.value })} />
                                </div>
                                <div className="py-2 mb-4">
                                    <Dropdown value={userData?.business_category || ""} placeholder={userData?.business_category || ""} options={categories} label="Business Category:" onChange={(value) => setUserData({ ...userData, business_category: value })}/>
                                </div>
                                <div className="py-2 mb-4">
                                    <Input defaultValue={userData?.business_location || ""} onChange={(e) => setUserData({ ...userData, business_location: e.target.value })} label="Business Location:" leftIcon={<MapPin />}/>
                                </div>
                            </>
                        :
                        ""
                    }
                    <Button onClick={() => handleUpdate()}>{ loading ? <Spinner size={16} className="animate-spin" /> : "Save changes" }</Button>
                </div>

                <div className="md:w-[36%] w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4 border border-gray-500/[0.2] rounded bg-white dark:bg-black">
                        <div className="w-full pb-2 flex flex-col gap-2 border-b border-gray-500/[0.1]">
                            <h2 className="font-medium text-[16px]">Social links</h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-600 flex items-center justify-center w-[46px] h-[40px] rounded-full border border-gray-500/[0.2]">
                                    <PiWhatsappLogo size={20} />
                                </span>
                                <Input placeholder="whatsapp number" defaultValue={userData?.socialLinks?.whatsapp || ""} onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, whatsapp: e.target.value } })}  />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-fuchsia-600 flex items-center justify-center w-[46px] h-[40px] rounded-full border border-gray-500/[0.2]">
                                    <InstagramLogo size={20} />
                                </span>
                                <Input placeholder="Instagram link" defaultValue={userData?.socialLinks?.instagram || ""} onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, instagram: e.target.value } })}  />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white flex items-center justify-center w-[46px] h-[40px] rounded-full border border-gray-500/[0.2]">
                                    <XLogo size={16} />
                                </span>
                                <Input placeholder="X link" defaultValue={userData?.socialLinks?.x || ""} onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, x: e.target.value } })}  />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 flex items-center justify-center w-[46px] h-[40px] rounded-full border border-gray-500/[0.2]">
                                    <FacebookLogo size={20} />
                                </span>
                                <Input placeholder="Facebook link" defaultValue={userData?.socialLinks?.facebook || ""} onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, facebook: e.target.value } })}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}