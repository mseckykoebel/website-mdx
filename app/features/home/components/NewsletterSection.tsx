"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { emailInputSchema } from "~/app/schemas/email";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { useSaveEmail } from "../hooks";

function handleSaveEmailError(error: Error) {
  if (error.message.includes("duplicate")) {
    toast.error("Email already subscribed!");
  } else {
    toast.error(`Failed to subscribe email: ${error.message}`);
  }
}

export function NewsletterSection() {
  const form = useForm<z.infer<typeof emailInputSchema>>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: undefined,
    },
  });

  const { saveEmail, saveEmailLoading } = useSaveEmail(handleSaveEmailError);

  const loading = form.formState.isSubmitting || saveEmailLoading;
  const emailError = form.formState.errors.email;
  const isButtonDisabled = loading || !form.formState.isValid;

  const handleSubmit = async (data: z.infer<typeof emailInputSchema>) => {
    try {
      await saveEmail({ email: data.email });
      toast.success("Email subscribed successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const LoadingButton = () => {
    return (
      <Button
        type="submit"
        variant="outline"
        disabled={isButtonDisabled}
        onClick={form.handleSubmit(handleSubmit)}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </Button>
    );
  };

  return (
    <>
      <p className="text-lg leading-relaxed text-gray-600 mt-6">
        I write infrequently about technology and startups. You can subscribe to
        my newsletter below to get notified of new posts.
      </p>
      <div className="hidden sm:flex w-full max-w-sm items-center gap-2 mt-6">
        <Input
          type="email"
          placeholder="Email"
          aria-invalid={emailError ? "true" : "false"}
          className={emailError ? "border-red-500" : ""}
          {...form.register("email")}
        />
        <LoadingButton />
      </div>

      <div className="flex sm:hidden flex-col w-full items-start gap-2 mt-6 ">
        <Input
          type="email"
          placeholder="Email"
          aria-invalid={emailError ? "true" : "false"}
          className={emailError ? "border-red-500" : ""}
          {...form.register("email")}
        />
        <LoadingButton />
      </div>
    </>
  );
}
