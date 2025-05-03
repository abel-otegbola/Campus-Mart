export interface UserData {
    id?: string,
    email?: string | null,
    fullname?: string | null,
    image?: string | null,
    storename?: string,
    bio?: string,
    cover?: string,
    address?: string,
    role?: string,
    business_name?: string,
    business_category?: string,
    business_location?: string,
    verified?: boolean,
    otp?: string,
    otpEpiry?: string,
    img?: string;
    phone_number?: string;
    socialLinks?: { whatsapp?: string, instagram?: string, x?: string, facebook?: string }
}

export interface ISignupData { email: string, password: string }