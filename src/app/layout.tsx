import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Topbar from "@/components/topbar/topbar";
import NextTopLoader from "nextjs-toploader";
import StoreContextProvider from "@/context/useStore";
import AuthProvider from "@/context/useAuth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Campus Mart",
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
        className={`${inter.className} antialiased text-dark dark:bg-black dark:text-white/[0.9] text-[12px] md:mt-0`}
      >
        <AuthProvider>
        <StoreContextProvider>
          <NextTopLoader />
          <Topbar />
          {children}
          <Footer />
        </StoreContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
