import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/config/business";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${businessConfig.name} - Reservas`,
  description: businessConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        {/* Max width container for web to simulate mobile view in Booksy style */}
        <div className="mx-auto max-w-md min-h-screen bg-background relative shadow-2xl overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
