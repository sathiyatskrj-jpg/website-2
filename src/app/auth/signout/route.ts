import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Check if session exists, then sign out
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", request.url), {
    status: 302,
  });
}
