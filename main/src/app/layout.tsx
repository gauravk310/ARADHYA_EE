import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shyam Indus Power Solutions Pvt Ltd | EPC Company",
  description:
    "Shyam Indus Power Solutions Pvt Ltd (SIPS) is an ISO 9001:2015 certified EPC Company offering comprehensive services in Power Transmission, Railways, and Civil Infrastructure from concept to commissioning.",
  keywords:
    "SIPS, Shyam Indus, Power Solutions, EPC, Transmission, Railways, Civil Infrastructure, Gurugram",
  openGraph: {
    title: "Shyam Indus Power Solutions Pvt Ltd",
    description:
      "ISO 9001:2015 certified EPC Company specializing in Power Transmission, Railways & Civil Infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Georgia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
