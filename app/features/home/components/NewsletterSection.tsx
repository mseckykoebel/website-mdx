"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { emailInputSchema } from "~/app/schemas/email";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { useSendVerificationEmail, useShowConfirmationMessage } from "../hooks";

function handleSaveEmailError(error: Error) {
  if (error.message.includes("duplicate")) {
    toast.error("Email already subscribed!");
  } else {
    toast.error(`Failed to subscribe email: ${error.message}`);
  }
}

export function NewsletterSection() {
  useShowConfirmationMessage();

  const form = useForm<z.infer<typeof emailInputSchema>>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const { sendVerificationEmail, sendVerificationEmailLoading } =
    useSendVerificationEmail({
      onError: handleSaveEmailError,
    });

  const handleSubmit = async (data: z.infer<typeof emailInputSchema>) => {
    try {
      await sendVerificationEmail({ email: data.email });
      toast.success(
        `Verification email sent successfully to ${data.email}! Check your inbox or spam and click the link to confirm your email.`
      );
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const loading = form.formState.isSubmitting || sendVerificationEmailLoading;
  const emailError = form.formState.errors.email;
  const isButtonDisabled = loading || !form.formState.isValid;

  return (
    <>
      <p className="text-lg leading-relaxed text-gray-600 mt-6">
        I write infrequently about technology and startups. You can subscribe to
        my newsletter below to get notified of new posts.
      </p>
      <div className="flex flex-col sm:flex-row w-full max-w-md gap-2 mt-6">
        <Input
          type="email"
          placeholder="Email"
          aria-invalid={emailError ? "true" : "false"}
          className={emailError ? "border-red-500" : ""}
          {...form.register("email")}
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full sm:w-32"
          disabled={isButtonDisabled}
          aria-disabled={isButtonDisabled}
          aria-busy={loading}
          onClick={form.handleSubmit(handleSubmit)}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </div>
    </>
  );
}
