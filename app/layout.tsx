import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
