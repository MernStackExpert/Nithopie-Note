import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { slug } = params;
    const body = await req.json();
    const { password } = body;
    
    const db = await getDb();
    const note = await db.collection("notes").findOne({ slug });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (!note.isPrivate) {
      return NextResponse.json({ note }, { status: 200 });
    }

    if (note.isPrivate && (!password || note.password !== password)) {
      return NextResponse.json({ error: "Unauthorized or incorrect password" }, { status: 401 });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}