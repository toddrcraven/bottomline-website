import type { Metadata } from "next";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "BottomLine ERP",
  description: "BottomLine ERP marketing site",
  icons: {
    icon: "/brand/bottom-line-erp-icon-512.png",
    shortcut: "/brand/bottom-line-erp-icon-512.png",
    apple: "/brand/bottom-line-erp-icon-1024.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-backgroundBase text-textPrimary">
        <PageBackdrop />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
