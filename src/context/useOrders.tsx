'use client'
import { createOrder, deleteOrder, getAllBusinessOrders, getAllOrders, getAllUserOrders, updateSingleOrder } from "@/actions/useOrders";
import { IOrder } from "@/interface/orders";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface IOrderContext {
    orders: IOrder[];
    getUserOrders: (email: string) => void;
    getBusinessOrders: (business_name: string) => void;
    addOrder: (aug0: IOrder) => void;
    updateOrder: (aug0: IOrder) => void;
    removeOrder: (id: string, fullname: string) => void;
    loading: boolean;
}

export const OrderContext = createContext<IOrderContext>({} as IOrderContext)

export default function OrderContextProvider({ children }: {children: React.ReactNode}) {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const getUserOrders = (fullname: string) => {
        setLoading(true)
        getAllUserOrders(fullname)
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setLoading(false)                    
            }
            else {
                setOrders(response)
                setLoading(false)
            }
        })
        .catch((error: { message: string }) => {
            setLoading(false)
        });
    }
    
    const getBusinessOrders = (business_name: string) => {
        setLoading(true)
        getAllBusinessOrders(business_name)
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setLoading(false)                    
            }
            else {
                console.log(response)
                setOrders(response)
                setLoading(false)
            }
        })
        .catch((error: { message: string }) => {
            setLoading(false)
        });
    }

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

    const removeOrder = (id: string, fullname: string) => {
        deleteOrder(id)
        .then(response => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Order deleted Successfully" })
                getBusinessOrders(fullname)
            }
        })
    }

    const data = {
        orders,
        getUserOrders,
        getBusinessOrders,
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