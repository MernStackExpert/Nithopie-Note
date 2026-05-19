import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      content,
      isPrivate,
      password,
      attachments,
      tags,
      color,
      isPinned,
    } = body;
    const db = await getDb();

    const slug =
      Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

    const newNote = {
      userId: session.user.id,
      email: session.user.email,
      title: title || "Untitled Note",
      content: content || "",
      slug,
      isPrivate: isPrivate || false,
      password: password || null,
      attachments: attachments || [],
      tags: tags || [],
      color: color || "default",
      isPinned: isPinned || false,
      isTrashed: false,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("notes").insertOne(newNote);

    return NextResponse.json(
      { message: "Note created", noteId: result.insertedId, slug },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const isTrash = url.searchParams.get("trash") === "true";

    const db = await getDb();
    const query = { userId: session.user.id };

    if (isTrash) {
      query.isTrashed = true;
    } else {
      query.isTrashed = { $ne: true };
    }

    const notes = await db
      .collection("notes")
      .find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .toArray();

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
