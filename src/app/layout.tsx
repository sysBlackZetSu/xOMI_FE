import "./globals.css";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bot Blockchain",
  description: "Bot, Swap, Mint",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta httpEquiv="Content-Security-Policy" content="connect-src 'self' http://localhost:2705" />
      <body className={inter.className}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            {/* <SiteHeader /> */}
            <div className="flex-1 px-6 py-4">
              {children}
              <Analytics />
            </div>
            {/* <SiteFooter /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
