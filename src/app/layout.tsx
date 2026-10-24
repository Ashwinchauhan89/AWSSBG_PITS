import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { LeftNavRail } from "@/components/layout/LeftNavRail";
import { RightSocialRail } from "@/components/layout/RightSocialRail";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/shared/ToastProvider";
import { GsapScrollProgress } from "@/components/gsap/GsapScrollProgress";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080A0F",
};

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

import { ClientLayoutShell } from "@/components/layout/ClientLayoutShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#080A0F] text-[#F5F7FA] selection:bg-amber-500 selection:text-[#080A0F] relative">
        <ClientLayoutShell>
          <GsapScrollProgress />
          <Navbar />
          <LeftNavRail />
          <RightSocialRail />
          <main className="flex-1 relative z-10 overflow-x-clip">{children}</main>
          <Footer />
          <ToastProvider />
        </ClientLayoutShell>
      </body>
    </html>
  );
}

