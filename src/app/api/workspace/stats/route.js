import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req) {
  try {
    const session = await getSession();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const userId = session.user.id;

    const totalNotes = await db.collection("notes").countDocuments({ userId });
    const encryptedVaults = await db.collection("notes").countDocuments({ userId, isPrivate: true });
    const favorites = await db.collection("notes").countDocuments({ userId, isPinned: true });

    const tagsAggregation = await db.collection("notes").aggregate([
      { $match: { userId } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } }, 
      { $sort: { count: -1 } }
    ]).toArray();

    const activeTags = tagsAggregation.length;
    const categoryData = tagsAggregation.slice(0, 4).map((t, i) => {
      const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
      return { name: t._id, value: t.count, color: colors[i % colors.length] };
    });

   
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityAggregation = await db.collection("notes").aggregate([
      { $match: { userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          notes: { $sum: 1 },
          views: { $sum: "$views" }
        }
      }
    ]).toArray();

    const activityData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      const found = activityAggregation.find(a => a._id === dateStr);
      activityData.push({
        name: dayName,
        notes: found ? found.notes : 0,
        views: found ? found.views : 0
      });
    }

    return NextResponse.json({
      stats: {
        totalNotes,
        encryptedVaults,
        favorites,
        activeTags
      },
      categoryData: categoryData.length > 0 ? categoryData : [{ name: "No Tags", value: 1, color: "#9ca3af" }],
      activityData
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}