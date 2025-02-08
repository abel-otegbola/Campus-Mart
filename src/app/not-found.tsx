import Button from "@/components/button/button";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] md:px-[8%] px-4 gap-4">
            <h1 className="uppercase text-[64px] font-bold">404</h1>
            <h3 className="uppercase text-[20px] font-bold">Page not found</h3>
            <Button href="/" variant="secondary" className="rounded-full">Take me home</Button>
        </div>
    )
}