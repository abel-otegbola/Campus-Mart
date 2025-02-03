'use client'

import { AuthContext } from "@/context/useAuth";
import Button from "../../../components/button/button";
import Input from "@/components/input/input";
import { Bag, Bed, BeerBottle, Bicycle, Book, BookOpen, Briefcase, Bus, Car, Chair, Code, Coffee, Envelope, File, FilmStrip, Football, GameController, GraduationCap, Guitar, Heart, House, ImageBroken, Laptop, MapPin, Palette, PawPrint, Pencil, ShirtFolded, Spinner, Ticket, Trash, User, UserFocus, Watch } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/dropdown";
import { TbPerfume } from "react-icons/tb";
import ImageToBase64 from "@/components/imageConverter/imageConverter";
import Image from "next/image";
import { PiDiamond } from "react-icons/pi";

export default function Profile() {
    const { data } = useSession()
    const { getUserData, user, updateUser, loading } = useContext(AuthContext)
    const [userData, setUserData] = useState(user)
    
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
                <div className="flex gap-6 items-center h-[100px] w-[100%] rounded-lg">
                    { 
                        userData?.img === "" ? 
                        <label htmlFor="add_img" className="flex flex-col justify-center items-center gap-2 flex-1">
                            <ImageBroken weight="fill" alt="add new image" size={32} />
                            <p className="text-[10px]">Drop your image here, or <label htmlFor="add_img" className="text-primary">Browse files</label></p>
                        </label>
                        :
                        <div className="flex">
                            <div className="flex items-center p-4 cursor-pointer" tabIndex={1} onClick={(e) => setUserData({...data, img: "" })}><Trash size={16} className="text-red-500" /></div>
                            <Image src={userData?.img || "/profile.png"} alt="preview" width={88} height={88} className="max-h-[88px] w-auto border border-gray-500/[0.2] rounded"/>
                        </div>
                    }
                    <ImageToBase64 id="add_img" fullname={data?.user?.email || "/user"} img={userData?.img || ""} setImg={(img) => setUserData({...data, img })} />
                    
                </div>

                <div className="py-2 mb-1">
                    <Input defaultValue={userData?.fullname || ""} label="Full name" leftIcon={<User />} onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} />
                </div>
                <div className="py-2 mb-4">
                    <Input disabled={true} defaultValue={userData?.email || ""} label="Email:" leftIcon={<Envelope />} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                </div>
                {
                    data?.user?.role === "Seller" || userData?.role === "Seller" ?
                        <>
                            <div className="py-2 mb-1">
                                <Input disabled={true} defaultValue={userData?.business_name || ""} label="Business name" leftIcon={<UserFocus />} onChange={(e) => setUserData({ ...userData, business_name: e.target.value })} />
                            </div>
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