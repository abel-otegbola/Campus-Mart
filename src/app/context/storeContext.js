'use client'

import { useLocalStorage } from "../customHooks/useLocalStorage";

const { createContext } = require("react");

export const storeContext = createContext()

export default function StoreContextProvider({ children }) {
    const [cart, setCart] = useLocalStorage("cart", [])
    const [wishlist, setWishlist] = useLocalStorage("wishlist", [])

    return (
        <storeContext.Provider value={{ cart, wishlist, setCart, setWishlist }}>
            {children}
        </storeContext.Provider>
    )
}