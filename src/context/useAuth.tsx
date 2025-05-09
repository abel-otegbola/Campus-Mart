'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { UserData } from "@/interface/profile";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { register } from "@/actions/register";
import { signupData } from "@/interface/auth";
import { fetchUserData, updateUserData, verifyUserAccount } from "@/actions/useProfile";
import { sendOTP } from "@/helpers/sendOTP";

type values = {
    user: UserData;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    setUser: (aug0: unknown) => void;
    login: (email: string, password: string, callbackUrl: string) => void; 
    signUp: (data: signupData) => void;
    sociallogin: (provider: string) => void;
    logOut: () => void;
    getUserData: (email: string) => void;
    updateUser: (email: string, data: UserData) => void;
    verifyOTP: (email: string, otp: string, type: string) => void;
}

export const AuthContext = createContext({} as values);

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formatError = (msg: string) => {
        return msg.replace("-", " ").replace(")", "")
    }

    const login = async (email: string, password: string, callbackUrl: string) => {
        setLoading(true)
        const res = await signIn("credentials", { email, password, redirect: false });
        if(res?.ok) {
            setPopup({ type: "success", msg: "Login Successful" })
            setLoading(false)
            await fetchUserData(email)
            .then(response => {
                if(response.verified) {
                    if(response.role === "Seller" && (!response.business_name || response.business_name === "")) {
                        router.push("/vendor-onboarding")
                    }
                    else {
                        router.push(callbackUrl ? callbackUrl : "/dashboard")
                    }
                }
                else {
                    const otp = Math.floor(Math.random() * 1000000);
                    const time = Date.now() + 10 * 60 * 1000;
                    updateUserData(email, { otp: otp.toString(), otpExpiry: time.toString() })
                    .then(() => {
                        sendOTP(otp, new Date(time).toLocaleString(), email)
                        router.push(`/verify-account?email=${email}`)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                }
            })
            .catch(error => {
                setPopup({ type: "error", msg: formatError(error as string) })
            })
        }
        if(res?.error) {
            setPopup({ type: "error", msg: formatError(res.error as string) })
            setLoading(false)
        }
    }

    const signUp = (data: signupData) => {
        setLoading(true)
        const otp = Math.floor(Math.random() * 1000000);
        const time = Date.now() + 10 * 60 * 1000;
        register({ ...data, otp: otp.toString(), otpExpiry: time.toString() })
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Signup Successful, Please verify your email to continue" })
                sendOTP(otp, new Date(time).toLocaleString(), data.email)
                router.push(`/verify-account?email=${data?.email}`)
            }
        })
        .catch((error: { message: string }) => {
            setPopup({ type: "error", msg: formatError(error.message) })
            setLoading(false)
        });
    }
    
    const sociallogin = async (provider: string) => {
        setLoading(true)
        try {
            let response = await signIn(provider, { callbackUrl: "/dashboard" });

            console.log(response)
            
            setLoading(false)
        } catch (error) {
            console.error("Sign in failed:", error);

            setPopup({ type: "error", msg: "Sign-in failed, please try again." })
            setLoading(false)
        }
    }

    const logOut = () => {
        setUser(null)
        signOut()
        .then(() => {
            router.push("/login")
        })
        .catch((e) => {
            setPopup({ type: "error", msg: "Couldn't sign out, please try again." })
        })
    }

    const getUserData = async (email: string) => {
        await fetchUserData(email)
        .then(response => {
            setUser(response)
        })
        .catch(error => {
            setPopup({ type: "error", msg: formatError(error as string) })
        })
    }

    const updateUser = async (email: string, data: UserData) => {
        setLoading(true)
        await updateUserData(email, data)
        .then(response => {
            getUserData(email)
            setPopup({ type: "success", msg: "Updated Successfully" })
            setLoading(false)
        })
        .catch(error => {
            setPopup({ type: "error", msg: formatError(error as string) })
            setLoading(false)
        })
    }

    const verifyOTP = async (email:string, otp: string, type: string) => {
        setLoading(true)
        await verifyUserAccount(email, otp)
        .then(async response => {
            if(response) {
                getUserData(email)
                setPopup({ type: "success", msg: "Verified Successfully!" })
                setLoading(false)
                
                await fetchUserData(email)
                .then(response => {
                    if(response.role === "Buyer") {
                        router.push("/dashboard")
                    }
                    else if(!response.business_name || response.business_name === "") {
                        router.push(`/vendor-onboarding?email=${email}`)
                    }
                    else if(type === "register") {
                        router.push("/login")
                    }
                })
            }
            else {
                setPopup({ type: "error", msg: "OTP incorrect" })
                setLoading(false)
            }
        })
        .catch(error => {
            setPopup({ type: "error", msg: formatError(error as string) })
            setLoading(false)
        })
    }

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
      }, [popup]);

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, setUser, login, signUp, sociallogin, logOut, getUserData, updateUser, verifyOTP }}>
            <Toaster containerClassName="p-8" />
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;