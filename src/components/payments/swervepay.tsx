import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../button/button';
import { swervepay } from '@/actions/usePayment';

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

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SWERVE_SECRET_KEY)
  }, [])

  const userData = {
    amount,
    bank_code: '0',
    account_number: 'Account',
    narration: 'narrated',
    reference: '2345',
  }
    
  return (
      <Button onClick={() => swervepay(userData)}>Proceed to payment</Button>
  );
}