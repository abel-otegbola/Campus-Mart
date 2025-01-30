'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { UserData } from "@/interface/profile";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { register } from "@/actions/register";
import { signupData } from "@/interface/auth";
import { fetchUserData, updateUserData } from "@/actions/useProfile";

type values = {
    user: UserData;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    setUser: (aug0: unknown) => void;
    login: (email: string, password: string, callbackUrl: string) => void; 
    signUp: (data: signupData) => void;
    sociallogin: (type: string) => void;
    logOut: () => void;
    getUserData: (email: string) => void;
    updateUser: (email: string, data: UserData) => void;
}

export const AuthContext = createContext({} as values);

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const formatError = (msg: string) => {
        return msg.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
    }

    const login = async (email: string, password: string, callbackUrl: string) => {
        setLoading(true)
        const res = await signIn("credentials", { email, password, redirect: false });
        if(res?.ok) {
            setPopup({ type: "success", msg: "Login Successful" })
            setLoading(false)
            router.push(callbackUrl ? callbackUrl : "/dashboard")
        }
        if(res?.error) {
            setPopup({ type: "error", msg: formatError(res.error as string) })
            setLoading(false)
        }
    }

    const signUp = (data: signupData) => {
        setLoading(true)
        register(data)
        .then((response) => {
            setLoading(false)
            if(response?.error) {
                setPopup({ type: "error", msg: response?.error })
            }
            else {
                setPopup({ type: "success", msg: "Signup Successful, Please login to continue" })
                router.push("/login")
            }
        })
        .catch((error: { message: string }) => {
            setPopup({ type: "error", msg: formatError(error.message) })
            setLoading(false)
        });
    }
    
    const sociallogin = async (callbackUrl: string) => {
        setLoading(true)
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
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
        router.push("/login")
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
            setUser(response)
            setPopup({ type: "success", msg: "Updated Successfully" })
            setLoading(false)
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
        <AuthContext.Provider value={{ user, popup, loading, setPopup, setUser, login, signUp, sociallogin, logOut, getUserData, updateUser }}>
            <Toaster containerClassName="p-8" />
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;