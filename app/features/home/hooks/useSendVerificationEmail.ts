"use client";

import { useMutation } from "@tanstack/react-query";
import type { CreateEmailResponse } from "resend";

type Props = {
  onError?: (error: Error) => void;
  onSuccess?: (response: CreateEmailResponse) => void;
};

export const useSendVerificationEmail = ({ onError, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await fetch("/api/email-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to send email");
      return response.json();
    },
    onError,
    onSuccess,
  });

  return {
    sendVerificationEmail: mutation.mutateAsync,
    sendVerificationEmailLoading: mutation.isPending,
    sendVerificationEmailError: mutation.error,
  };
};
