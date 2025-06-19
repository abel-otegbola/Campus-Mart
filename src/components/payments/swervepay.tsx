import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../button/button';
import { SwervpayClient } from '@swervpaydev/sdk';

interface SwervePayProps {
    amount: number;
    customer: {
        email: string,
        phone_number: string,
        name: string,
    },
    setIsPaid: (aug0: boolean) => void;
}

export default function SwervepayPayment({ amount, customer, setIsPaid }: SwervePayProps) {
  const { data } = useSession()
  const [swervepay, setSwervepay] = useState<SwervpayClient | null>(null);


  useEffect(() => {
    // Initialize SwervePay with your keys
    const config = {
      publicKey: process.env.NEXT_PUBLIC_SWERVE_PUBLIC_KEY,
        secretKey: process.env.NEXT_PUBLIC_SWERVE_SECRET_KEY || "",
        businessId: process.env.NEXT_PUBLIC_SWERVE_PUBLIC_KEY || ""
    }

    const newSwervepay = new SwervpayClient(config)
    setSwervepay(newSwervepay);
  }, []);
    
  const handlePayment = async () => {
    if (!swervepay) return;
    
    try {
      const paymentData = {
        amount,
        category: '0',
        customer_id: '0735218800',
        biller_id: 'narrated',
        reference: '2345',
        item_id: "0",
      };

      const response = await swervepay.bill.create(paymentData);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
      <Button onClick={() => handlePayment()}>Proceed to payment</Button>
  );
}