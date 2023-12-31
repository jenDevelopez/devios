import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const nicoMoji = localFont({
  src: "../../public/Nico-Moji/nicomoji/NicoMoji-Regular.ttf",
  display: "block",

});

import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className}  `} >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
