import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const applications = await dbService.getApplications();
    return NextResponse.json({
      success: true,
      storageMode: dbService.getStorageMode(),
      databaseConfigured: dbService.isConfigured(),
      count: applications.length,
      data: applications,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Core Team recruitment has concluded. Applications are no longer accepted.",
    },
    { status: 410 }
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Application ID and new status are required" },
        { status: 400 }
      );
    }

    const updated = await dbService.updateApplicationStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    const deleted = await dbService.deleteApplication(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Application deleted" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
