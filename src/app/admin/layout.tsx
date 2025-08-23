import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import AdminSidebarWrapper from "@/components/admin/AdminSidebarWrapper";
import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from "@/context/themeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Admin",
  description: "Manage the content of Portfolio site from this app.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <SessionWrapper>
        <div className="min-h-screen flex bg-background">
          <AdminSidebarWrapper />
          <div className="flex-1 flex flex-col lg:ml-0">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SessionWrapper>
    </ThemeProvider>
  );
}
