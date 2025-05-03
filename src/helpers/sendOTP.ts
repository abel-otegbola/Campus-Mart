import emailjs from '@emailjs/browser'

export const sendOTP = (otp: number, email: string) => {

    emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",     // Email.js Service ID
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "",    // Email.js Template ID
    {
        otp,
        email
    }
    );
}