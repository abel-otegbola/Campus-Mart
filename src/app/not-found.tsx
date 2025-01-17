import Button from "@/components/button/button";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] md:px-[8%] px-4 gap-4">
            <h1 className="uppercase text-[64px] font-bold">404</h1>
            <h3 className="uppercase text-[20px] font-bold">Page not found</h3>
            <p className="md:w-[35%] text-center">But if you don&apos;t change your direction, and if you keep looking, you may end up where you are heading.</p>
            <Button href="/" variant="secondary" className="rounded-full">Take me home</Button>
        </div>
    )
}