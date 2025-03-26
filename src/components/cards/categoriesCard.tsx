import { Plus } from "@phosphor-icons/react";
import Link from "next/link";

export default function CategoriesCard() {
    const categories = [
        // { id: 1, title: "Accommodation", icon: <House /> },
        // { id: 2, title: "Art & Craft Supplies", icon: <Palette /> },
        { id: 3, title: "Bags & Backpacks" },
        // { id: 4, title: "Bicycles", icon: <Bicycle /> },
        { id: 5, title: "Books" },
        // { id: 6, title: "Bedding & Home Essentials", icon: <Bed /> },
        // { id: 7, title: "Bike & Car Accessories", icon: <Car /> },
        { id: 8, title: "Clothing" },
        // { id: 9, title: "Cosmetics & Skincare" },
        // { id: 10, title: "Food & Beverages", icon: <Coffee /> },
        // { id: 11, title: "Electronics", icon: <Laptop /> },
        // { id: 12, title: "Event Tickets", icon: <Ticket /> },
        // { id: 13, title: "Gaming", icon: <GameController /> },
        { id: 14, title: "Gadgets" },
        // { id: 15, title: "Health & Wellness", icon: <Heart /> },
        { id: 16, title: "Jewellery and Accessories" },
        // { id: 17, title: "Part-time Jobs", icon: <Briefcase /> },
        // { id: 18, title: "Pet Supplies", icon: <PawPrint /> },
        { id: 19, title: "Perfumes and Scents" },
        // { id: 20, title: "Sports Equipment", icon: <Football /> },
        // { id: 21, title: "Second-hand Textbooks", icon: <BookOpen /> },
        { id: 22, title: "Rending Services (CAC, SCRUM registration)" },
        // { id: 23, title: "Music Instruments", icon: <Guitar /> },
        // { id: 24, title: "Movies & Entertainment", icon: <FilmStrip /> },
        // { id: 25, title: "Software & Digital Tools", icon: <Code /> },
        // { id: 26, title: "Stationery", icon: <Pencil /> },
        // { id: 27, title: "Tutoring Services", icon: <GraduationCap /> },
        // { id: 28, title: "Travel Accessories", icon: <Bus /> },
        // { id: 29, title: "Furniture", icon: <Chair /> },
    ];

    return (
        <div className="flex flex-col">
            {
                categories.map((category) => (
                    <Link key={category.id} className="flex items-center justify-between hover:text-primary gap-2 h-[48px] border-b border-gray-500/[0.1]" href={`/shop?query=${category.title}`}>
                        <div className="flex items-center gap-4">
                            <p className="capitalize">{category.title}</p>
                        </div>
                        <Plus className="opacity-[0.5]" />
                    </Link>
                ))
            }
        </div>
    )
}