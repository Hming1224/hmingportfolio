import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import ScrollBehaviorFix from "../components/ScrollBehaviorFix";
import AnalyticsProviders from "../components/AnalyticsProviders";
import DesignSystemReturnBar from "../components/design-system/DesignSystemReturnBar";
import { siteUrl } from "../lib/metadata";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Brian Huang's Portfolio",
    template: "%s | Brian Huang",
  },
  description: "A designer with passion who embraces different challenges.",
  icons: {
    icon: [
      { url: "/brand-logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/brand-logo.svg",
  },
  openGraph: {
    siteName: "Brian Huang's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Huang's Portfolio",
    description: "A designer with passion who embraces different challenges.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const analyticsEnabled = process.env.VERCEL_ENV === "production";

  return (
    <html
      lang={locale === "zh-TW" ? "zh-Hant-TW" : "en"}
      className={spaceGrotesk.variable}
      suppressHydrationWarning
    >
      <body>
        <ScrollBehaviorFix />
        {children}
        <DesignSystemReturnBar />
        {analyticsEnabled ? <AnalyticsProviders gaId={gaId} clarityId={clarityId} /> : null}
      </body>
    </html>
  );
}
