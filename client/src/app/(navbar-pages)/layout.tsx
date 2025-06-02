import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { Hanken_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";
import { tiempos } from "@/lib/fonts";


const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
  title: "Costsavy Health",
  description: "Costsavy Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${sourceSerif.variable} ${tiempos.variable}`}
    >
      <body
        className={` antialiased max-w-[1660px] w-full mx-auto`}
      >
        <NextTopLoader color="#FFFFFF" height={3} showSpinner={false} />
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
