'use client'
import { createProduct, deleteProduct, getAllBusinessProducts, getAllProducts, updateSingleProduct } from "@/actions/useProducts";
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { ICart, IProduct } from "@/interface/store";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface IStoreContext {
    products: IProduct[];
    addProduct: (aug0: IProduct) => void;
    updateProduct: (aug0: IProduct) => void;
    removeProduct: (id: string, store: string) => void;
    cart: ICart[];
    addToCart: (aug0: ICart) => void;
    removeFromCart: (id: string) => void;
    changeQuantity: (id: string, action: "ADD" | "MINUS" | number) => void;
    wishlist: string[];
    addToWishlist: (aug0: string) => void;
    removeFromWishlist: (id: string) => void;
    loading: boolean;
}

export const storeContext = createContext<IStoreContext>({} as IStoreContext)

export default function StoreContextProvider({ children }: {children: React.ReactNode}) {
    const [cart, setCart] = useLocalStorage("cart", [])
    const [wishlist, setWishlist] = useLocalStorage("wishlist", [])
    const [products, setProducts] = useLocalStorage("products", [] as IProduct[])
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        getAllProducts()
        .then(response => {
            setLoading(false)
            if(!response) {
            }
            else {
                setProducts(response)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addProduct = (data: IProduct) => {
        setLoading(true)
        if(data.title === "" || data.category === "" || data.price === "" || data.description === "") {
            setPopup({ type: "error", msg: "Fill all product details" })
            setLoading(false)
            return false
        }
        else {
            createProduct({...data, })
            .then(response => {
                setLoading(false)
                if(response?.error) {
                    setPopup({ type: "error", msg: response?.error })
                }
                else {
                    setPopup({ type: "success", msg: "Product added Successfully" })
                    router.push("/dashboard/inventory")
                }
            })
        }
    }

    const updateProduct = (data: IProduct) => {
        setLoading(true)
        updateSingleProduct({...data, })
        .then(response => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Product updated Successfully" })
            }
        })
    }

    const removeProduct = (id: string, store: string) => {
        deleteProduct(id)
        .then(response => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Product deleted successfully" })
                getAllBusinessProducts(store)
            }
        })
    }

    const addToCart = (data: ICart) => {
        setCart([...cart, data])
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter((item: ICart) => item.id !== id))
    }

    const changeQuantity = (id: string, action: "ADD" | "MINUS" | number) => {
        setCart(cart.map((item: ICart) => {
            if(item.id === id) {
                if(action === "ADD") {
                    return { id: item.id, quantity: item.quantity + 1, variation: item.variation }
                }
                else if(action === "MINUS") {
                    return { id: item.id, quantity: item.quantity < 2 ? item.quantity : item.quantity - 1, variation: item.variation }
                }
                else {
                    return { id: item.id, quantity: action, variation: item.variation }
                }
            }
            else return item;
        }))
    }

    const addToWishlist = (data: string) => {
        setWishlist([...wishlist, data])
    }

    const removeFromWishlist = (id: string) => {
        setWishlist(wishlist.filter((item: string) => item !== id))
    }

    const data = {
        products,
        addProduct,
        updateProduct,
        removeProduct,
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
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
        <storeContext.Provider value={data} >
            <Toaster containerClassName="p-8" />
            {children}
        </storeContext.Provider>
    )
}