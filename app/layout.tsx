import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { QueryProviders } from "./providers/query-providers";
import SheetProvider from "./providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Finance Dashboard",
    description: "Finance Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <QueryProviders>
                        <SheetProvider />
                        <Toaster />
                        {children}
                    </QueryProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
