import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SidebarContextWrapper, MobileNavContextWrapper } from "@/components/layout/LayoutWrappers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Wedding Planner",
  description: "A premium, offline-capable wedding planner for Indian weddings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-wedding-ivory text-wedding-slate flex min-h-screen flex-col md:flex-row`}
      >
        <SidebarContextWrapper />
        <main className="flex-1 px-4 py-8 pb-24 md:px-8 md:py-12 md:pl-72 md:pb-12 w-full animate-fade-in">
          {children}
        </main>
        <MobileNavContextWrapper />
      </body>
    </html>
  );
}
