import emailjs from '@emailjs/browser'

export const sendOTP = (otp: number, time: string, email: string) => {

    emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || "");
    
    emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",     // Email.js Service ID
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID_OTP || "",    // Email.js Template ID
    {
        passcode: otp,
        time,
        email
    }
    );
}