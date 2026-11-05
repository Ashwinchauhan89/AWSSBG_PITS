import * as React from "react";
import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Cloud, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your AWS Student Builder Group PITS account to access workshops, projects, and developer resources.",
};

function SignInSkeleton() {
  return (
    <div className="w-full max-w-[400px] h-[520px] rounded-2xl bg-[#0D1117]/80 border border-white/10 p-8 flex flex-col items-center justify-center space-y-6 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10" />
      <div className="w-48 h-6 rounded bg-white/10" />
      <div className="w-32 h-4 rounded bg-white/5" />
      <div className="w-full space-y-3 pt-4">
        <div className="w-full h-11 rounded-lg bg-white/5" />
        <div className="w-full h-11 rounded-lg bg-white/5" />
        <div className="w-full h-11 rounded-lg bg-[#FF9900]/20" />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-12 overflow-hidden">
      {/* Ambient Cyber Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex flex-col items-center text-center mb-8 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#FF9900] mb-3">
          <Cloud className="w-3.5 h-3.5 text-[#FF9900]" />
          <span>AWS SBG PITS • SECURE CONSOLE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Builder Authentication
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans">
          Sign in to access workshops, hands-on cloud labs, competition teams, and administrative tools.
        </p>
      </div>

      {/* Auth Card with Suspense */}
      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={<SignInSkeleton />}>
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full max-w-[420px]",
                card: "bg-[#0D1117]/95 border border-white/10 shadow-2xl shadow-black/80 rounded-2xl backdrop-blur-xl",
                headerTitle: "text-white font-bold text-lg",
                headerSubtitle: "text-slate-400 text-xs",
                socialButtonsBlockButton:
                  "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#FF9900]/40 transition-all text-xs font-mono",
                socialButtonsBlockButtonText: "text-white font-medium",
                dividerLine: "bg-white/10",
                dividerText: "text-slate-500 font-mono text-[11px] uppercase tracking-wider",
                formFieldLabel: "text-slate-300 text-xs font-mono font-medium",
                formFieldInput:
                  "bg-[#080A0F] border-white/15 text-white text-sm rounded-lg focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900]/50 placeholder-slate-600 transition-all",
                formButtonPrimary:
                  "bg-gradient-to-r from-[#FF9900] to-amber-500 hover:brightness-110 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF9900]/25 transition-all py-2.5",
                footerActionLink: "text-[#FF9900] hover:text-amber-400 font-medium text-xs transition-colors",
                identityPreviewText: "text-slate-300 font-mono text-xs",
                identityPreviewEditButton: "text-[#FF9900] hover:text-amber-400 text-xs font-mono",
              },
            }}
          />
        </Suspense>
      </div>

      {/* Back to Home Link */}
      <div className="relative z-10 mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to SBG Homepage</span>
        </Link>
      </div>
    </div>
  );
}
