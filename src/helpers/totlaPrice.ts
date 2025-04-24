import { ICart, IProduct } from "@/interface/store"

export const totalPrice = (cart: ICart[], products: IProduct[]) => {
    return (
        products?.filter((item) => (cart && cart.map(item => item.id))?.indexOf(item._id) !== -1 )
        .map((product) => {return {price: +product?.price * cart?.filter((item: ICart) => item.id === product?._id)[0]?.quantity}})
        .reduce((a: number,v: { price: number }) => a = a + v.price, 0)
    )
}