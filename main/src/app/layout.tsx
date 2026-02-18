import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARADHYA ELECTRICALS & ENTERPRISES | Electrical Services",
  description:
    "ARADHYA ELECTRICALS & ENTERPRISES is a trusted electrical services company offering comprehensive solutions in Power Transmission, Electrical Contracting, and Civil Infrastructure from concept to commissioning.",
  keywords:
    "ARADHYA, Aradhya Electricals, Aradhya Enterprises, Electrical Services, Power Transmission, Civil Infrastructure",
  openGraph: {
    title: "ARADHYA ELECTRICALS & ENTERPRISES",
    description:
      "Trusted electrical services company specializing in Power Transmission, Electrical Contracting & Civil Infrastructure.",
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
