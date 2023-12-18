import { PiStorefront } from "react-icons/pi";
import { TbBell, TbChevronRight, TbDashboard, TbLock, TbPassword, TbUserCircle } from "react-icons/tb";

export default function Settings() {
    return (
        <div className="flex md:px-[8%] py-[40px] px-[3%]">
            <div className="w-[250px] p-4 rounded border border-gray-200 dark:border-gray-800">
                <div href="/settings" className='flex p-3 px-4 justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <TbDashboard className="text-blue text-[20px]" />
                        <p className='hover:text-blue'>General</p>
                    </div>
                    <TbChevronRight />
                </div>
                <div href="/settings" className='flex p-3 px-4 justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <TbUserCircle className="text-blue text-[20px]" />
                        <p className='hover:text-blue'>Edit Profile</p>
                    </div>
                    <TbChevronRight />
                </div>
                <div href="/settings" className='flex p-3 px-4 justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <TbLock className="text-blue text-[20px]" />
                        <p className='hover:text-blue'>Password</p>
                    </div>
                    <TbChevronRight />
                </div>
                <div href="/settings" className='flex p-3 px-4 justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <TbBell className="text-blue text-[20px]" />
                        <p className='hover:text-blue'>Notifications</p>
                    </div>
                    <TbChevronRight />
                </div>
                <div href="/settings" className='flex p-3 px-4 justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <PiStorefront className="text-blue text-[20px]" />
                        <p className='hover:text-blue'>Store</p>
                    </div>
                    <TbChevronRight />
                </div>
            </div>

            <div className="flex-1 px-[3%]">
                <h2>Settings</h2>
            </div>
        </div>
    )
}