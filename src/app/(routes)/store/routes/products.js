import { PiPlusCircleLight, PiShoppingBagOpenLight, PiShoppingBagThin } from "react-icons/pi";
import { TbBadge, TbBottleFilled, TbCurrencyNaira, TbMoneybag, TbPalette } from "react-icons/tb";

export default function Products({ setActive }) {
    return (
        <div>
            <div className="py-4">
                <button className="flex items-center gap-2 p-[12px] px-4 rounded border border-gray-400 text-[12px] hover:border-blue hover:text-blue"><PiPlusCircleLight className="text-red"/> Create New Product</button>
               
            </div>
            <div className="py-4">
                <div className=" w-full">
                    <h3 className="flex items-center gap-2 mb-4"><PiShoppingBagOpenLight className="text-red"/> Available Products</h3>
                    <div className="w-full">
                        <table className="table-auto text-left border-collapse w-full">
                            <thead>
                                <tr className="text-blue text-[11px]">
                                    <th>S/N</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-transparent border-gray-y-500/[0.1] py-4">
                                    <td>1.</td>
                                    <td>Mousouf male deodorant</td>
                                    <td>#4000.00</td>
                                    <td>20</td>
                                    <td>edit</td>
                                </tr>
                                
                                <tr className="border border-transparent border-gray-y-500/[0.1] py-4">
                                    <td>2.</td>
                                    <td>Angel female deodorant</td>
                                    <td>#8000.00</td>
                                    <td>50</td>
                                    <td>edit</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-[37%] w-full py-4">
                    <h3 className="flex items-center gap-2 mb-2"><PiShoppingBagThin className="text-red"/> Out of Stock</h3>
                    <div className="grid grid-cols-2 gap-2">
                        
                    </div>
                </div>
            </div>

        </div>
    )
}