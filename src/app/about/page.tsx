export default function AboutPage() {
    return (
        <main>
            <header className="flex flex-col items-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">About us</h2>
                <p>We empower student entrepreneurs to turn their ideas into income by seamlessly connecting their businesses with eager buyers</p>
            </header>
            <section className="md:p-[9%] p-6 flex flex-wrap justify-between">
                <div className="flex flex-col gap-4 md:w-[70%]">
                    <h1 className="text-[20px] font-medium">The Marketplace Built for Student Hustlers.</h1>
                    <p>It all began with a simple observation: students everywhere were building side hustles—selling handmade crafts, offering freelance services, launching small brands—but struggled to find their first customers. They had the drive, the ideas, and the hustle… but without buyers, even the best ventures stalled.</p>
                    <p className="font-bold">That’s where we come in.</p>
                    <p>We’re on a mission to bridge the gap between student entrepreneurs and the people who want what they’re selling. Whether it’s a dorm-room startup, a passion project, or a budding small business, we connect these young founders with real buyers who believe in their vision.</p>
                    <p>Because every big empire started with a first sale. And we’re here to make sure that sale happens.</p>
                    <p className="text-primary">Join us. Let’s turn side hustles into success stories.</p>
                </div>
                <div className="flex md:flex-col justify-between gap-6 md:border-l border-gray-500/[0.2] md:w-[25%] w-full md:px-[5%] md:py-0 py-[40px]">
                    <div className="flex flex-col">
                        <h2 className="md:text-[48px] text-[32px] leading-[120%]">2025</h2>
                        <p className="p-1">Founded</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="md:text-[48px] text-[32px] leading-[120%]">100%</h2>
                        <p className="p-1">Remote</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="md:text-[48px] text-[32px] leading-[120%]">5</h2>
                        <p className="p-1">Humans</p>
                    </div>
                </div>
            </section>
        </main>
    )
}