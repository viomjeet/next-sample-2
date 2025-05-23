import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "./Header/Navbar";
import Header from "./Header/Header";
import React from "react";
import { SiContentstack } from "react-icons/si";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Meta",
  description: "Generated by Next Meta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-200">
          <div className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
          <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div className="flex items-center justify-start mt-4">
              <div className="flex items-center">                
              <SiContentstack className="text-white text-5xl ml-2" />
                <span className="mx-2 text-2xl font-semibold text-white">
                  vikkiwow
                </span>
              </div>
            </div>
            <Navbar />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <React.Fragment>
              {children}
            </React.Fragment>
          </div>
        </div>
      </body>
    </html>
  );
}
