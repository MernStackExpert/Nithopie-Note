import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password , img , scCode} = await req.json();
    const db = await getDb();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
      name,
      email,
      img,
      scCode,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}