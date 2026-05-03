import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}
