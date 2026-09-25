import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
    }

    console.log(`[Lucie Creatives Newsletter Subscribed] Email: ${result.data.email}`);
    return NextResponse.json(
      { success: true, message: "Subscribed to Lucie Creatives Insights." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
