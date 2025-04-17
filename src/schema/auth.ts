import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required("Password is required"),
})

export const registerBuyerSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required("Password is required"),
})

export const registerVendorSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required("Password is required"),
    phone_number: Yup.string().required("Phone number is required"),
    business_name: Yup.string().required("Business name is required").min(3, "Enter a valid business name"),
    business_category: Yup.string().required("Business category is required"),
    business_location: Yup.string().required("Business location is required")
})