import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import ScrollBehaviorFix from "../components/ScrollBehaviorFix";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "block",
});


export const metadata: Metadata = {
  title: "Brian Huang's Portfolio",
  description: "A designer with passion who embraces different challenges.",
  icons: {
    icon: [
      { url: "/brand-logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/brand-logo.svg",
  },
  openGraph: {
    title: "Brian Huang's Portfolio",
    description: "A designer with passion who embraces different challenges.",
    siteName: "Brian Huang's Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brian Huang's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Huang's Portfolio",
    description: "A designer with passion who embraces different challenges.",
    images: ["/og-image.png"],
  },
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
      <body>
        <ScrollBehaviorFix />
        {children}
      </body>
    </html>
  );
}
