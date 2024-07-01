import { TheFooter } from "@/components/TheFooter";
import { TheHeader } from "@/components/TheHeader";
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
        <TheHeader />
        <main>
        {children}
        </main>
        <TheFooter />
        </body>
    </html>
  );
}
