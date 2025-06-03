import { SwervpayClient } from '@swervpaydev/sdk';

type payoutprops = {
    amount: number,
    currency?: "NGN" | "USD",
    bank_code: string,
    account_number: string,
    narration: string,
    reference: string,
};

export const swervepay = async (data: payoutprops) => {
    const config = {
        secretKey: process.env.NEXT_PUBLIC_SWERVE_SECRET_KEY || "",
        businessId: process.env.NEXT_PUBLIC_SWERVE_PUBLIC_KEY || ""
    }
    const swervpay = new SwervpayClient(config)

    const payout = await swervpay.payout.create({
        amount: data.amount,
        currency: "NGN",
        bank_code: data.bank_code,
        account_number: data.account_number,
        narration: data.narration,
        reference: data.reference,
    });
}

