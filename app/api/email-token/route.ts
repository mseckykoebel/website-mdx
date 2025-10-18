import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { randomInt } from "crypto";

import { createAdminClient } from "~/app/utils";
import { EmailVerificationTemplate } from "~/app/features/home";

const supabase = createAdminClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    /** save token */
    const token = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { error } = await supabase
      .from("email_confirmation_tokens")
      .insert({ email, token, expires_at: expiresAt.toISOString() })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create token" },
        { status: 500 }
      );
    }

    /** send verification email */
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: "Mason Secky-Koebel <email@masonseckykoebel.com>",
      to: email,
      subject: "Mason Secky-Koebel - Verify your email",
      react: EmailVerificationTemplate({ verificationUrl }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
