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
        incomeSplitConfig: [
            {
              subAccountCode: "MFY_SUB_342113621921",
              feePercentage: 50,
              splitAmount: 1900,
              feeBearer: true,
            },
            {
              subAccountCode: "MFY_SUB_342113621922",
              feePercentage: 50,
              splitAmount: 2100,
              feeBearer: true,
            },
        ],
        onLoadStart: () => {
            console.log("loading has started")
        },
        onComplete: function (response: unknown) {
            makeOrder({ ...orderData })
        },
    })
}