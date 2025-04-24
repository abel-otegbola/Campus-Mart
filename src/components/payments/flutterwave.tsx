import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Button from '../button/button';

interface FlutterwaveProps {
    amount: number;
    customer: {
        email: string,
        phone_number: string,
        name: string,
    }
}

export default function FlutterwavePayment({ amount, customer }: FlutterwaveProps) {
   const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_API || "",
    tx_ref: Date.now().toString(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer,
    customizations: {
      title: 'Campus mart',
      description: 'Payment for items in cart',
      logo: 'https://campus-mart.vercel.app/favicon.ico',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay',
    callback: (response: any) => {
        console.log(response)
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
      <FlutterWaveButton {...fwConfig} className='w-full bg-primary rounded py-2'/>
  );
}