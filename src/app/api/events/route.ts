import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/data/store";
import { CommunityEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await dbService.getEvents();
    return NextResponse.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.date || !body.venue) {
      return NextResponse.json(
        { success: false, error: "Title, date, and venue are required" },
        { status: 400 }
      );
    }

    const newEvent: CommunityEvent = {
      id: `evt-${Date.now()}`,
      title: body.title,
      description: body.description || "",
      category: body.category || "AWS Cloud",
      date: body.date,
      time: body.time || "02:00 PM IST",
      venue: body.venue,
      isOnline: Boolean(body.isOnline),
      status: body.status || "upcoming",
      registrationOpen: body.registrationOpen ?? true,
      registrationLink: body.registrationLink || undefined,
      speakerName: body.speakerName || undefined,
      speakerRole: body.speakerRole || undefined,
      tags: Array.isArray(body.tags) ? body.tags : ["AWS", "Community"],
      capacity: body.capacity ? Number(body.capacity) : undefined,
    };

    const saved = await dbService.createEvent(newEvent);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID required" }, { status: 400 });
    }
    const ok = await dbService.deleteEvent(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Event removed" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete event" }, { status: 500 });
  }
}
