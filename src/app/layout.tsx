import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Topbar from "@/components/topbar/topbar";
import NextTopLoader from "nextjs-toploader";
import StoreContextProvider from "@/context/useStore";
import AuthProvider from "@/context/useAuth";
import OrderContextProvider from "@/context/useOrders";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Campux Mart",
  description: "Marketplace for student vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-dark dark:bg-black dark:text-white/[0.9] text-[14px] md:mt-0`}
      >
        <AuthProvider>
        <StoreContextProvider>
        <OrderContextProvider>
          <NextTopLoader />
          <Topbar />
          {children}
          <Footer />
          </OrderContextProvider>
        </StoreContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
