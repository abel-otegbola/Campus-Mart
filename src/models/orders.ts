import { IOrder } from "@/interface/orders";
import { IProduct } from "@/interface/store";
import mongoose, { model, Schema } from "mongoose";

const OrdersSchema = new Schema<IOrder>({
    user: {
      type: { displayName: String, email: String, photo: String  },
      required: [true, "Price is required"]
    },
    fullname: {
      type: String,
      required: [true, "Description is required"]
    },
    country: {
      type: String,
      required: [false, "tags are required"]
    },
    address: {
      type: String,
      required: [true, "Category is required"]
    },
    phone: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: [true, "images are required"]
    },
    cart: { 
      type: [{
      id: String, quantity: Number, variation: { color: String, size: String }
    }],
      required: false
    },
    paymentStatus: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models?.Orders || model<IOrder>('Orders', OrdersSchema);
export default Orders;