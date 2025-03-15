import * as Yup from 'yup';

export const checkoutSchema = Yup.object({
    country: Yup.string().required("Country is required"), 
    address: Yup.string().required("Address is required"), 
    note: Yup.string().optional(), 
})