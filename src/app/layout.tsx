import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MIVA Robotics — Automation for every scale",
  description:
    "Accessible, adaptable, affordable AI-powered robotics and automation for MSMEs and smart plants.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${cormorant.variable} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
