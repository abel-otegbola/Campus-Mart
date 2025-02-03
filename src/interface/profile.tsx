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
    img?: string;
}

export interface ISignupData { email: string, password: string }