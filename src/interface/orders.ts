export interface checkout {
    id: string, 
    fullname: string,
    country: string, 
    address: string, 
    phone: string, 
}

export interface IOrder {
    _id?: string,
    customer_email: string,
    createdAt?: string;
    updatedAt?: string;
    shipping_address: {
        address: string,
        zip: string,
        country: string
    },
    order_status: string,
    amount: number,
    order_items:
      {
        seller: string,
        product_id: string,
        product_title: string,
        quantity: number,
        price: number,
        total_price: number,
        shipping_status: string,
        shipping_tracking_number: string,
      }[],
    order_notes: string,
    shipping_charges: number,
}