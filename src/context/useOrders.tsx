'use client'
import { createOrder, updateSingleOrder } from "@/actions/useOrders";
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { IOrder } from "@/interface/orders";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface IOrderContext {
    orders: IOrder[];
    addOrder: (aug0: IOrder) => void;
    updateOrder: (aug0: IOrder) => void;
    removeOrder: (id: string) => void;
    loading: boolean;
}

export const OrderContext = createContext<IOrderContext>({} as IOrderContext)

export default function OrderContextProvider({ children }: {children: React.ReactNode}) {
    const [orders, setOrders] = useLocalStorage("Orders", [] as IOrder[])
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const addOrder = (data: IOrder) => {
        setLoading(true)
        createOrder({...data, })
        .then(response => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Order added Successfully" })
                router.push("/dashboard/orders")
            }
        })
    }

    const updateOrder = (data: IOrder) => {
        setLoading(true)
        updateSingleOrder({...data, })
        .then(response => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Order updated Successfully" })
                router.push("/dashboard/orders")
            }
        })
    }

    const removeOrder = (id: string) => {
        setOrders(orders.filter((item: IOrder) => item._id !== id))
    }

    const data = {
        orders,
        addOrder,
        updateOrder,
        removeOrder,
        loading,
    }

    
    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
    }, [popup]);

    return (
        <OrderContext.Provider value={data} >
            <Toaster containerClassName="p-8" />
            {children}
        </OrderContext.Provider>
    )
}