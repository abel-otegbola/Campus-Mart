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

    const swervepay = new SwervpayClient(config)
    try {
        const payment = await swervepay.payment.create({
            amount: data.amount,
            currency: data.currency,
            email: data.email,
            reference: data.reference || uuidv4(), // unique ID for each transaction
            callback_url: "https://yourdomain.com/payment-success ", // URL to handle success
        });

        res.json({ checkoutUrl: payment.checkout_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment initialization failed' });
    }
}

