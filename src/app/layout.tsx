import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommunityBanner } from "@/components/layout/CommunityBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/shared/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default:
      "AWS Student Builder Group | Prashanti Institute of Technology & Science",
    template: "%s | AWS SBG PITS Ujjain",
  },
  description:
    "Explore cloud computing, AI, machine learning, technical workshops, student projects, and developer community activities at Prashanti Institute of Technology & Science, Ujjain.",
  keywords: [
    "AWS Student Builder Group",
    "AWS SBG PITS",
    "Prashanti Institute of Technology & Science",
    "PITS Ujjain",
    "Cloud Computing Ujjain",
    "Amazon Bedrock Workshop",
    "Ashwin Chauhan",
    "Student Developer Community",
  ],
  authors: [{ name: "AWS SBG PITS Community" }],
  openGraph: {
    title:
      "AWS Student Builder Group | Prashanti Institute of Technology & Science",
    description:
      "Empowering students at Prashanti Institute of Technology & Science to explore cloud computing, AI, and modern software development.",
    url: "https://awssbg-pits.vercel.app",
    siteName: "AWS SBG PITS Ujjain",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <CommunityBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
