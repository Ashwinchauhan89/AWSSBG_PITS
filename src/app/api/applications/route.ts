import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/applicationSchema";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = applicationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // Check duplicate email
    const existing = await dbService.getApplications();
    const alreadyApplied = existing.some(
      (app) =>
        app.collegeEmail.toLowerCase() === validData.collegeEmail.toLowerCase()
    );

    if (alreadyApplied) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An application has already been submitted with this college email address. To update your application, please reach out via the Contact page.",
        },
        { status: 409 }
      );
    }

    const application = await dbService.createApplication({
      fullName: validData.fullName,
      collegeEmail: validData.collegeEmail,
      personalEmail: validData.personalEmail || undefined,
      department: validData.department,
      currentYear: validData.currentYear,
      cgpa: validData.cgpa,
      technicalSkills: validData.technicalSkills,
      preferredPosition: validData.preferredPosition,
      whyJoin: validData.whyJoin,
      projectLinks: validData.projectLinks || undefined,
      linkedinUrl: validData.linkedinUrl || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        storageMode: dbService.getStorageMode(),
        databaseConfigured: dbService.isConfigured(),
        data: {
          id: application.id,
          fullName: application.fullName,
          preferredPosition: application.preferredPosition,
          createdAt: application.createdAt,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing application" },
      { status: 500 }
    );
  }
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
