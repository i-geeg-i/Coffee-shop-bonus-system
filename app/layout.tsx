import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import './globals.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee in",
  description: "Bonus System for Coffee in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
    </head>
      <body>
        <Header />
        <main>
        {children}
        </main>
        <Footer />
        </body>
    </html>
  );
}
