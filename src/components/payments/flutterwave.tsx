import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useSession } from 'next-auth/react';

interface FlutterwaveProps {
    amount: number;
    customer: {
        email: string,
        phone_number: string,
        name: string,
    },
    setIsPaid: (aug0: boolean) => void;
}

export default function FlutterwavePayment({ amount, customer, setIsPaid }: FlutterwaveProps) {
    const { data } = useSession()
   const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_API || "",
    tx_ref: Date.now().toString(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer,
    customizations: {
      title: 'Campux mart',
      description: 'Payment for items in cart',
      logo: 'https://campuxmart.com/favicon.ico',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Proceed to payment',
    callback: (response: any) => {
      if(response.status === "successful") {
        setIsPaid(true)
      }
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {
    },
  };

  return (
      <FlutterWaveButton disabled={!data?.user || data?.user?.role === "Seller"} {...fwConfig} className='w-full bg-primary rounded py-3 text-white'/>
  );
}