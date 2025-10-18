import { NextRequest, NextResponse } from "next/server";

/** bypassing RLS if token is valid */
import { createAdminClient } from "~/app/utils";

const supabase = createAdminClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    /** 1) confirm token was issued to this person, and is not expired or used  */
    const { data: tokenData, error: tokenError } = await supabase
      .from("email_confirmation_tokens")
      .select("*")
      .eq("token", token)
      .eq("email", email)
      .single();

    if (tokenError) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    if (!tokenData) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    const expiresAt = new Date(tokenData.expires_at);
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (expiresAt < twentyFourHoursAgo) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    if (tokenData.email !== email) {
      return NextResponse.json(
        { error: "Email does not match" },
        { status: 400 }
      );
    }

    if (tokenData.used_at) {
      return NextResponse.json(
        { error: "Token already used" },
        { status: 400 }
      );
    }

    /** 2) upsert into emails table (adding them as a subscriber) */
    const { data: emailData, error: emailError } = await supabase
      .from("emails")
      .upsert({ email }, { onConflict: "email" })
      .select()
      .single();

    if (emailError) {
      return NextResponse.json(
        { error: "Failed to upsert email" },
        { status: 500 }
      );
    }

    /** 3) mark the token as used */
    const { error: updateTokenError } = await supabase
      .from("email_confirmation_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("token", token);

    if (updateTokenError) {
      return NextResponse.json(
        { error: "Failed to update token" },
        { status: 500 }
      );
    }

    if (!emailData) throw new Error("Failed to upsert email");

    return NextResponse.redirect(new URL(`/?email=verified`, request.url));
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
