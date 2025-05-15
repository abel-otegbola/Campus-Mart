'use client'

export default function SearchPage() {

    return (
        <div className="min-h-[80vh]">
            <div className="flex flex-col items-center justify-center md:px-[8%] px-6 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Deals</h2>
                <p className="">Awesome deals avaialble for you</p>
            </div>

            <div className="lg:px-[8%] px-6 py-[40px] w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 py-2 my-4">
                <div className="flex flex-col gap-2">
                    There are currently no avaialble deals
                </div>
            </div>
        </div>
    )
}