import * as React from "react";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

async function AuthProtectionBarrier({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resource-based route protection
  await auth.protect();
  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-slate-400">
            Verifying administrative access...
          </span>
        </div>
      }
    >
      <AuthProtectionBarrier>{children}</AuthProtectionBarrier>
    </Suspense>
  );
}

