import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contactSchema";
import { dbService } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const contacts = await dbService.getContacts();
    return NextResponse.json({
      success: true,
      storageMode: dbService.getStorageMode(),
      databaseConfigured: dbService.isConfigured(),
      count: contacts.length,
      data: contacts,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

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
    const contact = await dbService.createContact({
      name: validData.name,
      email: validData.email,
      subject: validData.subject,
      message: validData.message,
      category: validData.category || "General Inquiry",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! Our community organizers will get back to you shortly.",
        storageMode: dbService.getStorageMode(),
        databaseConfigured: dbService.isConfigured(),
        data: {
          id: contact.id,
          name: contact.name,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while sending message" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Contact inquiry ID is required" },
        { status: 400 }
      );
    }

    const updated = await dbService.toggleContactResolved(id);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
