import { House } from "@phosphor-icons/react";
import Link from "next/link";

export default function Breadcrumbs({ links }: { links: string[] }) {
    return (
        <div className="flex gap-2">
            <Link href="/"><House /></Link>
            {
                links.map((link: string, i:number) => (
                    <Link key={i} href={"/" + link}>| {link}</Link>
                ))
            }
        </div>
    )
}