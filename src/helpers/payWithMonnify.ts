import Monnify from 'monnify-js';
import { makeOrder, makeOrderProps } from './makeOrder';

const monnify = new Monnify(process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "", process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || "")

export const payWithMonnify = (data: { fullname: string, email: string, amount: number }, orderData: makeOrderProps) => {

    monnify.initializePayment({
        amount: data.amount,
        currency: "NGN",
        apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "",
        contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || "",
        reference: (new Date().getTime()).toString(),
        customerFullName: data.fullname,
        customerEmail: data.email,
        paymentDescription: "Campuxmart checkout payment",
        metadata: {
            name: data.fullname,
        },
        onLoadStart: () => {
            console.log("loading has started")
        },
        onComplete: function (response: unknown) {
            //Implement what happens when the transaction is completed.
            makeOrder({ ...orderData })
            console.log(response)
        },
    })
}