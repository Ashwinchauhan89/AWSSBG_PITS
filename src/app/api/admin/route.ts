import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/data/store";

export const dynamic = "force-dynamic";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "pits-sbg-admin2026";

export async function POST(req: NextRequest) {
  try {
    const { passkey } = await req.json();

    if (!passkey || passkey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Invalid administrator security key" },
        { status: 401 }
      );
    }

    const applications = await dbService.getApplications();
    const contacts = await dbService.getContacts();
    const events = await dbService.getEvents();
    const projects = await dbService.getProjects();

    const pendingApps = applications.filter((a) => a.status === "Pending").length;
    const shortlistedApps = applications.filter((a) => a.status === "Shortlisted").length;
    const unresolvedContacts = contacts.filter((c) => !c.isResolved).length;

    return NextResponse.json({
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
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to authenticate administrator" },
      { status: 500 }
    );
  }
}
