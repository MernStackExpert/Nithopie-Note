import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params; 
    
    const db = await getDb();
    const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const session = await getSession();
    const isOwner = session.user && String(session.user.id) === String(note.userId);

    if (note.isPrivate && !isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.collection("notes").updateOne(
      { _id: new ObjectId(id) },
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
    const { id } = await params;
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const db = await getDb();

    const existingNote = await db.collection("notes").findOne({ _id: new ObjectId(id) });

    if (!existingNote || String(existingNote.userId) !== String(session.user.id)) {
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
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const note = await db.collection("notes").findOne({ _id: new ObjectId(id) });

    if (!note || String(note.userId) !== String(session.user.id)) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
    }

    await db.collection("notes").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}