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
      return redirectToFailure(request, "token_missing");
    }

    if (!email) {
      return redirectToFailure(request, "email_missing");
    }

    /** 1) confirm token was issued to this person, and is not expired or used  */
    const { data: tokenData, error: tokenError } = await supabase
      .from("email_confirmation_tokens")
      .select("*")
      .eq("token", token)
      .eq("email", email)
      .single();

    if (tokenError) {
      return redirectToFailure(request, "token_verification_failed");
    }

    if (!tokenData) {
      return redirectToFailure(request, "token_not_found");
    }

    const expiresAt = new Date(tokenData.expires_at);
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (expiresAt < twentyFourHoursAgo) {
      return redirectToFailure(request, "token_expired");
    }

    if (tokenData.email !== email) {
      return redirectToFailure(request, "email_mismatch");
    }

    if (tokenData.used_at) {
      return redirectToFailure(request, "token_already_used");
    }

    /** 2) upsert into emails table (adding them as a subscriber) */
    const { data: emailData, error: emailError } = await supabase
      .from("emails")
      .upsert({ email }, { onConflict: "email" })
      .select()
      .single();

    if (emailError) {
      return redirectToFailure(request, "email_save_failed");
    }

    /** 3) mark the token as used */
    const { error: updateTokenError } = await supabase
      .from("email_confirmation_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("token", token);

    if (updateTokenError) {
      return redirectToFailure(request, "token_update_failed");
    }

    if (!emailData) {
      return redirectToFailure(request, "email_data_missing");
    }

    return NextResponse.redirect(new URL(`/?email=verified`, request.url));
  } catch {
    return redirectToFailure(request, "internal_error");
  }
}

type VerificationFailureReason =
  | "token_missing"
  | "email_missing"
  | "token_verification_failed"
  | "token_not_found"
  | "token_expired"
  | "email_mismatch"
  | "token_already_used"
  | "email_save_failed"
  | "token_update_failed"
  | "email_data_missing"
  | "internal_error";

function getFailureMessage(reason: VerificationFailureReason): string {
  switch (reason) {
    case "token_missing":
      return "Token is missing from URL";
    case "email_missing":
      return "Email is missing from URL";
    case "token_verification_failed":
      return "Failed to verify token and email combination";
    case "token_not_found":
      return "Token not found";
    case "token_expired":
      return "Link has expired - please subscribe again to get a new link";
    case "email_mismatch":
      return "Email does not match token";
    case "token_already_used":
      return "Email has already been subscribed - you're all set!";
    case "email_save_failed":
      return "Failed to save email to database";
    case "token_update_failed":
      return "Failed to mark token as used";
    case "email_data_missing":
      return "Failed to retrieve email data";
    case "internal_error":
      return "Internal server error occurred";
  }
}

function redirectToFailure(
  request: NextRequest,
  reason: VerificationFailureReason
): NextResponse {
  return NextResponse.redirect(
    new URL(
      `/?email=unverified&reason=${encodeURIComponent(getFailureMessage(reason))}`,
      request.url
    )
  );
}
