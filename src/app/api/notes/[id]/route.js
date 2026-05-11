import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const db = await getDb();
    const noteId = params.id;

    const note = await db.collection("notes").findOne({ _id: new ObjectId(noteId) });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const session = await getSession();
    const isOwner = session.user && session.user.id === note.userId;

    if (note.isPrivate && !isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.collection("notes").updateOne(
      { _id: new ObjectId(noteId) },
      { $inc: { views: 1 } }
    );
    note.views = (note.views || 0) + 1; 

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const db = await getDb();
    const noteId = params.id;

    const existingNote = await db.collection("notes").findOne({
      _id: new ObjectId(noteId),
      userId: session.user.id
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
    }

    const updateData = {
      title: body.title !== undefined ? body.title : existingNote.title,
      content: body.content !== undefined ? body.content : existingNote.content,
      isPrivate: body.isPrivate !== undefined ? body.isPrivate : existingNote.isPrivate,
      password: body.password !== undefined ? body.password : existingNote.password,
      attachments: body.attachments !== undefined ? body.attachments : existingNote.attachments,
      tags: body.tags !== undefined ? body.tags : existingNote.tags,
      color: body.color !== undefined ? body.color : existingNote.color,
      isPinned: body.isPinned !== undefined ? body.isPinned : existingNote.isPinned,
      updatedAt: new Date(),
    };

    await db.collection("notes").updateOne(
      { _id: new ObjectId(noteId) },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const noteId = params.id;

    const result = await db.collection("notes").deleteOne({
      _id: new ObjectId(noteId),
      userId: session.user.id
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}