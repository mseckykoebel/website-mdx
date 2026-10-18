import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/lib/utils";

/** small, label-style heading followed by a hairline rule */
export function SectionHeading({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "mb-4 flex items-center gap-3 text-label text-foreground",
        "after:h-px after:flex-1 after:bg-border after:content-['']",
        className,
      )}
      {...props}
    />
  );
}
