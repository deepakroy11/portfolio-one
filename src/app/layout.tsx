import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import Header from "@/components/header/header";
import { headers } from "next/headers";
import { ThemeProvider } from "@/context/themeProvider";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "Deepak Roy | Full-Stack Web Developer & Software Engineer",
  description:
    "Portfolio of Deepak Roy, a full-stack web developer specializing in Next.js, React, Node.js, and scalable modern solutions. Passionate about optimizing workflows and building seamless user experiences.",
  keywords: [
    "Deepak Roy",
    "Web Developer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Deepak Roy" }],
  creator: "Deepak Roy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deepakroy.dev",
    title: "Deepak Roy | Full-Stack Web Developer",
    description: "Portfolio showcasing modern web development projects and skills in Next.js, React, and full-stack solutions.",
    siteName: "Deepak Roy Portfolio",
    images: [
      {
        url: "/Brand-Image.png",
        width: 1200,
        height: 630,
        alt: "Deepak Roy - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Roy | Full-Stack Web Developer",
    description: "Portfolio showcasing modern web development projects and skills in Next.js, React, and full-stack solutions.",
    images: ["/Brand-Image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" className="light">
      <head>
        <link rel="canonical" href="https://deepakroy.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProvider>
          <ThemeProvider>
            {!isAdminRoute && <Header />}
            <main className={isAdminRoute ? "" : "min-h-screen bg-gradient-to-br"}>{children}</main>
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
