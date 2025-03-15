import { IOrder } from "@/interface/orders";
import mongoose, { model, Schema } from "mongoose";

const OrdersSchema = new Schema<IOrder>({
    customer_email: {
      type: String,
      required: [true, "Description is required"]
    },
    shipping_address: {
      type: { address: String, zip:String, country: String },
      required: [false, "shipping address is required"]
    },
    amount: {
      type: Number,
      required: [true, "price is required"]
    },
    order_items: { 
      type: [{
      seller: String,
      product_id: String,
      product_title: String,
      quantity: Number,
      price: Number,
      total_price: Number,
      shipping_status: String,
      shipping_tracking_number: String,
    }],
      required: false
    },
    order_status: {
      type: String,
      required: false
    },
    shipping_charges: {
      type: Number,
      required: [true, "Category is required"]
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models?.Orders || model<IOrder>('Orders', OrdersSchema);
export default Orders;