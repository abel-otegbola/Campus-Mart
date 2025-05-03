import { storeContext } from "@/context/useStore"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import { ICart, IProduct } from "@/interface/store"
import { IOrder } from "@/interface/orders"
import { useContext } from "react"

export default function TotalPrice ({ discount, order }: { discount?: number, order?: IOrder }) {
    const { cart, products } = useContext(storeContext)

    return (
        <span>
        {
            currencyFormatter(
                products.filter((item: IProduct) => (order ? order.order_items.product_id : cart.map(item => item.id)).indexOf(item._id) !== -1 )
                .map((product: IProduct) => {return {price: +product?.price * cart.filter((item: ICart) => item.id === product?._id)[0]?.quantity}})
                .reduce((a: number,v: { price: number }) => a = a + v.price, 0) - (discount || 0)
            )
        }
        </span>
    )
}