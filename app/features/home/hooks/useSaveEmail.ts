"use client";

import { useMutation } from "@tanstack/react-query";

import { createClient } from "~/app/utils";

export const useSaveEmail = (onError?: (error: Error) => void) => {
  const supabase = createClient();

  const saveEmail = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await supabase
        .from("emails")
        .insert({ email })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onError,
  });

  return {
    saveEmail: saveEmail.mutateAsync,
    saveEmailLoading: saveEmail.isPending,
    saveEmailError: saveEmail.error,
  };
};
