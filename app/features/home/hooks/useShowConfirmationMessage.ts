"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useShowConfirmationMessage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("searchParams", searchParams);
    const emailStatus = searchParams.get("email");

    if (emailStatus === "verified") {
      toast.success("Email verified successfully!");

      /** remove the query parameter from the URL */
      const params = new URLSearchParams(searchParams.toString());
      params.delete("email");
      router.replace(`/?${params.toString()}`);
    }
  }, [searchParams, router]);
};
