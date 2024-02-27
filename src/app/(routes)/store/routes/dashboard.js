import { TbBadge, TbBottleFilled, TbCurrencyNaira, TbMoneybag, TbPalette } from "react-icons/tb";

export default function Dashboard({ setActive }) {
    return (
        <div>

            <div className="flex flex-wrap justify-between py-4">
                <div className="md:w-[60%] w-full py-4">
                    <h3 className="flex items-center gap-2 mb-2"><TbPalette className="text-red"/> Store Design</h3>
                    <div className="flex justify-center items-center w-full h-[300px] rounded bg-gray-400/[0.1]">
                        <a href="#Appearance" onClick={() => setActive("Appearance")} className="p-[12px] px-4 rounded border border-gray-400 text-[12px] hover:border-blue hover:text-blue">Customize store</a>
                    </div>
                </div>
                <div className="md:w-[37%] w-full py-4">
                    <h3 className="flex items-center gap-2 mb-2"><TbMoneybag className="text-red"/> Finance</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col justify-end p-4 h-[100px] cursor-pointer bg-green/[0.2] hover:text-white rounded">
                            <h4 className="text-[12px] text-red">Available Balance</h4>
                            <p className="flex items-center"><TbCurrencyNaira /> 150,000</p>
                        </div>
                        <div className="flex flex-col justify-end p-4 h-[100px] cursor-pointer hover:text-white rounded bg-gray-400/[0.1]">
                            <h4 className="text-[12px] text-red">Pending Orders</h4>
                            <p className="flex items-center"><TbCurrencyNaira /> 20,000</p>
                        </div>
                    </div>
                    <div className="w-full py-4 pt-6">
                        <div className="flex justify-between w-full items-center" >
                            <h3 className="flex items-center gap-2"><TbBadge className="text-red"/> Orders</h3>
                            <a href="#Orders" onClick={() => setActive("Orders")} className="text-blue text-[12px]">See all</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}