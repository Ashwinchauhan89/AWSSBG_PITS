import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbService } from "@/lib/data/store";

export const dynamic = "force-dynamic";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "pits-sbg-admin2026";

async function getAdminData() {
  const applications = await dbService.getApplications();
  const contacts = await dbService.getContacts();
  const events = await dbService.getEvents();
  const projects = await dbService.getProjects();

  const pendingApps = applications.filter((a) => a.status === "Pending").length;
  const shortlistedApps = applications.filter((a) => a.status === "Shortlisted").length;
  const unresolvedContacts = contacts.filter((c) => !c.isResolved).length;

  return {
    success: true,
    authenticated: true,
    system: {
      storageMode: dbService.getStorageMode(),
      databaseConfigured: dbService.isConfigured(),
      environment: process.env.NODE_ENV || "development",
      serverTimestamp: new Date().toISOString(),
    },
    stats: {
      totalApplications: applications.length,
      pendingApplications: pendingApps,
      shortlistedApplications: shortlistedApps,
      totalContacts: contacts.length,
      unresolvedContacts,
      totalEvents: events.length,
      totalProjects: projects.length,
    },
  };
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Authentication required" },
        { status: 401 }
      );
    }

    const data = await getAdminData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve administrator metrics" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    let body: { passkey?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Body may be empty if purely relying on Clerk session
    }

    const isPasskeyValid = body.passkey && body.passkey === ADMIN_SECRET;
    const isClerkAuth = Boolean(userId);

    if (!isPasskeyValid && !isClerkAuth) {
      return NextResponse.json(
        { success: false, error: "Invalid administrator credentials or unauthenticated session" },
        { status: 401 }
      );
    }

    const data = await getAdminData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to authenticate administrator" },
      { status: 500 }
    );
  }
}
