import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "block",
});


export const metadata: Metadata = {
  title: "Brian Huang's Portfolio",
  description: "A designer with passion who embraces different challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      className={spaceGrotesk.variable}
    >
      <body>{children}</body>
    </html>
  );
}
